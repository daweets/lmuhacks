import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(request: NextRequest) {
  const apiKey = process.env.GOOGLE_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ error: 'API key not found' }, { status: 500 });
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  try {
    const { education, interests } = await request.json();

    // Prompt for username generation
    const usernamePrompt = `Generate a random, creative, and human-readable username. It should be a combination of words and numbers, like "MerryLocket4245".`;

    const usernameResult = await model.generateContent(usernamePrompt);
    const usernameResponse = await usernameResult.response;
    const gamerTag = usernameResponse.text().trim(); // Extract the username

    // Prompt for summary generation (as before)
    const summaryPrompt = `Generate a summary based on the following education and interests:
      Education: ${education.join(', ')}
      Interests: ${interests.join(', ')}
    `;

    const summaryResult = await model.generateContent(summaryPrompt);
    const summaryResponse = await summaryResult.response;
    const summary = summaryResponse.text().trim();

    const outputString = `Gamer Tag: ${gamerTag}\nSummary: ${summary}`;

    return NextResponse.json({ output: outputString });
  } catch (error) {
    console.error('Error generating summary:', error);
    return NextResponse.json({ error: 'Failed to generate summary' }, { status: 500 });
  }
  
}

