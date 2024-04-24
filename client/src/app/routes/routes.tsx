import { createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import HomePage from "../../feature/home/HomePage";
import Catalog from "../../feature/catalog/Catalog";
import ProductDetails from "../../feature/catalog/ProductDetails";
import AboutPage from "../../feature/about/AboutPage";
import ContactPage from "../../feature/contact/ContactPage";
import BasketPage from "../../feature/basket/BasketPage";
import CheckoutPage  from "../../feature/checkout/CheckoutPage";

export const router  = createBrowserRouter([
    {
        path:'/',
        
        element:<App/>,
        children:[
            {path:" ",element:<HomePage/>},
            {path:"catalog",element:<Catalog/>},
            {path:"catalog/:id",element:<ProductDetails/>},
            {path:"about",element:<AboutPage/>},
            {path:"contact",element:<ContactPage/>},
            {path:"",element:<HomePage/>},
            {path:"basket",element:<BasketPage/>},
            {path:"checkout",element:<CheckoutPage/>},
        ]
    }
]);