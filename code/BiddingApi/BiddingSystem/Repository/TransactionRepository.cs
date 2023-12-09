using BiddingSystem.Models;
using System.Threading.Tasks;
using System.Transactions;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using BiddingSystem.ViewModel;
using System.Collections.Generic;

namespace BiddingSystem.Repository
{
    public class TransactionRepository : ITransactionRepository
    {
        private BiddingDbContext db;
        public TransactionRepository(BiddingDbContext db)
        {
            this.db = db;
        }

        //Add Transaction Method
        public async Task<int> AddTransaction(Transact transaction)
        {
            if (transaction != null)
            {
                await db.Transactions.AddAsync(transaction);
                db.SaveChanges();
                return transaction.TransactionId;
            }
            return -1;
        }

        //Get Transaction By Bid Id Method
        public async Task<Transact> GetTransactionByBidId(int bidId)
        {
            Transact transact = await (from t in db.Transactions where t.bid.BidId == bidId select t).FirstOrDefaultAsync();
            transact.bid = await db.Bids.FindAsync(bidId);
            if(transact != null)
            {
                return transact;
            }
            return null;
        }
        public async Task AddTransaction(ProductViewModel model)
        {
            Transact transact=new Transact();
            Bid bid=await(from b in db.Bids where b.BidId == model.BidId select b).FirstOrDefaultAsync();
            transact.bid=bid;
            ApplicationUser user = await (from u in db.Users where u.Id == model.Buyerid select u).FirstOrDefaultAsync() as ApplicationUser;
            transact.bidder = user;
            transact.TDate = System.DateTime.Now;
            transact.ShippingPrice = 500;
            transact.TransactionType = model.TransactionType;
            transact.FinalAmount = bid.PreviousPrice + transact.ShippingPrice;
            bid.Status = "paid";
            db.Bids.Update(bid);
            await   db.Transactions.AddAsync(transact);
            await db.SaveChangesAsync();
        }

        public async Task<List<ProductViewModel>> GetTransactionReport()
        {
            List<ProductViewModel> productViewModels = await (from p in db.Products
                                                              join b in db.Bids on p.ProductId equals b.product.ProductId
                                                              join t in db.Transactions on b.BidId equals t.bid.BidId
                                                              where b.Status != "delete"
                                                              orderby t.TransactionId descending
                                                              select new ProductViewModel
                                                              {
                                                                  EndDate = t.TDate.ToString("D"),
                                                                  Price = t.FinalAmount,
                                                                  //little changes needed
                                                                  ProductName = p.ProductName,
                                                                  SellerName = p.seller.FirstName,
                                                                  BuyerName = b.Bidder.FirstName,
                                                                  DisplayImage = (from pi in db.ProductImages
                                                                                  where pi.product.ProductId == p.ProductId
                                                                                  orderby pi.ImageId
                                                                                  select pi.ImageUrl).FirstOrDefault(),
                                                                  BidId = b.BidId
                                                              }
                                                           ).ToListAsync();
            return productViewModels;
        }

        public async Task<ProductViewModel> GetInvoice(int bid)
        {
            ProductViewModel productViewModels = await(from p in db.Products
                                                             join b in db.Bids on p.ProductId equals b.product.ProductId
                                                             join t in db.Transactions on b.BidId equals t.bid.BidId
                                                             where b.BidId == bid
                                                             orderby t.TransactionId descending
                                                             select new ProductViewModel
                                                             {
                                                                 EndDate = t.TDate.ToString("D"),
                                                                 Price = t.FinalAmount,
                                                                 StartPrice = b.PreviousPrice,
                                                                 //little changes needed
                                                                 ProductName = p.ProductName,
                                                                 SellerName = p.seller.FirstName,
                                                                 BuyerName = b.Bidder.FirstName,
                                                                 DisplayImage = (from pi in db.ProductImages
                                                                                 where pi.product.ProductId == p.ProductId
                                                                                 orderby pi.ImageId
                                                                                 select pi.ImageUrl).FirstOrDefault(),
                                                                 BidId = b.BidId,
                                                             }
                                                           ).FirstOrDefaultAsync();
            return productViewModels;
        }
    }
}
