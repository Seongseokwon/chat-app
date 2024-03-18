import Avatar from "@/components/Avatar";
import AvatarGroup from "@/components/AvatarGroup";
import useOtherUser from "@/hooks/useOtheruser";
import { FullConversationType } from "@/types";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { format } from "date-fns";

type ConversationBoxProps = {
  data: FullConversationType;
  selected?: boolean;
};

const ConversationBox = ({ data, selected }: ConversationBoxProps) => {
  const otherUser = useOtherUser(data);
  const session = useSession();
  const router = useRouter();

  const lastMessage = useMemo(() => {
    const messages = data.messages || [];
    return messages[data.messages.length - 1];
  }, [data.messages]);

  const lastMessageText = useMemo(() => {
    if (lastMessage?.image) {
      return "Sent an image";
    }

    if (lastMessage?.body) {
      return lastMessage.body;
    }

    return "대화를 시작했습니다.";
  }, [lastMessage]);

  const userEmail = session?.data?.user?.email;

  const hasSeen = useMemo(() => {
    if (!lastMessage) {
      return false;
    }

    if (!userEmail) {
      return false;
    }

    const seenArray = lastMessage.seen || [];
    return seenArray.filter((user) => user.email === userEmail).length !== 0;
  }, [userEmail, lastMessage]);

  const handleClick = () => {
    router.push(`/conversations/${data.id}`);
  };
  return (
    <div
      role="presentation"
      onClick={handleClick}
      className={clsx(
        `
    w-full
    relative
    flex
    items-center
    space-x-3
    p-3
    hover:bg-neutral-100
    rounded-lg
    transition
    cursor-pointer
    mb-3
  `,
        selected ? "bg-neutral-300" : "bg-white"
      )}
    >
      {data.isGroup ? (
        <AvatarGroup users={data.users} />
      ) : (
        <Avatar user={otherUser} />
      )}
      <div className="flex-1 min-w-0">
        <div className="focus:outline-none">
          <div className="flex items-center justify-between mb-1">
            <p className="font-medium text-gray-900 text-md">
              {data.name || otherUser.name}
            </p>
            {lastMessage?.createdAt && (
              <p className="text-xs font-light text-gray-400">
                {format(new Date(lastMessage.createdAt), "p")}
              </p>
            )}
          </div>
          <p
            className={clsx(
              `
           truncate
           text-sm
          `,
              hasSeen ? "text-gray-500" : "text-black font-medium"
            )}
          >
            {lastMessageText}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConversationBox;
