import { tavily } from "@tavily/core"; 

const tvly = tavily({ apiKey: process.env.TAVILY_API_KEY });

export const searchInternet = async ({ query }) => {
    try {
        const response = await tvly.search({
            query: query,
            maxResults: 5,
            searchDepth: "advanced"
        });
        
        // Parsing the complex JSON array into clean text readable for free models
        if (response && response.results && response.results.length > 0) {
            const cleanText = response.results.map((result, index) => {
                return `Result ${index + 1}: ${result.title}\nContent: ${result.content}\n`;
            }).join("\n");
            
            return cleanText;
        }
        
        return "No relevant live internet results found.";
    } catch (error) {
        console.error("Tavily Search Error inside service:", error.message);
        throw error;
    }
};