import getConversationById from "@/app/actions/getConversationById";
import getMessages from "@/app/actions/getMessages";
import EmptyState from "@/components/EmptyState";
import Header from "./components/Header";
import Body from "./components/Body";
import Form from "./components/Form";

type ConversationDetailProps = {
  params: {
    conversationId: string;
  };
};

const ConversationDetail = async ({
  params: { conversationId },
}: ConversationDetailProps) => {
  const conversation = await getConversationById(conversationId);
  const messages = await getMessages(conversationId);

  if (!conversation) {
    return (
      <div className="h-full lg:pl-80">
        <div className="flex flex-col h-full">
          <EmptyState />
        </div>
      </div>
    );
  }
  return (
    <div className="h-full lg:pl-80">
      <div className="flex flex-col h-full">
        <Header conversation={conversation} />
        {/* <Body initialMessage={messages} /> */}
        <Form />
      </div>
    </div>
  );
};

export default ConversationDetail;
