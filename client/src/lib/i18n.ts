export interface Translations {
  [key: string]: {
    en: string;
    ka: string;
    ru: string;
  };
}

export const translations: Translations = {
  // Navigation
  'nav.home': { en: 'Home', ka: 'მთავარი', ru: 'Главная' },
  'nav.regions': { en: 'Regions', ka: 'რეგიონები', ru: 'Регионы' },
  'nav.tours': { en: 'Tours', ka: 'ტურები', ru: 'Туры' },
  'nav.store': { en: 'Store', ka: 'მაღაზია', ru: 'Магазин' },
  'nav.blog': { en: 'Blog', ka: 'ბლოგი', ru: 'Блог' },
  'nav.contact': { en: 'Contact', ka: 'კონტაქტი', ru: 'Контакт' },

  // Hero Section
  'hero.title': { 
    en: 'Discover Georgia\'s Ethnographic Heritage', 
    ka: 'აღმოაჩინეთ საქართველოს ეთნოგრაფიული მემკვიდრეობა', 
    ru: 'Откройте этнографическое наследие Грузии' 
  },
  'hero.subtitle': { 
    en: 'Explore ancient regions, taste traditional cuisine, and experience the rich cultural tapestry of Georgia', 
    ka: 'გამოიკვლიეთ უძველესი რეგიონები, გამოცადეთ ტრადიციული სამზარეულო და გამოიცადეთ საქართველოს მდიდარი კულტურული ნაქსოვი', 
    ru: 'Исследуйте древние регионы, попробуйте традиционную кухню и ощутите богатое культурное полотно Грузии' 
  },
  'hero.cta.explore': { en: 'Start Exploring', ka: 'დაიწყეთ გამოკვლევა', ru: 'Начать исследование' },
  'hero.cta.video': { en: 'Watch Virtual Tour', ka: 'ვირტუალური ტური', ru: 'Виртуальный тур' },

  // Common
  'common.readMore': { en: 'Read More', ka: 'მეტის ნახვა', ru: 'Читать далее' },
  'common.viewAll': { en: 'View All', ka: 'ყველას ნახვა', ru: 'Посмотреть все' },
  'common.addToCart': { en: 'Add to Cart', ka: 'კალათაში დამატება', ru: 'В корзину' },
  'common.bookNow': { en: 'Book Now', ka: 'ჯავშნა', ru: 'Забронировать' },
  'common.loading': { en: 'Loading...', ka: 'იტვირთება...', ru: 'Загрузка...' },
  'common.error': { en: 'Something went wrong', ka: 'რაღაც არასწორია', ru: 'Что-то пошло не так' },

  // Contact Form
  'contact.firstName': { en: 'First Name', ka: 'სახელი', ru: 'Имя' },
  'contact.lastName': { en: 'Last Name', ka: 'გვარი', ru: 'Фамилия' },
  'contact.email': { en: 'Email Address', ka: 'ელ-ფოსტა', ru: 'Электронная почта' },
  'contact.phone': { en: 'Phone Number', ka: 'ტელეფონი', ru: 'Телефон' },
  'contact.message': { en: 'Message', ka: 'შეტყობინება', ru: 'Сообщение' },
  'contact.submit': { en: 'Send Message', ka: 'შეტყობინების გაგზავნა', ru: 'Отправить сообщение' },

  // Footer
  'footer.description': { 
    en: 'Discover the authentic beauty and rich cultural heritage of Georgia\'s ethnographic regions through immersive experiences and traditional hospitality.', 
    ka: 'აღმოაჩინეთ საქართველოს ეთნოგრაფიული რეგიონების ავთენტიკური სილამაზე და მდიდარი კულტურული მემკვიდრეობა გამოცდილებებისა და ტრადიციული სტუმარმასპინძლობის საშუალებით.', 
    ru: 'Откройте для себя подлинную красоту и богатое культурное наследие этнографических регионов Грузии через погружающие впечатления и традиционное гостеприимство.' 
  }
};

export type Language = 'en' | 'ka' | 'ru';

export function getTranslation(key: string, lang: Language): string {
  return translations[key]?.[lang] || translations[key]?.en || key;
}
