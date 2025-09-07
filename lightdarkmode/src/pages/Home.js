import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Home = () => {
    const [trendingProducts, setTrendingProducts] = useState([]);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        const response = await fetch('https://dummyjson.com/products');
        const data = await response.json();
        setTrendingProducts(data?.products?.slice(0, 8));
    }
    return (
        <>
        <div className="trendingProductList">
            {
                trendingProducts?.map((product) => {
                    return (
                        <Link to={`/products/${product.id}`}  key={product.id}>
                            <div className="trendingProducts">
                              <img src={product.thumbnail} alt={product.title} />
                              <span>{ product.title}</span>
                           </div>
                        </Link>
                    )
                })
            }
            </div>
            <span style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' ,fontSize: '25px'}}>
                <Link to='/products'>View All Products</Link>
            </span>
            </>
    )
}
export default Home;