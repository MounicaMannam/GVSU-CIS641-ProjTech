using Microsoft.AspNetCore.Mvc;
using BiddingSystem.Repository;
using BiddingSystem.Models;
using System.Threading.Tasks;
using System.Collections.Generic;
using BiddingSystem.ViewModel;
using System.Runtime.InteropServices;

namespace BiddingSystem.Controllers
{
    public class WishListController : Controller
    {
        private IWishListReposritory wishListReposritory;

        private IUserRepository userReposritory;
        private IBidRepository bidRepository;
        public WishListController(IWishListReposritory wishListReposritory,IUserRepository userReposritory,IBidRepository bidRepository)
        {
            this.bidRepository = bidRepository;
            this.userReposritory = userReposritory;
            this.wishListReposritory = wishListReposritory;
        }
        
        public IActionResult Index()
        {
            return View();
        }
        public  async Task<JsonResult> addWishList(int bid,string userid)
        {
            ApplicationUser user=await userReposritory.getUser(userid);
            Bid bid1=await bidRepository.GetBidById(bid);
            WishList wishList=new WishList();
            wishList.user=user;
            wishList.bid=bid1;
            return Json( await wishListReposritory.addWishList(wishList));
           
        }
        [HttpGet]
        [Route("wishlist/getwishlist/{id}")]
        public async Task<JsonResult> getWishList(string id)
        {
            List<ProductViewModel> model = await wishListReposritory.getWishProducts(id);
            return Json(model);
        }

        [HttpGet]
        [Route("wishlist/getwishlistbidids/{id}")]
        public async Task<JsonResult> getWishListBidIds([Optional] string id)
        {
            List<int> model = await wishListReposritory.getWishlistBidIds(id);
            return Json(model);
        }
    }
}
