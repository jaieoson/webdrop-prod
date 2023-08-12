import { createContext, useState, useEffect } from 'react';

//import { useSession } from 'react-use-session';
import { useContext } from 'react';

export const CartContext = createContext();



export const CartProvider = ({ children }) => {


// Armazenar os itens do carrinho

  const [total, setTotal] = useState(0);
  const [cart, setCart] = useState([])


     useEffect(() => {

       const cartLocal = window.localStorage.getItem('cart');
  
       if (cartLocal) {
  
        setCart(JSON.parse(cartLocal));
      
       }
  
     }, [])
      


  
  const addToCart = (product) => {

    setCart((old) => {
      let qtd = 0;
      if (old[product.id]) {
        qtd = old[product.id].qtd;
      }
      const newCart = {
        ...old,
        [product.id]: {
          qtd: qtd + 1,
          product,
        }
      }

      window.localStorage.setItem('cart', JSON.stringify(newCart))
      return newCart
    });

     
  }
  

  const removeFromCart = (productId) => {
    setCart(old => {
     const newCart = {}
    Object.keys(old).forEach(id => {
    
    if(id !== productId){
    
        newCart[id] = old[id]
    }
    
    })
    window.localStorage.setItem('cart', JSON.stringify(newCart))
    return newCart
    })
    }

  
    const changeQtd = (productId, newQtd) => {
    
      setCart(old => {
        const newCart = {}
       Object.keys(old).forEach(id => {
        const newProduct = {...old[id]}
       if(id === productId){
       
           newProduct.qtd = newQtd
       }
        newCart[id] = newProduct
       })
       window.localStorage.setItem('cart', JSON.stringify(newCart))
       return newCart
       })

    }
  
  
  
    
    return <CartContext.Provider value={{cart, addToCart, removeFromCart, changeQtd }}>
        
        {children}
    
    </CartContext.Provider>;
};

export const useCart = () => {
  return useContext(CartContext);
  //return cart;
}