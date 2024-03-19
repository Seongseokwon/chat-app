import PusherServer from "pusher";
import PusherClient from "pusher-js";

export const pusherSever = new PusherServer({
  appId: process.env.PUSHER_APP_ID as string,
  key: process.env.NEXT_PUBLIC_PUSHER_KEY as string,
  secret: process.env.PUSHER_SECRET as string,
  cluster: process.env.PUSHER_CLUSTER as string,
  useTLS: true,
});

export const pusherClient = new PusherClient(
  process.env.NEXT_PUBLIC_PUSHER_KEY as string,
  {
    channelAuthorization: {
      endpoint: "/api/pusher/auth",
      transport: "ajax",
    },
    cluster: "ap3",
  }
);
