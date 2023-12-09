using BiddingSystem.Models;
using BiddingSystem.ViewModel;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BiddingSystem.Repository
{
    public interface IProductRepository
    {
        public Task<Product> InsertProduct(Product product);
        public Task<int> UpdateProduct(Product product);
        public Task<int> DeleteProduct(int id);
        public Task<Product> GetProductById(int id);
        public Task<List<Product>> GetAllProducts();
        Task<List<ProductViewModel>> getSimilarProducts(int bid);
    }
}
