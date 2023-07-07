import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translations from './translations'

i18n
    .use(initReactI18next)
    .init({
        lng: "en", //default language
        fallbackLng: "en", //when specified language translations not present 
        //then fallbacklang translations loaded.
        debug: true,

        interpolation: {
            escapeValue: false,
            formatSeparator: ",",
        },
        react: {
            wait: true,
        },
        resources: translations
    });


export default i18n;