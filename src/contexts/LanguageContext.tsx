
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
          "readMore": "Read More",
          "Show translation": "Show translation",
          "Show original": "Show original",
          "Video Script": "Video Script",
          "Book Content": "Book Content",
          "Article Content": "Article Content",
          "Content": "Content",
          "Translating...": "Translating...",
          "Stop": "Stop",
          "Refresh translation": "Refresh translation"
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
          "readMore": "और पढ़ें",
          "Show translation": "अनुवाद दिखाएं",
          "Show original": "मूल दिखाएं",
          "Video Script": "वीडियो स्क्रिप्ट",
          "Book Content": "पुस्तक सामग्री",
          "Article Content": "लेख सामग्री",
          "Content": "सामग्री",
          "Translating...": "अनुवाद कर रहा है...",
          "Stop": "रोकें",
          "Refresh translation": "अनुवाद रीफ्रेश करें"
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
          "readMore": "ಇನ್ನಷ್ಟು ಓದಿ",
          "Show translation": "ಅನುವಾದವನ್ನು ತೋರಿಸಿ",
          "Show original": "ಮೂಲವನ್ನು ತೋರಿಸಿ",
          "Video Script": "ವೀಡಿಯೊ ಸ್ಕ್ರಿಪ್ಟ್",
          "Book Content": "ಪುಸ್ತಕದ ವಿಷಯ",
          "Article Content": "ಲೇಖನದ ವಿಷಯ",
          "Content": "ವಿಷಯ",
          "Translating...": "ಅನುವಾದಿಸಲಾಗುತ್ತಿದೆ...",
          "Stop": "ನಿಲ್ಲಿಸಿ",
          "Refresh translation": "ಅನುವಾದವನ್ನು ರಿಫ್ರೆಶ್ ಮಾಡಿ"
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
          "readMore": "अधिक वाचा",
          "Show translation": "अनुवाद दाखवा",
          "Show original": "मूळ दाखवा",
          "Video Script": "व्हिडिओ स्क्रिप्ट",
          "Book Content": "पुस्तकाची सामग्री",
          "Article Content": "लेखाची सामग्री",
          "Content": "सामग्री",
          "Translating...": "अनुवाद करत आहे...",
          "Stop": "थांबा",
          "Refresh translation": "अनुवाद रिफ्रेश करा"
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

  // Enhanced mock translation function with more comprehensive translations
  const translate = async (text: string): Promise<string> => {
    if (language === "en") return text; // Return original if English
    
    try {
      console.log(`Translating to ${language}: ${text.substring(0, 30)}...`);
      
      // More comprehensive mock translations
      switch (language) {
        case "hi":
          // Enhanced Hindi mock translation with more phrases
          return text
            .replace(/This is a sample/g, "यह एक नमूना है")
            .replace(/preview/g, "पूर्वावलोकन")
            .replace(/from the e-book/g, "ई-पुस्तक से")
            .replace(/Chapter/g, "अध्याय")
            .replace(/Introduction/g, "परिचय")
            .replace(/by/g, "द्वारा")
            .replace(/This chapter introduces/g, "यह अध्याय परिचय देता है")
            .replace(/fundamental concepts/g, "मौलिक अवधारणाओं")
            .replace(/comprehensive/g, "व्यापक")
            .replace(/exploration/g, "अन्वेषण")
            .replace(/book/g, "पुस्तक")
            .replace(/that will be covered/g, "जिन्हें कवर किया जाएगा")
            .replace(/throughout this book/g, "इस पुस्तक में")
            .replace(/By understanding/g, "समझकर")
            .replace(/these basic principles/g, "इन बुनियादी सिद्धांतों को")
            .replace(/you'll be equipped/g, "आप सुसज्जित होंगे")
            .replace(/with the knowledge/g, "ज्ञान के साथ")
            .replace(/foundation necessary/g, "आवश्यक नींव")
            .replace(/to grasp/g, "समझने के लिए")
            .replace(/more advanced topics/g, "अधिक उन्नत विषयों को")
            .replace(/in later chapters/g, "बाद के अध्यायों में");
                    
        case "kn":
          // Enhanced Kannada mock translation with more phrases
          return text
            .replace(/This is a sample/g, "ಇದು ಒಂದು ಮಾದರಿ")
            .replace(/preview/g, "ಮುನ್ನೋಟ")
            .replace(/from the e-book/g, "ಇ-ಪುಸ್ತಕದಿಂದ")
            .replace(/Chapter/g, "ಅಧ್ಯಾಯ")
            .replace(/Introduction/g, "ಪರಿಚಯ")
            .replace(/by/g, "ಮೂಲಕ")
            .replace(/This chapter introduces/g, "ಈ ಅಧ್ಯಾಯವು ಪರಿಚಯಿಸುತ್ತದೆ")
            .replace(/fundamental concepts/g, "ಮೂಲಭೂತ ಪರಿಕಲ್ಪನೆಗಳನ್ನು")
            .replace(/comprehensive/g, "ಸಮಗ್ರ")
            .replace(/exploration/g, "ಅನ್ವೇಷಣೆ")
            .replace(/book/g, "ಪುಸ್ತಕ")
            .replace(/that will be covered/g, "ಅವುಗಳನ್ನು ಒಳಗೊಂಡಿರುತ್ತದೆ")
            .replace(/throughout this book/g, "ಈ ಪುಸ್ತಕದುದ್ದಕ್ಕೂ")
            .replace(/By understanding/g, "ಅರ್ಥಮಾಡಿಕೊಳ್ಳುವ ಮೂಲಕ")
            .replace(/these basic principles/g, "ಈ ಮೂಲ ತತ್ವಗಳನ್ನು")
            .replace(/you'll be equipped/g, "ನೀವು ಸಜ್ಜುಗೊಳ್ಳುತ್ತೀರಿ")
            .replace(/with the knowledge/g, "ಜ್ಞಾನದೊಂದಿಗೆ")
            .replace(/foundation necessary/g, "ಅಗತ್ಯವಾದ ಅಡಿಪಾಯ")
            .replace(/to grasp/g, "ಗ್ರಹಿಸಲು")
            .replace(/more advanced topics/g, "ಹೆಚ್ಚು ಸುಧಾರಿತ ವಿಷಯಗಳನ್ನು")
            .replace(/in later chapters/g, "ನಂತರದ ಅಧ್ಯಾಯಗಳಲ್ಲಿ");
                    
        case "mr":
          // Enhanced Marathi mock translation with more phrases
          return text
            .replace(/This is a sample/g, "हे एक नमुना आहे")
            .replace(/preview/g, "पूर्वावलोकन")
            .replace(/from the e-book/g, "ई-पुस्तकातून")
            .replace(/Chapter/g, "प्रकरण")
            .replace(/Introduction/g, "परिचय")
            .replace(/by/g, "द्वारे")
            .replace(/This chapter introduces/g, "हे प्रकरण परिचय देते")
            .replace(/fundamental concepts/g, "मूलभूत संकल्पना")
            .replace(/comprehensive/g, "सर्वसमावेशक")
            .replace(/exploration/g, "अन्वेषण")
            .replace(/book/g, "पुस्तक")
            .replace(/that will be covered/g, "ज्या समाविष्ट केल्या जातील")
            .replace(/throughout this book/g, "या पुस्तकात")
            .replace(/By understanding/g, "समजून घेऊन")
            .replace(/these basic principles/g, "या मूलभूत तत्त्वांना")
            .replace(/you'll be equipped/g, "तुम्ही सुसज्ज व्हाल")
            .replace(/with the knowledge/g, "ज्ञानासह")
            .replace(/foundation necessary/g, "आवश्यक पाया")
            .replace(/to grasp/g, "समजण्यासाठी")
            .replace(/more advanced topics/g, "अधिक प्रगत विषय")
            .replace(/in later chapters/g, "नंतरच्या प्रकरणांमध्ये");
            
        default:
          return text;
      }
      
      // Note: In a production environment, this would be replaced by a real translation API
      
    } catch (error) {
      console.error("Translation error:", error);
      return text; // Return original text if translation fails
    }
  };

  // Updated text-to-speech function to properly handle language selection
  const textToSpeech = async (text: string, lang: string): Promise<void> => {
    if (!("speechSynthesis" in window)) {
      console.error("Text-to-speech not supported");
      alert("Your browser does not support text-to-speech functionality.");
      return;
    }
    
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
    
    // Debug logging for speech synthesis
    console.log(`Speaking in language: ${utterance.lang}, text: ${text.substring(0, 30)}...`);
    
    // Check available voices for better matching
    utterance.onstart = () => {
      console.log("Speech started");
    };
    
    utterance.onerror = (event) => {
      console.error("Speech error:", event);
    };
    
    utterance.onend = () => {
      console.log("Speech ended");
    };
    
    // Speak
    window.speechSynthesis.speak(utterance);
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
