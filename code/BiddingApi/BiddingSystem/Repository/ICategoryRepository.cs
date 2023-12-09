using BiddingSystem.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BiddingSystem.Repository
{
    public interface ICategoryRepository
    {
        public Task<int> InsertCategory(Category category);
        public Task<Category> GetCategoryById(int id);
        public Task<List<Category>> GetAllCategories();
    }
}
