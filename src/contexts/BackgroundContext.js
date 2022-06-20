import React, { createContext, useState } from 'react'


export const BackgroundContext = createContext();

export const BackgroundProvider=props=>{
    const [background,setBackground]=useState('img-home.jpg');
    return(
        <BackgroundContext.Provider value={[background,setBackground]}>
            {props.children}
        </BackgroundContext.Provider>
    )
    
}


