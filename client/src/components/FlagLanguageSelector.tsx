import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLanguage } from '@/hooks/useLanguage';
import { Language } from '@/lib/i18n';
import usFlag from '@assets/united-states_1759006812751.png';
import georgiaFlag from '@assets/georgia_1759006812752.png';
import russiaFlag from '@assets/russia_1759006812752.png';

interface FlagLanguageSelectorProps {
  className?: string;
  triggerClassName?: string;
}

const flagImages = {
  en: usFlag,
  ka: georgiaFlag,
  ru: russiaFlag
};

const FlagIcon = ({ country }: { country: string }) => {
  return (
    <img 
      src={flagImages[country as keyof typeof flagImages]} 
      alt={`${country} flag`}
      className="w-6 h-4 rounded-sm object-cover"
    />
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
       {/* <SelectItem value="ru" data-testid="language-option-ru">
          <FlagIcon country="ru" />
        </SelectItem> */}
      </SelectContent>
    </Select>
  );
}