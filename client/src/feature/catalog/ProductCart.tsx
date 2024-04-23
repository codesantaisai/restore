import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Typography } from "@mui/material"
import { Product } from "../../app/layout/model/product"
import { Link } from "react-router-dom";
import { useState } from "react";
import agent from "../../app/api/agent";
import { LoadingButton } from "@mui/lab";
import { useStoreContext } from "../../context/StoreContext";

interface Props{
    product:Product;
}
const ProductCart = ({product}:Props) => {
  const [isLoading,setIsLoading] = useState(false);
  const {setBasket} = useStoreContext();
  const handleAddItem = (productId:number)=>{
    setIsLoading(true);
    agent.Basket.addItem(productId)
    .then(basket=>setBasket(basket))
    .catch(error=>console.log(error))
    .finally(()=>setIsLoading(false))
  }
  return (
<Card sx={{mt:2}}>
    <CardHeader
    avatar={
        <Avatar sx={{bgcolor:"secondary.main"}}>
            {product.name.charAt(0).toUpperCase()}
        </Avatar>
        }
    title={product.name}
    titleTypographyProps={{
        sx:{fontWeight:"bold",color:"primary.main"}
    }}
/>
      <CardMedia
        sx={{ height: 140,backgroundSize:"contain",bgcolor:"primary.light" }}
        image={product.pictureUrl}
        title={product.name}
      />
      <CardContent>
        <Typography gutterBottom color="secondary" variant="h5" component="div">
          ${(product.price/100).toFixed(2)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.brand} / {product.type}
        </Typography>
      </CardContent>
      <CardActions>
        <LoadingButton loading={isLoading} size="small" onClick={()=>handleAddItem(product.id)}>Add to Cart</LoadingButton>
        <Button component={Link} to={`/catalog/${product.id}`} size="small">View</Button>
      </CardActions>
    </Card>
  )
}

export default ProductCart