

const PermissionNotification=({response,onclose,onAccept})=>{

   

    return ( 
        


<div class="absolute top-5 right-10 z-50" >
<div className="shadow bg-white rounded-[10px]" role="alert">
      <div className="p-4 flex">
      <div class="inline-flex items-center justify-center flex-shrink-0 w-12 h-12 text-blue-500 bg-blue-100 rounded-lg dark:text-blue-300 dark:bg-blue-900">
        
                     <img src={response.imageUrl}></img>
                     <span class="sr-only">Refresh icon</span>
                </div>
                <div  className="flex" style={{paddingLeft:'30px'}}>

        <div className="w-10 h-10 bg-green-500  flex items-center text-white rounded-full justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            onClick={onAccept}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
            />
          </svg>
        </div>
      
        <div className="w-10 h-10 ml-4 bg-red-500 flex items-center text-white rounded-full justify-center" >
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    onClick={onclose}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
    />
  </svg>
</div>
</div>

       
        <div className=" align-center pl-2 text-gray-600">
          {/* <p className="font-bold">Outgoing call</p> */}
          <h1>
          {response.nickName +' is calling you '}....... 
          </h1>
        </div>
      </div>
    </div>
    </div>
    )
}

export default PermissionNotification