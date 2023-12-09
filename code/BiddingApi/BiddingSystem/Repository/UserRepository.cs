using BiddingSystem.Models;
using System.Threading.Tasks;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using BiddingSystem.ViewModel;
using System.Collections.Generic;
using System;

namespace BiddingSystem.Repository
{
    public class UserRepository:IUserRepository
    {
        private BiddingDbContext db;
        public UserRepository(BiddingDbContext biddingDb)
        {
            this.db = biddingDb;
        }

        public async Task<ApplicationUser> getUser(string id)
        {
            ApplicationUser user= await  db.Users.FindAsync(id) as ApplicationUser;
            return user;
        }

        public async Task<ApplicationUser> getUserByEmail(string email)
        {
            ApplicationUser user = await db.Users.Where(u => u.Email == email).FirstOrDefaultAsync() as ApplicationUser;
            return user;
        }
        public async Task<List<ProductViewModel>> currentProducts(string id)
        {
            List<ProductViewModel> productViewModels = await (from u in db.Users
                                                              join p in db.Products on u.Id equals p.seller.Id
                                                              join b in db.Bids on p.ProductId equals b.product.ProductId
                                                              where p.seller.Id == id && b.Status!="delete" &&
                                                              b.BidStartDate <= DateTime.Today && b.BidEndDate >= DateTime.Today
                                                              select new ProductViewModel
                                                              {
                                                                  EndDate = b.BidEndDate.ToString("D"),
                                                                  Price = b.CurrentPrice,
                                                                  ProductName = p.ProductName,
                                                                  CurrentBidder = (b.Bidder.FirstName == null ? "NoBidder" : b.Bidder.FirstName),
                                                                  DisplayImage = (from pi in db.ProductImages
                                                                                  where pi.product.ProductId == p.ProductId
                                                                                  orderby pi.ImageId
                                                                                  select pi.ImageUrl).FirstOrDefault(),
                                                                  StartPrice = b.BiddingPrice
                                                                  
                                                              }
                                                           ).ToListAsync();
            return productViewModels;


        }

        public async Task<List<ProductViewModel>> yourPurchases(string id)
        {
            List<ProductViewModel> productViewModels = await (from p in db.Products 
                                                              join b in db.Bids on p.ProductId equals b.product.ProductId
                                                              join t in db.Transactions on b.BidId equals t.bid.BidId
                                                              where t.bidder.Id == id && b.Status != "delete"
                                                              select new ProductViewModel
                                                              {
                                                                  EndDate = b.BidEndDate.ToString("D"),
                                                                  Price = b.PreviousPrice,
                                                                  //little changes needed
                                                                  ProductName = p.ProductName,
                                                                  SellerName = p.seller.FirstName,
                                                                  DisplayImage = (from pi in db.ProductImages
                                                                                  where pi.product.ProductId == p.ProductId
                                                                                  orderby pi.ImageId
                                                                                  select pi.ImageUrl).FirstOrDefault(),
                                                                  StartPrice = b.BiddingPrice

                                                              }
                                                           ).ToListAsync();
            return productViewModels;
        }

        public async Task<List<ProductViewModel>> yourHistory(string id)
        {
            List<ProductViewModel> productViewModels = await (from u in db.Users
                                                              join p in db.Products on u.Id equals p.seller.Id
                                                              join b in db.Bids on p.ProductId equals b.product.ProductId
                                                              where p.seller.Id == id && b.BidEndDate < DateTime.Today && b.Status != "delete"
                                                              select new ProductViewModel
                                                              {
                                                                  EndDate = b.BidEndDate.ToString("D"),
                                                                  Price = b.CurrentPrice,
                                                                  ProductName = p.ProductName,
                                                                  CurrentBidder = b.Bidder.FirstName,
                                                                  Status = b.Bidder == null ? "Not Sold" : "Sold",
                                                                  DisplayImage = (from pi in db.ProductImages
                                                                                  where pi.product.ProductId == p.ProductId
                                                                                  orderby pi.ImageId
                                                                                  select pi.ImageUrl).FirstOrDefault(),
                                                                  StartPrice = b.BiddingPrice
                                                              }
                                                           ).ToListAsync();
            return productViewModels;
        }
        
        public async Task<ProductViewModel> checkProduct(int bid)
        {
            ProductViewModel productViewModel = await (from p in db.Products
                                                       join b in db.Bids on p.ProductId equals b.product.ProductId
                                                       where b.BidId == bid
                                                       select new ProductViewModel
                                                        {
                                                           EndDate = b.BidEndDate.ToString("D"),
                                                           Price = b.CurrentPrice,
                                                           ProductName = p.ProductName,
                                                           SellerName = p.seller.FirstName,
                                                           Email = p.seller.Email,
                                                           Phone = p.seller.PhoneNumber,
                                                           ProductId=p.ProductId,
                                                           Description=p.SDescription,
                                                           LDescription = p.LDescription,                                                           
                                                           BidId = bid,
                                                           StartPrice = b.PreviousPrice,
                                                           StartDate = b.BidStartDate.ToString("D")
                                                       }
                                                    ).FirstOrDefaultAsync();
            List<string> productImages = await (from p in db.ProductImages
                                                      where p.product.ProductId == productViewModel.ProductId
                                                      orderby p.ImageId
                                                      select p.ImageUrl).ToListAsync();
            productViewModel.Image1 = productImages[0];
            productViewModel.Image2 = productImages[1];
            productViewModel.Image3 = productImages[2];
            return productViewModel;
        }

        public async Task<ApplicationUser> UpdateUser(ApplicationUser user,bool isEmail)
        {
            ApplicationUser user1 = (ApplicationUser)await  db.Users.FindAsync(user.Id);
            user1.FirstName = user.FirstName;
            user1.PhoneNumber = user.PhoneNumber;

            if (user1.Email != user.Email && !isEmail)
            {
                user1.Email = user.Email;
                user1.NormalizedEmail = user.Email.ToUpper();
            }
            else
            {
                return null;
            }
            
            user1.City = user.City;
            user1.State = user.State;
            user1.Zip = user.Zip;

            await db.SaveChangesAsync();
            return user1;
        }
    }
}
