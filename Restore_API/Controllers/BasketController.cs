using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Restore_API.Data;
using Restore_API.DTO;
using Restore_API.Models;

namespace Restore_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BasketController : ControllerBase
    {
        private readonly ApplicationDbContext _dbContext;

        public BasketController(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet]
        public async Task<ActionResult<BasketDto>> GetBasket()
            {
            var basket = await RetreiveBasket();
            if (basket == null) return NotFound();
            return new BasketDto
            {
                Id = basket.Id,
                BuyerId = basket.BuyerId,
                Items = basket.Items.Select(item=>new BasketItemDto
                {
                    ProductId= item.ProductId,
                    Name = item.Product.Name,
                    Price = item.Product.Price,
                    PictureUrl = item.Product.PictureUrl,
                    Type = item.Product.Type,
                    Brand = item.Product.Brand,
                    Quantity = item.Quantity
                }).ToList()

            };
        }


        [HttpPost]
        public async Task<ActionResult> AddItemToBasket(int productId, int quantity)
        {   
            var basket = await RetreiveBasket();

            if (basket == null) basket = CreateBasket();

            var product = await _dbContext.Products.FindAsync(productId);

            if (product == null) return NotFound();

            basket.AddItem(product, quantity);

            var result  = await _dbContext.SaveChangesAsync()>0;

            if (result) return StatusCode(201);

            return BadRequest(new ProblemDetails { Title = "Problem Saving Item To Basket" });
        }   


        [HttpDelete]
        public async Task<ActionResult> RemoveBasketItem(int productId,int quantity)
        {
            var basket = await RetreiveBasket();
            if (basket == null) return NotFound();  
            basket.RemoveItem(productId, quantity);
            var result = await _dbContext.SaveChangesAsync()>0;
            if (result) return Ok();
            return BadRequest(
                new ProblemDetails
                {
                    Title = "Problem removing item from the basket"
                });
        }

        private async Task<Basket> RetreiveBasket()
        {
            return await _dbContext.Baskets
                .Include(i => i.Items)
                .ThenInclude(p => p.Product)
                .FirstOrDefaultAsync(x => x.BuyerId == Request.Cookies["buyerId"]);
        }
        private Basket CreateBasket()
        {
            var buyerId = Guid.NewGuid().ToString();
            var coockieOptions = new CookieOptions { IsEssential= true,Expires=DateTime.Now.AddDays(30)};
            Response.Cookies.Append("buyerId",buyerId, coockieOptions);
            var basket = new Basket { BuyerId = buyerId };
            _dbContext.Baskets.Add(basket);
            return basket;
        }


    }
}
