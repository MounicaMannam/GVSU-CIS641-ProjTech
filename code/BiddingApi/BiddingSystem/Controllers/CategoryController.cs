using BiddingSystem.Models;
using BiddingSystem.Repository;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace BiddingSystem.Controllers
{
    public class CategoryController : Controller
    {
        private ICategoryRepository categoryRepository;

        public CategoryController(ICategoryRepository categoryRepository)
        {
            this.categoryRepository = categoryRepository;
        }
        public IActionResult Index()
        {
            return View();
        }
        [HttpPost]
        [Route("/category/addcategory")]
        public async Task<JsonResult>  InsertCategory(Category category)
        {
            int result = await categoryRepository.InsertCategory(category);
            return Json(result);
        }
        [HttpGet]
        [Route("category/allcategories")]
        public async Task<JsonResult> GetAllCategory()
        {
            return Json(await categoryRepository.GetAllCategories());
        }

        public async Task<JsonResult> GetCategoryById(int id)
        {
            return Json(await categoryRepository.GetCategoryById(id));
        }
    }
}
