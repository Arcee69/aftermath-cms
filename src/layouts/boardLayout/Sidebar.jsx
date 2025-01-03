import React from "react";
import { useNavigate, NavLink, useLocation } from "react-router-dom";
// import logo from "../../assets/icons/educontest-logo.svg";
import logo from "../../assets/icons/noa_logo.svg";
import { Navigation } from "react-minimal-side-navigation";
import "react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css";
import dashboardIcon from "../../assets/icons/dashboard.svg";

// import LogoutIcon from "@mui/icons-material/Logout";
// import { useUser } from "../../../providers/userDetailsProvider";


export default function Sidebar() {
  const navigate = useNavigate();
  // const { logout } = useUser();


  const location = useLocation()


  const menuItems = [
      {
          title: "View News",
          children: false,
          itemId: '/view-news',
          icon: () => (
            <img src={dashboardIcon} alt="icon" />
          ),
      
      },
      {
          title: "Create News",
          children: false,
          itemId: '/create-news',
          icon: () => (
            <img src={dashboardIcon} alt="icon" />
          ),
      },
      {
          title: "View Gallery",
          children: false,
          itemId: '/gallery',
          icon: () => (
            <img src={dashboardIcon} alt="icon" />
          ),
      },
      {
        title: "Speeches",
        children: false,
        itemId: '/speeches',
        icon: () => (
          <img src={dashboardIcon} alt="icon" />
        ),
    },
      
  ];

  

  return (
    <>
      <div className="w-full h-[76px] bg-[#F0F6FF] flex justify-center items-center"> {/* 175px */}
        <img
          src={logo}
          alt="logo"
          loading="lazy"
          className=" z-30 cursor-pointer h-[41px] w-44" //h-[41px] w-[45px]
          onClick={() => navigate("/view-news")}
        />
       
      </div>
      <div className="w-full">
        <div className="px-[10%] py-[8%] flex flex-col gap-8 "> {/* px-[20%] */}
          <Navigation
                activeItemId={location.pathname}
                onSelect={({ itemId }) => {
                    navigate(itemId, { state: { title: "title" } });
                    // handleClose()
                }}
                items={menuItems.map((list) => ({
                title: (
                    <p className="text-lg ">
                        {list?.title}
                    </p>
                ),
                    itemId: list?.itemId,
                    elemBefore: list?.icon,
                    subNav: list?.children && list?.subNav,
                }))}
          />
        </div>
        {/* <div className="px-[20%] py-[12%] mt-[90%]">
          <LogoutIcon className="cursor-pointer" onClick={logout} />
        </div> */}
      </div>
    </>
  );
}
