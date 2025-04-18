
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mic, Volume2, RefreshCw, ExternalLink } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslation } from "react-i18next";

interface TranslationPanelProps {
  originalText: string;
  type?: "video" | "ebook" | "article";
}

const TranslationPanel = ({ originalText, type = "video" }: TranslationPanelProps) => {
  const { language, translate, textToSpeech } = useLanguage();
  const { t } = useTranslation();
  const [translatedText, setTranslatedText] = useState("");
  const [isTranslating, setIsTranslating] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("original");

  // Translate text whenever language changes
  useEffect(() => {
    const performTranslation = async () => {
      if (language !== "en" && originalText && activeTab === "translated") {
        setIsTranslating(true);
        try {
          const translated = await translate(originalText);
          setTranslatedText(translated);
        } catch (error) {
          console.error("Translation error:", error);
        } finally {
          setIsTranslating(false);
        }
      }
    };

    performTranslation();
  }, [language, originalText, activeTab, translate]);

  // Handle speak button click
  const handleSpeak = (text: string) => {
    textToSpeech(text, language);
  };

  // Handle refresh translation
  const handleRefreshTranslation = async () => {
    setIsTranslating(true);
    try {
      const translated = await translate(originalText);
      setTranslatedText(translated);
    } catch (error) {
      console.error("Translation error:", error);
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
    <div className="mt-6 border rounded-lg overflow-hidden">
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
            variant="ghost" 
            size="sm" 
            onClick={() => handleSpeak(activeTab === "original" ? originalText : translatedText)}
            title={t("Listen")}
          >
            <Volume2 size={16} />
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
