namespace Restore_API.Models
{
    public class Basket
    {
        public int Id { get; set; }
        public string BuyerId { get; set; }
        public List<BasketItem> Items { get; set; } = new();


        public void AddItem(Product product,int quantity)
        {
            if(Items.All(item=>item.ProductId != product.Id))
            {
                Items.Add(new BasketItem { Product=product,Quantity=quantity});
            }
            var existingItem = Items.FirstOrDefault(item=>item.ProductId == product.Id);
            if (existingItem != null) existingItem.Quantity += quantity;
        }

        public void RemoveItem(int productId, int quantity)
        {
            //getting Exact item of the basket
            var item = Items.FirstOrDefault(item=>item.ProductId == productId);
            //if there is no item return nothing
            if (item == null) return;
            //if there is item ,add the qty to the item Qty comes from req
            item.Quantity -= quantity;
            //if there is 1 Qty when click remove func remove the Product from basket
            if (item.Quantity == 0) Items.Remove(item);

        }
    }
}
