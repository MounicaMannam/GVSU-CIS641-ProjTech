using BiddingSystem.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BiddingSystem.Repository
{
    public class CategoryRepository : ICategoryRepository
    {
        //creating data context
        private BiddingDbContext db;
        //Creating Constructor
        public CategoryRepository(BiddingDbContext db)
        {
            this.db = db;
        }
        //for getting all the categories
        public async Task<List<Category>> GetAllCategories()
        {
            List<Category> categories = await db.Categories.ToListAsync();
            if(categories.Count > 0)
            {
                return categories;
            }
            return null;
        }
        //for getting category by id
        public async Task<Category> GetCategoryById(int id)
        {
            Category category = await db.Categories.FindAsync(id);
            if(category != null)
            {
                return category;
            }
            return null;
        }
        //for Inserting the category to db
        public async Task<int> InsertCategory(Category category)
        {
            if(category != null)
            {
               await  db.Categories.AddAsync(category);
               db.SaveChanges();
                return category.CategoryId;
            }
            return -1;
        }
    }
}
