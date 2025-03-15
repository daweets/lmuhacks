import Chip from "@/components/ui/chip";

export const IdentityTab = () => {
  return (
    <div className="p-8 grid grid-cols-2 text-lg">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-bold">🎓 Education</h2>
          <div className="flex flex-wrap gap-2">
            <Chip>Computer Science</Chip>
            <Chip>Economics</Chip>
          </div>
        </div>
        <div>
          <h2 className="text-xl font-bold">💡 Interests</h2>
          <div className="flex flex-wrap gap-2">
            <Chip>Gym</Chip>
            <Chip>Rock Climbing</Chip>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-xl p-8">✨ AI Summary</div>
    </div>
  );
};
