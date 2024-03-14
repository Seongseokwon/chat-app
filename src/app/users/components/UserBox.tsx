"use client";

import Avatar from "@/components/Avatar";
import LoadingModal from "@/components/modals/LoadingModal";
import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

type UserBoxProps = {
  user: User;
};

const UserBox = ({ user }: UserBoxProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setIsLoading(true);
    axios
      .post("/api/conversations", { userId: user.id })
      .then((data: any) => {
        router.push(`/conversations/${data.data.id}`);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return (
    <>
      {isLoading ? <LoadingModal /> : null}
      <div
        onClick={handleClick}
        className="w-full relative flex items-center space-x-3 bg-white p-3 hover:bg-neutral-100 rounded-lg transition cursor-pointer"
      >
        <Avatar user={user} />
        <div className="min-w-0 flex-1">
          <div className="focus:outline-none">
            <div className="flex justify-between items-center mb-1 ">
              <p className="text-sm font-medium text-gray-900">{user?.name}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserBox;
