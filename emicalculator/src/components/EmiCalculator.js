import { useState, useEffect } from "react";
import { tenureData } from "../utils/tenuredata";
import { currencyFormatter } from "../utils/currencyFormatter";

const EmiCalculator = () => {

    const [cost, setCost] = useState(0);
    const [interestRate, setInterestRate] = useState(10);
    const [fee, setFee] = useState(1);
    const [downPayment, setDownPayment] = useState(0);
    const [emi, setEMI] = useState(0);
    const [tenure, setTenure] = useState(12);

    useEffect(() => {
        //When the component is rendered for the first time,cost is 0
        if (cost === 0) {
            setDownPayment(0);
            setEMI(0);
        }

        //Calculate EMI on tenure change
        const emiValue = calculateEMI(downPayment);
        setEMI(emiValue);
    },[tenure])

    const updateEMI = (e) => {
        //If there is not change in cost, don't do anything
        if (!cost) return;

        //Update the state variable with the target value
        const downPaymentValue = Number(e.target.value);
        setDownPayment(downPaymentValue.toFixed(0));

        //Update EMI on the basis of the down payment
        const emiValue = calculateEMI(downPaymentValue);
        setEMI(emiValue);
    }

    const updateDownPayment = (e) => {
        if (!cost) return;

        //Update the state variable with the target value
        const emiValue = Number(e.target.value);
        setEMI(emiValue.toFixed(0));

        //Update down payment on the basis of the EMI
        const downPaymentValue = calculateDownPayment(emiValue);
        setDownPayment(downPaymentValue);
    }

    const calculateEMI = (downPaymentValue) => {
        if (!cost) return;

        //EMI amount = [P x R x (1+R)^N]/[(1+R)^N-1]
        const principal = cost - downPaymentValue;
        const rate = interestRate / 100;
        const numOfYears = tenure / 12;

        const yearlyEMI = [principal * rate * (1 + rate) ** numOfYears] /
            [(1 + rate) ** numOfYears - 1];
        
        return Number(yearlyEMI/12).toFixed(0);
    }

    const totalDownPayment = () => {
        const amount = downPayment + (cost - downPayment) * (fee / 100);
        return Number(amount).toFixed(0);
    }

    const totalEMI = () => {
        const amount = emi * tenure;
        return Number(amount).toFixed(0);
    }

    const calculateDownPayment = (emiValue) => {
        if (!cost) return;

        const downPaymentPercent = 100 - (emiValue / calculateEMI(0));
        const downPaymentValue = (downPaymentPercent / 100) * cost;
        return Number(downPaymentValue).toFixed(0);
    }

    return (
        <div class="emicalculator">
            <span>EMI Calculator</span>
            <span>Total cost</span>
            <input type="number"
                placeholder="Totol cost"
                value={cost}
                onChange={(e) => setCost(e.target.value)} />
            <span>Interest Rate (%)</span>
            <input type="number"
                placeholder="Interest Rate"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)} />
            <span>Processing Fee (%)</span>
            <input type="number"
                placeholder="Processing Fee"
                value={fee}
                onChange={(e) => setFee(e.target.value)} />
            <span>Down Payment (%)</span>
            <span>Total down payment - {currencyFormatter(totalDownPayment()) }</span>
            <div>
                <input type="range"
                min={0}
                max={cost}
                onChange={updateEMI}
                value={downPayment}
                className="slider"
                />
                <div className="labels">
                    <span>0%</span>
                    <span>{currencyFormatter(downPayment)}</span>
                    <span>100%</span>
                </div>
            </div>
           
            <span>EMI</span>
            <span>Total EMI - { currencyFormatter(totalEMI())}</span>
            <div>
                <input type="range"
                min={calculateEMI(cost)}
                max={calculateEMI(0)}
                onChange={updateDownPayment}
                value={emi}
                className="slider"
                />
                <div className="labels">
                    <span>{currencyFormatter(calculateEMI(cost))}</span>
                    <span>{currencyFormatter(emi)}</span>
                    <span>{currencyFormatter(calculateEMI(0))}</span>
                </div>
            </div>
            
            <span>Tenure</span>
            <div className="tenure-btns">
                {tenureData.map((t) => {
                    return <button onClick={() => setTenure(t)}>{t}</button>
               })}
            </div>
        </div>
    )
}

export default EmiCalculator;