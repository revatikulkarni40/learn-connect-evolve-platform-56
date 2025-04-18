
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Globe } from "lucide-react";
import { useLanguage, languages } from "@/contexts/LanguageContext";
import { useTranslation } from "react-i18next";
import { Badge } from "@/components/ui/badge";

interface LanguageSelectorProps {
  variant?: "default" | "minimal";
}

const LanguageSelector = ({ variant = "default" }: LanguageSelectorProps) => {
  const { language, setLanguage } = useLanguage();
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  // Find the current language name
  const currentLanguage = languages.find(lang => lang.code === language)?.name || "English";

  // Get language flag/code display
  const getLanguageIndicator = (code: string) => {
    return code.toUpperCase();
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button 
          variant={variant === "minimal" ? "ghost" : "outline"} 
          size="sm" 
          className="flex items-center gap-1.5 border-primary/20 hover:bg-primary/5"
        >
          <Globe size={16} className="text-primary" />
          {variant === "default" && (
            <>
              <span className="hidden sm:inline">{t("language")}:</span>
              <Badge variant="secondary" className="font-medium">
                {currentLanguage}
              </Badge>
            </>
          )}
          {variant === "minimal" && (
            <span className="w-5 h-5 flex items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
              {getLanguageIndicator(language)}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((lang) => (
          <DropdownMenuItem 
            key={lang.code}
            className={`cursor-pointer flex items-center ${language === lang.code ? "bg-accent font-medium" : ""}`}
            onClick={() => {
              setLanguage(lang.code);
              setIsOpen(false);
            }}
          >
            <div className="flex items-center w-full justify-between">
              <div className="flex items-center">
                <span className="w-6 h-6 inline-flex items-center justify-center mr-2 rounded-full overflow-hidden bg-gray-100 text-xs font-medium">
                  {getLanguageIndicator(lang.code)}
                </span>
                {lang.name}
              </div>
              {language === lang.code && (
                <span className="h-2 w-2 rounded-full bg-primary ml-2"></span>
              )}
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSelector;
