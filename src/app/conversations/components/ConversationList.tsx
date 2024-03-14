"use client";
import useConversation from "@/hooks/useConversation";
import { FullConversationType } from "@/types";
import { User } from "@prisma/client";
import { useState } from "react";
import { MdOutlineGroupAdd } from "react-icons/md";
import ConversationBox from "./ConversationBox";
import clsx from "clsx";
type ConversationListProps = {
  initialItems: FullConversationType[];
  users: User[];
  title: string;
};

const ConversationList = ({
  initialItems,
  users,
  title,
}: ConversationListProps) => {
  const [items, setItems] = useState(initialItems);
  const { conversationId, isOpen } = useConversation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <aside
      className={clsx(
        `
      fixed
      inset-y-0
      pb-20
      lg:pb-0
      lg:left-20
      lg:w-80
      lg:block
      overflow-y-auto
      border-r
      border-gray-200
      `,
        isOpen ? "hidden" : "block w-full left-40"
      )}
    >
      <div className="px-5">
        <div className="flex justify-between pt-4 mb-4">
          <div className="text-2xl font-bold text-neutral-800 ">채팅 앱</div>

          <div
            onClick={() => {
              setIsModalOpen(true);
            }}
            className="p-2 text-gray-600 transition bg-gray-100 rounded-full cursor-pointer hover:opacity-75"
          >
            <MdOutlineGroupAdd size={20} />
          </div>
        </div>
      </div>
      {items.map((item) => (
        <ConversationBox
          key={item.id}
          data={item}
          selected={conversationId === item.id}
        />
      ))}
    </aside>
  );
};

export default ConversationList;
