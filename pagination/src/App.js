import { useState ,useEffect} from "react";

function App() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  
  const fetchData = async () => {
    // For frontend pagination
    // const response = await fetch('https://dummyjson.com/products?limit=100');

    // For backend pagination
    const response = await fetch(`https://dummyjson.com/products?limit=10&skip=${page*10-10}`);
    const data = await response.json();
    setProducts(data.products);
    setTotalPages(data.total / 10);
  }
  useEffect(() => {
    fetchData(); 
  }, [page])
  
  const handleSelectedPage = (selectedPage) => {
    setPage(selectedPage);
  }
  if (products.length===0) {
    return <div>Sorry not enough products available</div>
  }
  return (
    <div className="app">
    <div className="product-list">
      {
        products.map((product) => {
          return (
            <div className="product" key={product.id}>
              <img src={product.thumbnail} alt={product.title} />
              <span>{ product.title}</span>
            </div>
          )
        })
      }
      </div>
      <div className="pagination">
        <span
        className={page > 1 ? '' : 'disabled-btn'}
        onClick={() => {
          handleSelectedPage(page-1)
        }}>◀️</span>
        {[...Array(totalPages)].map((_, i) => {
          return <span key={i + 1}
            className={page==i+1 ? 'selected-page':''}
            onClick={() => {
            handleSelectedPage(i+1);
          }}>{i + 1}</span>
         }) 
        }
        <span
          className={page < totalPages ? '' : 'disabled-btn'}
          onClick={() => {
          handleSelectedPage(page+1)
        }}>▶️</span>
      </div>
    </div>
  )
}

export default App;
