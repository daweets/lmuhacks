"use client";
import Chip from "@/components/ui/chip";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { X, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { cn } from "@/lib/utils";

const SUGGESTED_MAJORS = [
  "Computer Science",
  "Business Administration",
  "Psychology",
  "Biology",
  "Engineering",
  "Communication",
  "Art",
];

const SUGGESTED_INTERESTS = [
  "Sports",
  "Music",
  "Art",
  "Reading",
  "Travel",
  "Photography",
  "Gaming",
  "Cooking",
];

export const IdentityTab = ({ onSearch }: { onSearch: () => void }) => {
  const { user } = useUser();
  const [education, setEducation] = useState<string[]>([]);
  const [interests, setInterests] = useState<string[]>([]);
  const [newEducation, setNewEducation] = useState("");
  const [newInterest, setNewInterest] = useState("");
  const [gamerTag, setGamerTag] = useState("");
  const [summary, setSummary] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const totalChips = education.length + interests.length;
  const canGenerate = totalChips >= 5;

  const removeEducation = (item: string) => {
    setEducation(education.filter((i) => i !== item));
  };

  const removeInterest = (item: string) => {
    setInterests(interests.filter((i) => i !== item));
  };

  const addEducation = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && newEducation.trim()) {
      setEducation([...education, newEducation.trim()]);
      setNewEducation("");
    }
  };

  const addInterest = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && newInterest.trim()) {
      setInterests([...interests, newInterest.trim()]);
      setNewInterest("");
    }
  };

  const addSuggestedMajor = (major: string) => {
    if (!education.includes(major)) {
      setEducation([...education, major]);
    }
  };

  const addSuggestedInterest = (interest: string) => {
    if (!interests.includes(interest)) {
      setInterests([...interests, interest]);
    }
  };

  const generateSummary = async () => {
    if (!canGenerate) return;

    setIsLoading(true);
    try {
      const requestBody = JSON.stringify({
        education: education,
        interests: interests,
      });

      const response = await fetch("/api/generateSummary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: requestBody,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setGamerTag(data.gamerTag);
      setSummary(data.summary);
    } catch (error) {
      console.error("Error generating summary:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!gamerTag || !summary || !user) return;

    setIsSaving(true);
    try {
      const response = await fetch("/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.id,
          gamertag: gamerTag,
          summary: summary,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      onSearch();
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setIsSaving(false);
    }
  };

  useEffect(() => {
    if (canGenerate && !isLoading) {
      generateSummary();
    }
  }, [education, interests]);

  return (
    <div className="p-8 flex flex-col-reverse gap-8 md:grid md:grid-cols-2 md:gap-8 text-lg h-full">
      <div className="motion-preset-blur-up flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-bold">🎓 Education</h2>
          <div className="flex flex-col gap-2">
            <Input
              type="text"
              placeholder="Add information about your education"
              className="w-full rounded-3xl shadow-none bg-white"
              value={newEducation}
              onChange={(e) => setNewEducation(e.target.value)}
              onKeyDown={addEducation}
            />
            <div className="flex flex-wrap gap-2 mt-2">
              {SUGGESTED_MAJORS.filter(
                (major) => !education.includes(major)
              ).map((major) => (
                <Chip
                  key={major}
                  variant="suggestion"
                  onClick={() => addSuggestedMajor(major)}
                >
                  {major}
                  <Plus size={14} className="ml-2" />
                </Chip>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              {education.map((item) => (
                <Chip key={item} variant="selected" className="pr-2">
                  {item}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeEducation(item);
                    }}
                    className="mx-2"
                  >
                    <X size={14} />
                  </button>
                </Chip>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-bold">💡 Interests</h2>
          <div className="flex flex-col gap-2">
            <Input
              type="text"
              placeholder="Add your interests"
              className="w-full rounded-3xl shadow-none bg-white"
              value={newInterest}
              onChange={(e) => setNewInterest(e.target.value)}
              onKeyDown={addInterest}
            />
            <div className="flex flex-wrap gap-2 mt-2">
              {SUGGESTED_INTERESTS.filter(
                (interest) => !interests.includes(interest)
              ).map((interest) => (
                <Chip
                  key={interest}
                  variant="suggestion"
                  onClick={() => addSuggestedInterest(interest)}
                >
                  {interest}
                  <Plus size={14} className="ml-2" />
                </Chip>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              {interests.map((item) => (
                <Chip key={item} variant="selected" className="pr-2">
                  {item}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeInterest(item);
                    }}
                    className="mx-2"
                  >
                    <X size={14} />
                  </button>
                </Chip>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div
        className={cn(
          `motion-preset-blur-up motion-delay-300 relative flex flex-col gap-2 bg-white rounded-xl p-8 h-full ${
            summary && "shadow-lg scale-[101%] duration-500"
          } transition-all`
        )}
      >
        <h2 className="text-xl font-bold">✨ Your Summary</h2>
        <p className="text-md text-gray-500">
          {!canGenerate
            ? `Add ${5 - totalChips} more chip${
                5 - totalChips === 1 ? "" : "s"
              } to generate your summary`
            : isLoading
            ? "Generating your summary..."
            : summary || "Add or remove chips to generate a new summary"}
        </p>
        <Button
          variant="outline"
          className="absolute bottom-4 right-4 rounded-full"
          onClick={handleSearch}
          disabled={!gamerTag || !summary || isSaving}
        >
          {isSaving ? "Saving..." : "Search"}
        </Button>
      </div>
    </div>
  );
};
