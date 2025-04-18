
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mic, Volume2, RefreshCw, ExternalLink, VolumeX } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslation } from "react-i18next";
import { useToast } from "@/hooks/use-toast";

interface TranslationPanelProps {
  originalText: string;
  type?: "video" | "ebook" | "article";
}

const TranslationPanel = ({ originalText, type = "video" }: TranslationPanelProps) => {
  const { language, translate, textToSpeech } = useLanguage();
  const { t } = useTranslation();
  const { toast } = useToast();
  const [translatedText, setTranslatedText] = useState("");
  const [isTranslating, setIsTranslating] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("original");
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Translate text whenever language or tab changes
  useEffect(() => {
    const performTranslation = async () => {
      if (language !== "en" && originalText && activeTab === "translated") {
        setIsTranslating(true);
        try {
          const translated = await translate(originalText);
          setTranslatedText(translated);
        } catch (error) {
          console.error("Translation error:", error);
          toast({
            title: t("Translation Error"),
            description: t("Unable to translate the content. Please try again later."),
            variant: "destructive"
          });
        } finally {
          setIsTranslating(false);
        }
      }
    };

    performTranslation();
  }, [language, originalText, activeTab, translate, toast, t]);

  // Handle speak button click
  const handleSpeak = () => {
    const textToRead = activeTab === "original" ? originalText : translatedText || originalText;
    
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      setIsSpeaking(true);
      
      // Create speech utterance and handle events
      const utterance = new SpeechSynthesisUtterance(textToRead);
      
      // Set language based on active tab and selected language
      if (activeTab === "translated") {
        switch (language) {
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
      } else {
        utterance.lang = "en-US"; // Original is always in English
      }
      
      // Handle speech end
      utterance.onend = () => {
        setIsSpeaking(false);
      };
      
      // Handle speech errors
      utterance.onerror = (event) => {
        console.error("Speech error:", event);
        setIsSpeaking(false);
        toast({
          title: t("Speech Error"),
          description: t("Unable to play speech. Please try again later."),
          variant: "destructive"
        });
      };
      
      window.speechSynthesis.speak(utterance);
    }
  };

  // Handle refresh translation
  const handleRefreshTranslation = async () => {
    setIsTranslating(true);
    try {
      const translated = await translate(originalText);
      setTranslatedText(translated);
      toast({
        title: t("Translation Updated"),
        description: t("Content has been re-translated successfully.")
      });
    } catch (error) {
      console.error("Translation error:", error);
      toast({
        title: t("Translation Error"),
        description: t("Unable to translate the content. Please try again later."),
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

  useEffect(() => {
    // Cleanup on unmount
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

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
          <span>{t("Powered by Google Translate")}</span>
          <a 
            href="https://translate.google.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center text-blue-600 hover:underline"
          >
            {t("Advanced options")}
            <ExternalLink size={12} className="ml-1" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default TranslationPanel;
