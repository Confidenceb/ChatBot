/*

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ChatLayout() {
  return (
    <div className="max-w-4xl h-screen mx-auto text-gray-100 w-full flex flex-col justify-between bg-gray-9 00 px-4 ">
      
      <div className="flex-1 overflow-y-auto py-4 space-y-4">
        
        <div className="flex justify-end">
          <div className="bg-gray-700 px-4 py-2 rounded-lg max-w-md">
            I'm building a chat-bot using ReactJS and Tailwind. I've started
            though I'll provide you the code I've written.
          </div>
        </div>
        <div className="flex justify-start">
          <div className="px-4 py-2 rounded-lg max-w-md">
            Feel free to share the code you've written so far. I can help review
            it, suggest improvements, or assist with any specific issues you
            might be encountering.
          </div>
        </div>
      </div>
      <div className="py-4">
        <input
          type="text"
          className="px-4 py-2 bg-gray-700 w-full text-sm rounded-lg"
          placeholder="Message Chat-Bot"
        />
      </div>
      <p className="text-gray-400 align-middle">
        Chat-Bot can make mistakes. Check important info.
      </p>
    </div>
  );
}

export default ChatLayout;

*/

import { useState } from "react";

function ChatLayout() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [botResponse, setBotResponse] = useState(""); // Holds the typewriting message text

  // Step 1: Define bot responses with regex patterns
  const predefinedResponses = [
    {
      pattern: /hello|hi|hey/i,
      response: "Hi there! How can I help you today?",
    },
    { pattern: /weather/i, response: "The weather today is sunny and clear." },
    { pattern: /time/i, response: "The current time is 12:00 PM." },
    { pattern: /bye/i, response: "Goodbye! Have a great day!" },
    {
      pattern: /.*/,
      response: "I'm sorry, I don't understand. Can you rephrase?",
    }, // Default response
  ];

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (inputValue.trim() === "") return;

    const newMessage = {
      id: messages.length + 1,
      text: inputValue,
      sender: "user",
    };

    setMessages([...messages, newMessage]);
    setInputValue(""); // Clear the input field

    // Simulate bot typing with typewriter effect
    setTimeout(() => {
      const botMessageText = getBotResponse(inputValue); // Get response based on user input
      startTypewriterEffect(botMessageText);
    }, 1000); // 1 second delay before bot starts typing
  };

  // Step 2: Function to get the bot response by matching user input to regex patterns
  const getBotResponse = (userInput) => {
    let response = "I'm sorry, I don't understand."; // Default response

    // Normalize user input (lowercase and trimmed)
    const normalizedInput = userInput.toLowerCase().trim();

    // Loop through predefined responses to find a match
    for (let item of predefinedResponses) {
      if (item.pattern.test(normalizedInput)) {
        response = item.response;
        break; // Stop when the first match is found
      }
    }
    return response;
  };

  const startTypewriterEffect = (text) => {
    setBotResponse(""); // Clear the response
    let index = 0;
    let accumulatedText = ""; // Local variable to accumulate the characters

    const typeInterval = setInterval(() => {
      if (index < text.length) {
        accumulatedText += text.charAt(index); // Add each character to the local variable
        index++;

        // Only update the state every few characters to avoid skipping
        if (index % 2 === 0 || index === text.length) {
          setBotResponse(accumulatedText); // Update state with accumulated characters
        }
      } else {
        clearInterval(typeInterval);

        // After typewriter finishes, add the message to the messages array
        const newBotMessage = {
          id: messages.length + 2,
          text: accumulatedText,
          sender: "bot",
        };
        setMessages((prevMessages) => [...prevMessages, newBotMessage]);
        setBotResponse(""); // Clear the botResponse once the message is saved
      }
    }, 50); // Delay between each character in the typewriter effect
  };

  return (
    <div className="max-w-4xl h-screen mx-auto text-gray-100 w-full flex flex-col justify-between bg-gray-900 px-4">
      {/* Chat Messages Section */}
      <div className="flex-1 overflow-y-auto py-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div className="bg-gray-700 px-4 py-2 rounded-lg max-w-md relative">
              <p>{message.text}</p>
            </div>
          </div>
        ))}

        {/* Typewriter effect for bot's response */}
        {botResponse && (
          <div className="flex justify-start">
            <div className="bg-gray-700 px-4 py-2 rounded-lg max-w-md relative">
              <p>{botResponse}</p>
            </div>
          </div>
        )}
      </div>

      {/* Input Field Section */}
      <div className="py-4">
        <form onSubmit={handleSendMessage}>
          <input
            type="text"
            className="px-4 py-2 bg-gray-700 w-full text-sm rounded-lg"
            placeholder="Message Chat-Bot"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </form>
      </div>
    </div>
  );
}

export default ChatLayout;

const predefinedResponses = {
  hello: "Hi there! How can I help you?",
  hi: "Good day and how can I help you today?",
  weather: "The weather today is sunny and clear.",
  time: "The current time is 12:00 PM.",
  bye: "Goodbye! Have a great day!",
  default: "I'm sorry, I don't understand. Can you rephrase?",
};
