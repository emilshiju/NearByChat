import { useEffect, useState, useContext } from "react";
import Menus from "../lib/sideBar";
import ViewSidebarRoundedIcon from "@mui/icons-material/ViewSidebarRounded";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import HomeIcon from "@mui/icons-material/Home";
import api from "../route/interceptors";
import { Link } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate, useParams } from "react-router-dom";
import { removeUserCredential } from "../store/authSlice";
import { useDispatch } from "react-redux";

import {
  Responsive,
  responsiveContext,
  SideBarContext,
} from "../context/createContext";

const Sidebar = ({ current }) => {
  // const [open, setOpen] = useState(true);
  const dispatch = useDispatch();
  const { open, setOpen } = useContext(SideBarContext);
  const [showFullBar, setShowFullBar] = useState(false);

  const onChangeFullBar = () => {
    setShowFullBar(!showFullBar);
  };

  const { responsiveMd, setResponsiveMd } = useContext(responsiveContext);

  const [screenHeight, setScreenHeight] = useState();
  const [screenWidth, setScreenWidht] = useState();

  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(removeUserCredential());
    navigate("/login");
  };

  const screenwidth = window.screen.width;
  const screenheight = window.screen.height;

  if (screenwidth <= 915 && screenheight <= 915) {
    setOpen(false);
    setResponsiveMd(false);
  } else {
    // setOpen(true)
    setResponsiveMd(true);
  }

  return (
    <>
      {open ? (
        <>
          <div className="flex  ">
            <div
              className={`${
                open ? "w-72" : "w-20"
              } bg-black p-5 pt-14  h-screen  fixed overscroll-none nrelative duration-300m   `}
            >
              <div className="flex gap-x-4 items-center">
                <img
                  className={`cursor-pointer duration-500 ${
                    open && "rotate-[360deg]"
                  }`}
                />
                <h1
                  className={`text-white origin-left font-medium text-xl duration-200 ${
                    !open && "scale-0"
                  }`}
                >
                  Near BY Chat
                </h1>
              </div>
              <ul className="pt-6">
                {Menus.map((Menu, index) => (
                  <li
                    key={index}
                    className={`flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 ${
                      Menu.gap ? "mt-9" : "mt-2"
                    } ${index === 0 && "bg-light-white"}`}
                  >
                    <Link
                      to={Menu.link}
                      className="flex items-center gap-x-4 w-full"
                    >
                      <Menu.icon />

                      <span
                        className={`${
                          !open && "hidden"
                        } origin-left duration-200 ${
                          Menu.title == current && "text-blue-500"
                        }  scale-108 `}
                      >
                        {Menu.title}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>

              <div
                className=" flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center "
                style={{ paddingTop: "30px" }}
                onClick={handleLogout}
              >
                <div className="flex items-center gap-x-4 w-full">
                  <LogoutIcon />
                  <span
                    className={`${!open && "hidden"} origin-left duration-200`}
                  >
                    Logout
                  </span>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <ViewSidebarRoundedIcon
            className={`absolute cursor-pointer left-3 top-3 w-7 z-50 border-dark-purple border-2  ${
              showFullBar && " text-white"
            } ${!showFullBar && "rounded-full "} ${!open && "rotate-180"}`}
            onClick={onChangeFullBar}
          />

          {showFullBar && (
            <div className="flex  ">
              <div
                className="
          w-60 z-40
         bg-black p-5 pt-14  h-screen  fixed overscroll-none nrelative duration-300m"
              >
                <div className="flex gap-x-4 items-center">
                  <img
                    className={`cursor-pointer duration-500 ${
                      open && "rotate-[360deg]"
                    }`}
                  />
                  <h1
                    className={`text-white origin-left font-medium text-xl duration-200 ${
                      !open && "scale-0"
                    }`}
                  >
                    Near BY Chat
                  </h1>
                </div>
                <ul className="pt-6">
                  {Menus.map((Menu, index) => (
                    <li
                      key={index}
                      className={`flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 ${
                        Menu.gap ? "mt-9" : "mt-2"
                      } ${index === 0 && "bg-light-white"}`}
                    >
                      <Link
                        to={Menu.link}
                        className="flex items-center gap-x-4 w-full"
                      >
                        <Menu.icon />

                        <span
                          className={` origin-left duration-200 ${
                            Menu.title == current && "text-blue-500"
                          }  scale-108 `}
                        >
                          {Menu.title}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>

                <div
                  className=" flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center "
                  style={{ paddingTop: "30px" }}
                  onClick={handleLogout}
                >
                  <div className="flex items-center gap-x-4 w-full">
                    <LogoutIcon />
                    <span className={` origin-left duration-200`}>Logout</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Sidebar;
