using BiddingSystem.Models;
using BiddingSystem.Repository;
using BiddingSystem.ViewModel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BiddingSystem.Controllers
{
    
    public class ProductController : Controller
    {
        private IProductRepository productRepository;
        private IProductImageRepository imageRepository;
        private ICategoryRepository categoryRepository;
        private IBidRepository bidReposritory;
        private IUserRepository userRepository;
        public ProductController(IProductRepository productRepository, IProductImageRepository imageRepository,IBidRepository bidReposritory, ICategoryRepository categoryRepository, IUserRepository userRepository)
        {
            this.productRepository = productRepository;
            this.imageRepository = imageRepository;
            this.bidReposritory = bidReposritory;
            this.categoryRepository = categoryRepository;
            this.userRepository = userRepository;
        }
        public IActionResult Index()
        {
            return View();
        }
        [HttpPost]
        [Route("product/addproduct")]
        public async Task<JsonResult> AddProductAsync(ProductViewModel model)
        {
            Product prodcut = new Product();
            prodcut.ProductName = model.ProductName;
            prodcut.LDescription = model.Description;
            prodcut.SDescription = model.SDescription;
            prodcut.Price= model.Price;
            Category category= await categoryRepository.GetCategoryById(model.CategoryId);
            ApplicationUser user = await userRepository.getUser(model.sellerid);
            prodcut.category = category;
            prodcut.seller = user;
            prodcut =await productRepository.InsertProduct(prodcut);
            Bid bid=new Bid();
            bid.product=prodcut;
            bid.BidEndDate=model.BidEndDate;
            bid.BidStartDate=model.BidStartDate;
            bid.BiddingPrice = prodcut.Price;
            bid.CurrentPrice=prodcut.Price;
            bid.Status = "no";
            foreach (string img in model.Images.Split('$'))
            {
                if (img != null)
                {
                    if (img == "")
                        continue;
                    ProductImage productImage = new ProductImage();
                    productImage.product = prodcut;
                    productImage.ImageUrl = img;
                    await imageRepository.AddProductImage(productImage);
                }
            }
           // return Json("Record is addedd successfully");
            return Json(await bidReposritory.addBid(bid));
        }

        [HttpGet]
        [Route("product/getallproducts/")]
        public async Task<JsonResult> getAllProducts()
        {
            return Json(await productRepository.GetAllProducts());
        }
        [HttpGet]
        [Route("product/getSimilarProducts/{bid}")]
        public async Task<JsonResult> getSimilarProducts(int bid)
        {
            return Json(await productRepository.getSimilarProducts(bid));
        }
    }
}
