import ImageEditor from "../../components/ImageEditor";
import SideBar from "../../components/sideBar";
import UploadImage from "../../service/cloudinaryService";
import { useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { useEffect,useContext } from "react";
import getProfile from "../../service/getProfile";
import { useState } from "react";
import { FaSpinner } from "react-icons/fa";
import NewMessageNotificatoin from "../../components/messageNotification";
import { SocketContext } from "../../context/socket";
import { removeUserCredential } from "../../store/authSlice";

const Profile = () => {

  const socket=useContext(SocketContext)


  const userInfo = useSelector((state) => state.auth.userInfo);
  const userName = useSelector((state) => state.auth.userInfo.userName);
  const userId = userInfo._id;
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [nickName, setNickName] = useState(userName);
  const [profession, setProfession] = useState("profession");
  const [bio, setBio] = useState("bio");
  const [image, setImage] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getProfile(userId);
      
        if (res.status) {
          setNickName(res.response.nickName);

          setBio(res.response.bio);

          setProfession(res.response.profession);

          setImage(res.response.imageUrl)
        }else{
          setImage('https://res.cloudinary.com/dwqtoz0ig/image/upload/v1717488014/nearbychat/gsu4hmgkwyy286tmq1wp.png')
        }
      } catch (error) {
        console.error("Failed to fetch profile", error);
      }
    };

    fetchProfile();
    return () => {};
  }, []);

  const nickNameChange = (e) => {
    setNickName(e.target.value);
  };

  const profesionChange = (e) => {
    setProfession(e.target.value);
  };
  const bioChange = (e) => {
    setBio(e.target.value);
  };

  const gotoedit = () => {
    navigate("/editProfile");
  };


  const [newMessage,setNewMessage]=useState(null)

 
  useEffect(()=>{
    socket.on('newMessageNotification',(response)=>{
      
      setNewMessage(response)
    })

    return ()=>{
      socket.off('newMessageNotification')
    }
  })


  useEffect(()=>{
    socket.on('blockedUser',()=>{
      alert('Your account has been blocked.');
      dispatch(removeUserCredential());
     
      navigate('/login');
    })

    return ()=>{
      socket.off('blockedUser')
    }

  })



  return (
    <div class="component-background-black">
      {newMessage&&!newMessage.currentStatus&&<NewMessageNotificatoin  message={newMessage}   setIsOpen={setNewMessage} />}
      <SideBar current='Profile' />

      <br></br>

      <main
        className="bg-gray-100 bg-opacity-25"
        style={{ paddingLeft: "200px" }}
      >
        <div className="lg:w-8/12 lg:mx-auto mb-8">
          <header className="flex flex-wrap items-center p-4 md:py-8">
            <div className="md:w-3/12 md:ml-16">
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
              )}
            </div>

            <div className="w-8/12 md:w-7/12 ml-4">
              <div className="md:flex md:flex-wrap md:items-center mb-4">
                <input
                  type="text"
                  className="text-3xl inline-block font-light md:mr-2 mb-2 sm:mb-0"
                  value={nickName}
                  onChange={nickNameChange}
                />

                <span
                  className="inline-block fas fa-certificate fa-lg text-blue-500 relative mr-6 text-xl transform -translate-y-2"
                  aria-hidden="true"
                >
                  <i className="fas fa-check text-white text-xs absolute inset-x-0 ml-1 mt-px"></i>
                </span>
              </div>

              <ul className="hidden md:flex space-x-8 mb-4">
                <li>
                  <span className="font-semibold">136</span> posts
                </li>

                <li>
                  <span className="font-semibold">302</span> Connections
                </li>
              </ul>

              <div className="hidden md:block">
                <input
                  type="text"
                  className="font-semibold  mb-0 block"
                  value={nickName}
                  onChange={nickNameChange}
                />
                <input
                  type="text"
                  className="mb-0 block"
                  value={profession}
                  onChange={profesionChange}
                />

                <input
                  type="text"
                  className="block"
                  value={bio}
                  onChange={bioChange}
                />
              </div>
            </div>

            <div className="md:hidden text-sm my-2">
              <h1 className="font-semibold">Mr Travlerrr...</h1>
              <span>Travel, Nature and Music</span>
              <p>Lorem ipsum dolor sit amet consectetur</p>
            </div>
          </header>

          <div style={{ paddingLeft: "310px" }}>
            <button
              onClick={gotoedit}
              className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            >
              Edit Profile
            </button>
          </div>

          <br></br>




          {/* <div className="px-px md:px-3">
            {" "}
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
            <ul className="flex items-center justify-around md:justify-center space-x-12 uppercase tracking-widest font-semibold text-xs text-gray-600 border-t">
              <li className="md:border-t md:border-gray-700 md:-mt-px md:text-gray-700">
                <a className="inline-block p-3" href="#">
                  <i className="fas fa-th-large text-xl md:text-xs"></i>
                  <span className="hidden md:inline">post</span>
                </a>
              </li>
            </ul>
            <div className="flex flex-wrap -mx-px md:-mx-3">
              <div className="w-1/3 p-px md:px-3">
                <a href="#">
                  <article className="post bg-gray-100 text-white relative pb-full md:mb-6">
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
                  </article>
                </a>
              </div>
            </div>
          </div> */}







        </div>
      </main>
    </div>
  );
};

export default Profile;
