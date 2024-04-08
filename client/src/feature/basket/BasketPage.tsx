import { useEffect, useState } from "react"
import { Basket } from "../../app/Model/basket";
import agent from "../../app/api/agent";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { Typography } from "@mui/material";

function BasketPage() {
    const [loading, setIsLoading] = useState(true);
    const [basket, setBasket] = useState<Basket|null>(null);

    useEffect(()=>{
        agent.Basket.get()
        .then(basket=>setBasket(basket))
        .catch(error=>console.log(error)) 
        .finally(()=>setIsLoading(false))
    },[])

    if(loading) return <LoadingComponent message="Loading Basket"/>
    if(!basket) return <Typography variant="h3">Your Basket Is Empty</Typography>
  return (
    <h1>Buyer Id = {basket.buyerId}</h1>
  )
}

export default BasketPage