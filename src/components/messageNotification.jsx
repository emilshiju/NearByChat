

import { useEffect } from "react";
const NewMessageNotificatoin=({message,setIsOpen})=>{

    {console.log("newwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww")}
    {console.log(message)}
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(null); // Automatically close the notification after 1 second
    }, 3000);

    return () => {
      clearTimeout(timer); // Clean up the timer on component unmount or state change
    };
  }, []); 


    return (
        <div
        id="toast-simple"
        className=" absolute z-40 mt-1 ml-1 flex items-center  w-full max-w-xs p-4 space-x-4 rtl:space-x-reverse bg-white divide-x rtl:divide-x-reverse bg-white rounded-lg shadow dark:text-gray-400 "
        role="alert"
      >
         {!message.currentStatus&&<img className="object-cover rounded-full"style={{width:'30px',height:'30px'}}  src={message.imageUrl} alt="" />}
        {!message.currentStatus&&<span>{message.nickName}</span>}
       {!message.currentStatus&&<div className="ps-4 text-sm font-normal">{message.message}</div>}
        <svg
          className="w-5 h-5 text-blue-600 dark:text-blue-500 rotate-45"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 18 20"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m9 17 8 2L9 1 1 19l8-2Zm0 0V9"
          />
        </svg>
  
      </div>
    )
}

export  default NewMessageNotificatoin