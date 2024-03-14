import Sidebar from "@/components/sidebar/Sidebar";
import { ReactNode } from "react";
import UserList from "./components/UserList";
import getUsers from "../actions/getUsers";

type UserLayoutProps = {
  children: ReactNode;
};

const UserLayout = async ({ children }: UserLayoutProps) => {
  const users = await getUsers();
  return (
    <Sidebar>
      <div className="h-full">
        <UserList userList={users} />
        {children}
      </div>
    </Sidebar>
  );
};

export default UserLayout;
