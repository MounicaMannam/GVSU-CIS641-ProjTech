using BiddingSystem.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BiddingSystem.Repository
{
    public interface IProductImageRepository
    {
        public Task<int> AddProductImage(ProductImage productImage);
        public Task<List<string>> getProductImages(int pid);
    }
}
