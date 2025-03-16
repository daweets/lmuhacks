import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

import { createClerkClient } from "@clerk/backend";

const clerkClient = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY,
});

export async function POST() {
  const apiKey = process.env.GOOGLE_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ error: "API key not found" }, { status: 500 });
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  try {
    const { data } = await clerkClient.users.getUserList({
      limit: 100,
    });

    console.log(data);

    const peopleData = data.map((user) => ({
      gamertag: user.publicMetadata.gamertag,
      summary: user.publicMetadata.summary,
      userId: user.id,
    }));

    console.log("People data:", peopleData);

    // Prompt for summary generation (as before)
    const searchPrompt = `Choose up to 10 people from the following list of people and limit the results to a max of 10. If the list is empty, return an empty people array.

      People:
      ${JSON.stringify(peopleData)}

      Return ONLY a JSON object in the following format, with no additional text or formatting:
      {
        "people": [{
          "gamertag": "string",
          "summary": "string",
          "userId": "string"
        }, ...]
      }
    `;

    console.log("Search prompt:", searchPrompt);

    const searchResult = await model.generateContent(searchPrompt);
    const searchResponse = await searchResult.response;
    const search = searchResponse.text().trim();

    console.log("AI response:", search);

    // Clean up the response and validate JSON
    const cleanedSearch = search.replace(/^```json\n|\n```$/g, "").trim();

    console.log("Cleaned response:", cleanedSearch);

    // Validate that it's proper JSON with the expected structure
    try {
      const parsed = JSON.parse(cleanedSearch);
      console.log("Parsed response:", parsed);

      if (!parsed.people || !Array.isArray(parsed.people)) {
        throw new Error("Invalid response structure");
      }

      // Ensure each person has the required fields
      const validatedPeople = parsed.people.map(
        (person: { gamertag: string; summary: string; userId: string }) => ({
          gamertag: person.gamertag || "Unknown",
          summary: person.summary || "No summary available",
          userId: person.userId || "unknown",
        })
      );

      console.log("Final response:", { search: { people: validatedPeople } });

      return NextResponse.json({ search: { people: validatedPeople } });
    } catch (error) {
      console.error("Error parsing AI response:", error);
      return NextResponse.json({ search: { people: [] } });
    }
  } catch (error) {
    console.error("Error generating summary:", error);
    return NextResponse.json(
      { error: "Failed to generate summary" },
      { status: 500 }
    );
  }
}
