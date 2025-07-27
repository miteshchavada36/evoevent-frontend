import {
  IconChevronRight,
  IconLayoutDashboard,
  IconLogout,
  IconSettings,
  IconUserCircle,
} from "@tabler/icons-react";

const brand_name = "APP";

const is_dark_mode = false;

const sidebar_menu = [
  {
    id: 1,
    name: "Dashboard",
    slug: "dashboard",
    status: "active",
    icon: <IconLayoutDashboard className="icon" />,
  },
  {
    id: 2,
    name: "Exam",
    slug: "submenus",
    status: "active",
    submenu: [
      {
        id: 1,
        name: "Sub menu 1",
        slug: "sub_menu_1",
        status: "active",
        icon: <IconChevronRight className="icon" />,
      },
      {
        id: 1,
        name: "Sub menu 2",
        slug: "sub_menu_2",
        status: "active",
        icon: <IconChevronRight className="icon" />,
      },
    ],
  },
];

const profile_menu = [
  // {
  //   id: 1,
  //   name: "Profile",
  //   slug: "prfile",
  //   status: "active",
  //   icon: <IconUserCircle className="icon me-2" />,
  // },
  // {
  //   id: 2,
  //   name: "Setting",
  //   slug: "setting",
  //   status: "active",
  //   icon: <IconSettings className="icon me-2" />,
  // },
  {
    id: 3,
    name: "Logout",
    slug: "logout",
    status: "active",
    icon: <IconLogout className="icon me-2" />,
  },
];

const user_details = {
  name: "Alexander Pierce",
  profile_picture: "",
  role: "Admin",
};

export { brand_name, sidebar_menu, profile_menu, is_dark_mode, user_details };
