using BiddingSystem.Models;
using BiddingSystem.ViewModel;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using System;

namespace BiddingSystem.Repository
{
    public class ProductRepository : IProductRepository
    {
        //creating database db
        private BiddingDbContext db;
        //creating constructor
        public ProductRepository(BiddingDbContext db)
        {
            this.db = db;
        }
        //for delete product
        public async Task<int> DeleteProduct(int id)
        {
            Product product =  await db.Products.FindAsync(id);
            if (product != null)
            {
                db.Products.Remove(product);
                db.SaveChanges();
                return id;
            }
            return 0;
        }
        //for getting all the products
        public async Task<List<Product>> GetAllProducts()
        {
            List<Product> products = await db.Products.ToListAsync();
            if(products.Count > 0)
            {
                return products;
            }
            return null;
        }
        //for get the product by id
        public async Task<Product> GetProductById(int id)
        {
            Product product = await db.Products.FindAsync(id);
            if(product != null)
            {
                return product;
            }
            return null;
        }

        public async Task<List<ProductViewModel>> getSimilarProducts(int bid)
        {
           ProductViewModel productViewModel=await(from d in db.Bids
                                              join p in db.Products on d.product.ProductId equals p.ProductId 
                                              where d.BidId==bid
                                              select new ProductViewModel
                                              {
                                                  sellerid=p.seller.Id,
                                                  CategoryId=p.category.CategoryId
                                              }).FirstOrDefaultAsync();
            return await (from b in db.Bids
                          join p in db.Products on b.product.ProductId equals p.ProductId
                       where  (p.seller.Id == productViewModel.sellerid || p.category.CategoryId == productViewModel.CategoryId)
                        && b.BidStartDate <= DateTime.Today && b.BidEndDate >= DateTime.Today
                         && b.BidId!=bid
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

        //for inserting the product
        public async Task<Product> InsertProduct(Product product)
        {
            if(product != null)
            {
                await db.Products.AddAsync(product);
                db.SaveChanges();
                return product;
            }
            return null;
        }
        //for updating the product
        public async Task<int> UpdateProduct(Product product)
        {
            if (product != null)
            {
                db.Products.Update(product);
              await  db.SaveChangesAsync();
                return product.ProductId;
            }
            return -1;
        }
    }
}
