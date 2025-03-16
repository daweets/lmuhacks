import { Session, Chatbox } from "@talkjs/react";

interface ChatProps {
  currentUserId: string;
  otherUserId: string;
}

export default function Chat({ currentUserId, otherUserId }: ChatProps) {
  const conversationId = [currentUserId, otherUserId].sort().join("_");

  return (
    <Session appId="tIcVPi9c" userId={currentUserId}>
      <Chatbox conversationId={conversationId} style={{ height: "500px" }} />
    </Session>
  );
}
