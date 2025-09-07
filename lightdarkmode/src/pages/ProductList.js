import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ProductList = () => {
    
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        const response = await fetch('https://dummyjson.com/products');
        const data = await response.json();
        setProducts(data?.products);
    }
    return (
        <div className="productList">
            {
                products?.map((product) => {
                    return (
                         <Link to={`/products/${product.id}`}  key={product.id}>
                            <div className="products">
                              <img src={product.thumbnail} alt={product.title} />
                              <span>{ product.title}</span>
                            </div>
                        </Link>
                    )
                })
            }
        </div>
    )
}

export default ProductList;