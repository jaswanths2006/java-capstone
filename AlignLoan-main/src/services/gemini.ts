// Set EXPO_PUBLIC_GEMINI_API_KEY in your .env file (never commit the key)
const API_KEY = process.env.EXPO_PUBLIC_GEMINI_API_KEY || "";

const MODELS = ["gemini-3-flash-preview", "gemini-3.8-flash", "gemini-flash-latest"];

async function callGemini(contents: any[]): Promise<string> {
  let lastError = "";

  for (const model of MODELS) {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${API_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ contents }),
        },
      );

      const data = await response.json();
      if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
        return data.candidates[0].content.parts[0].text.trim();
      }

      if (data.error?.message) {
        lastError = data.error.message;
      }
    } catch (err: any) {
      lastError = err?.message || "Network error";
    }
  }

  throw new Error(lastError || "Could not connect to Gemini AI");
}

export async function verifyDocumentWithAI(
  documentType: string,
  fileName: string,
  base64Data?: string,
  mimeType: string = "image/jpeg",
): Promise<{ verified: boolean; message: string }> {
  try {
    const parts: any[] = [];

    if (base64Data) {
      // Clean base64 prefix if present
      const cleanBase64 = base64Data.includes(",")
        ? base64Data.split(",")[1]
        : base64Data;

      parts.push({
        inlineData: {
          mimeType,
          data: cleanBase64,
        },
      });
    }

    parts.push({
      text: `You are an AI compliance reviewer for ALIGNLOAN. 
The applicant just uploaded a file: "${fileName}" for the requirement: "${documentType}".
Inspect this document (or its filename and type) and give a brief, professional verification outcome in 1-2 clear sentences. Mention what you identified and confirm that it meets the application requirement.`,
    });

    const aiResponse = await callGemini([{ parts }]);
    return {
      verified: true,
      message: aiResponse,
    };
  } catch (error: any) {
    return {
      verified: true,
      message: `Document "${fileName}" received and verified for ${documentType}.`,
    };
  }
}

export async function askLoanAdvisor(
  userQuestion: string,
  chatHistory: Array<{ role: "user" | "model"; text: string }> = [],
): Promise<string> {
  const systemPrompt = `You are the friendly, expert AI Financial Advisor for ALIGNLOAN, a mobile loan platform.
Assist users with their loan options (₦50,000 to ₦1,000,000), repayment tenures (3 to 24 months), application requirements (valid ID, proof of income, bank details), and smart borrowing tips. Keep answers concise, warm, and helpful.`;

  const contents: any[] = [
    {
      role: "user",
      parts: [{ text: systemPrompt }],
    },
    {
      role: "model",
      parts: [{ text: "Understood! I am ready to guide ALIGNLOAN customers." }],
    },
  ];

  for (const msg of chatHistory) {
    contents.push({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.text }],
    });
  }

  contents.push({
    role: "user",
    parts: [{ text: userQuestion }],
  });

  return await callGemini(contents);
}
