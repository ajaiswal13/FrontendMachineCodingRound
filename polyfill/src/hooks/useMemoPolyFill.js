import { useEffect, useRef } from "react";

const areEqual = (prevDependency,newDependency) => {
    if (prevDependency === null) return false;
    if (prevDependency.length !== newDependency.length) return false;
    for (let i = 0; i < prevDependency.length; i++){
        if (prevDependency[i] !== newDependency[i]) {
            return false;
        }
    }
    return true;
}

const useMemoPolyFill = (cb,dependency) => {

    const memoisedValue = useRef(null);

    //Checking the change in dependency
    if (!memoisedValue.current || !areEqual(memoisedValue.current.dependency, dependency)) {
        memoisedValue.current = {
            value: cb(),
            dependency
        }
    }

    //Cleaning the cached value in useMemo
    useEffect(() => {
        return () => {
            memoisedValue.current = null;
        }
    },[])

    //Returning the final value or cached value is dependency doesn't change
    return memoisedValue.current.value;
}

export default useMemoPolyFill;