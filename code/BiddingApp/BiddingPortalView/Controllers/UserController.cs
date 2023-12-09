using Microsoft.AspNetCore.Mvc;

namespace BiddingPortalView.Controllers
{
    public class UserController : Controller
    {
        public IActionResult SignUp()
        {
            return View();
        }

        public IActionResult SignIn()
        {
            return View();
        }

        public IActionResult Profile()
        {
            return View();
        }
        public IActionResult Messages()
        {
            return View();
        }
        public IActionResult EditDetails()
        {
            return View();
        }
        public IActionResult Wishlist()
        {
            return View();
        }
        public IActionResult Payment()
        {
            return View();
        }
        public IActionResult Invoice()
        {
            return View();
        }
       [HttpGet]
        [Route("product/usercheckproduct/{id}")]
        public IActionResult UserCheckProduct()
        {
            return View();
        }
    }
}
