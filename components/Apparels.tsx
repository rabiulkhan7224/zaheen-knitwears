import { ShoppingCart } from "lucide-react";
import { Button } from "./ui/button";

const products = [
    {
        id: 1,
        name: "Organic Cotton T-Shirt",
        description: "A comfortable and eco-friendly organic cotton t-shirt.",
        price: 29.99,

        image: "/product-1.png",
    },
    {   
        id: 2,

        name: "Recycled Polyester Jacket",
        description: "A stylish jacket made from recycled polyester materials.",
        price: 79.99,
        image: "/man.jpg",    
    },
    {
        id: 3,      
        name: "Bamboo Fiber Socks",
        description: "Soft and breathable socks made from bamboo fibers.",
        price: 9.99,

        image: "/sport.png",
    },
    {
        id: 4,
        name: "Hemp Canvas Backpack",
        description: "Durable backpack crafted from hemp canvas for everyday use.",


        price: 49.99,
        image: "netwear.jpg",
    },
];
const Apparels = () => {

    return (
        <div>
            <h1 className="text-2xl font-bold">Our Apparels</h1>
            {/* products */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
                {/*  Product Card */}
                {
                                    products.map((product) => (
                                        <div key={product.id}  className="border rounded-lg p-4 shadow hover:shadow-lg transition-shadow">
                    <img src={product.image} alt="Product Image" className="w-full h-48 object-cover mb-4 rounded" />
                    <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
                    <p className="text-gray-600 mb-4">{product.description}</p>
                    <span className="text-primary font-bold">${product.price}</span>
                    {/* add to cart and buy now button */}
                    <div className="mt-4 flex space-x-2">
                        <Button className="bg-secondary/30 text-secondary px-4 py-2 rounded hover:bg-primary-dark transition">
                            
                            <ShoppingCart className="mr-2" />
                            Add to Cart</Button>
                        <Button className="bg-secondary text-white px-4 py-2 rounded hover:bg-secondary-dark transition">Buy Now</Button>
                    </div></div> 
                    ))
                }
                 
                {/* Repeat similar product cards as needed */}
            </div>
            
        </div>
    );
};

export default Apparels;