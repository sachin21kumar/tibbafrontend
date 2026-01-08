import { Metadata } from "next";
import { Gallery } from "../components/gallery/Gallery";
export const metadata: Metadata = {
  title: "Gallery - Tibba Restaurant",
//   description:
//     "Tibba Restaurant Welcome to Tibba Restaurant, where authentic Yemeni flavors thrive. Enjoy a memorable dining experience and explore our menu. Our Menu Free Delivery on Order Over $59",
};
export default function index(){
    return(
        <Gallery/>
    )
}