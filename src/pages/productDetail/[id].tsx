/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/no-unknown-property */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/img-redundant-alt */

import React, { useRef, useState, useEffect, useContext } from "react";


import NavBar from "../../components/Navbar";

import { Suspense } from "react";
import router, { useRouter } from "next/router";
import  Image  from "next/image";

import { prisma } from "../../lib/prisma";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
//import { CartContext } from "../../context/CartContext";
import Link from "next/link";




export const getServerSideProps: GetServerSideProps = async ({ query }) => {
 
 
  


  const id  = query.id;
  

  console.log(id);
  // aqui tem que procurar o usuário pelo id usando findMany e não findFirst
  // analisar melhor aqui isso, pode haver o problema aqui
    const prod = await prisma.product.findFirst({
      where: {
        id: id as string,
      },
      select: {
        id: true,
        title: true,
        description: true,
        price: true,
        photo: true,
        tambnail: true,
        imgs: { 
          select: {
            url: true,
          }
        }
        },
  
      },
    );

return {
  props: {
      prod: prod,
    
  },
    };
    
  
};





function App(props: any) {
  
  const [imgDetail, setImgDetail] = useState(null);

  // aqui ele vai passar a selecionar pelo nome da loja, o nume único
  // quando o user for criar o nome da loja, vai acessar db profile para ve se esse nome ja existe

 const router = useRouter();
 const parametro = router.query.id;
 const baseURL = "http://localhost:3000/api/users/select?id=";
 
  const product = props.prod;
 
  //const { addToCart } = useContext(CartContext);

 // console.log(product);

  const handleAdd = (product, i) => {
    // código para finalizar a compra aqui
    //addToCart(product);
   // document.getElementById("add").disabled = true;
    
    if (i === 1) {
      window.location.href = "/cart";
    } else {
      window.location.href = "/checkout";
    }

  };

  const handleLinkClick = (value) => {
    // Aqui você pode definir o valor no estado usando o hook useState
    setImgDetail(value);
   
  }
  
  return (
    <>
      <NavBar />

<div style={{ width: "90vW", height: "50vH", marginLeft:"6em" , background: "#fff", }}>
      

<br></br>
        <div style={{ width: "80vW", left: "20px" }} className="border rounded-lg p-4 flex justify-between">
        <div className="w-1/3 p-2 flex flex-col border border-gray-500">
            {product.imgs.map((data, key) => {
      const isLastImage = key === product.imgs.length - 1;
              return (         
                <Image onClick={() => handleLinkClick(data.url)} 
                  key={key} width={60} height={50} src={data.url} alt={product.title} priority
                  style={{ marginTop: key === 0 ? 0 : '-40px', marginBottom: isLastImage ? 0 : '50px', cursor: 'pointer' }} />              
      )
    })}
  </div>
  <div className="w-1/2 p-2">
    <Image width={400} height={400} src={imgDetail? imgDetail : product.photo} alt={product.title} priority className="border border-gray-500" />
  </div>
  <div className="w-1/2 p-4 border rounded-lg flex flex-col">
    <p className="mb-2">Novo - {1234} Vendidos</p>
    <p className="text-3xl font-bold mb-2">{product.title}</p>
    <br></br>
    <h1 className="text-3xl font-bold text-green-500 mb-2">{product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</h1>
    <br></br>
    <h2 className="text-xl font-bold mb-2">Informações de pagamento:</h2>
    <p className="mb-2">Parcelamento em até 10 vezes de {((product.price -1) / 10).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} sem juros</p>
    <p className="mb-2">Frete grátis</p>

            <br></br>
    <div className="mt-auto flex justify-between">
              <button id="add" onClick={() => handleAdd(product, 1)}
              className="bg-blue-500 px-4 py-2 rounded-lg text-gray-800 hover:bg-blue-400">Adicionar ao carrinho</button>
      
              <button onClick={() => handleAdd(product, 2)} style={{ background: "#45C313" }}
                className=" px-4 py-2 rounded-lg text-white">Comprar</button>
    </div>
  </div>

</div>

        <div style={{ width: "60%", marginLeft: "0px", background: "#fafbfa" }}
          className=" mx-auto rounded-md shadow-md p-4 text-left text-lg leading-loose text-justify">
     {product.description}


</div>

   
</div>

    </>
  );
}

export default App;





