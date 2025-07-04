import Sidebar from "../../components/sideBar";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect, useContext } from "react";
import api from "../../route/interceptors";
import { SideBarContext } from "../../context/createContext";
import { responsiveContext } from "../../context/createContext";
const Settings = () => {
  const navigate = useNavigate();

  const userInfo = useSelector((state) => state.auth.userInfo);
  const userId = userInfo._id;

  const [userDetails, setUserDetails] = useState(null);

  const { open, setOpen } = useContext(SideBarContext);
  const { responsiveMd, setResponsiveMd } = useContext(responsiveContext);

  useEffect(() => {
    api.get(`/displayUserDetails/${userId}`).then((res) => {
      if (res.data.data) {
        setUserDetails(res.data.data);
      }
    });
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toISOString().split("T")[0]; // Extract the date part in YYYY-MM-DD format
  };

  const onChangeToOrderSummary = () => {
    navigate("/orderSummary");
  };

  const onChangeToEditUser = () => {
    navigate("/editUserDetails");
  };

  const onChangeToFogotPassword = () => {
    navigate("/forgotPassword");
  };

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleResize = () => {
    const screenWidth = window.screen.width;
    const screenHeight = window.screen.height;

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
      <Sidebar current="settings" />
      <div
        className={`flex justify-start flex-col lg:flex-row`} // Changed to flex-col for smaller screens
        style={{
          paddingLeft: open ? "350px" : responsiveMd ? "110px" : "0px",
          marginTop: "100px",
        }}
      >
        <form className="w-full max-w-lg px-4 lg:px-0">
          {" "}
          {/* Added padding for smaller screens */}
          <h1 className="text-3xl font-bold mb-4 font-sans">
            Personal Details
          </h1>
          <br />
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
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-first-name"
              >
                userName
              </label>
              <input
                className="appearance-none block w-full bg-gray-100 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-first-name"
                type="text"
                placeholder="Jane"
                value={userDetails?.userName}
                readOnly
              />
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-last-name"
              >
                dob
              </label>
              <input
                className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-last-name"
                type="text"
                placeholder="Doe"
                value={formatDate(userDetails?.dob)}
                readOnly
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-email"
              >
                Email
              </label>
              <input
                className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-email"
                type="text"
                placeholder=""
                value={userDetails?.email}
                readOnly
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-role"
              >
                Role
              </label>
              <input
                className="appearance-none block w-full bg-gray-100 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-role"
                type="text"
                placeholder="Jane"
                value={userDetails?.role}
                readOnly
              />
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-gender"
              >
                gender
              </label>
              <input
                className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-gender"
                type="text"
                value={userDetails?.gender}
                placeholder="Doe"
                readOnly
              />
            </div>
          </div>
        </form>
        <div className="hidden lg:block h-[200px] w-[1px] bg-black ml-20"></div>{" "}
        {/* Hidden divider on smaller screens */}
        {responsiveMd && (
          <div className="ml-2 mt-6 lg:mt-0">
            {" "}
            {/* Added margin-top for smaller screens */}
            <div
              className="inline-flex items-center px-4 py-3 rounded-lg w-full bg-gray-50 cursor-pointer mb-4" // Added cursor-pointer and margin-bottom
              onClick={onChangeToOrderSummary}
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
              className="inline-flex items-center px-4 py-3 rounded-lg w-full bg-gray-50 cursor-pointer mb-4" // Added cursor-pointer and margin-bottom
              onClick={onChangeToEditUser}
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
            <div
              className="inline-flex items-center px-4 py-3 rounded-lg w-full bg-gray-50 cursor-pointer mb-4" // Added cursor-pointer and margin-bottom
              onClick={onChangeToFogotPassword}
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
              <span className="ms-2">Forgot Password</span>
            </div>
          </div>
        )}
        {isOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
            <div
              className="inline-flex items-center px-4 py-3 rounded-lg w-full bg-gray-50 hover:bg-gray-100 cursor-pointer"
              onClick={onChangeToEditUser}
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
              edit user Details
            </div>

            <div
              className="inline-flex items-center px-4 py-3 rounded-lg w-full bg-gray-50 hover:bg-gray-100 cursor-pointer"
              onClick={onChangeToOrderSummary}
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
              onClick={onChangeToFogotPassword}
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
              <span className="ms-2">Forgot Password</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings;
