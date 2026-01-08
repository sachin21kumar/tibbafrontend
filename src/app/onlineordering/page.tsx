import { Metadata } from "next";
import MenuPage from "../components/products/getAllProducts";
export const metadata: Metadata = {
  title: "Shop - Tibba Restaurant",
//   description:
//     "Tibba Restaurant Welcome to Tibba Restaurant, where authentic Yemeni flavors thrive. Enjoy a memorable dining experience and explore our menu. Our Menu Free Delivery on Order Over $59",
};
export default function index(){
    return(
        <MenuPage/>
    )
}