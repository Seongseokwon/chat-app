import { User } from "@prisma/client";
import UserBox from "./UserBox";

type UserListProps = {
  userList: User[];
};

const UserList = ({ userList }: UserListProps) => {
  return (
    <aside
      className={`
      fixed
      inset-y-0
      left-0
      block
      w-full
      pb-20
      overflow-y-auto
      border-r
      border-gray-200
      lg:pb-0
      lg:left-20
      lg:w-80
      lg:block
    `}
    >
      <div className="px-5">
        <div className="flex-col">
          <div className="py-4 text-2xl font-bold text-neutral-800">사람들</div>
        </div>
        {userList.map((user) => (
          <UserBox key={user.id} user={user} />
        ))}
      </div>
    </aside>
  );
};

export default UserList;
