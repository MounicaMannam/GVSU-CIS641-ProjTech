using BiddingSystem.Models;
using BiddingSystem.Repository;
using BiddingSystem.ViewModel;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Runtime.InteropServices;
using System.Threading.Tasks;

namespace BiddingSystem.Controllers
{
    public class BidController : Controller
    {
        private IBidRepository bidRepository;

        public BidController(IBidRepository bidRepository)
        {
            this.bidRepository = bidRepository;
        }
        public IActionResult Index()
        {
            return View();
        }

        public async Task<JsonResult> addBid(Bid bid)
        {
            return Json( await bidRepository.addBid(bid));
        }

        public async Task<Bid> GetBidById(int id)
        {
            return await bidRepository.GetBidById(id);
        }
        public async Task<List<Bid>> GetBids()
        {
            return await bidRepository.GetBids();
        }
        [HttpGet]
        [Route("/bid/getBidsByUserId/{bidderid}")]
        public async Task<JsonResult> GetActiveBids([Optional] string bidderid)
        {
            return Json( await bidRepository.GetActiveBids(bidderid));
        }
        [HttpGet]
        [Route("/bid/myproducts/{bidderid}")]
        public async Task<JsonResult> GetMyProducts([Optional] string bidderid)
        {
            return Json(await bidRepository.GetMyProducts(bidderid));
        }
        [HttpGet]
        [Route("/bid/getproductsbycatid")]
        public async Task<JsonResult> GetProductsByCatId(ProductViewModel model)
        {
            return Json(await bidRepository.GetProductsByCatId(model));
        }
        [HttpGet]
        [Route("/bid/getupcomingbids/{bidderid}")]
        public async Task<JsonResult> GetUpcomingBids([Optional] string bidderid)
        {
            return Json(await bidRepository.GetUpcomingBids(bidderid));
        }
        [HttpGet]
        [Route("/bid/gettrendingbids/{bidderid}")]
        public async Task<JsonResult> GetTrendingBids([Optional] string bidderid)
        {
            return Json(await bidRepository.GetTrendingBids(bidderid));
        }
        public async Task<JsonResult> GetSoldBids(string biddderid)
        {
            return Json(await bidRepository.GetSoldBids(biddderid));
        }
        public async Task<JsonResult> GetBidInterest(string biddderid)
        {
            return Json(await bidRepository.GetBidInterest(biddderid));
        }
        [HttpPost]
        [Route("bid/updatebid")]
        public async Task<JsonResult> UpdateBid(ProductViewModel productView)
        {
            return Json(await bidRepository.UpdateBid(productView.BidId, productView.Buyerid));
        }
        [HttpPost]
        [Route("bid/addwishlist")]
        public async Task<JsonResult> addwishList(ProductViewModel productView)
        {
            return Json(await bidRepository.addWishList(productView.BidId, productView.Buyerid));
        }
        [HttpPost]
        [Route("bid/deletewishlist")]
        public async Task<JsonResult> deletewishList(ProductViewModel productView)
        {
            return Json(await bidRepository.deleteWishList(productView.BidId, productView.Buyerid));
        }
        [HttpGet]
        [Route("bid/getUSerBids/{uid}")]
        public async Task<JsonResult> getUSerBids(string uid)
        {
            return Json(await bidRepository.getUSerBids(uid));
        }
        [HttpGet]
        [Route("bid/getmybids/{uid}")]
        public async Task<JsonResult> getMyBids(string uid)
        {
            return Json(await bidRepository.GetMyBids(uid));
        }
        [HttpGet]
        [Route("bid/mytransactions/{uid}")]
        public async Task<JsonResult> getTransactions(string uid)
        {
            return Json(await bidRepository.getUserPayments(uid));
        }
        [HttpGet]
        [Route("bid/topbidders/{bid}")]
        public async Task<JsonResult> getTopBidders(int bid)
        {
            return Json(await bidRepository.getTopBidders(bid));
        }
        [HttpPost]
        [Route("bid/delete/{bid}")]
        public async Task<JsonResult> deleteBid(int bid)
        {
            await bidRepository.deleteBid(bid);
            return Json("deleted");
        }
        [HttpPost]
        [Route("product/editproduct")]
        public async Task<JsonResult> UpdateProduct(ProductViewModel model)
        {
            await bidRepository.UpdateProduct(model);
            return Json("1");
        }
    }
    
}
