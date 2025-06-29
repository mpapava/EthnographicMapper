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
    en: 'Discover Georgia\'s Ethnographic', 
    ka: 'აღმოაჩინეთ საქართველოს ეთნოგრაფიული', 
    ru: 'Откройте этнографическое' 
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
  },

  // Regions Page
  regions_title: {
    en: "Georgian Regions",
    ka: "საქართველოს რეგიონები",
    ru: "Регионы Грузии"
  },
  regions_description: {
    en: "Explore the diverse ethnographic regions of Georgia, each with unique traditions, landscapes, and cultural heritage.",
    ka: "გამოიკვლიეთ საქართველოს მრავალფეროვანი ეთნოგრაფიული რეგიონები, თითოეული უნიკალური ტრადიციებით, ლანდშაფტებით და კულტურული მემკვიდრეობით.",
    ru: "Изучите разнообразные этнографические регионы Грузии, каждый со своими уникальными традициями, ландшафтами и культурным наследием."
  },
  regions_hero_title: {
    en: "Discover Georgia's Regions",
    ka: "აღმოაჩინეთ საქართველოს რეგიონები",
    ru: "Откройте для себя регионы Грузии"
  },
  regions_hero_subtitle: {
    en: "Journey through the diverse landscapes and rich cultural heritage of Georgia's ethnographic regions",
    ka: "იმოგზაურეთ საქართველოს ეთნოგრაფიული რეგიონების მრავალფეროვან ლანდშაფტებსა და მდიდარ კულტურულ მემკვიდრეობაში",
    ru: "Путешествие по разнообразным ландшафтам и богатому культурному наследию этнографических регионов Грузии"
  },
  regions_about_title: {
    en: "Georgia's Cultural Diversity",
    ka: "საქართველოს კულტურული მრავალფეროვნება",
    ru: "Культурное разнообразие Грузии"
  },
  regions_about_content: {
    en: "Georgia's ethnographic regions represent centuries of unique cultural development, each shaped by its geographical location, historical influences, and local traditions. From the wine valleys of Kakheti to the highland settlements of Svaneti, every region tells its own story through architecture, cuisine, folklore, and customs that have been preserved for generations.",
    ka: "საქართველოს ეთნოგრაფიული რეგიონები წარმოადგენენ საუკუნეების უნიკალური კულტურული განვითარების შედეგს, თითოეული ჩამოყალიბებული თავისი გეოგრაფიული მდებარეობით, ისტორიული გავლენით და ადგილობრივი ტრადიციებით. კახეთის ღვინის ხეობებიდან სვანეთის მთის დასახლებებამდე, ყოველი რეგიონი თხრობს თავის ისტორიას არქიტექტურის, სამზარეულოს, ფოლკლორისა და ჩვეულებების მეშვეობით, რომლებიც თაობებისთვის შენარჩუნებულია.",
    ru: "Этнографические регионы Грузии представляют собой результат веков уникального культурного развития, каждый из которых сформирован своим географическим положением, историческими влияниями и местными традициями. От винных долин Кахетии до горных поселений Сванетии, каждый регион рассказывает свою историю через архитектуру, кухню, фольклор и обычаи, которые сохранялись поколениями."
  }
};

export type Language = 'en' | 'ka' | 'ru';

export function getTranslation(key: string, lang: Language): string {
  return translations[key]?.[lang] || translations[key]?.en || key;
}
