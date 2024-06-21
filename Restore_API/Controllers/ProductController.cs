using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Restore_API.Data;
using Restore_API.Extentions;
using Restore_API.Models;

namespace Restore_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly ApplicationDbContext _dbContext;
        public ProductController(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [ProducesResponseType(StatusCodes.Status200OK)]
        [HttpGet]
        public async Task<ActionResult<List<Product>>> GetProducts(string orderBy)
        {
            var query = _dbContext.Products.Sort(orderBy).AsQueryable();

            
            return await query.ToListAsync();
        }

        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [HttpGet]
        [Route("{id}")]

        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            var products =await  _dbContext.Products.FindAsync(id);
            if (products == null)return NotFound();
            

            return Ok(products);
        }

    }
}
