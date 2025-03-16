"use client";
import Talk from "talkjs";
import { useUser } from "@clerk/nextjs"; // Import useUser from Clerk
import { useEffect, useRef } from "react";

// Define the props interface for ChatTab
interface ChatTabProps {
  selectedUser: { gamertag: string; userId: string } | null;
}

// Define the ChatTab component
const ChatTab: React.FC<ChatTabProps> = ({ selectedUser }) => {
  const { user } = useUser(); // Get the current user from Clerk
  const chatboxContainerRef = useRef<HTMLDivElement>(null); // Ref for the chatbox container

  useEffect(() => {
    if (!user || !selectedUser) return;

    const initializeChat = async () => {
      await Talk.ready;

      // Create TalkJS users
      const currentUser = new Talk.User({
        id: user.id,
        name: user.fullName || "Anonymous",
        email: user.emailAddresses[0]?.emailAddress || null, // Pass null if no email
        photoUrl: user.imageUrl || null, // Pass null if no photo URL
        role: "default",
      });

      const otherUser = new Talk.User({
        id: selectedUser.userId,
        name: selectedUser.gamertag,
        email: null, // Pass null if no email is available
        photoUrl: null, // Pass null if no photo URL is available
        role: "default",
      });

      // Create a TalkJS session
      const session = new Talk.Session({
        appId: "tIcVPi9c", // Replace with your TalkJS app ID
        me: currentUser,
      });

      // Create a conversation
      const conversationId = [user.id, selectedUser.userId].sort().join("_");
      const conversation = session.getOrCreateConversation(conversationId);
      conversation.setParticipant(currentUser);
      conversation.setParticipant(otherUser);

      // Mount the chatbox
      if (chatboxContainerRef.current) {
        const chatbox = session.createChatbox();
        chatbox.select(conversation);
        chatbox.mount(chatboxContainerRef.current);
      }
    };

    initializeChat().catch((error) => {
      console.error("Error initializing TalkJS chat:", error);
    });

    // Cleanup on unmount
    return () => {
      if (chatboxContainerRef.current) {
        chatboxContainerRef.current.innerHTML = "";
      }
    };
  }, [user, selectedUser]);

  if (!user) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">You must be logged in to start a chat.</p>
      </div>
    );
  }

  if (!selectedUser) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">Select a user to start chatting.</p>
      </div>
    );
  }

  return (
    <div className="h-full p-4">
      <div ref={chatboxContainerRef} className="h-full w-full"></div>
    </div>
  );
};

export default ChatTab;
