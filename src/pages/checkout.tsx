/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/no-unknown-property */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useRef, useState, useEffect, FormEvent, use } from "react";
import NavBar from "../components/Navbar";
import  Image  from "next/image";
import Head from "next/head";
import 'react-slideshow-image/dist/styles.css';
import Footer from "../components/Footer";
import { getSession, signIn, signOut, useSession } from "next-auth/react";
import { GetServerSideProps } from "next";
import { prisma } from "../lib/prisma";
import { useCart } from '../context/CartContext';

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: "/loginCli",
        permanent: false,
      },
    };
  }

    const user = await prisma.user.findFirst({
      where: {
        email: session?.user?.email,
      },
      select: {
        id: true,
        name: true,
        email: true,
        avatar: true,
        product: {
          select: {
            id: true,
            title: true,
            price: true,
            stock: true,
            supplierUrl: true,
            photo: true,         
          }
        },
          carts: {
            select: {
              id: true,
            }
          },        
      },
       
   });

    if (!user) {
      const result = await fetch("http://localhost:3000/api/users/create", {
        method: "POST",
        body: JSON.stringify({
          name: session.user?.name,
          email: session.user?.email,
          avatar: session.user.image,
          password: "",
          phone: "",
          title: "",
          bio: "",
          status: "ENDUSER",
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    } 
    return {
  props: {
    user: user,    
  },
    };
// agora que logou tem o id do usuario para salvar o carrinho e o pedido
};




function CheckoutPage(props: any) {

  // aqui estou com cart do localstorage e com acesso ao user logado que está relacionado ao cart
  // ou seja, tem um carrinho no banco para comparar com o cart do localstorage.

  const cart  = useCart();
  const user = props.user;
  console.log(user.id);
// se houver diferença de quantidade de itens no carrinho, quantidade de product, preço do produto e total da compra
// então atualiza cart 

  const pix = "/pix.png";
  const visa = "/visa.jpg";
  const master = "/master-card.png";

  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [district, setDistrict] = useState('');
  const [rua, setAddRua] = useState('');
  const [number, setNumber] = useState('');
  const [complem, setComplem] = useState(''); 
  const [cep, setCep] = useState('');
  const [address2, setAddress2] = useState({});
  const [qtdItem, setQtdItem] = useState(0);
  const [totalCompra, setTotalCompra] = useState(0);
  const [orderStatus, setOrderStatus] = useState('PENDING');

//console.log(user);
  const handleOrder = async (event: FormEvent)  => {
  
    event.preventDefault();
    // const response = await fetch("http://localhost:3000/api/shipping/create", {
    //   method: "POST",
    //   body: JSON.stringify({
    //     userId: user.id,
    //     cartId: user.carts[0].id,
    //     address: rua,
    //     number: number,
    //     complementary: complem,
    //     district: district,
    //     city: city,
    //     state: state,
    //     zip: cep,
      
    //   }),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // });

    // // o teste é ver se está criando o cart
    // const json = await response.json();
    // const userId = json;
    // console.log(userId);
    // verificar esse totalPrice que existe em cart.. ver como fazer
    
    const result = await fetch("http://localhost:3000/api/order/create", {
      method: "POST",
      body: JSON.stringify({
        userId: user.id,
        cartId: user.carts[0].id,
        totalPrice: user.totalPrice,
        status: orderStatus,
      
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
      
      
    // o teste é ver se está criando o cart
    
    const json = await result.json();
    const userId = json;
    
    alert('Efetua o pagamento para finalizar o seu pedido');
    
  }

// esses item estão sendo recuperados do localstorage , mas aqui ja deve vim do db, vinculado a esse usuario
  const itemsCount = Object.keys(cart.cart).reduce(function(prev, curr) {
    return prev + cart.cart[curr].qtd;
  }, 0);
  

const total = Object.keys(cart.cart).reduce(function(prev, curr) {
  return prev + cart.cart[curr].qtd * cart.cart[curr].product.price;
}, 0);

  
  useEffect(() => {
    setQtdItem(itemsCount);
    setTotalCompra(total);
  }, [itemsCount, total])
  


  const listItems = [];
  const items =  Object.keys(cart.cart).map(key => {
  const { product } = cart.cart[key];
   
   listItems.push(product.id);

  })
  


  
  

  const { data: session } = useSession();
  
  //   useEffect(() => {
  //     if (cep.length === 8) {
  //       fetch(`https://viacep.com.br/ws/${cep}/json/`)
  //         .then((response) => response.json())
  //         .then((data) => setAddress2(data))
  //         .catch((error) => console.error(error));
  //     }
  //   }, [cep]);
  
  // console.log(address2);





  return (
    <>
    <div style={{ width: "100vW", height: "50vH", background: "#FFFFFF" }}>

        <Head>
        <title>Checkout Oshop</title>
        </Head>          
        
        <br></br>
        
        <form onSubmit={handleOrder}> 
    <div className="flex w-full sm:w-full md:w-full lg:w-1/2 xl:w-1/2 mb-4">
    <div style={{ width: "40vW", height: "100vH", background: "#efeeef", padding: "15px", marginLeft: "10px" }}>
    
    <div className="flex flex-wrap -mx-3 mb-6">
    <div className="w-full px-3">
    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
    Informações do Comprador
    </label>
      
    <p className="text-gray-600 text-xs italic">Estamos quase finalizando sua compra.</p>
    </div>
    </div>
    <div className="flex flex-wrap -mx-3 mb-2">

    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-zip">
    {session ? session.user.name : 'erro'}
    </label>   
    </div>              
    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-city">
        {session? session.user.email : 'erro'}
      </label>
    </div>
    
    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-city">
      
      </label>
    </div>
            </div>



              
            <br/>
         <div className="flex flex-wrap -mx-3 mb-6">
    <div className="w-full px-3">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
        Informações do pedido
      </label>
    </div>
      </div>
            
            <div className="flex flex-wrap -mx-3 mb-2">

<div className="w-full md:w-1/3 px-2 mb-6 md:mb-0">
<p className="text-gray-600 text-xs italic">Quantidade de itens: { itemsCount }</p>
  </div>

  <div className="w-full md:w-1/3 px-2 mb-6 md:mb-0">
  <p className="text-gray-600 text-xs italic">
      Total da Compra: {total}
  </p>
 
  </div>
  <div style={{ background: "#45C313",  width: "40%", height: "30px"}} className="w-full md:w-1/3 px-2 mb-6 md:mb-0 text-center">
    <label className="block uppercase tracking-wide text-teal-600 text-xs mb-2" htmlFor="grid-city">
      Frete Gratis
    </label>
    </div>          
    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
    <label className="block uppercase tracking-wide text-teal-600 text-xs font-bold mb-2" htmlFor="grid-city">
      Total a Pagar: {total}
    </label>
  </div>
</div>
</div>

<div style={{ width: "50vW", height: "250vH", background: "#efeeef", padding: "15px", marginLeft: "10px" }}>
  
    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
    <p style={{ fontSize: "2em" }} className="font-bold" >
      Total a Pagar: {total}
    </p>
  </div>        


  <div className="flex flex-wrap -mx-3 mb-6">
    <div className="w-full px-3">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
        Opções de pagamento:
      </label>
      
      <p className="text-gray-600 text-xs italic">20% DE DESCONTO PAGANDO NO PIX À VISTA</p>
    </div>

    <div style={{width:'20vw', display: "flex", justifyContent: "space-between"}}>
  <Image width={50} height={50} src={pix} className="w-20 h-20 rounded mx-4" alt="Thumbnail"/>
  <Image width={50} height={50} src={visa} className="w-20 h-20 rounded mx-4" alt="Thumbnail"/>
  <Image width={50} height={50} src={master} className="w-20 h-20 rounded mx-4" alt="Thumbnail"/>
</div>

  </div>
 
    <button type="submit" style={{background: "#45C313"}} className=" hover:bg-binding-700 text-white font-bold py-2 px-4 rounded">
  Finalizar Compra
</button>

</div>
</div>
</form>
<Footer />

</div>
  </>
  );
}

export default CheckoutPage;