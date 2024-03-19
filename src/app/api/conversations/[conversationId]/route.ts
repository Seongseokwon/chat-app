import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/prismadb";
import { pusherSever } from "@/libs/pusher";

interface IParam {
  conversationId: string;
}

export async function DELETE(req: NextRequest, { params }: { params: IParam }) {
  try {
    const { conversationId } = params;
    const currentUser = await getCurrentUser();

    if (!currentUser?.id) {
      return NextResponse.json(null);
    }

    const existingConversation = await prisma.conversation.findUnique({
      where: {
        id: conversationId,
      },
      include: {
        users: true,
      },
    });

    if (!existingConversation) {
      return new NextResponse("Invalid Id", { status: 404 });
    }

    const deletedConversation = await prisma.conversation.deleteMany({
      where: {
        id: conversationId,
        userIds: {
          hasSome: [currentUser.id],
        },
      },
    });

    existingConversation.users.forEach((user) => {
      if (user.email) {
        pusherSever.trigger(
          user.email,
          "conversation:remove",
          existingConversation
        );
      }
    });
    return NextResponse.json(deletedConversation);
  } catch (err) {
    return NextResponse.json(null);
  }
}
