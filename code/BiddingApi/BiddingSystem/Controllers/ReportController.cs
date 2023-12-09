using BiddingSystem.Repository;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace BiddingSystem.Controllers
{
    public class ReportController : Controller
    {
        private IReportRepository reportRepository;
        public ReportController(IReportRepository reportRepository)
        {
            this.reportRepository = reportRepository;
        }
        public IActionResult Index()
        {
            return View();
        }
        [HttpGet]
        [Route("report/getproductatoadmin")]
        public async Task<JsonResult> GetProductsToAdmin()
        {
            return Json(await reportRepository.GetProductsToAdmin());
        }
        [HttpGet]
        [Route("report/auction")]
        public async Task<JsonResult> GetAuctionReport()
        {
            return Json(await reportRepository.GetAuctionReport());
        }
    }
}
