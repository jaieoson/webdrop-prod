import React, { useState, useContext, useEffect } from 'react';
import { useCart } from '../context/CartContext';

import Bgcart from "../../public/cart.png";
import Link from 'next/link';
import Image from 'next/image';
import PageCart from "./Cart";
//import "../styles/deslizaCart.css"

import cart from "../pages/cart";


const Cart = () => {

  const [itemsCount, setItem] = React.useState(0);
  const cart = useCart();
  const obj = cart.cart;
  const [isOpen, setIsOpen] = useState(0);

  if (obj !== null && typeof obj === 'object') {
    // Faça operações com myVariable
    const count = Object.keys(obj).length;

    useEffect(()=>{
      setItem(count);
    }, [count])
  
  }


  const toggleDiv = () => {
    setIsOpen(1);
  };
  const toggleDiv2 = () => {
    setIsOpen(0);
  };

  

return (

  <div>
   
   <div className={`sliding-div ${isOpen ? 'open' : ''}`}>
    <button onClick={toggleDiv2} className="toggle-button">
        X
      </button>


 <PageCart/>



    </div>


    <button onClick={toggleDiv} className="toggle-button flex justify-between items-center p-4  rounded-lg shadow-md">
       
      <Image src={Bgcart} width={70} style={{ position: "absolute", zIndex: "0" }} alt="Carrinho de compras" />
        <div style={{zIndex: "1", marginLeft: "30px", marginTop: "-17px"}} className="mr-4 font-bold  ">          
        {itemsCount > 0 && itemsCount }      
      </div>
    
      </button>
      
      

    <div>
    
    
    </div>
    
    

</div>
);
};

export default Cart;