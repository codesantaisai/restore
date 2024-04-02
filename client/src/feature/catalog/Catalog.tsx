
import { useEffect, useState } from "react";
import { Product } from "../../app/layout/model/product"
import ProductList from "./ProductList";
import agent from "../../app/api/agent";
import LoadingComponent from "../../app/layout/LoadingComponent";


const Catalog = () => {
  const [products,setProducts] = useState<Product[]>([]);
  const [loading,setLoading] = useState(true);

  useEffect(()=>{
    agent.Catalog.list()
    .then(products=>setProducts(products))
    .catch(error=>console.log(error))
    .finally(()=>setLoading(false))
  },[]);
  
  if(loading) return <LoadingComponent message="Loading Products"/>
  return (
    <div>
        <ProductList products={products}/>
    </div>
  )
}

export default Catalog