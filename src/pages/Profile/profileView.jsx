import React ,{useEffect,useState,useContext} from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '../../components/sideBar';
import { FaSpinner } from "react-icons/fa";
import getProfile from "../../service/getProfile";
import connection from "../../service/connection"
import { useSelector } from "react-redux";
// import { Socket } from 'socket.io-client';
// import { socket } from '../../main';
import Notification from '../../components/notification';
import { SocketContext } from "../../context/socket";
import api from '../../route/interceptors';


const profileView=()=>{
    const { id } = useParams();
    const userInfo = useSelector((state) => state.auth.userInfo);
    const socket=useContext(SocketContext)


    const [nickName,setNickName]=useState('name')
    const [profession,setProfession]=useState('bio')
    const [bio,setBio]=useState('profession')
    const [image, setImage] = useState(false);
    const [userProfileId,setUserProfile]=useState(null)
    const [receiverProfileId,setReceiverId]=useState(null)
    const [userStatus,setUserStatus]=useState(false)

    useEffect(() => {
        getProfile(id).then((res) => {
          
          setReceiverId(res.response._id)

          
            setNickName(res.response.nickName);
          
         
            setBio(res.response.bio);
          
         
            setProfession(res.response.profession);
          
          setImage(res.response.imageUrl);
          
        });
        getProfile(userInfo._id).then((res)=>{
          
          setUserProfile(res.response._id)
        })
        
      }, []);

      const [notification,setNotification]=useState(null)
      const closeNotification = () => {
        setNotification(null);
      };
    

      useEffect(()=>{

        api.get(`/checkConnectionStatus?userId=${userInfo._id}&id=${id}`)
        .then((res)=>{
          setUserStatus(res.data.status)
         
        })
        socket.emit('on',(userInfo._id))
        socket.on('notification', (message) => {
      
          console.log('Notification received:', message);
          setNotification(message)
          // alert('Notification: ' + message);
         });

        return ()=>{
          socket.off('notification');
        }
      })


      const connectButton=(userName,senderId,receiverId)=>{
       
        try{
    
          socket.emit('connectionRequested',userName,senderId,receiverId,userProfileId,receiverProfileId)
        //  socket.emit("connectionNotification",userName,senderId,receiverId,userProfileId,receiverProfileId)
        //  .then((res)=>{
        //   alert("hey")
        //  })
        }catch(error){
          alert(error)
        }
         
         
          // connection(senderId,receiverId)
          
      }
    
  

    return(
        <div>
             <Sidebar />
             {notification&&<Notification   message={notification} onClose={closeNotification}  />}
             <main
        className="bg-gray-100 bg-opacity-25"
        style={{ paddingLeft: "200px" }}
      >
        <div className="lg:w-8/12 lg:mx-auto mb-8">
          <header className="flex flex-wrap items-center p-4 md:py-8">
            <div className="md:w-3/12 md:ml-16">
              {/* Profile Image */}
              {/* <img
                className="w-20 h-20 md:w-40 md:h-40 object-cover rounded-full border-2 border-pink-600 p-1"
                src="https://images.unsplash.com/photo-1502791451862-7bd8c1df43a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80"
                alt="profile"
              /> */}
              {image ? (
                      <img
                        className="object-cover w-40 h-40 p-1 rounded-full ring-2 ring-indigo-300 dark:ring-indigo-500"
                        src={image}
                        alt="Bordered avatar"
                      />
                    ) : (
                      <div className="object-cover w-40 h-40 p-1 rounded-full ring-2 ring-indigo-300 dark:ring-black  flex items-center justify-center">
                        <FaSpinner className="animate-spin text-gray-600 dark:text-gray-400 text-4xl" />
                      </div>
                      // <img
                      //   className="object-cover w-40 h-40 p-1 rounded-full ring-2 ring-indigo-300 dark:ring-indigo-500"
                      //   src={'https://res.cloudinary.com/dwqtoz0ig/image/upload/v1717488014/nearbychat/gsu4hmgkwyy286tmq1wp.png'}
                      //   alt="Bordered avatar"
                      // />
                    )}
            </div>

            {/* Profile Meta */}
            <div className="w-8/12 md:w-7/12 ml-4">
              <div className="md:flex md:flex-wrap md:items-center mb-4">
                {/* <h2 className="text-3xl inline-block font-light md:mr-2 mb-2 sm:mb-0">
                  mrtravlerrr_
                </h2> */}
                <input
                  type="text"
                  className="text-3xl inline-block font-light md:mr-2 mb-2 sm:mb-0"
                  value={nickName}
                  // onChange={nickNameChange}
                />

                {/* Badge */}
                <span
                  className="inline-block fas fa-certificate fa-lg text-blue-500 relative mr-6 text-xl transform -translate-y-2"
                  aria-hidden="true"
                >
                  <i className="fas fa-check text-white text-xs absolute inset-x-0 ml-1 mt-px"></i>
                </span>

                {/* Follow Button */}
                {/* <a
                  href="#"
                  className="bg-blue-500 px-2 py-1 text-white font-semibold text-sm rounded block text-center sm:inline-block"
                >
                  Follow
                </a> */}
              </div>

              {/* Post, Following, Followers List for Medium Screens */}
              <ul className="hidden md:flex space-x-8 mb-4">
                <li>
                  <span className="font-semibold">136</span> posts
                </li>
                {/* <li>
                  <span className="font-semibold">40.5k</span> followers
                </li> */}
                <li>
                  <span className="font-semibold">302</span> Connections
                </li>
              </ul>

              {/* User Meta for Medium Screens */}
              <div className="hidden md:block">
                <input
                  type="text"
                  className="font-semibold  mb-0 block"
                  value={nickName}
                  // onChange={nickNameChange}
                />
                <input
                  type="text"
                  className="mb-0 block"
                  value={profession}
                  // onChange={profesionChange}
                />

                <input
                  type="text"
                  className="block"
                  value={bio}
                  // onChange={bioChange}
                />

               
              </div>
            </div>

            {/* User Meta for Small Screens */}
            <div className="md:hidden text-sm my-2">
              <h1 className="font-semibold">Mr Travlerrr...</h1>
              <span>Travel, Nature and Music</span>
              <p>Lorem ipsum dolor sit amet consectetur</p>
            </div>
          </header>

          <div style={{ paddingLeft: "320px" }}>

           
              {userStatus == true?
            <button
              
              className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
              // onClick={()=>connectButton(userInfo.userName,userInfo._id,id,userProfileId,receiverProfileId)}
            >
              Message
            </button>
            :
            <button
              
              className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
              onClick={()=>connectButton(userInfo.userName,userInfo._id,id,userProfileId,receiverProfileId)}
            >
              Connect
            </button>
             }
          </div>

          {/* <div style={{ paddingLeft: "315px" }}>
            <button className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
              Message
            </button>

            <button className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
              Connected
            </button>
          </div> */}
          <br></br>

          {/* Posts */}
          <div className="px-px md:px-3">
            {/* User Following for Mobile Only */}
            {/* check here here */}{" "}
            <ul className="flex md:hidden justify-around space-x-8 border-t text-center p-2 text-gray-600 leading-snug text-sm">
              <li>
                <span className="font-semibold text-gray-800 block">136</span>
                posts
              </li>
              <li>
                <span className="font-semibold text-gray-800 block">40.5k</span>
                followers
              </li>
              <li>
                <span className="font-semibold text-gray-800 block">1302</span>
                Connections
              </li>
            </ul>
            {/* Instagram Features */}
            <ul className="flex items-center justify-around md:justify-center space-x-12 uppercase tracking-widest font-semibold text-xs text-gray-600 border-t">
              {/* Posts Tab is Active */}
              <li className="md:border-t md:border-gray-700 md:-mt-px md:text-gray-700">
                <a className="inline-block p-3" href="#">
                  <i className="fas fa-th-large text-xl md:text-xs"></i>
                  <span className="hidden md:inline">post</span>
                </a>
              </li>
            </ul>
            {/* Flexbox Grid */}
            <div className="flex flex-wrap -mx-px md:-mx-3">
              {/* Column */}
              <div className="w-1/3 p-px md:px-3">
                {/* Post 1 */}
                <a href="#">
                  <article className="post bg-gray-100 text-white relative pb-full md:mb-6">
                    {/* Post Image */}
                    <img
                      className="w-full h-full absolute left-0 top-0 object-cover"
                      src="https://images.unsplash.com/photo-1502791451862-7bd8c1df43a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
                      alt="image"
                    />

                    <i className="fas fa-square absolute right-0 top-0 m-1"></i>

                    <div className="overlay bg-gray-800 bg-opacity-25 w-full h-full absolute left-0 top-0 hidden">
                      <div className="flex justify-center items-center space-x-4 h-full">
                        <span className="p-2">
                          <i className="fas fa-heart"></i>
                          412K
                        </span>

                        <span className="p-2">
                          <i className="fas fa-comment"></i>
                          2,909
                        </span>
                      </div>
                    </div>
                  </article>
                </a>
              </div>

              <div className="w-1/3 p-px md:px-3">
                <a href="#">
                  <article className="post bg-gray-100 text-white relative pb-full md:mb-6">
                    <img
                      className="w-full h-full absolute left-0 top-0 object-cover"
                      src="https://images.unsplash.com/photo-1498409570040-05bf6d3dd5b5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
                      alt="image"
                    />

                    <div className="overlay bg-gray-800 bg-opacity-25 w-full h-full absolute left-0 top-0 hidden">
                      <div className="flex justify-center items-center space-x-4 h-full">
                        <span className="p-2">
                          <i className="fas fa-heart"></i>
                          412K
                        </span>

                        <span className="p-2">
                          <i className="fas fa-comment"></i>
                          1,993
                        </span>
                      </div>
                    </div>
                  </article>
                </a>
              </div>

              <div className="w-1/3 p-px md:px-3">
                <a href="#">
                  <article className="post bg-gray-100 text-white relative pb-full md:mb-6">
                    <img
                      className="w-full h-full absolute left-0 top-0 object-cover"
                      src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
                      alt="image"
                    />

                    <div className="overlay bg-gray-800 bg-opacity-25 w-full h-full absolute left-0 top-0 hidden">
                      <div className="flex justify-center items-center space-x-4 h-full">
                        <span className="p-2">
                          <i className="fas fa-heart"></i>
                          112K
                        </span>

                        <span className="p-2">
                          <i className="fas fa-comment"></i>
                          2,090
                        </span>
                      </div>
                    </div>
                  </article>
                </a>
              </div>

              <div className="w-1/3 p-px md:px-3">
                <a href="#">
                  <article className="post bg-gray-100 text-white relative pb-full md:mb-6">
                    <img
                      className="w-full h-full absolute left-0 top-0 object-cover"
                      src="https://images.unsplash.com/photo-1533105079780-92b9be482077?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
                      alt="image"
                    />

                    <i className="fas fa-video absolute right-0 top-0 m-1"></i>

                    <div className="overlay bg-gray-800 bg-opacity-25 w-full h-full absolute left-0 top-0 hidden">
                      <div className="flex justify-center items-center space-x-4 h-full">
                        <span className="p-2">
                          <i className="fas fa-heart"></i>
                          841K
                        </span>

                        <span className="p-2">
                          <i className="fas fa-comment"></i>
                          909
                        </span>
                      </div>
                    </div>
                  </article>
                </a>
              </div>

              <div className="w-1/3 p-px md:px-3">
                <a href="#">
                  <article className="post bg-gray-100 text-white relative pb-full md:mb-6">
                    <img
                      className="w-full h-full absolute left-0 top-0 object-cover"
                      src="https://images.unsplash.com/photo-1475688621402-4257c812d6db?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=967&q=80"
                      alt="image"
                    />
                    {/* Overlay */}
                    {/* <div className="overlay bg-gray-800 bg-opacity-25 w-full h-full absolute left-0 top-0 hidden">
                      <div className="flex justify-center items-center space-x-4 h-full">
                        <span className="p-2">
                          <i className="fas fa-heart"></i>
                          120K
                        </span>

                        <span className="p-2">
                          <i className="fas fa-comment"></i>
                          3,909
                        </span>
                      </div>
                    </div> */}
                  </article>
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

        </div>
    )
}

export default profileView