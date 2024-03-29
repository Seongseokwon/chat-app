"use client";
import useConversation from "@/hooks/useConversation";
import { FullConversationType } from "@/types";
import { User } from "@prisma/client";
import { useEffect, useState } from "react";
import { MdOutlineGroupAdd } from "react-icons/md";
import ConversationBox from "./ConversationBox";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import { pusherClient } from "@/libs/pusher";
import { find } from "lodash";
import GroupChatModal from "@/components/modals/GroupChatModal";
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
  const { conversationId, isOpen } = useConversation();
  const [items, setItems] = useState<FullConversationType[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const session = useSession();

  const pusherKey = session.data?.user?.email;

  useEffect(() => {
    setItems(() => initialItems);
  }, [initialItems]);

  useEffect(() => {
    if (!pusherKey) {
      return;
    }

    const updateHandler = (conversation: FullConversationType) => {
      setItems((current) =>
        current.map((currentConversation) => {
          if (currentConversation.id === conversation.id) {
            return {
              ...currentConversation,
              messages: conversation.messages,
            };
          }
          return currentConversation;
        })
      );
    };

    const newHandler = (conversation: FullConversationType) => {
      setItems((current) => {
        if (find(current, { id: conversation.id })) {
          return current;
        }
        return [conversation, ...current];
      });
    };

    const removeHandler = (conversation: FullConversationType) => {
      setItems((current) =>
        current.filter((currentConversation) => {
          return currentConversation.id !== conversation.id;
        })
      );
    };
    pusherClient.subscribe(pusherKey);
    pusherClient.bind("conversation:new", newHandler);
    pusherClient.bind("conversation:update", updateHandler);
    pusherClient.bind("conversation:remove", removeHandler);

    return () => {
      pusherClient.subscribe(pusherKey);
      pusherClient.unbind("conversation:new");
      pusherClient.unbind("conversation:update");
      pusherClient.bind("conversation:remove", updateHandler);
    };
  }, [pusherKey]);
  return (
    <>
      <GroupChatModal
        users={users}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
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
          {items?.map((item) => (
            <ConversationBox
              key={item.id}
              data={item}
              selected={conversationId === item.id}
            />
          ))}
        </div>
      </aside>
    </>
  );
};

export default ConversationList;
