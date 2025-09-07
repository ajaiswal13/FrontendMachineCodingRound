import { useMemo, useState } from "react";
import useMemoPolyFill from "../hooks/useMemoPolyFill";

const CounterWithSquare = () => {
    const [counter1, setCounter1] = useState(0);
    const [counter2, setCounter2] = useState(10);
    
    const squareFunction = () => {
        console.log('Expensive function getting called');
        return counter1 * counter1;
    }

    const memoisedValue = useMemoPolyFill(squareFunction, []);

    return (
        <div style={{ display: 'flex',flexDirection:'column' ,gap:'10px',justifyContent:'center',alignItems:'center',marginTop:'40px'}}>
            <span>Counter1: {counter1}</span>
            <span>Squared counter value: { memoisedValue}</span>
            <button onClick={() => {
                setCounter1((prevCount) => prevCount + 1);
            }}>Increment Counter1</button>

            <span>Counter2: {counter2}</span>
            <button onClick={() => {
                setCounter2((prevCount) => prevCount - 1);
            }}>Decrement Counter2</button>
        </div>
    )
}

export default CounterWithSquare;