import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IdentityTab } from "./components/IdentityTab";
import { SearchTab } from "./components/SearchTab";
import { ChatTab } from "./components/ChatTab";
import { ClerkLoaded, UserButton } from "@clerk/nextjs";

const LinkPage = () => {
  return (
    <ClerkLoaded>
      <div className="grid grid-rows-[auto_1fr_auto] min-h-screen font-[family-name:var(--font-outfit)]">
        <div className="w-full p-4 flex items-center justify-center bg-gray-50 border-b border-gray-300">
          <h1 className="text-2xl inline-block">
            🔗{" "}
            <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-lmu-crimson to-lmu-blue">
              LMU
            </span>
          </h1>
          <div className="absolute right-[18px] top-[18px]">
            <UserButton />
          </div>
        </div>
        <Tabs
          defaultValue="identity"
          className="w-full grid grid-rows-[auto_1fr] bg-gray-50"
        >
          <TabsList className="w-full h-full py-4 px-8 grid grid-cols-3 gap-4 bg-gray-50">
            <TabsTrigger
              value="identity"
              className="flex-1 rounded-full p-2 text-lg"
            >
              Identity
            </TabsTrigger>
            <TabsTrigger
              value="search"
              className="flex-1 rounded-full p-2 text-lg"
            >
              Search
            </TabsTrigger>
            <TabsTrigger
              value="chat"
              className="flex-1 rounded-full p-2 text-lg"
            >
              Chat
            </TabsTrigger>
          </TabsList>
          <TabsContent value="identity" className="h-full">
            <IdentityTab />
          </TabsContent>
          <TabsContent value="search" className="h-full">
            <SearchTab />
          </TabsContent>
          <TabsContent value="chat" className="h-full">
            <ChatTab />
          </TabsContent>
        </Tabs>
        <footer className="w-full p-4 bg-white">footer</footer>
      </div>
    </ClerkLoaded>
  );
};

export default LinkPage;
