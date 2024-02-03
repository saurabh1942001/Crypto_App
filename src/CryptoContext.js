import React, { createContext, useEffect, useState } from 'react'


export const Crypto = createContext()

const CryptoContext = ({children}) => {

    const [curreny, setCurreny] = useState("INR")
    const [symbol, setSymbol] = useState("₹")

    useEffect(()=>{
        if(curreny === "INR"){
            setSymbol("₹")
        }
        else if(curreny === "USD"){
            setSymbol("$")
        }
    },[curreny])
  return (
    <Crypto.Provider value={{curreny, setCurreny, symbol, setSymbol}}>
        {children}
    </Crypto.Provider>
  )
}

export default CryptoContext