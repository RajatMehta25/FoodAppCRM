import React from "react";

import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as RiIcons from "react-icons/ri";
import * as BiIcons from "react-icons/bi";
import * as mdIcons from "react-icons/md";
import * as BsIcons from "react-icons/bs";
import * as MdIcons from "react-icons/md";

export const SidebarData = [
  {
    title: "Dashboard",
    path: "/adminPanel/dashboard",
    icon: <RiIcons.RiDashboardLine />,
  },
  {
    title: "User Management",
    path: "/adminPanel/user",
    icon: <FaIcons.FaUser />,
  },
  {
    title: "Agent Management",
    path: "/adminPanel/agent",
    icon: <FaIcons.FaUserTie />,
  },
  {
    title: "Merchant Management",
    path: "/adminPanel/merchant",
    icon: <AiIcons.AiFillShop />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    subNav: [
      {
        title: "Pending Merchant",
        path: "/adminPanel/merchant_pending",
        icon: <RiIcons.RiErrorWarningFill />,
      },
      {
        title: "Approved Merchant",
        path: "/adminPanel/merchant_approve",
        icon: <BsIcons.BsFillCheckCircleFill />,
      },
      {
        title: "Disapproved Merchant",
        path: "/adminPanel/merchant_disapprove",
        icon: <AiIcons.AiFillCloseCircle />,
      },
    ],
  },

  {
    title: "Subscription Plans",
    path: "/adminPanel/subscription",
    icon: <AiIcons.AiFillDollarCircle />,
  },
  {
    title: "Category Management",
    path: "/adminPanel/category",
    icon: <BiIcons.BiCategory />,
  },
  
  {
    title: "Order Management",
    path: "/adminPanel/order",
    icon: <BsIcons.BsFillCartFill />,
  },
  {
    title: "Content Management",
    path: "/adminPanel/content",
    icon: <BiIcons.BiBookContent />,
  },
  {
    title: "SubAdmin Management",
    path: "/adminPanel/subAdmin",
    icon: <RiIcons.RiAdminFill />,
  },
  // {
  //     title: "Buyer Management",
  //     path: "/adminPanel/user",
  //     icon: <FaIcons.FaUser/>,
  // },
  // {
  //   title: "Agent Management",
  //   path: "/adminPanel/agent",
  //   icon: <FaIcons.FaHospitalUser />,
  //   iconClosed: <RiIcons.RiArrowDownSFill />,
  //   iconOpened: <RiIcons.RiArrowUpSFill />,
  //   subNav: [
  //     {
  //       title: "Pending Agent",
  //       path: "/adminPanel/agent-pending",
  //       icon: <IoIcons.IoIosPaper />,
  //     },
  //     {
  //       title: "Approved Agent",
  //       path: "/adminPanel/agent-approve",
  //       icon: <IoIcons.IoIosPaper />,
  //     },
  //     {
  //       title: "Disapproved Agent",
  //       path: "/adminPanel/agent-disapprove",
  //       icon: <IoIcons.IoIosPaper />,
  //     },
  //   ],
  // },
  // {
  //     title: "Seller Management",
  //     path: "/adminPanel/owner",
  //     icon: <FaIcons.FaUserClock/>,
  // },
  {
    title: "Notification Management",
    path: "/adminPanel/notification",
    icon: <RiIcons.RiNotification3Fill />,
  },
  {
    title: "Contact Us",
    path: "/adminPanel/contact",
    icon: <MdIcons.MdContactPhone />,
  },
  // {
  //     title: "Subscription Management",
  //     path: "/adminPanel/subscription",
  //     icon: <mdIcons.MdSubscriptions/>,
  // },
  // {
  //     title: "Manage Service Area",
  //     path: "/adminPanel/manage-service-area",
  //     icon: <FaIcons.FaChartArea/>,
  // },
  // {
  //     title: "Property Management",
  //     path: "/adminPanel/property",
  //     icon: <BiIcons.BsFillHouseDoorFill/>,
  // },
  // {
  //     title: "Content Management",
  //     path: "/adminPanel/content",
  //     icon: <BiIcons.BsBookmarkFill/>,
  // },
  // {
  //     title: "Faq Management",
  //     path: "/adminPanel/faq",
  //     icon: <FaIcons.FaQuestion/>,
  // },
  // {
  //     title: "Lead Management",
  //     path: "/adminPanel/lead",
  //     icon: <mdIcons.MdAreaChart/>,
  // }
];
