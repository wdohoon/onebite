import {useEffect} from "react";


const Even = () => {
    useEffect(() => {
        // 정리함수, 클린업
        return () => {
            console.log("unmount");
        };
    }, [])

    return (
        <div>짝수입니다.</div>
    )
}

export default Even;