import React ,{useState} from  'react';
import api from '../route/interceptors';
import { useSelector } from "react-redux";


const ReportManagement= ({reportedUser, onclose}) => {

    const userInfo = useSelector((state) => state.auth.userInfo);
  const  userId=userInfo._id

    const options = [
        { value: 'nudity', label: 'Nudity involving minors' },
        { value: 'misbehavior', label: 'Other misbehavior involving minors' },
        { value: 'inappropriateContent', label: 'Inappropriate content' },
      ];
    
      const [selectedOption, setSelectedOption] = useState('');
    
      const handleSelectChange = (e) => {
        setSelectedOption(e.target.value);
      };

      const handleReportSubmit=()=>{

        if(selectedOption.length==0){
            alert("select anything")
        }else{

            api.post('/submitReport',{reporter:userId,reportedUser,reason:selectedOption})
            .then((res)=>{
              if(res.data.status){
                alert("sucessfulyy submitted")
                onclose()
              }
            })
        }

          
      }

     

    return (
        <div  class="absolute top-5 right-10 z-50">
        <div id="toast-notification" className=" w-full max-w-xs p-4  bg-white rounded-lg shadow  text-gray-300" role="alert">
        <div className="flex items-center mb-3">
        <span className="mb-1 text-sm  text-black  " style={{fontSize:"24px",fontWeight:"normal"}}>Report</span>
        <button
                    type="button"
                    className="ms-auto -mx-1.5 -my-1.5 bg-white justify-center items-center flex-shrink-0 text-gray-400 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 "
                    aria-label="Close"
                >
                    <span className="sr-only" >Close</span>
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14" onClick={onclose}>
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                    </svg>
                </button>
            </div>
                
         <div style={{marginTop:"20px"}}>
                <select
        id="behaviorDropdown"
        value={selectedOption}
        onChange={handleSelectChange}
        className="px-2 py-1 border border-gray-300 text-black rounded-md focus:outline-none focus:ring focus:border-blue-300"
      >
        <option value="">Select an option</option>
        {options.map(option => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
      </div>
      <br></br>
      <button
     
      className="bg-red-500 hover:bg-red-600 text-white font-bold py-2  px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
      onClick={handleReportSubmit}
    >
      Submit
    </button>

            </div>
            
            <div className="flex items-center">
               
            </div>
        </div>
        
    );
};

export default ReportManagement
