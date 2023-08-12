import React, { useState, useContext, useEffect } from 'react';
import { useCart } from '../context/CartContext';

import Bgcart from "../../public/cart.png";
import Link from 'next/link';
import Image from 'next/image';



const Cart = () => {

  const [itemsCount, setItem] = React.useState(0);

  const cart = useCart();

  const obj = cart.cart;

  if (obj !== null && typeof obj === 'object') {
    // Faça operações com myVariable
    const count = Object.keys(obj).length;

    useEffect(()=>{
      setItem(count);
    }, [count])
  
  }




return (

  <div>
   <Link href="/cart" className="flex justify-between items-center p-4  rounded-lg shadow-md">
      

      <Image src={Bgcart} width={70} style={{ position: "absolute", zIndex: "0" }} alt="Carrinho de compras" />
        <div style={{zIndex: "1", marginLeft: "30px", marginTop: "-17px"}} className="mr-4 font-bold  ">          
        {itemsCount > 0 && itemsCount }
      
      </div>


      
      </Link>
</div>
);
};

export default Cart;