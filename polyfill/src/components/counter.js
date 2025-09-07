import { useEffect, useState } from "react";
import useEffectPolyFill from "../hooks/useEffectPolyFill";

const Counter = () => {
    const [count, setCount] = useState(0);
    useEffectPolyFill(() => {
        console.log('useEffect called', count)
        
        return () => {
            console.log('Test');
        }
    },[count]);

    return (
        <div style={{ display: 'flex',flexDirection:'column' ,gap:'10px',justifyContent:'center',alignItems:'center',marginTop:'40px'}}>
            <span>Count :{count}</span>
            <button onClick={() => {
                setCount((prevCount) => prevCount + 1);
            }}>Increment Counter</button>
            <button onClick={() => {
                setCount((prevCount) => prevCount - 1);
            }}>Decrement Counter</button>
        </div>
    )
}

export default Counter;