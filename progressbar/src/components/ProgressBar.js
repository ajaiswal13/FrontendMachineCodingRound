import { useState, useEffect } from "react";
import { MAX_VALUE, MIN_VALUE } from "../utils/constants";
const ProgressBar = ({ value, handleComplete }) => {
    const [percent, setPercent] = useState(value);

    useEffect(() => {
        setPercent(Math.min(MAX_VALUE, Math.max(value, MIN_VALUE))) 
        if (value>=MAX_VALUE) {
            handleComplete();
        }
    },[value])
   
    return (
        <div className="progressbar">
            <span style={{color:`${percent >49 ? 'white' : ''}`}}>{percent.toFixed()}%</span>
            <div style={{ width: `${percent}%` }}
                role="progressbar" aria-valuemin={MIN_VALUE}
                aria-valuemax={MAX_VALUE} aria-valuenow={percent.toFixed()} />
        </div>
    )
}

export default ProgressBar;