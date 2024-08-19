
import { useEffect, useState,useContext } from "react";
import Sidebar from "../../components/sideBar"


import { useSelector } from "react-redux";
import api from "../../route/interceptors";
import { SideBarContext } from "../../context/createContext";
import { responsiveContext } from "../../context/createContext";


const OrderSummary=()=>{
          

    const userInfo = useSelector((state) => state.auth.userInfo);
    const userId=userInfo._id



    const { open , setOpen }=useContext(SideBarContext)
    const {responsiveMd,setResponsiveMd}=useContext(responsiveContext)
         

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


    const handleResize = () => {
      const screenWidth = window.screen.width;
      const screenHeight = window.screen.height;
    
      // const screenWidth = window.innerWidth; // Use innerWidth for viewport width
      // const screenHeight = window.innerHeight; // Use innerHeight for viewport height
    
      console.log("Viewport Size Changed");
      console.log("Width:", screenWidth, "Height:", screenHeight);
    
      if (screenWidth <= 375 && screenHeight <= 667) {
        console.log("Small screen");
      
        setOpen(false);
        setResponsiveMd(false);
      } else if (screenWidth > 400 && screenHeight > 700) {
        console.log("Large screen");
     
        setOpen(true);
        setResponsiveMd(true);
      }
    };
    
    useEffect(() => {
      // Call handleResize once to set the initial state
      handleResize();
    
      // Add the event listener
      window.addEventListener("resize", handleResize);
    
      // Clean up the event listener
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, []);

    



    return (
       
        <div>
          {responsiveMd&&<Sidebar  />}

        <div className="flex flex-col md:flex-row " style={{paddingLeft: open ?'20px' : responsiveMd ? "0px" : '0px' ,}}>
  <div className="flex-1 overflow-x-auto md:pl-64 mt-4 md:mt-0">
    <div className="w-full p-4">
      <div className="overflow-hidden shadow-lg">
        <table className="min-w-full divide-y divide-gray-200 table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th
                scope="col"
                className="p-2 md:p-4 text-xs font-medium text-left text-gray-500 uppercase"
              >
                Name
              </th>
              <th
                scope="col"
                className="p-2 md:p-4 text-xs font-medium text-left text-gray-500 uppercase"
              >
                Max Count
              </th>
              <th
                scope="col"
                className="p-2 md:p-4 text-xs font-medium text-left text-gray-500 uppercase"
              >
                Price
              </th>
              <th
                scope="col"
                className="p-2 md:p-4 text-xs font-medium text-left text-gray-500 uppercase"
              >
                Time Period
              </th>
              <th
                scope="col"
                className="p-2 md:p-4 text-xs font-medium text-left md:text-center text-gray-500 uppercase"
              >
                Description
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200 bg-gray-200">
            {allOrderSummary &&
              allOrderSummary.map((a, b) => {
                return (
                  <tr key={b} className="hover:bg-gray-100">
                    <td className="flex flex-col md:flex-row items-start md:items-center p-2 md:p-4 space-y-2 md:space-y-0 md:space-x-4 md:space-x-6 whitespace-nowrap">
                      <img
                        className="w-12 h-12 md:w-20 md:h-20 rounded-full"
                        src={a.searchSubUrl}
                        alt={`error`}
                      />
                      <div className="text-sm font-normal text-gray-500">
                        <div className="text-sm font-normal text-black">
                          {a.subscriptionName}
                        </div>
                      </div>
                    </td>
                    <td className="p-2 md:p-4 overflow-hidden text-base font-normal text-black truncate">
                      {a.maxCount}
                    </td>
                    <td className="p-2 md:p-4 text-base font-medium text-black whitespace-nowrap">
                      {a.price}
                    </td>
                    <td className="p-2 md:pl-10 text-base font-medium text-black whitespace-nowrap">
                      {a.timePeriod}
                    </td>
                    <td className="p-2 md:pl-20 text-sm md:text-base text-gray-700 overflow-hidden  ">
                    <div className="relative max-h-[3rem] mr-2">
                      <p className="line-clamp-2 ">
                    
                        {a.description }
                      </p>
                    </div>
                  </td>
                  </tr>
                );
              })}
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