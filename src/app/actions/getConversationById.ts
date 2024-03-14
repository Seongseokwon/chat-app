import getCurrentUser from "./getCurrentUser";
import prisma from "@/libs/prismadb";

const getConversationById = async (conversationId: string) => {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return null;
    }

    const conversation = await prisma.conversation.findUnique({
      where: {
        id: conversationId,
      },
      include: {
        users: true,
      },
    });
    return conversation;
  } catch (err) {
    return null;
  }
};

export default getConversationById;
