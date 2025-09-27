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

const languageNames = {
  en: 'English',
  ka: 'ქართული',
  ru: 'Русский'
};

export default function FlagLanguageSelector({ className, triggerClassName }: FlagLanguageSelectorProps) {
  const { language, setLanguage } = useLanguage();

  return (
    <Select value={language} onValueChange={(value: Language) => setLanguage(value)}>
      <SelectTrigger className={triggerClassName} data-testid="language-selector-trigger">
        <SelectValue />
      </SelectTrigger>
      <SelectContent className={className}>
        <SelectItem value="en" data-testid="language-option-en">
          <div className="flex items-center space-x-2">
            <span className="text-lg">{languageFlags.en}</span>
            <span>{languageNames.en}</span>
          </div>
        </SelectItem>
        <SelectItem value="ka" data-testid="language-option-ka">
          <div className="flex items-center space-x-2">
            <span className="text-lg">{languageFlags.ka}</span>
            <span>{languageNames.ka}</span>
          </div>
        </SelectItem>
        <SelectItem value="ru" data-testid="language-option-ru">
          <div className="flex items-center space-x-2">
            <span className="text-lg">{languageFlags.ru}</span>
            <span>{languageNames.ru}</span>
          </div>
        </SelectItem>
      </SelectContent>
    </Select>
  );
}