
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
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((lang) => (
          <DropdownMenuItem 
            key={lang.code}
            className={`cursor-pointer ${language === lang.code ? "bg-accent font-medium" : ""}`}
            onClick={() => {
              setLanguage(lang.code);
              setIsOpen(false);
            }}
          >
            <div className="flex items-center">
              <span className="w-5 h-5 inline-flex items-center justify-center mr-2 rounded-full overflow-hidden bg-gray-100">
                {lang.code.toUpperCase()}
              </span>
              {lang.name}
              {language === lang.code && (
                <span className="ml-2 h-1.5 w-1.5 rounded-full bg-primary"></span>
              )}
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSelector;
