using BiddingSystem.Models;
using BiddingSystem.ViewModel;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using System;

namespace BiddingSystem.Repository
{
    public class ReportRepository : IReportRepository
    {
        private BiddingDbContext db;
        public ReportRepository(BiddingDbContext _db)
        {
            db = _db;
        }

        public async Task<List<ProductViewModel>> GetAuctionReport()
        {
            List<ProductViewModel> productViewModels = await (from u in db.Users
                                                              join p in db.Products on u.Id equals p.seller.Id
                                                              join b in db.Bids on p.ProductId equals b.product.ProductId
                                                              where b.BidEndDate < DateTime.Today && b.Status != "delete"
                                                              orderby b.BidEndDate descending, p.ProductName ascending
                                                              select new ProductViewModel
                                                              {
                                                                  EndDate = b.BidEndDate.ToString("D"),
                                                                  Price = b.PreviousPrice,
                                                                  StartPrice = p.Price,
                                                                  ProductName = p.ProductName,
                                                                  SellerName = p.seller.FirstName,
                                                                  BuyerName = b.Bidder == null ? "No Buyer" : b.Bidder.FirstName,
                                                                  CurrentBidder = b.Bidder.FirstName,
                                                                  Status = b.Bidder == null ? "Not Sold" : "Sold",
                                                                  DisplayImage = (from pi in db.ProductImages
                                                                                  where pi.product.ProductId == p.ProductId
                                                                                  orderby pi.ImageId
                                                                                  select pi.ImageUrl).FirstOrDefault()
                                                              }
                                                           ).ToListAsync();
            return productViewModels;
        }

        public async Task<List<ProductViewModel>> GetProductsToAdmin()
        {
            return await (from b in db.Bids
                          join p in db.Products on b.product.ProductId equals p.ProductId
                          select new ProductViewModel
                          {
                              ProductId = p.ProductId,
                              ProductName = p.ProductName,
                              CategoryId = p.category.CategoryId,
                              Description = p.SDescription,
                              LDescription = p.LDescription,
                              Price = b.CurrentPrice,
                              StartPrice = p.Price,
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
                              BidId = b.BidId,
                          }).ToListAsync();
        }
    }
}
