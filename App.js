import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const mockProducts = [
  { _id: "1", name: "Mock Product 1", description: "A sample product", price: 19.99 },
  { _id: "2", name: "Mock Product 2", description: "Another item", price: 29.99 },
  { _id: "3", name: "Mock Product 3", description: "Great value", price: 9.99 }
];

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(mockProducts);
  }, []);

  const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push({ ...product, quantity: 1 });
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Added to cart");
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Welcome to ShopNow</h1>
      <p className="mb-6">Browse featured products below</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map((product) => (
          <Card key={product._id}>
            <CardContent>
              <h2 className="text-xl font-semibold">{product.name}</h2>
              <p className="text-sm text-gray-500">{product.description}</p>
              <p className="text-md font-bold mb-2">${product.price}</p>
              <Button onClick={() => addToCart(product)}>Add to Cart</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function Cart() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(cart);
  }, []);

  const handleCheckout = () => {
    alert("Mock checkout complete!");
    localStorage.removeItem("cart");
    setCartItems([]);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <>
          <ul className="mb-4">
            {cartItems.map((item, idx) => (
              <li key={idx} className="mb-2">
                {item.name} x {item.quantity} - ${item.price}
              </li>
            ))}
          </ul>
          <Button onClick={handleCheckout}>Checkout</Button>
        </>
      )}
    </div>
  );
}

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === "test@example.com" && password === "password") {
      localStorage.setItem("token", "mock-token");
      navigate("/");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <Button type="submit" className="w-full">
          Login
        </Button>
      </form>
    </div>
  );
}

function Navbar() {
  return (
    <nav className="bg-white shadow p-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold">
        ShopNow
      </Link>
      <div className="space-x-4">
        <Link to="/" className="hover:underline">
          Home
        </Link>
        <Link to="/cart" className="hover:underline">
          Cart
        </Link>
        <Link to="/login" className="hover:underline">
          Login
        </Link>
      </div>
    </nav>
  );
}

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}
