import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLanguage } from '@/hooks/useLanguage';
import { Language } from '@/lib/i18n';

interface FlagLanguageSelectorProps {
  className?: string;
  triggerClassName?: string;
}

const languageFlags = {
  en: '🇺🇸',
  ka: '🇬🇪', 
  ru: '🇷🇺'
};


export default function FlagLanguageSelector({ className, triggerClassName }: FlagLanguageSelectorProps) {
  const { language, setLanguage } = useLanguage();

  return (
    <Select value={language} onValueChange={(value: Language) => setLanguage(value)}>
      <SelectTrigger className={triggerClassName} data-testid="language-selector-trigger">
        <span className="text-lg">{languageFlags[language]}</span>
      </SelectTrigger>
      <SelectContent className={className}>
        <SelectItem value="en" data-testid="language-option-en">
          <span className="text-lg">{languageFlags.en}</span>
        </SelectItem>
        <SelectItem value="ka" data-testid="language-option-ka">
          <span className="text-lg">{languageFlags.ka}</span>
        </SelectItem>
        <SelectItem value="ru" data-testid="language-option-ru">
          <span className="text-lg">{languageFlags.ru}</span>
        </SelectItem>
      </SelectContent>
    </Select>
  );
}