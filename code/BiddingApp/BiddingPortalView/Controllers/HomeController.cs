using Microsoft.AspNetCore.Mvc;

namespace BiddingPortalView.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            
            return View();
        }
        public IActionResult Error404()
        {

            return View();
        }
        
        public IActionResult Server500()
        {

            return View();
        }
    }
}
