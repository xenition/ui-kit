"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.localize = exports.pickLocale = exports.baseKeys = exports.baseBundle = exports.localeMeta = exports.coerceLocale = exports.DEFAULT_LOCALE = exports.LOCALE_CODES = exports.LOCALES = exports.LanguageSwitcher = exports.useT = exports.XenitionI18nProvider = void 0;
/**
 * `@xenition/ui/i18n` — a zero-dependency runtime i18n layer for the template
 * SPAs: a provider, a `useT()` hook with `{{var}}` interpolation and English
 * fallback, a self-theming `<LanguageSwitcher/>`, the seven bundled locales, a
 * shared base dictionary of chrome strings, and helpers for localizing
 * SDK-seeded content on the frontend.
 */
var context_1 = require("./context");
Object.defineProperty(exports, "XenitionI18nProvider", { enumerable: true, get: function () { return context_1.XenitionI18nProvider; } });
Object.defineProperty(exports, "useT", { enumerable: true, get: function () { return context_1.useT; } });
var LanguageSwitcher_1 = require("./LanguageSwitcher");
Object.defineProperty(exports, "LanguageSwitcher", { enumerable: true, get: function () { return LanguageSwitcher_1.LanguageSwitcher; } });
var locales_1 = require("./locales");
Object.defineProperty(exports, "LOCALES", { enumerable: true, get: function () { return locales_1.LOCALES; } });
Object.defineProperty(exports, "LOCALE_CODES", { enumerable: true, get: function () { return locales_1.LOCALE_CODES; } });
Object.defineProperty(exports, "DEFAULT_LOCALE", { enumerable: true, get: function () { return locales_1.DEFAULT_LOCALE; } });
Object.defineProperty(exports, "coerceLocale", { enumerable: true, get: function () { return locales_1.coerceLocale; } });
Object.defineProperty(exports, "localeMeta", { enumerable: true, get: function () { return locales_1.localeMeta; } });
var base_1 = require("./base");
Object.defineProperty(exports, "baseBundle", { enumerable: true, get: function () { return base_1.baseBundle; } });
Object.defineProperty(exports, "baseKeys", { enumerable: true, get: function () { return base_1.baseKeys; } });
var content_1 = require("./content");
Object.defineProperty(exports, "pickLocale", { enumerable: true, get: function () { return content_1.pickLocale; } });
Object.defineProperty(exports, "localize", { enumerable: true, get: function () { return content_1.localize; } });
//# sourceMappingURL=index.js.map