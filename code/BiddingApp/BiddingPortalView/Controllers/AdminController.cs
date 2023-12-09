using Microsoft.AspNetCore.Mvc;

namespace BiddingPortalView.Controllers
{
    public class AdminController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
        public IActionResult Auction()
        {
            return View();
        }
        public IActionResult Payment()
        {
            return View();
        }
        [Route("admin/checkproduct/{bid}")]
        public IActionResult CheckProduct(string bid)
        {
            ViewBag.BidId = bid;
            return View();
        }
    }
}
