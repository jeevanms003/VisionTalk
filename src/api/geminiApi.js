import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("apikey");

export async function getImageDescription(base64Image) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const result = await model.generateContent([
    {
      inlineData: {
        mimeType: "image/jpeg",
        data: base64Image,
      },
    },
    {
      text: "Give complete detailed information about the image , i need like 100-200 words and don't use asterisk and also brother don't describe the background just describe the just which is there in the image",
    },
  ]);

  const response = await result.response;
  return response.text();
}