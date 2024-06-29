import { Grid } from "@mui/material"
import { Product } from "../../app/layout/model/product";
import ProductCart from "./ProductCart";

interface Props{
    products:Product[]; 
}

const ProductList = ({products}:Props) => {
  return (
<Grid container spacing={4}>
      {products.map((product)=>(
        <Grid item xs={4} sm={6} md={4}  key={product.id}>
          <ProductCart  product={product}/>
        </Grid>
      ))}
</Grid>
  )
}

export default ProductList