import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const LinkPage = () => {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-screen font-[family-name:var(--font-outfit)]">
      <div className="w-full p-4 flex items-center justify-center bg-gray-100 border-b border-gray-300">
        <h1 className="text-2xl inline-block">
          Link @{" "}
          <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-lmu-crimson to-lmu-blue">
            LMU
          </span>
        </h1>
      </div>
      <Tabs
        defaultValue="identity"
        className="w-full grid grid-rows-[auto_1fr]"
      >
        <TabsList className="w-full h-full p-2 grid grid-cols-3">
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
          <TabsTrigger value="chat" className="flex-1 rounded-full p-2 text-lg">
            Chat
          </TabsTrigger>
        </TabsList>
        <TabsContent value="identity" className="h-full p-4">
          identity
        </TabsContent>
        <TabsContent value="search" className="h-full p-4">
          search
        </TabsContent>
        <TabsContent value="chat" className="h-full p-4">
          chat
        </TabsContent>
      </Tabs>
      <footer className="w-full p-4 bg-gray-200">footer</footer>
    </div>
  );
};

export default LinkPage;
