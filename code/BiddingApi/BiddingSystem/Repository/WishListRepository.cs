using BiddingSystem.Models;
using BiddingSystem.ViewModel;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using System;

namespace BiddingSystem.Repository
{
    public class WishListRepository : IWishListReposritory
    {
        private BiddingDbContext db;
        public WishListRepository(BiddingDbContext dbContext)
        {
            this.db = dbContext;
        }
        public async Task<int> addWishList(WishList wishList)
        {
            await db.wishLists.AddAsync(wishList);
            await db.SaveChangesAsync();
            return 1;

        }

        public async Task<List<ProductViewModel>> getWishProducts(string uid)
        {
            return await (from b in db.Bids
                          join p in db.Products on b.product.ProductId equals p.ProductId
                          join w in db.wishLists on b.BidId equals w.bid.BidId
                          where b.Bidder.Id != uid && p.seller.Id != uid && b.BidEndDate >= DateTime.Today && w.user.Id == uid
                          select new ProductViewModel
                          {
                              ProductId = p.ProductId,
                              ProductName = p.ProductName,
                              CategoryId = p.category.CategoryId,
                              Description = p.SDescription,
                              LDescription = p.LDescription,                              
                              Price = p.Price,
                              Copyrights = p.Copyrights,
                              sellerid = p.seller.Id,
                              DisplayImage = (from pi in db.ProductImages
                                              where pi.product.ProductId == p.ProductId
                                              orderby pi.ImageId
                                              select pi.ImageUrl).FirstOrDefault(),
                              StartDate = b.BidStartDate.ToString("D"),
                              EndDate = b.BidEndDate.ToString("D"),
                              SellerName = p.seller.UserName,
                              CurrentBidder = b.Bidder.UserName,
                              WishList = w.Id,
                              BidId = b.BidId
                          }).ToListAsync();
        }

        public async Task<List<int>> getWishlistBidIds(string id)
        {
            List<int> bidIds = await (from w in db.wishLists where w.user.Id == id && w.bid.BidEndDate >= DateTime.Today select w.bid.BidId).ToListAsync();
            return bidIds;
        }
    }
}
    