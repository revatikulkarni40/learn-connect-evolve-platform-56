
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

  // Function to translate text using a mock translation service
  // Instead of relying on Google Translate API which needs a key
  const translate = async (text: string): Promise<string> => {
    if (language === "en") return text; // Return original if English
    
    // For demo purposes, we'll use a simple mock translation
    // In a production environment, you would connect to a translation API
    try {
      console.log(`Translating to ${language}: ${text.substring(0, 30)}...`);
      
      // Mock translations for demonstration
      // These are very basic translations just to show the functionality
      switch (language) {
        case "hi":
          // Simple Hindi mock translation
          return text.replace(/Chapter/g, "अध्याय")
                    .replace(/Introduction/g, "परिचय")
                    .replace(/This is a sample/g, "यह एक नमूना है")
                    .replace(/preview/g, "पूर्वावलोकन")
                    .replace(/from the e-book/g, "ई-पुस्तक से")
                    .replace(/by/g, "द्वारा")
                    .replace(/This chapter introduces/g, "यह अध्याय परिचय देता है")
                    .replace(/fundamental concepts/g, "मौलिक अवधारणाओं")
                    .replace(/A comprehensive exploration/g, "एक व्यापक अन्वेषण");
                    
        case "kn":
          // Simple Kannada mock translation
          return text.replace(/Chapter/g, "ಅಧ್ಯಾಯ")
                    .replace(/Introduction/g, "ಪರಿಚಯ")
                    .replace(/This is a sample/g, "ಇದು ಒಂದು ಮಾದರಿ")
                    .replace(/preview/g, "ಮುನ್ನೋಟ")
                    .replace(/from the e-book/g, "ಇ-ಪುಸ್ತಕದಿಂದ")
                    .replace(/by/g, "ಮೂಲಕ")
                    .replace(/This chapter introduces/g, "ಈ ಅಧ್ಯಾಯವು ಪರಿಚಯಿಸುತ್ತದೆ")
                    .replace(/fundamental concepts/g, "ಮೂಲಭೂತ ಪರಿಕಲ್ಪನೆಗಳು")
                    .replace(/A comprehensive exploration/g, "ಒಂದು ವ್ಯಾಪಕ ಅನ್ವೇಷಣೆ");
                    
        case "mr":
          // Simple Marathi mock translation
          return text.replace(/Chapter/g, "प्रकरण")
                    .replace(/Introduction/g, "परिचय")
                    .replace(/This is a sample/g, "हे एक नमुना आहे")
                    .replace(/preview/g, "पूर्वावलोकन")
                    .replace(/from the e-book/g, "ई-पुस्तकातून")
                    .replace(/by/g, "द्वारे")
                    .replace(/This chapter introduces/g, "हे प्रकरण परिचय देते")
                    .replace(/fundamental concepts/g, "मूलभूत संकल्पना")
                    .replace(/A comprehensive exploration/g, "एक सर्वसमावेशक अन्वेषण");
                    
        default:
          return text;
      }
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
