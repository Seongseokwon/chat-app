"use client";

import useRoutes from "@/hooks/useRoutes";
import { User } from "@prisma/client";
import { useState } from "react";
import DesktopItem from "./DesktopItem";
import Avatar from "../Avatar";

type DesktopSidebarProps = {
  currentUser: User;
};

const DesktopSidebar = ({ currentUser }: DesktopSidebarProps) => {
  const routes = useRoutes();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div
      className={`
      hidden
      lg:fixed
      lg: inset-y-0
      lg:left-0
      lg:z-40
      xl:px-6
      lg:overflow-y-auto
      lg:bg-orange-400
      lg:border-r
      lg:pb-4
      lg:flex
      lg:flex-col
      justify-between
    `}
    >
      <nav
        className={`
        flex
        flex-col
        justify-between
        mt-4
      `}
      >
        <ul className={`flex flex-col items-center space-y-1`}>
          {routes.map((route, i) => (
            <DesktopItem
              key={route.label}
              href={`${route.href}`}
              label={route.label}
              icon={route.icon}
              active={route.active}
              onClick={route.onClick}
            />
          ))}
        </ul>
      </nav>
      <nav
        className={`
        flex
        flex-col
        items-center
        justify-between
        mt-4
      `}
      >
        <div
          className={`
          transition
          cursor-pointer
          hover:opacity-70
        `}
          role="presentation"
          onClick={() => setIsOpen(true)}
        >
          <Avatar user={currentUser} />
        </div>
      </nav>
    </div>
  );
};

export default DesktopSidebar;
