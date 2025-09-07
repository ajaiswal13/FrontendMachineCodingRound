import { useState } from "react";
import OtpInput from "./OtpInput";

const PhoneOtpLogin = () => {
    const [phonenumber, setValue] = useState();
    const [showOtpInput, setShowOtpInput] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const regex = /[^0-9]/g;

        if (phonenumber.length<10 || regex.test(phonenumber)) {
            alert('Invalid phone number');
            return;
        }
        setShowOtpInput(true);
    };

    const handleInputChange = (e) => {
        setValue(e.target.value);
    }

    const handleOtpSubmit = () => {

    }
    return (
        <div className="phone">
            {!showOtpInput ? <form onSubmit={handleSubmit}>
                <input type="text"
                    value={phonenumber}
                    onChange={handleInputChange}
                    placeholder="Enter Phone Number"
                />
                <button type="submit">Submit</button>
            </form> :
                <div>
                    <p>OTP sent to {phonenumber}</p>
                    <OtpInput length={4} handleOtpSubmit={handleOtpSubmit} />
                </div>
            }
        </div>
    )
}

export default PhoneOtpLogin;