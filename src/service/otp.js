import api from "../route/interceptors";


export const otpSend=(email)=>{

    return new Promise((resolve,reject)=>{

        api.get(`/sendOtp?email=${email}`)
        .then((response)=>{

        })
    })


}


export const verifyOtp=(email,otp)=>{

    return new Promise((resolve,reject)=>{

        api.get(`/verifyOtp?email=${email}&otp=${otp}`)
        .then((response)=>{
            
           resolve(response.data.response)
        })
        .catch((err)=>{
       
        })
    })
}