using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Restore_API.Data;
using Restore_API.Extentions;
using Restore_API.Models;
using Restore_API.RequestHandler;
using System.Text.Json;

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
        public async Task<ActionResult<PageList<Product>>> GetProducts([FromQuery]ProductParams productParams)
        {
            var query = _dbContext.Products
                .Filter(productParams.Brands, productParams.Types)
                .Search(productParams.SearchTerm)
                .Sort(productParams.OrderBy).AsQueryable();


            var products = await PageList<Product>.ToPagedList(query, productParams.PageNumber, productParams.PageSize);
            Response.AddPaginationHeader(products.MetaData);
            return products;
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
