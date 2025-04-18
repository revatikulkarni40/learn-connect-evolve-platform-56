import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Volume2, RefreshCw, ExternalLink, VolumeX } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslation } from "react-i18next";
import { useToast } from "@/hooks/use-toast";

interface TranslationPanelProps {
  originalText: string;
  type?: "video" | "ebook" | "article";
}

// Language code mapping for speech synthesis
const langCodeMap: { [key: string]: string } = {
  en: "en-US",
  hi: "hi-IN",
  kn: "kn-IN",
  mr: "mr-IN"
};

const TranslationPanel = ({ originalText, type = "video" }: TranslationPanelProps) => {
  const { language, translate } = useLanguage();
  const { t } = useTranslation();
  const { toast } = useToast();
  const [translatedText, setTranslatedText] = useState("");
  const [isTranslating, setIsTranslating] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("original");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechUtterance, setSpeechUtterance] = useState<SpeechSynthesisUtterance | null>(null);

  // Translate text whenever language or tab changes
  useEffect(() => {
    const performTranslation = async () => {
      if (language !== "en" && originalText && activeTab === "translated") {
        setIsTranslating(true);
        try {
          const translated = await translate(originalText);
          console.log("Translation result:", translated.substring(0, 30) + "...");
          setTranslatedText(translated);
        } catch (error) {
          console.error("Translation error:", error);
          toast({
            title: "Translation Error",
            description: "Unable to translate the content. Please try again later.",
            variant: "destructive"
          });
        } finally {
          setIsTranslating(false);
        }
      }
    };

    performTranslation();
  }, [language, originalText, activeTab, translate, toast, t]);

  // Clean up speech synthesis when component unmounts
  useEffect(() => {
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      if (speechUtterance) {
        setSpeechUtterance(null);
      }
    };
  }, [speechUtterance]);

  // Handle speak button click with proper language selection
  const handleSpeak = () => {
    // If already speaking, stop
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setSpeechUtterance(null);
      return;
    }

    // Get the text to read based on current tab
    const textToRead = activeTab === "original" ? originalText : translatedText || originalText;
    
    // Get the language code based on the active tab and selected language
    const speechLang = activeTab === "original" ? langCodeMap["en"] : langCodeMap[language];
    
    console.log(`Speaking in language: ${speechLang}, text: ${textToRead.substring(0, 30)}...`);

    // Force voice list update if needed
    if (window.speechSynthesis.getVoices().length === 0) {
      // Wait a bit for voices to load
      setTimeout(() => speakText(textToRead, speechLang), 100);
    } else {
      speakText(textToRead, speechLang);
    }
  };

  const speakText = (text: string, langCode: string) => {
    try {
      // Make sure any previous speech is stopped
      window.speechSynthesis.cancel();
      
      // Create a new utterance
      const utterance = new SpeechSynthesisUtterance(text);
      setSpeechUtterance(utterance);
      
      // Set the language
      utterance.lang = langCode;
      console.log(`Set utterance language to: ${utterance.lang}`);
      
      // Get all available voices
      const voices = window.speechSynthesis.getVoices();
      console.log(`Available voices: ${voices.length}`);
      voices.forEach(voice => {
        console.log(`Voice: ${voice.name}, Lang: ${voice.lang}`);
      });
      
      // Try to find a voice that matches our language code
      const matchingVoice = voices.find(voice => 
        voice.lang.startsWith(langCode.split("-")[0])
      );
      
      if (matchingVoice) {
        console.log(`Selected voice: ${matchingVoice.name}, Lang: ${matchingVoice.lang}`);
        utterance.voice = matchingVoice;
      } else {
        console.log(`No matching voice found for ${langCode}`);
      }
      
      // Set speech rate slightly slower for non-English languages
      if (langCode !== "en-US") {
        utterance.rate = 0.9;
      }

      // Add event listeners
      utterance.onstart = () => {
        console.log("Speech started");
        setIsSpeaking(true);
      };
      
      utterance.onend = () => {
        console.log("Speech ended");
        setIsSpeaking(false);
        setSpeechUtterance(null);
      };
      
      utterance.onerror = (event) => {
        console.error("Speech error:", event);
        setIsSpeaking(false);
        setSpeechUtterance(null);
        toast({
          title: "Speech Error",
          description: `Unable to play speech. Please try again later.`,
          variant: "destructive"
        });
      };
      
      // Start speaking
      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
      
    } catch (error) {
      console.error("Speech error:", error);
      setIsSpeaking(false);
      toast({
        title: "Speech Error",
        description: "Unable to play speech. Please try again later.",
        variant: "destructive"
      });
    }
  };

  // Handle refresh translation
  const handleRefreshTranslation = async () => {
    setIsTranslating(true);
    try {
      const translated = await translate(originalText);
      setTranslatedText(translated);
      toast({
        title: "Translation Updated",
        description: "Content has been re-translated successfully."
      });
    } catch (error) {
      console.error("Translation error:", error);
      toast({
        title: "Translation Error",
        description: "Unable to translate the content. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsTranslating(false);
    }
  };

  // Get title based on content type
  const getTitle = () => {
    switch (type) {
      case "video":
        return t("Video Script");
      case "ebook":
        return t("Book Content");
      case "article":
        return t("Article Content");
      default:
        return t("Content");
    }
  };

  return (
    <div className="mt-6 border rounded-lg overflow-hidden shadow-sm">
      <div className="bg-gray-50 dark:bg-gray-800 px-4 py-3 flex items-center justify-between">
        <h3 className="font-medium">{getTitle()}</h3>
        <div className="flex items-center gap-2">
          {activeTab === "translated" && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleRefreshTranslation}
              disabled={isTranslating}
              title={t("Refresh translation")}
            >
              <RefreshCw size={16} className={isTranslating ? "animate-spin" : ""} />
            </Button>
          )}
          <Button 
            variant={isSpeaking ? "secondary" : "ghost"}
            size="sm" 
            onClick={handleSpeak}
            title={isSpeaking ? t("Stop") : t("Listen")}
            className="relative"
          >
            {isSpeaking ? <VolumeX size={16} /> : <Volume2 size={16} />}
            {isSpeaking && (
              <span className="absolute -top-1 -right-1 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
            )}
          </Button>
        </div>
      </div>

      <Tabs 
        defaultValue="original" 
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <div className="px-4 border-b">
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="original">{t("original")}</TabsTrigger>
            <TabsTrigger value="translated">{t("translate")}</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="original" className="p-4 focus:outline-none">
          <div className="max-h-64 overflow-y-auto whitespace-pre-wrap">
            {originalText}
          </div>
        </TabsContent>

        <TabsContent value="translated" className="p-4 focus:outline-none">
          {isTranslating ? (
            <div className="flex items-center justify-center h-32">
              <div className="animate-pulse">
                {t("Translating...")}
              </div>
            </div>
          ) : (
            <div className="max-h-64 overflow-y-auto whitespace-pre-wrap">
              {translatedText || originalText}
            </div>
          )}
        </TabsContent>
      </Tabs>

      <div className="bg-gray-50 dark:bg-gray-800 px-4 py-3 text-xs text-gray-500 border-t">
        <div className="flex items-center justify-between">
          <span>{language === "en" ? "Original content" : "Translation service active"}</span>
          <a 
            href="#"
            className="flex items-center text-blue-600 hover:underline"
            onClick={(e) => {
              e.preventDefault();
              setActiveTab(activeTab === "original" ? "translated" : "original");
            }}
          >
            {activeTab === "original" ? t("Show translation") : t("Show original")}
            <ExternalLink size={12} className="ml-1" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default TranslationPanel;
