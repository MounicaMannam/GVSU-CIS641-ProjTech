using BiddingSystem.Models;
using BiddingSystem.Repository;
using BiddingSystem.ViewModel;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
namespace BiddingSystem.Controllers
{
    public class UserController : Controller
    {
        private UserManager<ApplicationUser> usermanager;
        private IPasswordHasher<ApplicationUser> passwordHasher;
        private SignInManager<ApplicationUser> signInManager;
        private IUserRepository userRepository;
        private readonly IConfiguration _configuration;

        public UserController(UserManager<ApplicationUser> umgr,
            IPasswordHasher<ApplicationUser> phasher, SignInManager<ApplicationUser> smgr, IUserRepository ur, IConfiguration _configuration)
        {
            this.usermanager = umgr;
            this.passwordHasher = phasher;
            this.signInManager = smgr;
            this.userRepository = ur;
            this._configuration = _configuration;
        }
        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public IActionResult Create()
        {
            return View();
        }

        //a new action method Register
        [HttpPost]
        [Route("user/register")]
        public async Task<JsonResult> Register(Registration register)
        {
            if (register != null)
            {
                //Checking the email id for duplicate
                var usercheck = await usermanager.FindByEmailAsync(register.Email);

                if (usercheck == null)
                {

                    Random random = new Random();
                    //Create the object of the application user
                    ApplicationUser user = new ApplicationUser
                    {
                        /*UserName = register.FirstName + random.Next(1, 100).ToString(),*/
                        FirstName = register.FirstName,
                        Email = register.Email,
                        PhoneNumber = register.PhoneNumber,
                        State = register.State,
                        City = register.City,
                        Zip = register.Zip,

                    };

                    if (user.FirstName.Contains(' '))
                    {
                        user.UserName = user.FirstName.Split(' ')[0] + random.Next(1, 100).ToString();
                    }
                    else
                    {
                        user.UserName = register.FirstName + random.Next(1, 100).ToString();
                    }

                    //Save the user details in the database
                    var result = await usermanager.CreateAsync(user, register.Password);
                    if (result.Succeeded)
                    {
                        return Json("!..You're Account Created Successfully...!");
                    }
                    else
                    {
                        foreach (IdentityError error in result.Errors)
                        {
                            //ModelState.AddModelError("", error.Description);
                        }
                    }
                }
                else
                {
                    return Json("Email Id Already Exsists");
                }


            }
            return Json("Invalid User Details");
        }
        [HttpPost]
        [Route("user/update")]
        public async Task<JsonResult> Update(ApplicationUser user)
        {

            if (user != null)
            {
                var usercheck = await usermanager.FindByEmailAsync(user.Email);
                bool isEmailExists = true;
                if (usercheck == null)
                {
                    isEmailExists = false;
                }
                user = await userRepository.UpdateUser(user, isEmailExists);
                if (user != null)
                {
                    return Json(user);
                }
                else
                {
                    return Json("User with this email id already exists");
                }
            }
            else
            {
                return Json("User Details Not Found");
            }
        }
        [HttpPost]
        [Route("user/login")]
        public async Task<IActionResult> Login(LoginUser loginUser)
        {
            //check the user with the emailid exits or not
            ApplicationUser user = await usermanager.FindByEmailAsync(loginUser.Email);

            //if user!=null means valid
            if (user != null)
            {
                //if ther is nay user loggin it will logout
                await signInManager.SignOutAsync();
                Microsoft.AspNetCore.Identity.SignInResult result = await signInManager.PasswordSignInAsync(user, loginUser.Password, false, false);
                if (result.Succeeded)
                {
                    var authClaims = new List<Claim>
                        {
                            new Claim(ClaimTypes.Name, user.UserName),
                            new Claim(JwtRegisteredClaimNames.Jti,Guid.NewGuid().ToString()),
                        };
                    var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]));

                    var token = new JwtSecurityToken(
                        issuer: _configuration["JWT:ValidIssuer"],
                        audience: _configuration["JWT:ValidAudience"],
                        expires: DateTime.Now.AddHours(3),
                        claims: authClaims,
                        signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
                        );
                    return Ok(new
                    {
                        token = new JwtSecurityTokenHandler().WriteToken(token),
                        expiration = token.ValidTo.AddDays(3),
                        userId = user.Id,
                        ur = user


                    });
                }
                return Json("Invalid EmailId or password");
            }

            //return Json(await userRepository.getUserByEmail(loginUser.Email));
            return Json("Invalid EmailId or password");
        }

        public async Task<JsonResult> Logout()
        {
            await signInManager.SignOutAsync();
            return Json("Logout Successfully");
        }

        [HttpGet]
        [Route("user/currentproducts/{id}")]
        public async Task<JsonResult> getCurrentProucts(string id)
        {
            return Json(await userRepository.currentProducts(id));
        }

        [HttpGet]
        [Route("user/yourpurchases/{id}")]
        public async Task<JsonResult> yourPurchases(string id)
        {
            return Json(await userRepository.yourPurchases(id));
        }
        
        [HttpGet]
        [Route("user/yourhistory/{id}")]
        public async Task<JsonResult> yourHistory(string id)
        {
            return Json(await userRepository.yourHistory(id));
        }

        [HttpGet]
        [Route("user/checkproduct/{bid}")]
        public async Task<JsonResult> checkProduct(int bid)
        {
            return Json(await userRepository.checkProduct(bid));
        }
        
    }
}
