"use strict";
/**
 * `@xenition/ui/native/marketing` — composed content sections for React Native
 * templates, mirroring the web `@xenition/ui/marketing` prop contracts
 * (`href`→`onPress` is the idiomatic swap). Genuine RN components styled only
 * from the compiled theme tokens via `useXenitionTheme()` — no literal colors,
 * no DOM.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenerativeCover = exports.PointerHalo = exports.ParticleField = exports.AuroraBackground = exports.NewsletterSignup = exports.Countdown = exports.VideoEmbed = exports.CoverGallery = exports.Carousel = exports.LocationBlock = exports.FeatureSplit = exports.TeamGrid = exports.ProcessSteps = exports.ProductMock = exports.Navbar = exports.ComparisonTable = exports.PricingToggle = exports.PriceList = exports.AnnouncementBar = exports.SectionDivider = exports.OrnamentRule = exports.EditorialItem = exports.EditorialGrid = exports.BentoCard = exports.BentoGrid = exports.LogoCloud = exports.Stat = exports.StatBar = exports.PricingTable = exports.FAQ = exports.initialsFromName = exports.Testimonials = exports.FeatureGrid = exports.Footer = exports.CTABanner = exports.SectionHeading = exports.GradientHero = exports.EntityCard = void 0;
var EntityCard_1 = require("./EntityCard");
Object.defineProperty(exports, "EntityCard", { enumerable: true, get: function () { return EntityCard_1.EntityCard; } });
// ── native marketing sections (parity with @xenition/ui/marketing) ────
var GradientHero_1 = require("./GradientHero");
Object.defineProperty(exports, "GradientHero", { enumerable: true, get: function () { return GradientHero_1.GradientHero; } });
var SectionHeading_1 = require("./SectionHeading");
Object.defineProperty(exports, "SectionHeading", { enumerable: true, get: function () { return SectionHeading_1.SectionHeading; } });
var CTABanner_1 = require("./CTABanner");
Object.defineProperty(exports, "CTABanner", { enumerable: true, get: function () { return CTABanner_1.CTABanner; } });
var Footer_1 = require("./Footer");
Object.defineProperty(exports, "Footer", { enumerable: true, get: function () { return Footer_1.Footer; } });
var FeatureGrid_1 = require("./FeatureGrid");
Object.defineProperty(exports, "FeatureGrid", { enumerable: true, get: function () { return FeatureGrid_1.FeatureGrid; } });
var Testimonials_1 = require("./Testimonials");
Object.defineProperty(exports, "Testimonials", { enumerable: true, get: function () { return Testimonials_1.Testimonials; } });
Object.defineProperty(exports, "initialsFromName", { enumerable: true, get: function () { return Testimonials_1.initialsFromName; } });
var FAQ_1 = require("./FAQ");
Object.defineProperty(exports, "FAQ", { enumerable: true, get: function () { return FAQ_1.FAQ; } });
var PricingTable_1 = require("./PricingTable");
Object.defineProperty(exports, "PricingTable", { enumerable: true, get: function () { return PricingTable_1.PricingTable; } });
var StatBar_1 = require("./StatBar");
Object.defineProperty(exports, "StatBar", { enumerable: true, get: function () { return StatBar_1.StatBar; } });
Object.defineProperty(exports, "Stat", { enumerable: true, get: function () { return StatBar_1.Stat; } });
var LogoCloud_1 = require("./LogoCloud");
Object.defineProperty(exports, "LogoCloud", { enumerable: true, get: function () { return LogoCloud_1.LogoCloud; } });
// ── full parity with @xenition/ui/marketing (native ports) ────────────
var Bento_1 = require("./Bento");
Object.defineProperty(exports, "BentoGrid", { enumerable: true, get: function () { return Bento_1.BentoGrid; } });
Object.defineProperty(exports, "BentoCard", { enumerable: true, get: function () { return Bento_1.BentoCard; } });
var EditorialGrid_1 = require("./EditorialGrid");
Object.defineProperty(exports, "EditorialGrid", { enumerable: true, get: function () { return EditorialGrid_1.EditorialGrid; } });
Object.defineProperty(exports, "EditorialItem", { enumerable: true, get: function () { return EditorialGrid_1.EditorialItem; } });
var OrnamentRule_1 = require("./OrnamentRule");
Object.defineProperty(exports, "OrnamentRule", { enumerable: true, get: function () { return OrnamentRule_1.OrnamentRule; } });
var SectionDivider_1 = require("./SectionDivider");
Object.defineProperty(exports, "SectionDivider", { enumerable: true, get: function () { return SectionDivider_1.SectionDivider; } });
var AnnouncementBar_1 = require("./AnnouncementBar");
Object.defineProperty(exports, "AnnouncementBar", { enumerable: true, get: function () { return AnnouncementBar_1.AnnouncementBar; } });
var PriceList_1 = require("./PriceList");
Object.defineProperty(exports, "PriceList", { enumerable: true, get: function () { return PriceList_1.PriceList; } });
var PricingToggle_1 = require("./PricingToggle");
Object.defineProperty(exports, "PricingToggle", { enumerable: true, get: function () { return PricingToggle_1.PricingToggle; } });
var ComparisonTable_1 = require("./ComparisonTable");
Object.defineProperty(exports, "ComparisonTable", { enumerable: true, get: function () { return ComparisonTable_1.ComparisonTable; } });
var Navbar_1 = require("./Navbar");
Object.defineProperty(exports, "Navbar", { enumerable: true, get: function () { return Navbar_1.Navbar; } });
var ProductMock_1 = require("./ProductMock");
Object.defineProperty(exports, "ProductMock", { enumerable: true, get: function () { return ProductMock_1.ProductMock; } });
var ProcessSteps_1 = require("./ProcessSteps");
Object.defineProperty(exports, "ProcessSteps", { enumerable: true, get: function () { return ProcessSteps_1.ProcessSteps; } });
var TeamGrid_1 = require("./TeamGrid");
Object.defineProperty(exports, "TeamGrid", { enumerable: true, get: function () { return TeamGrid_1.TeamGrid; } });
var FeatureSplit_1 = require("./FeatureSplit");
Object.defineProperty(exports, "FeatureSplit", { enumerable: true, get: function () { return FeatureSplit_1.FeatureSplit; } });
var LocationBlock_1 = require("./LocationBlock");
Object.defineProperty(exports, "LocationBlock", { enumerable: true, get: function () { return LocationBlock_1.LocationBlock; } });
var Carousel_1 = require("./Carousel");
Object.defineProperty(exports, "Carousel", { enumerable: true, get: function () { return Carousel_1.Carousel; } });
var CoverGallery_1 = require("./CoverGallery");
Object.defineProperty(exports, "CoverGallery", { enumerable: true, get: function () { return CoverGallery_1.CoverGallery; } });
var VideoEmbed_1 = require("./VideoEmbed");
Object.defineProperty(exports, "VideoEmbed", { enumerable: true, get: function () { return VideoEmbed_1.VideoEmbed; } });
var Countdown_1 = require("./Countdown");
Object.defineProperty(exports, "Countdown", { enumerable: true, get: function () { return Countdown_1.Countdown; } });
var NewsletterSignup_1 = require("./NewsletterSignup");
Object.defineProperty(exports, "NewsletterSignup", { enumerable: true, get: function () { return NewsletterSignup_1.NewsletterSignup; } });
var AuroraBackground_1 = require("./AuroraBackground");
Object.defineProperty(exports, "AuroraBackground", { enumerable: true, get: function () { return AuroraBackground_1.AuroraBackground; } });
var ParticleField_1 = require("./ParticleField");
Object.defineProperty(exports, "ParticleField", { enumerable: true, get: function () { return ParticleField_1.ParticleField; } });
var PointerHalo_1 = require("./PointerHalo");
Object.defineProperty(exports, "PointerHalo", { enumerable: true, get: function () { return PointerHalo_1.PointerHalo; } });
// GenerativeCover: re-export the existing native commerce implementation
// (mirrors how the web marketing index surfaces GenerativeCover).
var GenerativeCover_1 = require("../commerce/GenerativeCover");
Object.defineProperty(exports, "GenerativeCover", { enumerable: true, get: function () { return GenerativeCover_1.GenerativeCover; } });
//# sourceMappingURL=index.js.map