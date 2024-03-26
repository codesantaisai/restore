
import { useEffect, useState } from "react";
import { Product } from "../../app/layout/model/product"
import ProductList from "./ProductList";


const Catalog = () => {
  const [products,setProducts] = useState<Product[]>([])

  useEffect(()=>{
    fetch("https://localhost:7257/api/Product")
    .then(response=>response.json())
    .then(data=>setProducts(data))
  },[]);
  
  return (
    <div>
        <ProductList products={products}/>
    </div>
  )
}

export default Catalog