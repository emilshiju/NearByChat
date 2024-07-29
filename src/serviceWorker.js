import api from "./route/interceptors";

export async function regSw () {
    if ('serviceWorker' in navigator) {
      let url =  '/sw.js';
      const reg = await navigator.serviceWorker.register( '/firebase-messaging-sw.js')
      console.log ('service config is', {reg});
      return reg;
    }
    throw Error ('serviceworker not supported');
  }


  export async function subscribe (serviceWorkerReg) {
    console.log("hehe ")
    let subscription = await serviceWorkerReg.pushManager.getSubscription ();
    console.log ({subscription});
    if (subscription === null) {
      subscription = await serviceWorkerReg.pushManager.subscribe ({
        userVisibleOnly: true,
        applicationServerKey: 'BNpMIfIwkjf6pAglhLNan1__wNS8dFvdiDNDzK7A69E6Fol9fhzV-uqJ7lY-bQQ6mjktLg9Jig0SPwGm52_V4OI',
        
      });
    }
    return subscription
  }
  