import {useState,useEffect} from "react"

const useWindowSize = () =>{
    const [size,setSize] = useState({
        width: window.innerWidth,
        hight: window.innerHeight
    })

    useEffect(()=>{
        function handleResize () {
            setSize({
                width: window.innerWidth,
                hight: window.innerHeight
            })
        }

        window.addEventListener("resize",handleResize)

        return ()=> window.removeEventListener('resize',handleResize)

    },[])

    return size
}

export default useWindowSize