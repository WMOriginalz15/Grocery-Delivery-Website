import Link from "next/link";
import Container from "../Container";
import FooterList from "./FooterList";
import { MdFacebook } from "react-icons/md";
import {
  AiFillTwitterCircle,
  AiFillInstagram,
  AiFillYoutube,
} from "react-icons/ai";
import { categories } from "@/utils/Categories";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-green-700 to-green-900 text-green-100 border-t-4 border-green-400 shadow-inner mt-16">
      <Container>
        <div className="flex flex-col md:flex-row justify-between pt-16 pb-8">
          <FooterList>
            <h3 className="text-base font-bold mb-2 text-green-200">Store Categories</h3>
            {categories.map((item) => (
              <Link
                key={item.label}
                href={item.label === "All" ? "/" : `/?category=${encodeURIComponent(item.label)}`}
                className="hover:text-green-300 transition"
              >
                {item.label}
              </Link>
            ))}
          </FooterList>
          <FooterList>
            <h3 className="text-base font-bold mb-2 text-green-200">Customer Service</h3>
            <Link href="#" className="hover:text-green-300 transition">Contact Us</Link>
          </FooterList>
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className="text-base font-bold mb-2 text-green-200">About Us</h3>
            <p className="mb-2">
            At our online grocery store, we are committed to providing fresh, high-quality groceries and household essentials at affordable prices. Our mission is to make your shopping experience convenient, reliable, and enjoyable. 
            </p>
            <p className="text-green-300">&copy; {new Date().getFullYear()} Grocery Store. All rights reserved</p>
          </div>
          <FooterList>
            <h3 className="text-base font-bold mb-2 text-green-200">Follow Us</h3>
            <div className="flex gap-2">
              <Link href="#" className="hover:text-green-300 transition">
                <MdFacebook size={24} />
              </Link>
              <Link href="#" className="hover:text-green-300 transition">
                <AiFillTwitterCircle size={24} />
              </Link>
              <Link href="#" className="hover:text-green-300 transition">
                <AiFillInstagram size={24} />
              </Link>
              <Link href="#" className="hover:text-green-300 transition">
                <AiFillYoutube size={24} />
              </Link>
            </div>
          </FooterList>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
