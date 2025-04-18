
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
          className="flex items-center gap-1"
        >
          <Globe size={16} />
          {variant === "default" && <span>{t("language")}: {currentLanguage}</span>}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((lang) => (
          <DropdownMenuItem 
            key={lang.code}
            className={`cursor-pointer ${language === lang.code ? "bg-accent" : ""}`}
            onClick={() => {
              setLanguage(lang.code);
              setIsOpen(false);
            }}
          >
            {lang.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSelector;
