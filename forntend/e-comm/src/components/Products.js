import React, { useEffect, useState } from "react";
import "./Products.css"; // Import CSS for styling

const Products = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch("http://localhost:9002/products") // Use correct port
            .then((res) => res.json())
            .then((data) => setProducts(data))
            .catch((err) => console.error("Error fetching products:", err));
    }, []);

    return (
        <div className="products-container">
            <h2>🛒 Available Products</h2>
            <div className="products-grid">
                {products.map((product) => (
                    <div key={product.id} className="product-card">
                        <h3>{product.name}</h3>
                        <p>{product.description}</p>
                        <p className="price">${product.price}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Products;
