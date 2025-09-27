import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLanguage } from '@/hooks/useLanguage';
import { Language } from '@/lib/i18n';

interface FlagLanguageSelectorProps {
  className?: string;
  triggerClassName?: string;
}

const FlagIcon = ({ country }: { country: string }) => {
  const flagStyles = {
    en: 'bg-gradient-to-r from-blue-600 via-white to-red-600',
    ka: 'bg-gradient-to-r from-white via-red-600 to-white', 
    ru: 'bg-gradient-to-b from-white via-blue-600 to-red-600'
  };
  
  return (
    <div className={`w-6 h-4 rounded-sm border border-gray-300 ${flagStyles[country as keyof typeof flagStyles]}`} />
  );
};


export default function FlagLanguageSelector({ className, triggerClassName }: FlagLanguageSelectorProps) {
  const { language, setLanguage } = useLanguage();

  return (
    <Select value={language} onValueChange={(value: Language) => setLanguage(value)}>
      <SelectTrigger className={triggerClassName} data-testid="language-selector-trigger">
        <FlagIcon country={language} />
      </SelectTrigger>
      <SelectContent className={className}>
        <SelectItem value="en" data-testid="language-option-en">
          <FlagIcon country="en" />
        </SelectItem>
        <SelectItem value="ka" data-testid="language-option-ka">
          <FlagIcon country="ka" />
        </SelectItem>
        <SelectItem value="ru" data-testid="language-option-ru">
          <FlagIcon country="ru" />
        </SelectItem>
      </SelectContent>
    </Select>
  );
}