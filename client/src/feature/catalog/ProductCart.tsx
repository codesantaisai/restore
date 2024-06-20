import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Typography } from "@mui/material"
import { Product } from "../../app/layout/model/product"
import { Link } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import { currencyFormat } from "../../app/utils/utils";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { addBasketItemAsync } from "../basket/basketSlice";

interface Props{
    product:Product;
}
const ProductCart = ({product}:Props) => {
  const {status} = useAppSelector(state=>state.basket);
  const dispatch = useAppDispatch();
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
         {currencyFormat(product.price)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.brand} / {product.type}
        </Typography>
      </CardContent>
      <CardActions>
        <LoadingButton loading={status.includes("pending"+product.id)} size="small" onClick={()=>dispatch(addBasketItemAsync({productId:product.id}))}>Add to Cart</LoadingButton>
        <Button component={Link} to={`/catalog/${product.id}`} size="small">View</Button>
      </CardActions>
    </Card>
  )
}

export default ProductCart