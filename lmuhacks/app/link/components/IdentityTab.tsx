"use client";
import Chip from "@/components/ui/chip";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { X, Plus } from "lucide-react";

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

export const IdentityTab = () => {
  const [education, setEducation] = useState<string[]>([]);
  const [interests, setInterests] = useState<string[]>([]);
  const [newEducation, setNewEducation] = useState("");
  const [newInterest, setNewInterest] = useState("");
  const [summary, setSummary] = useState("");

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
      setSummary(data.output);
    } catch (error) {
      console.error("Error generating summary:", error);
    }
  };

  return (
    <div className="p-8 flex flex-col-reverse gap-8 md:grid md:grid-cols-2 md:gap-8 text-lg h-full">
      <div className="flex flex-col gap-4">
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
      <div className="flex flex-col gap-2 bg-white rounded-xl p-8 h-full shadow-lg">
        <h2 className="text-xl font-bold">✨ AI Summary</h2>
        <p className="text-md text-gray-500">
          Add at least 5 personality chips to generate your summary
        </p>
        <button
          onClick={generateSummary}
          className="bg-blue-500 text-white rounded-md p-2 mt-4"
        >
          Generate Summary
        </button>
        {summary && <pre className="mt-4">{summary}</pre>}
      </div>
    </div>
  );
};