import { Session, Chatbox } from "@talkjs/react";

export default function Chat() {
  return (
    <Session appId="tIcVPi9c" userId="sample_user_alice">
      <Chatbox conversationId="sample_conversation" style={{ height: "500px" }} />
    </Session>
  );
}
