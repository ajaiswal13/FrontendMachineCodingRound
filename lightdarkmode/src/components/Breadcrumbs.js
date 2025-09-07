import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

const Breadcrumbs = () => {
    const {pathname} = useLocation();
    const paths = pathname.split('/').filter((x) => x);
    let breadcrumb = '';
   
    //I was returning the return statement inside paths.map condition because of these stupid speakers
    // blasting on my ear - Make sure not to do the same mistake again
    //Check the whole return block once again
    return (
        <div className="breadcrumbs">
            <Link to='/'>Home</Link>
            {
                paths.map((name,index) => {
                    breadcrumb = breadcrumb + `/${name}`;
                    const lastIndex = index === paths.length - 1;
                    return(
                        lastIndex ? <span>/{name}</span> : 
                            <span>/<Link to={breadcrumb}>{name}</Link></span>
                    )
                })
            }
        </div>
    )
}

export default Breadcrumbs;