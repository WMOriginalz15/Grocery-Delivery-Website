import { MdStorefront, MdLocalDrink, MdBakeryDining, MdCleaningServices } from "react-icons/md";
import { GiFishCooked, GiGrain, GiFruitBowl } from "react-icons/gi";

export const categories = [
  {
    label: "All",
    icon: MdStorefront,
  },
  {
    label: "Fresh Fruits",
    icon: GiFruitBowl,
  },
  {
    label: "Cereal & Tubers",
    icon: GiGrain,
  },
  {
    label: "Meat & Fish",
    icon: GiFishCooked,
  },
  {
    label: "Beverages",
    icon: MdLocalDrink,
  },
  {
    label: "Snacks & Bakery",
    icon: MdBakeryDining,
  },
  {
    label: "Household & Personal Care",
    icon: MdCleaningServices,
  },
];
