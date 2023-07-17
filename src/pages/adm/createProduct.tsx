/* eslint-disable react/jsx-key */
import { getSession, useSession } from "next-auth/react";
import { FormEvent, SetStateAction, useEffect, useRef } from "react";
import Router from "next/router";
import { signIn, signOut } from "next-auth/react";
import { useState } from "react";
import NavBar from "../../components/Navbar";
import ProductList from "../../components/ProductList";
import Upload from "../../components/Upload";
import Footer from "../../components/Footer";
import ImagesUpload from "../../components/ImagesUpLoad";
import { GetServerSideProps } from "next/types";
import { prisma } from "prisma";
import UploadImages from "../../components/UploadsMultipleS3";



export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  const user = await prisma.user.findFirst({
    where: {
      email: session.user.email,
    },
    select: {
      id: true,

    }
  });

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  } 
    

    const listCategory = await prisma.category.findMany({
      // Returns all user fields
      select: {
            id: true,
            title: true,
          },
    })
 
   
  

  return {
    props: {
      user: user,
      list: listCategory,
    },
  };






};







export default function Comp(props: any) {
  const user = props.user;
  const list = props.list;

  // list.map((url, index) => (


  //  ))
 
  const { data: session } = useSession();
  // console.log(session?.user?.email);
  const [newCat, setNewCat] = useState("");
  const [newCatId, setNewCatId] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newStock, setNewStock] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newSupplierUrl, setNewSupplierUrl] = useState("");
  const [newUserid, setNewUserid] = useState("");
  const [newPhoto, setNewPhoto] = useState("");
  const [newTambnail, setNewTambnail] = useState("");

  const [newMsnSucess, setNewMsnSucess] = useState("");

  const [newMsnProdSucess, setNewMsnProdSucess] = useState("");

  const [newImgs, setNewImags] = useState([]);

  const [newListCat, setNewListCat] = useState(list);

  


  console.log(newUserid);
  console.log(newCatId);
 
  
  const childToParent = function (childdata: []) {
    // childdata = urlList
    setNewImags(childdata); 

    childdata.map((url, index) => (
      setNewPhoto(url)
  

      
    ))
// usar crop para criar um tambnail e setar


    // tem que encontrar um local melhor para setar o userid
console.log(user.id);
setNewUserid(user.id);


  };





  async function handleCreateProd(event: FormEvent) {
    event.preventDefault();

    const result = await fetch("http://localhost:3000/api/products/create", {
      method: "POST",
      body: JSON.stringify({
       
        title: newTitle.trim(),
        price: parseFloat(newPrice),
        stock: parseInt(newStock),
        description: newDescription,
        supplierUrl: newSupplierUrl,
        userId: newUserid,
        catId: newCatId,
        photo: newPhoto,
        tambnail: newTambnail,
        imgs: newImgs
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

// se inserir com sucesso, abre uma mensagem e limpa os inputs
 
if (result.status === 201) {
  setNewMsnProdSucess('Cadastrado com sucesso!');
  handleStart();
  setNewTitle("");

// aqui gostaria de setar a lista atualizada com a categoria recem criada
}

if (result.status === 400) {
  setNewMsnProdSucess('Esse nome de produto já existe, escolha outro nome');
  handleStart();


}
    

  }

   // criar um estado para a categoria criada recentCat, se a proxima categoria for igual a recentCat
    // envia mensagem "essa categoria acabou de ser criada
    // select no db pelo estado de newCat para saber se a categoria que vai ser criada já existe
    // bloqueia o botao até que esteja tudo ok com a criação da nova categoria

  async function handleCreateCat(event: FormEvent) {
    event.preventDefault();

   
     const result = await fetch("http://localhost:3000/api/categories/create", {
       method: "POST",
       body: JSON.stringify({   
         title: newCat.trim(),
         photo: newPhoto,
         tambnail: newTambnail,
       }),
       headers: {
         "Content-Type": "application/json",
       },
     });
     
    if (result.status === 201) {
      setNewMsnSucess('Cadastrado com sucesso!');
      handleStart();
      setNewCat("");
      setNewListCat(list);
 // aqui gostaria de setar a lista atualizada com a categoria recem criada

      
    }

    if (result.status === 400) {
      setNewMsnSucess('Essa categoria já existe, escolha outro nome');
      handleStart();
    
 
    }



  }
  
  const increment = useRef(null);
  const handleStart = () => {
   increment.current = setTimeout(() => {
    setNewMsnSucess("");
   }, 5000)
   
}




  if (session) {
    return (
      <>
        <NavBar />

        <br />
        <h1 className="text-3xl text-red-800">Create Category</h1>
        <br />
{newMsnSucess}
        <br />
        
        <form onSubmit={handleCreateCat}>

        <div className="mb-6 bg-blue-300">
            <input
              value={newCat}
              onChange={(e) => setNewCat(e.target.value)}
              placeholder="criar categoria"
              type="text"
              id="default-input"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
          <br></br>

          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            type="submit"
          
           
            disabled={ newCat === "" ? true : false}
            
          >
            Create Category
          </button>
        </form>
        <br />
        <hr/>
        <br /><br />
        <h1 className="text-3xl text-red-800">Create Product</h1>
        <br />
{newMsnProdSucess}
        <br />
        

        <form onSubmit={handleCreateProd}>
       
          <div className="mb-6">
            <input
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Título do Produto"
              type="text"
              id="default-input"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>

          <div className="inline-block relative w-64">
            <select value={newCatId} onChange={(e) => {setNewCatId(e.target.value)}} required
              className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
              <option value="kkk" key={0}>Escolha uma opção</option>
              {list.map(cat => <option value={cat.id}  key={cat.id}>{cat.title}</option>)}
              
            </select>
            
 
            
</div>
<br />
          <div className="mb-6">
            <input required
              value={newPrice}
              onChange={(e) => setNewPrice(e.target.value)}
              placeholder="Final Price"
              
              type="number"
              id="default-input"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
        
          <div className="mb-6">
            <input required
              value={newStock}
              onChange={(e) => setNewStock(e.target.value)}
              placeholder="Final Stock"
              type="number"
              id="default-input"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <br />

          <UploadImages childToParent={childToParent} />
          <br /> <br />
 
<label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Product description</label>
        
          <textarea required
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            id="message"
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Description"></textarea>

          <br />

          <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Fornecedor URL</label>
          <div className="mb-6">
            <input required
              value={newSupplierUrl}
              onChange={(e) => setNewSupplierUrl(e.target.value)}
              placeholder="URL Supplier"
              type="url"
              id="default-input"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <br />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            Add Product
          </button>
        </form>

        <Footer />
      </>
    );
  }
}
