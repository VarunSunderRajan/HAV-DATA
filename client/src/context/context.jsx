import { createContext, useState, useEffect } from "react";


export const CannibasContext = createContext()

export const CannibasProvider = ({children}) => {


    const getSalesDataForUser = async (username) => {
        try {

            const url = `http://localhost:3001/api/sales?username=${encodeURIComponent(username)}`;
            console.log('Request URL:', url);

            const response = await fetch(url);



            
          // const response = await fetch(`/api/sales?username=${username}`);
          
          
          if (!response.ok) {
            throw new Error('Failed to fetch sales data');
          }
    
          return response.json();
        } catch (error) {
          console.error('Error fetching sales data:', error);
          throw error; // Rethrow the error to handle it further up the call stack
        }
    };

    return(
        <CannibasContext.Provider
            value={{
                getSalesDataForUser
            }}
        
        >
            {children}
        </CannibasContext.Provider>
    )
}






