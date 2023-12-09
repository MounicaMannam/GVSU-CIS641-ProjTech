using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.IO;



namespace BiddingPortalView.Controllers
{
    public class ProductController : Controller
    {

        private readonly ILogger<ProductController> _logger;
        private readonly IWebHostEnvironment webHostEnvironment;
        public ProductController(ILogger<ProductController> logger, IWebHostEnvironment _webHostEnvironment)
        {
            _logger = logger;
            webHostEnvironment = _webHostEnvironment;
        }



        public IActionResult Index()
        {
            return View();
        }
        public IActionResult AddProduct()
        {
            return View();
        }
        [HttpPost]
        [Route("product/upload")]
        public JsonResult UploadFile(List<IFormFile> fromFile)
        {
            string uniqueFileName = null;
            string jsonResult2 = "";
            foreach (IFormFile fromFile1 in fromFile)
            {
                if (fromFile1 != null)
                {
                    string uploadsFolder = Path.Combine(webHostEnvironment.WebRootPath, "Pimages");
                    uniqueFileName = Guid.NewGuid().ToString() + "_" + fromFile1.FileName;
                    string filePath = Path.Combine(uploadsFolder, uniqueFileName);
                    fromFile1.CopyTo(new FileStream(filePath, FileMode.Create));
                    jsonResult2 += uniqueFileName + "$";
                }
            }
            return Json(jsonResult2);
        }
        [Route("product/checkproduct/{bid}")]
        public IActionResult CheckProduct(string bid)
        {
            ViewBag.BidId = bid;
            return View();
        }
        [Route("product/categoryproduct/{catid}")]
        public IActionResult CategoryProduct(string catid)
        {
            ViewBag.CatId = catid;
            return View();
        }

        [Route("product/editproduct/{bid}")]
        public IActionResult EditProduct(int bid)
        {
            ViewBag.BidId = bid;
            return View();
        }
    }
}