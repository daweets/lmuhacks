import Chat from "@/components/ui/chat";
import { useUser } from "@clerk/nextjs";

interface ChatTabProps {
  selectedUser: { gamertag: string; userId: string } | null;
}

export const ChatTab = ({ selectedUser }: ChatTabProps) => {
  const { user } = useUser();

  if (!selectedUser || !user) {
    return (
      <div className="h-full flex items-center justify-center text-gray-500">
        Select a user from search to start chatting
      </div>
    );
  }

  return (
    <div className="h-full p-8">
      <Chat currentUserId={user.id} otherUserId={selectedUser.userId} />
    </div>
  );
};
