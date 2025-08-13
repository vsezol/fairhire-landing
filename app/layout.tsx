import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://fair-hire.com"), // Замените на ваш реальный домен

  // Основные meta теги
  title: {
    default:
      "FairHire - Честные технические собеседования | Защита от списывания",
    template: "%s | FairHire",
  },
  description:
    "FairHire - революционное B2B решение для проведения честных технических интервью. Полный контроль над процессом собеседования, защита от списывания, мониторинг в реальном времени. Скачайте для MacOS и Windows.",

  // Ключевые слова
  keywords: [
    "технические интервью",
    "собеседования IT",
    "HR решения",
    "найм разработчиков",
    "защита от списывания",
    "мониторинг кандидатов",
    "честные собеседования",
    "B2B HR инструменты",
    "контроль интервью",
    "технический скрининг",
    "оценка навыков программистов",
    "прозрачность найма",
    "анти-читинг система",
    "удаленные собеседования",
    "MacOS Windows приложение",
    "интеграция с Zoom",
    "интеграция с Google Meet",
    "мониторинг экрана кандидата",
    "блокировка скриншотов",
    "отслеживание действий",
  ],

  // Авторство и права
  authors: [{ name: "Всеволод Золотов", url: "https://t.me/lifeindev" }],
  creator: "Всеволод Золотов",
  publisher: "FairHire",

  // Категоризация
  category: "Business Software",
  classification: "HR Technology",

  // Языки и локализация
  alternates: {
    canonical: "https://fair-hire.com",
    languages: {
      ru: "https://fair-hire.com",
      en: "https://fair-hire.com/en", // Если планируете английскую версию
    },
  },

  // Open Graph для социальных сетей
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: "https://fair-hire.com",
    siteName: "FairHire",
    title: "FairHire - Честные технические собеседования без обмана",
    description:
      "Революционное B2B решение для HR и технических интервьюеров. Полный контроль процесса собеседования, защита от списывания, мониторинг в реальном времени. Поддержка MacOS и Windows.",
    images: [
      {
        url: "/og-image.jpg", // Нужно создать это изображение 1200x630px
        width: 1200,
        height: 630,
        alt: "FairHire - Честные технические собеседования",
        type: "image/jpeg",
      },
      {
        url: "/og-image-square.jpg", // Квадратное изображение 1080x1080px
        width: 1080,
        height: 1080,
        alt: "FairHire Logo",
        type: "image/jpeg",
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    site: "@fairhire_dev", // Ваш Twitter handle, если есть
    creator: "@vsezold", // Twitter handle разработчика
    title: "FairHire - Честные технические собеседования",
    description:
      "B2B решение для честных IT интервью. Защита от списывания, мониторинг кандидатов, интеграция с популярными платформами.",
    images: ["/twitter-image.jpg"], // 1200x600px для Twitter
  },

  // Дополнительные meta теги
  other: {
    // Для поисковых роботов
    robots:
      "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
    googlebot: "index, follow",
    bingbot: "index, follow",

    // Для мобильных устройств
    "format-detection": "telephone=no",
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "apple-mobile-web-app-title": "FairHire",

    // Для социальных сетей
    "og:email": "vsezold@gmail.com",
    "og:phone_number": "+7-923-652-35-42",
    "og:country-name": "Russia",

    // Технические meta теги
    "application-name": "FairHire",
    "apple-itunes-app": "app-id=0000000000", // Если будет мобильное приложение
    "google-site-verification": "your-google-verification-code", // Получите в Google Search Console
    "yandex-verification": "your-yandex-verification-code", // Получите в Яндекс.Вебмастер
    "msvalidate.01": "your-bing-verification-code", // Получите в Bing Webmaster Tools

    // Для лучшего понимания контента
    "theme-color": "#7c3aed", // Фиолетовый цвет вашего бренда
    "color-scheme": "light",

    // Информация о компании (Schema.org)
    organization: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "FairHire",
      applicationCategory: "BusinessApplication",
      operatingSystem: ["macOS", "Windows"],
      description:
        "B2B решение для проведения честных технических интервью с защитой от списывания",
      author: {
        "@type": "Person",
        name: "Всеволод Золотов",
        email: "vsezold@gmail.com",
        url: "https://t.me/lifeindev",
      },
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "RUB",
      },
      downloadUrl: [
        "https://7a7lrn6qmd58vdze.public.blob.vercel-storage.com/FairHire.dmg",
        "https://7a7lrn6qmd58vdze.public.blob.vercel-storage.com/FairHire%20Setup.exe",
      ],
    }),
  },

  // Настройки viewport
  viewport: {
    width: "device-width",
    initialScale: 1,
    minimumScale: 1,
    maximumScale: 5,
    userScalable: true,
    viewportFit: "cover",
  },

  // Иконки и манифест
  icons: {
    icon: [{ url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" }],
    apple: [
      { url: "/apple-touch-icon-57x57.png", sizes: "57x57" },
      { url: "/apple-touch-icon-60x60.png", sizes: "60x60" },
      { url: "/apple-touch-icon-72x72.png", sizes: "72x72" },
      { url: "/apple-touch-icon-76x76.png", sizes: "76x76" },
      { url: "/apple-touch-icon-114x114.png", sizes: "114x114" },
      { url: "/apple-touch-icon-120x120.png", sizes: "120x120" },
      { url: "/apple-touch-icon-144x144.png", sizes: "144x144" },
      { url: "/apple-touch-icon-152x152.png", sizes: "152x152" },
      { url: "/apple-touch-icon-180x180.png", sizes: "180x180" },
    ],
    other: [
      { rel: "mask-icon", url: "/safari-pinned-tab.svg", color: "#7c3aed" },
    ],
  },

  // Манифест PWA
  manifest: "/site.webmanifest",

  // Дополнительные ссылки
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    other: {
      "msvalidate.01": "your-bing-verification-code",
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <head>
        {/* Дополнительные теги, которые не покрываются metadata API */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="https://formsubmit.co" />

        {/* Дополнительные иконки */}
        <link
          rel="icon"
          type="image/png"
          href="/favicon-96x96.png"
          sizes="96x96"
        />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <meta name="apple-mobile-web-app-title" content="FairHire" />
        <link rel="manifest" href="/site.webmanifest" />

        <Script id="metrika-counter" strategy="afterInteractive">
          {`
          (function(m,e,t,r,i,k,a){
        m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
        m[i].l=1*new Date();
        for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
        k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
    })(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=103738921', 'ym');

    ym(103738921, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:"dataLayer", accurateTrackBounce:true, trackLinks:true});
          `}
        </Script>

        {/* Structured Data для лучшего понимания поисковиками */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "FairHire",
              description:
                "B2B решение для проведения честных технических интервью с защитой от списывания и мониторингом в реальном времени",
              url: "https://fair-hire.com",
              applicationCategory: "BusinessApplication",
              operatingSystem: ["macOS", "Windows"],
              browserRequirements: "Requires JavaScript. Requires HTML5.",
              author: {
                "@type": "Person",
                name: "Всеволод Золотов",
                email: "vsezold@gmail.com",
                jobTitle: "Senior Software Engineer",
                url: "https://t.me/lifeindev",
              },
              publisher: {
                "@type": "Organization",
                name: "FairHire",
                url: "https://fair-hire.com",
                logo: "https://fair-hire.com/logo.png",
                contactPoint: {
                  "@type": "ContactPoint",
                  telephone: "+7-923-652-35-42",
                  contactType: "Customer Service",
                  email: "vsezold@gmail.com",
                },
              },
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "RUB",
                availability: "https://schema.org/InStock",
              },
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "5.0",
                ratingCount: "1",
                bestRating: "5",
                worstRating: "1",
              },
              featureList: [
                "Мониторинг действий кандидата в реальном времени",
                "Защита от списывания и скриншотов",
                "Интеграция с популярными платформами интервью",
                "Поддержка MacOS и Windows",
                "Детальные отчеты по кандидатам",
                "Мгновенные уведомления о подозрительной активности",
              ],
            }),
          }}
        />

        {/* Дополнительные JSON-LD структуры */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "FairHire",
              url: "https://fair-hire.com",
              logo: "https://fair-hire.com/logo.png",
              founder: {
                "@type": "Person",
                name: "Всеволод Золотов",
              },
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+7-923-652-35-42",
                contactType: "Customer Service",
                email: "vsezold@gmail.com",
                availableLanguage: ["Russian"],
              },
              sameAs: [
                "https://github.com/vsezol/fairhire",
                "https://t.me/lifeindev",
                "https://boosty.to/vsezold",
              ],
            }),
          }}
        />
      </head>
      <body className={inter.className}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
