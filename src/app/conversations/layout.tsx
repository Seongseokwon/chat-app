import Sidebar from "@/components/sidebar/Sidebar";
import { ReactNode } from "react";

type ConversationLayoutProps = {
  children: ReactNode;
};

const ConversationLayout = ({ children }: ConversationLayoutProps) => {
  return (
    <Sidebar>
      <div className="h-full">{children}</div>
    </Sidebar>
  );
};

export default ConversationLayout;
