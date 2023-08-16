/* eslint-disable react/no-unescaped-entities */
import React, { useContext, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSession, signIn, signOut } from "next-auth/react"
import { useCart } from '../context/CartContext';
import { FormEvent } from 'react';


// aqui faz um for no cart e a cada produto chama a api cart
 
    
const addCartDb = async (userId, price, qtd, cart) => {
  
  const result = await fetch("http://localhost:3000/api/cart/create", {
    method: "POST",
    body: JSON.stringify({
      userId: userId,
      totalPrice: price,
      qtdTotal: qtd,
      itemsCart : cart,

    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

}

const updateCartDb = async (userId, price, qtd, cart) => {
  
  const result = await fetch("http://localhost:3000/api/cart/update", {
    method: "POST",
    body: JSON.stringify({
      userId: userId,
      totalPrice: price,
      qtdTotal: qtd,
      itemsCart : cart,

    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

}


const PageCart = (props: any) => {

  const [totall, setTotal] = React.useState(0);
  const [prodQtd, setProdQtd] = React.useState(0);
  const [prodId, setProdId] = React.useState([]);
  const [total, setItem] = React.useState(0);
  const cart: any = useCart();

  const userId = 0;
 
  const listItems = [];

  const obj = cart.cart;

  if (obj !== null && typeof obj === 'object') {
   

    const items = Object.keys(obj).map(key => {
      const { product } = obj[key];
      listItems.push(product.id);
 
    })
  }

  const handleRemove = id => () => {
    // código para remover item do carrinho e atualizar o total aqui
    cart.removeFromCart(id)
  };


  // tem que consertar a atualização da quantity do cart
  const changeQtd = (id) => (evt) => {
    cart.changeQtd(id, evt.target.value)
    setProdQtd(evt.target.value);
  }


  const { data: session } = useSession()

  const handleCheckout = async (event: FormEvent) => {
    // pega os dados do cliente e cria um usuário, depois criar um registro do carrinho desde cliente no db
    event.preventDefault();
    if (session) {
      // se tiver logado direciona para Checkout
      // senao direciona para login do cliente
      // se cart fo 0, não existe cart, então add
      if (props.user.carts.length === 0) {
        addCartDb(userId, totall, prodQtd, listItems);
        window.location.href = "/checkout";
      } else {
        // vai atualizar o cart com status STARTED
        // alert(props.user.carts[0].status);
        if (props.user.carts[0].status === "STARTED") {
          updateCartDb(userId, totall, prodQtd, listItems);
          window.location.href = "/checkout";
        } else {
          alert("houve algum erro na atualização");
        }

      }
       
    } else {
      // senao tiver logado adicionar cart com userid temporario , quando o fizer login
      // pega userid e atualiza o cart com o userid em che ckout
      window.location.href = "/loginCli";
    }
  }
  
  if (obj !== null && typeof obj === 'object') {
    const itemsCount = Object.keys(obj).reduce(function (prev, curr) {
      return prev + obj[curr].qtd;
    }, 0);


    const n = Math.ceil(itemsCount);
  
    // const soma = euros.reduce((total, quantidade) => total + quantidade); 

    const total = Object.keys(obj).reduce(function (prev, curr) {
      return prev + obj[curr].qtd * obj[curr].product.price;
    }, 0);

    useEffect(() => {
      setItem(total);
    }, [total])

   
  }
  
  return (

    <div className=" ">
      <div className="">
        <div className="flex-1">
          <table className="w-full text-sm lg:text-base" cellSpacing="0">
          <thead>
              <tr className="h-12 uppercase text-xs">
                <td className=" md:table-cell"></td>
                <td className="text-left">Produto</td>
                <td className="text-left">Qtd</td>
                <td className="text-left">Preço uni.</td>
                              
                <td className="text-left">SubTotal</td>
                          </tr>
                          
            </thead>
                      <tbody>
                          
              {
                
                          
                Object.keys(obj || {}).map(key => { 
                              const { product, qtd } = obj[key];

                            const c = product.price * qtd;

                              return (
                                  <tr key={key}>
                                      
                                      <td className="pb-4 md:table-cell">
                                          
                                  <Link href="#">
                                    <Image width={100} height={100} src={product.photo} className="w-20 h-20 rounded" alt="Thumbnail"/>
                                  </Link>
                                </td>

                                <td>
                                  <a href="#">
                                    <p className="mb-2 md:ml-4">{product.title}</p>
                                    <form action="" method="POST">
                                                  <button type="submit" onClick={handleRemove(key)} className="text-gray-700 md:ml-4">
                                        <small>(Remove item)</small>
                                      </button>
                                    </form>
                                  </a>
                                              </td>
                                              
                                <td className="md:flex mt-6">
                                  <div className="w-20 h-10">
                                    <div className="relative flex flex-row w-full h-8">
                                    <input type="number"  defaultValue={qtd} onBlur={changeQtd(key)}
                                      className="w-full font-semibold text-center text-gray-700 bg-gray-200 outline-none focus:outline-none hover:text-black focus:text-black" />
                                    </div>
                                  </div>
                                              </td>
                                              
                                <td className="text-right md:justfy-end">
                                  <span className="text-sm lg:text-base font-medium">
                                  R$ {product.price}
                                  </span>
                                              </td>
                                              
                                <td className="text-right">
                                  <span className="text-sm lg:text-base font-medium">
                                R$ {c}
                                   </span>
                                              </td>
                                              
                                          </tr> 
                
                              )
                          })}

              
                          <tr>
                              <td></td>
                              <td></td>
                              <td></td>
                <td>
                
            
                
                </td>
                              <td></td>
                          </tr>
            
            </tbody>
          </table>

                  
          <hr className="pb-6 mt-6"/>
        
        
        
        
        <br/><br/><br/><br/>
        <form onSubmit={handleCheckout}>  
        
           <div className="my-4 mt-6 -mx-2 lg:flex">
            <div className="lg:px-2 lg:w-1/2">
              <div className="p-4 bg-gray-100 rounded-full">
                <h1 className="ml-2 font-bold uppercase">Detalhe do Pedido</h1>
                </div>
                
                <div className="p-4">
                  

                <p className="mb-6 italic">FRETE GRÁTIS PARA TODO O BRASIL. FINALIZE SUA COMPRA PARA CONFIRMAR O PEDIDO</p>
                  
                  <div className="flex justify-between border-b">
                    <div className="lg:px-4 lg:py-2 m-2 text-lg lg:text-xl font-bold text-center text-gray-800">
                    
                    </div>
                    <div className="lg:px-4 lg:py-2 m-2 lg:text-lg font-bold text-center text-gray-900">
                    
                    </div>
                  </div>   
                  

                    <div className="flex justify-between pt-4 border-b">
                      <div style={{fontSize:30}} className="lg:px-4 lg:py-2 m-2 text-lg lg:text-xl font-bold text-center text-gray-800">
                        Total
                      </div>
                      <div style={{fontSize:30}} className="lg:px-4 lg:py-2 m-2 lg:text-lg font-bold text-center text-gray-900">
                        {total}
                      </div>
                </div>            
                <br></br><br></br>
                  <a href="#">
                    <button type='submit' style={{background: "#45C313"}}
                      className="flex justify-center w-full px-10 py-3 mt-6 font-medium text-white uppercase rounded-full shadow item-center focus:shadow-outline focus:outline-none">
                      <svg aria-hidden="true" data-prefix="far" data-icon="credit-card" className="w-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M527.9 32H48.1C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48.1 48h479.8c26.6 0 48.1-21.5 48.1-48V80c0-26.5-21.5-48-48.1-48zM54.1 80h467.8c3.3 0 6 2.7 6 6v42H48.1V86c0-3.3 2.7-6 6-6zm467.8 352H54.1c-3.3 0-6-2.7-6-6V256h479.8v170c0 3.3-2.7 6-6 6zM192 332v40c0 6.6-5.4 12-12 12h-72c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h72c6.6 0 12 5.4 12 12zm192 0v40c0 6.6-5.4 12-12 12H236c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h136c6.6 0 12 5.4 12 12z"/></svg>
                      
                      
                      <span className="ml-2 mt-5px">Procceed to checkout</span>
                    </button>
                </a>
                
              </div>
            </div>
            </div> 
</form>

        </div>
      </div>
    </div>
  );
};

export default PageCart;

