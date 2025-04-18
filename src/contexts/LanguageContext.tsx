
import React, { createContext, useState, useContext, useEffect, ReactNode } from "react";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Define available languages
export const languages = [
  { code: "en", name: "English" },
  { code: "hi", name: "Hindi" },
  { code: "kn", name: "Kannada" },
  { code: "mr", name: "Marathi" }
];

// Define language context types
type LanguageContextType = {
  language: string;
  setLanguage: (lang: string) => void;
  translate: (text: string) => Promise<string>;
  textToSpeech: (text: string, lang: string) => Promise<void>;
};

// Create context with default values
const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  translate: async () => "",
  textToSpeech: async () => {}
});

// Define props for the provider component
interface LanguageProviderProps {
  children: ReactNode;
}

// Initialize i18n
i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          "welcome": "Welcome",
          "videos": "Videos",
          "ebooks": "E-Books",
          "articles": "Articles",
          "contact": "Contact",
          "search": "Search...",
          "language": "Language",
          "translate": "Translate",
          "listen": "Listen",
          "original": "Original",
          "readMore": "Read More"
        }
      },
      hi: {
        translation: {
          "welcome": "स्वागत",
          "videos": "वीडियो",
          "ebooks": "ई-पुस्तकें",
          "articles": "लेख",
          "contact": "संपर्क",
          "search": "खोज...",
          "language": "भाषा",
          "translate": "अनुवाद करें",
          "listen": "सुनें",
          "original": "मूल",
          "readMore": "और पढ़ें"
        }
      },
      kn: {
        translation: {
          "welcome": "ಸ್ವಾಗತ",
          "videos": "ವೀಡಿಯೊಗಳು",
          "ebooks": "ಇ-ಪುಸ್ತಕಗಳು",
          "articles": "ಲೇಖನಗಳು",
          "contact": "ಸಂಪರ್ಕ",
          "search": "ಹುಡುಕಿ...",
          "language": "ಭಾಷೆ",
          "translate": "ಅನುವಾದಿಸಿ",
          "listen": "ಕೇಳಿ",
          "original": "ಮೂಲ",
          "readMore": "ಇನ್ನಷ್ಟು ಓದಿ"
        }
      },
      mr: {
        translation: {
          "welcome": "स्वागत आहे",
          "videos": "व्हिडिओ",
          "ebooks": "ई-पुस्तके",
          "articles": "लेख",
          "contact": "संपर्क",
          "search": "शोध...",
          "language": "भाषा",
          "translate": "अनुवाद करा",
          "listen": "ऐका",
          "original": "मूळ",
          "readMore": "अधिक वाचा"
        }
      }
    },
    lng: "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    }
  });

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [language, setLanguageState] = useState<string>(
    localStorage.getItem("preferredLanguage") || "en"
  );

  // Handle language change
  useEffect(() => {
    i18n.changeLanguage(language);
    localStorage.setItem("preferredLanguage", language);
  }, [language]);

  // Function to translate text using Google Translate API
  const translate = async (text: string): Promise<string> => {
    if (language === "en") return text; // Return original if English
    
    try {
      // Using the Google Translate API via client-side
      // In a production environment, this should be done through a backend service
      const apiKey = "YOUR_GOOGLE_API_KEY"; // This should be secured
      const response = await fetch(
        `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            q: text,
            source: "en",
            target: language,
            format: "text"
          }),
        }
      );
      
      const data = await response.json();
      return data.data.translations[0].translatedText;
    } catch (error) {
      console.error("Translation error:", error);
      return text; // Return original text if translation fails
    }
  };

  // Basic text-to-speech function using browser's built-in API
  const textToSpeech = async (text: string, lang: string): Promise<void> => {
    if ("speechSynthesis" in window) {
      // Stop any ongoing speech
      window.speechSynthesis.cancel();
      
      // Create utterance
      const utterance = new SpeechSynthesisUtterance(text);
      
      // Set language based on selection
      switch (lang) {
        case "hi":
          utterance.lang = "hi-IN";
          break;
        case "kn":
          utterance.lang = "kn-IN";
          break;
        case "mr":
          utterance.lang = "mr-IN";
          break;
        default:
          utterance.lang = "en-US";
      }
      
      // Speak
      window.speechSynthesis.speak(utterance);
    } else {
      console.error("Text-to-speech not supported");
      alert("Your browser does not support text-to-speech functionality.");
    }
  };

  // Set language function
  const setLanguage = (lang: string) => {
    setLanguageState(lang);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, translate, textToSpeech }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook for accessing language context
export const useLanguage = () => useContext(LanguageContext);
