import Sidebar from "../../components/sideBar";
import { useSelector } from "react-redux";
import { useState, useEffect, useRef, useContext } from "react";
import api from "../../route/interceptors";
import { otpSend, verifyOtp } from "../../service/otp";
import { ToastContainer, toast } from "react-toastify";

import { useNavigate } from "react-router-dom";

import { SideBarContext } from "../../context/createContext";
import { responsiveContext } from "../../context/createContext";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const userInfo = useSelector((state) => state.auth.userInfo);
  const userId = userInfo._id;

  const timer = useRef(null);

  const [changePassword, setChangePassword] = useState(false);

  const [userDetails, setUserDetails] = useState(null);

  const [enterOtp, setenterOtp] = useState(false);

  const [otp, setOtp] = useState("");

  const [timeLeft, setTimeLeft] = useState(60);

  const buttonRef = useRef(null);

  const onCloseChangePassword = () => {
    setChangePassword(false);
    setenterOtp(false);
  };

  const showToastMessage = () => {
    toast.error("Otp Not correct!", {
      position: "top-right",
      autoClose: 1000,
    });
  };

  const showSucessToastMessage = () => {
    toast.success("sucesfuly updated!", {
      position: "top-right",
      autoClose: 1000,
      onClose: onCloseChangePassword(),
    });
  };

  useEffect(() => {
    api.get(`/displayUserDetails/${userId}`).then((res) => {
      if (res.data.data) {
        setUserDetails(res.data.data);
      }
    });

    return () => {
      if (timer.current) {
        clearInterval(timer.current);
        timer.current = null;
      }
    };
  }, []);

  const onChangeOtp = (e) => {
    setOtp(e.target.value);
  };

  const ongetOtp = (e) => {
    e.preventDefault();

    setenterOtp(true);

    otpSend(userDetails?.email);

    timer.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer.current); // Clear interval when timer reaches 0
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const onSubmitOtp = (e) => {
    e.preventDefault();

    verifyOtp(userDetails?.email, otp).then((status) => {
      if (status) {
        if (timer.current) {
          clearInterval(timer.current);
          timer.current = null;
          setOtp("");
          setTimeLeft(60);
        }

        setChangePassword(true);
      } else {
        showToastMessage();
      }
    });
  };

  const [newPassword, setNewPassword] = useState("");
  const [conformPassword, setConformPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);
  const [conformErrorMessage, setConformErrorMessage] = useState(false);

  const onChangeNewPassword = (e) => {
    const value = e.target.value;
    setNewPassword(value);

    if (value.length < 6) {
      setErrorMessage(true);
      return false;
    } else {
      setErrorMessage(false);
      return true;
    }
  };

  const onkeyDownChangePassword = () => {
    if (newPassword.length < 6) {
      setErrorMessage(true);
      return false;
    } else {
      setErrorMessage(false);
      return true;
    }
  };

  const onChangeConformPassword = (e) => {
    const value = e.target.value;

    setConformPassword(value);

    if (newPassword !== value) {
      setConformErrorMessage(true);
      return false;
    } else {
      setConformErrorMessage(false);
      return true;
    }
  };

  const onkeyDownChangeConformPassword = () => {
    if (newPassword !== conformPassword) {
      setConformErrorMessage(true);
      return false;
    } else {
      setConformErrorMessage(false);
      return true;
    }
  };

  const onSubmitNewPassword = (e) => {
    e.preventDefault();

    const isValidPassword = onChangeNewPassword({
      target: { value: newPassword },
    });
    const isValidCPasswor = onChangeConformPassword({
      target: { value: conformPassword },
    });

    if (isValidPassword && isValidCPasswor) {
      api
        .patch("/changePassword", { password: newPassword, userId: userId })
        .then((res) => {
          if (res.data.status) {
            showSucessToastMessage();
          }
        });
    }
  };

  const redirectUserDetails = () => {
    navigate("/settings");
  };

  const redirectOrderSummary = () => {
    navigate("/orderSummary");
  };

  const redirectEditUser = () => {
    navigate("/editUserDetails");
  };

  const { open, setOpen } = useContext(SideBarContext);
  const { responsiveMd, setResponsiveMd } = useContext(responsiveContext);

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

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
      {responsiveMd && <Sidebar current="settings" />}
      <ToastContainer />

      <div
        className="flex justify-start"
        style={{
          paddingLeft: open ? "350px" : responsiveMd ? "150px" : "30px",
          marginTop: "100px",
        }}
      >
        <form className="w-full max-w-lg">
          <h1 className="text-3xl font-bold mb-4 font-sans">
            For Got Passport
          </h1>
          <br></br>

          {!responsiveMd && (
            <button
              type="button"
              style={{
                position: "absolute", // or 'fixed' if you want it to stay on top while scrolling
                top: "10px", // adjust as needed
                right: "10px", // adjust as needed
                zIndex: 9999, // a high value to ensure it's on top
              }}
              onClick={toggleDropdown}
            >
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  clipRule="evenodd"
                  fillRule="evenodd"
                  d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                />
              </svg>
            </button>
          )}

          {enterOtp ? (
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Enter Otp
                </label>
                <input
                  className=" block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="newOne"
                  type="text"
                  placeholder=""
                  value={otp}
                  onChange={onChangeOtp}
                />

                <div className="flex space-x-4">
                  <button
                    ref={buttonRef}
                    className={`w-full mt-8 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ${
                      timeLeft > 0 ? "cursor-not-allowed" : "cursor-pointer"
                    }`}
                    onClick={ongetOtp}
                    disabled={timeLeft > 0} // Disable button if timeLeft > 0
                  >
                    {timeLeft > 0 ? `Resend OTP in ${timeLeft}s` : "Resend OTP"}
                  </button>

                  <button
                    className="w-full mt-8 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    onClick={onSubmitOtp}
                  >
                    Submit Otp
                  </button>
                </div>

                {/* <p className="text-gray-600 text-xs italic">Make it as long and as crazy as you'd like</p> */}
              </div>
            </div>
          ) : (
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Email
                </label>
                <input
                  className={`appearance-none block  ${
                    open ? "w-full" : "w-[200px]"
                  }  bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}
                  id="grid-password"
                  type="text"
                  value={userDetails?.email}
                  placeholder=""
                  readOnly
                />

                <button
                  className="w-full mt-8 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                  onClick={ongetOtp}
                >
                  get OTP
                </button>
                {/* <p className="text-gray-600 text-xs italic">Make it as long and as crazy as you'd like</p> */}
              </div>
            </div>
          )}
        </form>

        <div className="h-[200px] w-[1px] bg-black ml-20"></div>
        {responsiveMd && (
          <div className="ml-2">
            <div
              onClick={redirectUserDetails}
              className="inline-flex items-center px-4 py-3 rounded-lg  w-full bg-gray-50  border-gray-800 "
            >
              <svg
                className="w-4 h-4 me-2 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 18 18"
              >
                <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
              </svg>
              User Details
            </div>

            <br></br>

            <div
              onClick={redirectOrderSummary}
              className="inline-flex items-center px-4 py-3 rounded-lg w-full bg-gray-50"
            >
              <div className="border border-gray-300 p-1 rounded">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M21 3H3c-1.1 0-1.99.9-1.99 2L1 19c0 1.1.89 2 1.99 2H21c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H3V5h18v14zm-11-1h2v-5h3l-4-4-4 4h3z" />
                </svg>
              </div>
              <span className="ms-2">Order Summary</span>
            </div>
            <br></br>

            <div
              onClick={redirectEditUser}
              className="inline-flex items-center px-4 py-3 rounded-lg w-full bg-gray-50"
            >
              <div className="border border-gray-300 p-1 rounded">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M3 17.25V21h3.75l11.1-11.1-3.75-3.75L3 17.25zm2.5 0L14.25 8.5l2.75 2.75L8.25 20H5.5v-2.75zm13.25-9.5c.14-.14.35-.14.49 0l2.12 2.12c.14.14.14.35 0 .49l-1.12 1.12-2.75-2.75 1.12-1.12z" />
                </svg>
              </div>
              <span className="ms-2">Edit User Details</span>
            </div>
            <br></br>
          </div>
        )}

        {isOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
            <div
              className="inline-flex items-center px-4 py-3 rounded-lg w-full bg-gray-50 hover:bg-gray-100 cursor-pointer"
              onClick={redirectUserDetails}
            >
              <svg
                className="w-4 h-4 me-2 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 18 18"
              >
                <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
              </svg>
              User Details
            </div>

            <div
              className="inline-flex items-center px-4 py-3 rounded-lg w-full bg-gray-50 hover:bg-gray-100 cursor-pointer"
              onClick={redirectOrderSummary}
            >
              <div className="border border-gray-300 p-1 rounded">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M21 3H3c-1.1 0-1.99.9-1.99 2L1 19c0 1.1.89 2 1.99 2H21c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H3V5h18v14zm-11-1h2v-5h3l-4-4-4 4h3z" />
                </svg>
              </div>
              <span className="ms-2">Order Summary</span>
            </div>

            <div
              className="inline-flex items-center px-4 py-3 rounded-lg w-full bg-gray-50 hover:bg-gray-100 cursor-pointer"
              onClick={redirectEditUser}
            >
              <div className="border border-gray-300 p-1 rounded">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 1c-3.86 0-7 3.14-7 7 0 2.97 1.94 5.48 4.65 6.34.14.04.24.15.24.29v.7c0 .28-.22.5-.5.5H7v2h1.5v1.5h-5V18H6v-1.5H4v-2h2.85c.63 0 1.15-.52 1.15-1.15v-.7c0-.14-.1-.25-.24-.29A7.007 7.007 0 0 1 5 8c0-3.31 2.69-6 6-6s6 2.69 6 6h-2l2.25 3L20 8h-2c0-3.86-3.14-7-7-7zm-2.5 15v2H14v-2h-4.5z" />
                </svg>
              </div>
              <span className="ms-2">edit user details</span>
            </div>
          </div>
        )}
      </div>

      {changePassword && (
        <div className="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50">
          <div className="relative p-4 w-full max-w-md">
            <div className="relative bg-white rounded-lg shadow ">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t ">
                <h3 className="text-xl font-semibold text-gray-900 ">
                  create new Password
                </h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200  rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center  "
                  onClick={onCloseChangePassword}
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7L1 13"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>

              <div className="p-4 md:p-5">
                <form className="space-y-4" action="#">
                  <div>
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      new password
                    </label>
                    <input
                      type="test"
                      name="password"
                      id="password"
                      placeholder="••••••••"
                      value={newPassword}
                      onChange={onChangeNewPassword}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                      required
                    />
                  </div>
                  {errorMessage && (
                    <p className="text-red-500 text-xs italic">
                      must be above 6{" "}
                    </p>
                  )}
                  <div>
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      conform password
                    </label>
                    <input
                      type="test"
                      name="password"
                      id="password"
                      value={conformPassword}
                      onChange={onChangeConformPassword}
                      placeholder="••••••••"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                      required
                    />
                  </div>
                  {conformErrorMessage && (
                    <p className="text-red-500 text-xs pt-2 italic">
                      Password and conform password must be same
                    </p>
                  )}

                  <button
                    onClick={onSubmitNewPassword}
                    className="w-full mt-8 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                  >
                    save
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
