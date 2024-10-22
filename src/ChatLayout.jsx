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

import React, { useState, useEffect, useRef } from "react";

function ChatLayout() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [currentStep, setCurrentStep] = useState(""); // Tracks which part of the interaction we are in
  const [values, setValues] = useState({}); // Stores the values provided by the user (opposite, adjacent, hypotenuse)
  const [botResponse, setBotResponse] = useState("");
  const chatContainerRef = useRef(null); // Reference to the chat container for scrolling

  // Predefined greetings and responses
  const predefinedResponses = [
    {
      pattern: /h(i|y+)|what('s up|s up)|hello|how('s it going| are you)/i,
      response: "Hi there! How can I help you today?",
    },
    {
      pattern: /\bweather\b/i, // Ensure "weather" is matched as a whole word
      response: "The weather today is sunny and clear.",
    },
    {
      // pattern: /\btime\b/i, // Ensure "time" is matched as a whole word
      pattern: /\btime\b/i,
      response: `The current time is ${new Date().toLocaleTimeString()}.`,
    },
    {
      pattern: /\bbye\b/i,
      response: "Goodbye! Have a great day!",
    },
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
    setInputValue("");

    setTimeout(() => {
      handlePythagorasConversation(inputValue);
    }, 1000);
  };

  const handlePythagorasConversation = (userInput) => {
    let response = "";

    // Normalize input for easier handling
    const normalizedInput = userInput.toLowerCase().trim();

    // Check predefined responses first
    const predefinedResponse = predefinedResponses.find((entry) =>
      entry.pattern.test(normalizedInput)
    );
    if (predefinedResponse) {
      response = predefinedResponse.response;
      startTypewriterEffect(response);
      return;
    }

    // Step 1: Check if the user is initiating a Pythagorean calculation
    if (
      /calculate|solve|find/i.test(normalizedInput) &&
      /(hypotenuse|opposite|adjacent)/i.test(normalizedInput)
    ) {
      const find = normalizedInput
        .match(/hypotenuse|opposite|adjacent/i)[0]
        .toLowerCase();
      setCurrentStep(find);

      if (find === "hypotenuse") {
        response =
          "To calculate the hypotenuse, please provide the opposite side.";
      } else if (find === "opposite") {
        response =
          "To calculate the opposite side, please provide the hypotenuse.";
      } else if (find === "adjacent") {
        response =
          "To calculate the adjacent side, please provide the hypotenuse.";
      }
    }
    // Step 2: Handle cases where user provides numeric inputs for calculations
    else if (currentStep) {
      const cleanedInput = userInput.replace(/[^\d.]/g, "").trim();
      const value = parseFloat(cleanedInput);

      if (isNaN(value)) {
        response = "Please provide a valid number.";
      } else {
        if (currentStep === "hypotenuse") {
          if (!values.opposite) {
            setValues({ ...values, opposite: value });
            response = "Great! Now, please provide the adjacent side.";
          } else {
            const hypotenuse = Math.sqrt(
              values.opposite ** 2 + value ** 2
            ).toFixed(2);
            response = `The hypotenuse is: ${hypotenuse}`;
            resetConversation();
          }
        } else if (currentStep === "opposite") {
          if (!values.hypotenuse) {
            setValues({ ...values, hypotenuse: value });
            response = "Great! Now, please provide the adjacent side.";
          } else {
            const opposite = Math.sqrt(
              values.hypotenuse ** 2 - value ** 2
            ).toFixed(2);
            response = `The opposite side is: ${opposite}`;
            resetConversation();
          }
        } else if (currentStep === "adjacent") {
          if (!values.hypotenuse) {
            setValues({ ...values, hypotenuse: value });
            response = "Great! Now, please provide the opposite side.";
          } else {
            const adjacent = Math.sqrt(
              values.hypotenuse ** 2 - value ** 2
            ).toFixed(2);
            response = `The adjacent side is: ${adjacent}`;
            resetConversation();
          }
        }
      }
    }
    // Step 3: Default response when no match is found
    else {
      response = "I'm sorry, I don't understand. Can you rephrase?";
    }

    startTypewriterEffect(response);
  };

  const resetConversation = () => {
    setCurrentStep("");
    setValues({});
  };

  const startTypewriterEffect = (text) => {
    setBotResponse(""); // Clear any existing response
    let index = 0;
    let accumulatedText = "";

    const typeInterval = setInterval(() => {
      if (index < text.length) {
        accumulatedText += text.charAt(index);
        index++;

        if (index % 2 === 0 || index === text.length) {
          setBotResponse(accumulatedText);

          // Scroll during the typing effect
          if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop =
              chatContainerRef.current.scrollHeight;
          }
        }
      } else {
        clearInterval(typeInterval); // Stop the interval once all text is displayed

        const newBotMessage = {
          id: messages.length + 2,
          text: accumulatedText,
          sender: "bot",
        };
        setMessages((prevMessages) => [...prevMessages, newBotMessage]);
        setBotResponse(""); // Clear the temporary botResponse

        // Ensure the final scroll after typing effect is complete
        if (chatContainerRef.current) {
          chatContainerRef.current.scrollTop =
            chatContainerRef.current.scrollHeight;
        }
      }
    }, 50); // 50ms delay for each character
  };

  // Auto scroll to the bottom when a new message is added
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="max-w-4xl h-screen mx-auto text-gray-100 w-full flex flex-col justify-between bg-gray-900 px-4">
      {/* Chat Messages Section */}
      <div
        ref={chatContainerRef}
        className="chat-container flex-1 overflow-y-auto py-4 space-y-4"
      >
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

// ***********************************************************************************
function hypFunction(opp, adj) {
  const hyp = Math.sqrt(opp ** 2 + adj ** 2);
  return hyp;
}
function oppFunction(hyp, adj) {
  const opp = Math.sqrt(hyp ** 2 - adj ** 2);
  return opp;
}
function adjFunction(opp, hyp) {
  const adj = Math.sqrt(hyp ** 2 - opp ** 2);
  return adj;
}

function theoremFunction(find, opp, adj, hyp) {
  if (find === "hyp") {
    return hypFunction(opp, adj);
  } else if (find === "opp") {
    return oppFunction(hyp, adj);
  } else if (find === "adj") {
    return adjFunction(opp, hyp);
  } else {
    return "Invalid find value. Please choose 'hyp', 'opp', or 'adj'.";
  }
}
