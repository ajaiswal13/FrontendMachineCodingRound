import { useState } from "react";

const OtpInput = ({ length = 4, handleOtpSubmit = () => { } }) => {
    const [otp, setOtp] = useState(new Array(4).fill(""));
    return (
        <div>
            {otp.map((value, index) => {
                return (
                    <input type="text"
                        className="otpInput"
                        key={index}
                    />
            )
           })} 
       </div>
       
    )
}

export default OtpInput;