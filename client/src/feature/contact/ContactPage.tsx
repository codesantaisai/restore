import { Typography } from "@mui/material"
import axios, { AxiosResponse } from "axios"
import { useEffect } from "react"

const ContactPage = () => {


  useEffect(()=>{
    axios.get('http://localhost:5207/api/Basket')
    .then((response: AxiosResponse) => {
      // Handle the response data
      console.log(response.data);
    })
    .catch((error) => {
      // Handle any errors
      console.error(error);
    });
  },[])
  return (
    <Typography variant="h2" sx={{mt:10}}>
        ContactPage
    </Typography>
  )
}

export default ContactPage