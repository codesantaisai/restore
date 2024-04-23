
import { Box, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { Add, Delete, Remove } from "@mui/icons-material";
import { useStoreContext } from "../../context/StoreContext";
import { useState } from "react";
import agent from "../../app/api/agent";
import { LoadingButton } from "@mui/lab";

function BasketPage() {
    const {basket,setBasket,removeItem} = useStoreContext();
    const [isLoading,setIsLoading] = useState(false);

    function handleAddItem(productId:number){
        setIsLoading(true);
        agent.Basket.addItem(productId)
        .then(basket=>setBasket(basket))
        .catch(error=>console.log(error))
        .finally(()=>setIsLoading(false))
    }

    function handleRemoveItem(productId:number, quantity=1){
      setIsLoading(true);
      agent.Basket.removeItem(productId,quantity)
      .then(()=>removeItem(productId, quantity))
      .catch(error=>console.log(error))
      .finally(()=>setIsLoading(false))
    }
    if(!basket) return <Typography variant="h3">Your Basket Is Empty</Typography>
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell>Product</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="center">Quantity</TableCell>
            <TableCell align="right">Subtotal</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {basket.items.map((item) => (
            <TableRow
              key={item.productId}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <Box display="flex" alignItems="center">
                  <img src={item.pictureUrl} alt={item.name} style={{height:50, marginRight:20}}/>
                  <span>{item.name}</span>
                </Box>
              </TableCell>
              <TableCell align="right">${(item.price/100).toFixed(2)}</TableCell>
              <TableCell align="center">
                <LoadingButton loading={isLoading} onClick={()=>handleRemoveItem(item.productId)} color="error">
                  <Remove/>
                </LoadingButton>
                {item.quantity}
                <LoadingButton loading={isLoading} onClick={()=>handleAddItem(item.productId)} color="secondary">
                  <Add/>
                </LoadingButton>
              </TableCell>
              <TableCell align="right">${((item.price/100)*item.quantity).toFixed(2)}</TableCell>
              <TableCell align="right">
                <LoadingButton loading={isLoading} onClick={()=>handleRemoveItem(item.productId,item.quantity)} color="error">
                  <Delete/>
                </LoadingButton >
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default BasketPage