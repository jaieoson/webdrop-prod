/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */


import { useState } from "react";


export default function Upload(){
    
    const [files, setFile] = useState([]);
    const [message, setMessage] = useState();

    
    const handleFile = (e) => {
        setMessage("");
        let file = e.target.files;
        
        for (let i = 0; i < file.length; i++) {
            const fileType = file[i]['type'];
            const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
            if (validImageTypes.includes(fileType)) {
                setFile([...files,file[i]]);
            } else {
                setMessage("only images accepted");
            }
            
        }

        
         
    }; 
    const removeImage = (i) => {
       setFile(files.filter(x => x.name !== i));
    }
 
 
    return (
 
        <>

<div className="mb-6">
    
    <input placeholder="Título do Tour" type="text" id="default-input" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
</div>

            <div className="h-screen flex justify-center items-center bg-gray-300 px-2">
  
                <div className="p-3 md:w-1/2 w-[360px] bg-white rounded-md">
                    <span className="flex justify-center items-center text-[12px] mb-1 text-red-500">{message}</span>
                    <div className="h-32 w-full relative border-2 items-center rounded-md cursor-pointer bg-gray-300 border-gray-400 border-dotted">
                        <input type="file" onChange={handleFile} className="h-full w-full bg-green-200 opacity-0 z-10 absolute" multiple="multiple" name="files[]" />
                        <div className="h-full w-full bg-gray-200 absolute z-1 flex justify-center items-center top-0"> 
                            <div className="flex flex-col">
                                <i className="mdi mdi-folder-open text-[30px] text-gray-400 text-center"></i>
                                <span className="text-[12px]">{`Drag and Drop a file`}</span>
                            </div>
                        </div> 
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">

                        {files.map((file, key) => {
                            return (
                                <div key={key} className="overflow-hidden relative">
                                    <i onClick={() => { removeImage(file.name)}} className="mdi mdi-close absolute right-1 hover:text-white cursor-pointer"></i>            
                                    <img className="h-20 w-20 rounded-md" src={URL.createObjectURL(file)}/>
                                </div>
                            )
                        })}
                        
                       
                        
                    </div>
                </div> 
            </div>
            
        </>  
   );

}