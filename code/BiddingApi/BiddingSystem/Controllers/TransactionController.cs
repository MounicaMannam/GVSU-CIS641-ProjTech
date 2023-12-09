using BiddingSystem.Models;
using BiddingSystem.Repository;
using BiddingSystem.ViewModel;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BiddingSystem.Controllers
{
    public class TransactionController : Controller
    {
        private ITransactionRepository transactionRepository;

        public TransactionController(ITransactionRepository transactionRepository)
        {
            this.transactionRepository = transactionRepository;
        }
        public IActionResult Index()
        {
            return View();
        }

        //Get Transaction By Bid Id Method
        public async Task<Transact> GetTransactionByBidId(int bidid)
        {
            return await transactionRepository.GetTransactionByBidId(bidid);
        }
        [HttpGet]
        [Route("transact/getreport")]
        public async Task<List<ProductViewModel>> GetTransactionReport()
        {
            return await transactionRepository.GetTransactionReport();
        }
        //Add Transaction Method
        [HttpPost]
        [Route("transact/addtransact")]
        public async Task<JsonResult> AddTransaction(ProductViewModel model)
        {
             await transactionRepository.AddTransaction(model);
            return Json("1");
        }
        [HttpGet]
        [Route("transact/getinvoice/{bid}")]
        public async Task<ProductViewModel> GetInvoice(int bid)
        {
            return await transactionRepository.GetInvoice(bid);
        }
    }
}
