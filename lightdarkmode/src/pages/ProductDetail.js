import { useParams } from "react-router-dom";
import { useEffect , useState} from "react";

const ProductDetail = () => {

    const { id } = useParams();
    const [detail,setDetail] = useState();
    
    useEffect(() => {
        getProductDetail();
    },[]);

    const getProductDetail = async () => {
        const response = await fetch(`https://dummyjson.com/products/${id}`)
        const data = await response.json();
        setDetail(data);
    }

    return (
        <div className="product-detail">
            <img src={detail?.thumbnail} alt={detail?.title}></img>
            <div style={{display:'flex', flexDirection:'column', gap:'10px'}}>
                <span>{detail?.title}</span>
                <span>{detail?.price}</span>
                <p>{detail?.description}</p>
            </div>
      </div>
  )
}

export default ProductDetail;