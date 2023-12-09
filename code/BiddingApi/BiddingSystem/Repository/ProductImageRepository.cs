using BiddingSystem.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace BiddingSystem.Repository
{
    public class ProductImageRepository : IProductImageRepository
    {
        private readonly BiddingDbContext db;
        //to get reference of dbcontext class
        public ProductImageRepository(BiddingDbContext dbContext)
        {
            this.db = dbContext;
        }
        //to add images of a product to the productimage 
        public async Task<int> AddProductImage(ProductImage productImage)
        {
            await db.ProductImages.AddAsync(productImage);
            db.SaveChanges();
            return productImage.ImageId;
        }
        //to get the images of the product using productid
        public async Task<List<string>> getProductImages(int pid)
        {
           List<string> images = await (from i in db.ProductImages where i.product.ProductId==pid select i.ImageUrl).ToListAsync();
            return images;
        }
    }
}
