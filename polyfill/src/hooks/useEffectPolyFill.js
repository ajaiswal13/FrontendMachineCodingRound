import { useRef } from "react"

const useEffectPolyFill = (cb,dependency) => {
    
    const isFirstRender = useRef(true);
    const prevDependency = useRef([]);
    if (isFirstRender.current) {
        cb();
        isFirstRender.current = false;
        return;
    }

    const isDependencyChanged = dependency ? JSON.stringify(prevDependency.current) !== JSON.stringify(dependency) : true;
       
    if (isDependencyChanged) {
        const callback = cb();

        // The following if block is not exactly correct as it calls the callback function after
        // cb function but in real world callback function returned from cb is called before cb
        // to clean the variables etc. But this will work from interview perspective
        if (callback && typeof callback=='function' && dependency) {
            callback();
        }
    }

    prevDependency.current = dependency || [];
}

export default useEffectPolyFill;