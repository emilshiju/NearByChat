
import { useEffect, useState } from "react";
import Sidebar from "../../components/sideBar"


import { useSelector ,useDispatch} from "react-redux";
import api from "../../route/interceptors";



const OrderSummary=()=>{
          

    const userInfo = useSelector((state) => state.auth.userInfo);
    const userId=userInfo._id
         

    const [allOrderSummary,setOrderSummary]=useState([])

    useEffect(()=>{


        api.get(`/getOrderSummary/${userId}`)
        .then((res)=>{
       console.log("ressssssssssssssssssssssssssssssssssss")
            if(res.data.data.length>=0){
                console.log("responseeeeeeeeeeeeeeeeeeeeeeeeeeeee")
                console.log(res.data.data)
                setOrderSummary(res.data.data)
            }
        })

    },[])




    return (
        <div>
            <Sidebar  current='settings' />
             
           
            <div  style={{ paddingLeft: "295px",marginTop:'60px' }} >
              {/* <h1 className="text-8xl font-semibold text-black sm:text-2xl " style={{fontSize:'40px'}} >
            Order Summary
        </h1>  */}
        <br/>
        <br />


            
            <div className="w-full">
                <div className="inline-block min-w-full align-middle">
                    <div className="overflow-hidden shadow">
                        <table className="min-w-full divide-y divide-gray-200 table-fixed ">

                            
                            <thead className="bg-gray-100 ">
                                <tr>
                                    <th scope="col" className="p-4">
                                        <div className="flex items-center">
                                            <input
                                                id="checkbox-all"
                                                aria-describedby="checkbox-1"
                                                type="checkbox"
                                                className="w-4 h-4 border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:focus:ring-primary-600 "
                                            />
                                            <label htmlFor="checkbox-all" className="sr-only">checkbox</label>
                                        </div>
                                    </th>
                                    <th scope="col" className="p-4 text-xs font-medium text-left text-gray-500 uppercase " >
                                        Name
                                    </th>
                                    <th scope="col" className=" text-xs font-medium text-left text-gray-500 uppercase ">
                                        Max Count
                                    </th>
                                    <th scope="col" className="p-4 text-xs font-medium text-left text-gray-500 uppercase ">
                                        Price
                                    </th>
                                    <th scope="col" className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                                        timePeriod
                                    </th>
                                    
                                    {/* <th scope="col" className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                                        Status
                                    </th> */}
                                    <th scope="col" className="p-4 text-xs font-medium text-center text-gray-500 uppercase  " >
                                        description
                                    </th>
                                </tr>
                            </thead>
                   
                            <tbody className=" divide-y divide-gray-200 bg-gray-200 ">
                            {allOrderSummary&&allOrderSummary.map((a,b)=>{

                                   return (
                                          
                                    <tr className="hover:bg-gray-100 ">
                                        <td className="w-4 p-4">
                                            <div className="flex items-center">
                                                <input
                                               
                                                    aria-describedby="checkbox-1"
                                                    type="checkbox"
                                                    className="w-4 h-4 border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:focus:ring-primary-600 "
                                                />
                                                <label className="sr-only">checkbox</label>
                                            </div>
                                        </td>
                                        <td className="flex items-center p-4 mr-12 space-x-6 whitespace-nowrap">
                                            <img
                                                className="w-20 h-20 rounded-full"
                                                src={a.searchSubUrl}
                                            //    src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw_HeSzHfBorKS4muw4IIeVvvRgnhyO8Gn8w&s"}
                                                alt={`error`}
                                            />
                                            <div className="text-sm font-normal text-gray-500 ">
                                                
                                                {/* <div className="text-base font-semibold text-gray-900 dark:text-white">{a.name}</div> */}
                                                <div className="text-sm font-normal text-black ">{a.subscriptionName}</div>
                                            </div>
                                        </td>
                                        <td className="max-w-sm p-4 overflow-hidden text-base font-normal text-black truncate xl:max-w-xs ">{a.maxCount}</td>
                                        <td className="p-4 text-base font-medium text-black whitespace-nowrap ">{a.price}</td>
                                        <td className="pl-10 text-base font-medium text-black whitespace-nowrap ">{a.timePeriod}</td>
                                        {/* <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">{a.timePeroid}</td> */}
                                        {/* <td className="p-4 text-base font-normal text-gray-900 whitespace-nowrap dark:text-white">
                                            <div className="flex items-center">
                                              
                                            </div>
                                        </td> */}
                                        <td className="pl-20 space-x-2 whitespace-nowrap">
                                            {a.description}
                                            {/* <button
                                                type="button"
                                                data-modal-target="edit-user-modal"
                                                data-modal-toggle="edit-user-modal"
                                                className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 bg-blue-500 "
                                                
                                            >
                                                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path>
                                                    <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd"></path>
                                                </svg>
                                                {'Edit '}
                                            </button>
                                            <button
                                                type="button"
                                                data-modal-target="delete-user-modal"
                                                data-modal-toggle="delete-user-modal"
                                                className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-800 focus:ring-4 focus:ring-red-300 "
                                                // onClick={()=>deleteUser}
                                            >
                                                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"></path>
                                                </svg>
                                                Delete 
                                            </button> */}
                                        </td>
                                    </tr>
                                  
                             
                                )})}
                     </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>



            </div>
     
    )
}

export default OrderSummary