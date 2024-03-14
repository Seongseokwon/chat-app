"use client";
import useConversation from "@/hooks/useConversation";
import useRoutes from "@/hooks/useRoutes";
import MobileItem from "./MobileItem";

type MobileFooterProps = {};

const MobileFooter = ({}: MobileFooterProps) => {
  const routes = useRoutes();
  const { isOpen, conversationId } = useConversation();

  if (isOpen) {
    return null;
  }

  return (
    <div
      className={`
        fixed
        justify-between
        w-full
        bottom-0
        z-40
        flex
        items-center
        bg-white
        border-t
        lg:hidden
      `}
    >
      {routes.map((route) => (
        <MobileItem
          key={route.href}
          href={`${route.href}`}
          active={route.active}
          icon={route.icon}
          onClick={route.onClick}
        />
      ))}
    </div>
  );
};

export default MobileFooter;
