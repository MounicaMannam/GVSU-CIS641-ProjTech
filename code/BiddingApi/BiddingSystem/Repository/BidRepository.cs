using BiddingSystem.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using System.Runtime.InteropServices;
using System;
using BiddingSystem.ViewModel;

namespace BiddingSystem.Repository
{
    public class BidRepository: IBidRepository
    {
        private BiddingDbContext db;
        private readonly IMessageRepository messageRepository;
        
        //getting reference of dbcontext 
        public BidRepository(BiddingDbContext dbContext, IMessageRepository messageRepository)
        {
            this.db = dbContext;
            this.messageRepository = messageRepository;
        }

        //adding the bid to the Database
        public async Task<int> addBid(Bid bid)
        {
            try
            {
                if (bid != null)
                {
                    await db.Bids.AddAsync(bid);
                    db.SaveChanges();
                    return bid.BidId;
                }
                return -1;
            }
            catch(Exception)
            {
                return -1;
            }

        }

        //Get All Active Bids for the particular user
        public async Task<List<ProductViewModel>> GetActiveBids([Optional] string biddderid)
        {
            try
            {
                return await (from b in db.Bids
                              join p in db.Products on b.product.ProductId equals p.ProductId
                              where (b.Bidder.Id != biddderid && p.seller.Id != biddderid) &&
                              (b.BidStartDate <= DateTime.Today && b.BidEndDate >= DateTime.Today)
                              && b.Status != "delete" 
                              select new ProductViewModel
                              {
                                  ProductId = p.ProductId,
                                  ProductName = p.ProductName,
                                  CategoryId = p.category.CategoryId,
                                  Description = p.LDescription,
                                  Price = b.CurrentPrice,
                                  StartPrice = p.Price,
                                  PreviousPrice = b.PreviousPrice,
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
            catch(Exception)
            {
                return null;
            }
        }
        //Get All Upcoming Bids for the particular user
        public async Task<List<ProductViewModel>> GetUpcomingBids([Optional] string biddderid)
        {
            return await (from b in db.Bids
                          join p in db.Products on b.product.ProductId equals p.ProductId
                          where b.Bidder.Id != biddderid && p.seller.Id != biddderid &&
                          b.BidStartDate > DateTime.Today && b.Status != "delete" 
                           orderby b.BidStartDate
                          select new ProductViewModel
                          {
                              ProductId = p.ProductId,
                              ProductName = p.ProductName,
                              CategoryId = p.category.CategoryId,
                              Description = p.LDescription,
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
                              BidId = b.BidId
                          }).ToListAsync();
        }
        //Get All Trending Bids for the particular user
        public async Task<List<ProductViewModel>> GetTrendingBids([Optional] string biddderid)
        {
            return await (from b in db.Bids
                          join p in db.Products on b.product.ProductId equals p.ProductId
                          where b.Bidder.Id != biddderid && p.seller.Id != biddderid &&
                          b.BidStartDate <= DateTime.Today && b.BidEndDate >= DateTime.Today
                          && b.Count >= 5 && b.Status != "delete" 
                          select new ProductViewModel
                          {
                              ProductId = p.ProductId,
                              ProductName = p.ProductName,
                              CategoryId = p.category.CategoryId,
                              Description = p.LDescription,
                              Price = b.CurrentPrice,
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
                              BidId = b.BidId
                          }).ToListAsync();
        }
        //Get Bid by Id
        public async Task<Bid> GetBidById(int bidId)
        {
            Bid bid = await db.Bids.FindAsync(bidId);
            return bid;
        }

        //Get the Bids of a particular user, which are not yet purchased
        public async Task<List<Bid>> GetBidInterest(string biddderid)
        {
            return await(from b in db.Bids
                         join pb in db.ProductBids on b.BidId equals pb.bid.BidId
                         where b.Bidder.Id != biddderid && b.Status == "no" && b.Status != "delete" select b).ToListAsync();
        }

        //Get All bids
        public async Task<List<Bid>> GetBids()
        {
           return await db.Bids.ToListAsync();
        }

        //Get All Purchased bids of a particular user
        public async Task<List<Bid>> GetSoldBids(string biddderid)
        {
            return await(from b in db.Bids where b.Bidder.Id == biddderid && b.Status=="sold" select b).ToListAsync();
        }

        public async Task<int> UpdateBid(int bid,string uid)
        {
            Bid bid1 = await db.Bids.FindAsync(bid);
            bid1.Bidder = await db.Users.FindAsync(uid) as ApplicationUser;
            Product p = await (from b in db.Bids where b.BidId == bid select b.product).FirstOrDefaultAsync();
            string sellerid = await (from ps in db.Products where ps.ProductId == p.ProductId select ps.seller.Id).FirstOrDefaultAsync();
            p.seller = await db.Users.FindAsync(sellerid) as ApplicationUser;
            ProductBids productBids = new ProductBids();
            bid1.Count++;
            productBids.Bidder = bid1.Bidder;
            productBids.Price = bid1.CurrentPrice;
            bid1.PreviousPrice=bid1.CurrentPrice;
            bid1.CurrentPrice = bid1.CurrentPrice + bid1.CurrentPrice *(decimal) 0.05;
            db.Bids.Update(bid1);
            productBids.bid= bid1;
            db.ProductBids.Add(productBids);
            await db.SaveChangesAsync();
            UserMessage message = new UserMessage();
            message.status = "unread";
            message.Message = bid1.Bidder.FirstName + " Bidded on " + bid1.product.ProductName+" at "+DateTime.Now.ToString("f");
            message.myinbox = bid1.product.seller;
            message.bidid = bid1.BidId;
            db.userMessages.Add(message);
            await db.SaveChangesAsync();
            List<string> ids =await (from d in db.ProductBids where d.Bidder.Id!=uid && d.Bidder != null select d.Bidder.Id ).ToListAsync();
            await messageRepository.SendInterestMsgs(ids, bid1.product.ProductName,bid);
            return (int)bid1.CurrentPrice;
        }
        public async Task<string> addWishList(int bid, string uid)
        {

            WishList wish = await (from w in db.wishLists where w.bid.BidId == bid && w.user.Id == uid select w).FirstOrDefaultAsync();
            if (wish == null)
            {
                wish = new WishList();
                wish.bid = await db.Bids.FindAsync(bid);
                wish.user = await db.Users.FindAsync(uid) as ApplicationUser;
                await db.wishLists.AddAsync(wish);
                await db.SaveChangesAsync();
                return "Product added to Your WishList";
            }
            else
            {
                return "The Product is already in your WishList";
            }
        }
        public async Task<string> deleteWishList(int bid, string uid)
        {
            WishList wish = await (from w in db.wishLists where w.bid.BidId == bid && w.user.Id == uid select w).FirstOrDefaultAsync();
            db.wishLists.Remove(wish);
            await db.SaveChangesAsync();
            return "removed from wishlist";
        }
        public async Task<List<ProductViewModel>> getUSerBids(string uid)
        {
            List<int> bids = await (from b in db.ProductBids where b.Bidder.Id == uid select b.bid.BidId).ToListAsync();
            List<ProductViewModel> productViewModels =  await (from b in db.Bids
                                                                      join p in db.Products on b.product.ProductId equals p.ProductId
                                                                      where (b.Bidder.Id != uid && p.seller.Id != uid) &&
                                                                      (b.BidStartDate <= DateTime.Today && b.BidEndDate >= DateTime.Today) && bids.Contains(b.BidId)
                                                                      && b.Status != "delete" 
                                                                       select new ProductViewModel
                                                                              {
                                                                                  ProductId = p.ProductId,
                                                                                  ProductName = p.ProductName,
                                                                                  CategoryId = p.category.CategoryId,
                                                                                  Description = p.LDescription,
                                                                                  Price = b.CurrentPrice,
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
            return productViewModels;
        }
        public async Task<List<ProductViewModel>> getUserPayments(string uid)
        {
            List<ProductViewModel> productViewModels = await (from b in db.Bids
                                                              join p in db.Products on b.product.ProductId equals p.ProductId
                                                              where (b.Bidder.Id == uid ) &&
                                                               b.BidEndDate < DateTime.Today && b.Status.ToLower()!="paid"
                                                               && b.Status!="delete"
                                                              select new ProductViewModel
                                                              {
                                                                  ProductId = p.ProductId,
                                                                  ProductName = p.ProductName,
                                                                  CategoryId = p.category.CategoryId,
                                                                  Description = p.LDescription,
                                                                  Price = b.PreviousPrice,
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
                                                                  BuyerName = b.Bidder.FirstName,
                                                              }).ToListAsync();
            return productViewModels;
        }
        public async Task<List<ProductViewModel>> GetProductsByCatId(ProductViewModel model)
        {
            try
            {
                return await(from b in db.Bids
                             join p in db.Products on b.product.ProductId equals p.ProductId
                             where (b.Bidder.Id != model.Buyerid && p.seller.Id != model.Buyerid) &&
                             (b.BidEndDate >= DateTime.Today) && (p.category.CategoryId == model.CategoryId)
                             && b.Status != "delete" 
                             select new ProductViewModel
                             {
                                 ProductId = p.ProductId,
                                 ProductName = p.ProductName,
                                 CategoryId = p.category.CategoryId,
                                 Description = p.LDescription,
                                 Price = b.CurrentPrice,
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
                                 CategoryName = p.category.CategoryName
                             }).ToListAsync();
            }
            catch (Exception)
            {
                return null;
            }
        }

        public async Task<List<ProductViewModel>> GetMyProducts(string bidderid)
        {
            return await (from b in db.Bids
                          join p in db.Products on b.product.ProductId equals p.ProductId
                          where (p.seller.Id == bidderid) &&
                          (b.BidEndDate >= DateTime.Today) && b.Status != "delete" 

                          select new ProductViewModel
                          {
                              ProductId = p.ProductId,
                              ProductName = p.ProductName,
                              CategoryId = p.category.CategoryId,
                              Description = p.LDescription,
                              Price = b.CurrentPrice,
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
        public async Task<List<ProductViewModel>> GetMyBids([Optional] string biddderid)
        {
            try
            {
                return await (from b in db.Bids
                              join p in db.Products on b.product.ProductId equals p.ProductId
                              where (b.Bidder.Id == biddderid && p.seller.Id != biddderid) &&
                              (b.BidStartDate <= DateTime.Today && b.BidEndDate >= DateTime.Today)
                              && b.Status != "delete" 
                              select new ProductViewModel
                              {
                                  ProductId = p.ProductId,
                                  ProductName = p.ProductName,
                                  CategoryId = p.category.CategoryId,
                                  Description = p.LDescription,
                                  Price = b.PreviousPrice,
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
            catch (Exception)
            {
                return null;
            }
        }

        public async Task<List<ProductViewModel>> getTopBidders(int bid)
        {
            List<ProductViewModel> list = await (from b in db.Bids
                                           join p in db.ProductBids on b.BidId equals p.bid.BidId
                                           where b.BidId == bid
                                           orderby p.Price descending
                                           select new ProductViewModel
                                           {
                                               SellerName=p.Bidder.FirstName,
                                               Price=p.Price,
                                               MobileNo=p.Bidder.PhoneNumber
                                           }
                                          ).Take(5).ToListAsync();
            return list;
        }
        public async Task deleteBid(int bid)
        {
            ProductViewModel model=await(from b in db.Bids where b.BidId==bid 
                                         join p in db.Products on b.product.ProductId equals p.ProductId
                                         select new ProductViewModel
            {
                Bid=b,
                ProductName=p.ProductName
            }).FirstOrDefaultAsync();
            Bid bid1 = model.Bid;
            bid1.Status = "delete";
            ApplicationUser user= await (from b in db.Bids where b.BidId==bid select b.Bidder).FirstOrDefaultAsync() as ApplicationUser;
            if(user != null)
            {
                UserMessage message=new UserMessage();
                message.myinbox = user;
                message.status = "unread";
                char c = '"';
                message.Message = "Sorry! Seller deleted the product: " + c + model.ProductName + c + " you bidded on";
              await  db.userMessages.AddAsync(message);
            }
            db.Bids.Update(bid1);
            await db.SaveChangesAsync();
        }

        public async Task UpdateProduct(ProductViewModel model)
        {
         ProductViewModel productView=   await (from b in db.Bids
                                     join
                                   p in db.Products on b.product.ProductId equals p.ProductId
                                     where b.BidId == model.BidId
                                     select new ProductViewModel 
                                     {
                                        Product=p, 
                                        Bid=b
                                     }).FirstOrDefaultAsync();
            productView.Bid.BidStartDate = model.BidStartDate;
            productView.Bid.BidEndDate = model.BidEndDate;
            productView.Product.LDescription=model.LDescription;
            productView.Product.SDescription = model.SDescription;
            productView.Product.Price = model.Price;
            productView.Product.ProductName = model.ProductName;
            db.Products.Update(productView.Product);
            db.Bids.Update(productView.Bid);
            await db.SaveChangesAsync();
        }
    }
}
