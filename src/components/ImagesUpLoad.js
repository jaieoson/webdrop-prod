import { useState } from "react";

/**
 * # MY ACCOUNT GOOGLE PLAY:
 * @see {@link https://play.google.com/store/apps/developer?id=dzino Google Play}
 */

export default function PrivatePage(props) {
  const [image, setImage] = useState(null);
  const [createObjectURL, setCreateObjectURL] = useState(null);

  const uploadToClient = (event) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];

      setImage(i);
      setCreateObjectURL(URL.createObjectURL(i));
    }
  };

  const uploadToServer = async (event) => {
    const body = new FormData();


    body.append("file", image);

    const response = await fetch("/api/file", {
      method: "POST",
      body
    });



    
  };



// no aupload de imagens vai retornar url e criar tbl Img con id do tour
  
  
  
  

  return (
    <div>
      <form onSubmit={handleCreateTour} >
<div className="mb-6">
    
    <input placeholder="Título do Tour" type="text" id="default-input" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
</div>


      <div>
        <image src={createObjectURL} />

        <h4>Select Image</h4>

        <input type="file" name="myImage" onChange={uploadToClient} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"/>



        <div className="h-72 w-full relative border-2 items-center rounded-md cursor-pointer bg-gray-300 border-gray-400 border-dotted">
                        <input type="file" className="h-full w-full bg-green-200 opacity-0 z-10 absolute" multiple="multiple" name="files[]" />
                        <div className="h-full w-full bg-gray-200 absolute z-1 flex justify-center items-center top-0"> 
                            <div className="flex flex-col">
                                <i className="mdi mdi-folder-open text-[30px] text-gray-400 text-center"></i>
                                <span className="text-[12px]">{`Drag and Drop a file`}</span>
                            </div>
                        </div> 
                    </div>


           <br/>
        <button
         className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          type="submit"
          onClick={uploadToServer}
        >
          Send to server
        </button>



     

        </div>
      </form>
      

    </div>
  );
}
