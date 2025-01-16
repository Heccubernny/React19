import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { i18nextPlugin } from 'translation-check';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from './locales/en/en.json';
import fr from './locales/fr/fr.json';
i18n
    .use( Backend )
    .use( LanguageDetector )
    .use( initReactI18next )
    .use( i18nextPlugin )
    .init( {
        // the translations
        // (tip move them in a JSON file and import them,
        // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
        resources: {
            en,
            fr
        },
        // lng: "en", // if you're using a language detector, do not define the lng option
        // fallbackLng: "en",
        debug: true,

        interpolation: {
            escapeValue: false // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
        },
        react: {
            bindI18n: "languageChanged"
        }
    } );

export default i18n;