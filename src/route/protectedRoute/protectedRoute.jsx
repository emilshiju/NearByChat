
import {useSelector} from "react-redux"
import {Navigate, } from "react-router-dom"




const ProtectedRoute=({ children })=>{
    const user=useSelector((state)=>state.auth.userInfo)

   let status=true
     
    


   

    return(
        <div>
            {!user? children :<Navigate to={`/${status}`} />
        }
        </div>
    )
}

export default ProtectedRoute