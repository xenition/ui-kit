"use strict";
/**
 * `@xenition/ui/marketing` — composed marketing sections for template
 * websites. Styled exclusively via the `--xen-*` theme tokens and the
 * var-bound Tailwind preset classes, so every template restyles by seed
 * alone. Motion comes from `@xenition/ui/motion` and always honors
 * `prefers-reduced-motion`.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntityCard = exports.SectionDivider = exports.EditorialItem = exports.EditorialGrid = exports.PointerHalo = exports.COVER_FORMS = exports.hashSeed = exports.GenerativeCover = exports.PriceRow = exports.PriceList = exports.OrnamentRule = exports.computeParticles = exports.ParticleField = exports.BentoCard = exports.BentoGrid = exports.ProductMock = exports.LogoCloud = exports.FooterColumn = exports.Footer = exports.CTABanner = exports.FAQItem = exports.FAQ = exports.PricingTier = exports.PricingTable = exports.initialsFromName = exports.Testimonial = exports.Testimonials = exports.Stat = exports.StatBar = exports.FeatureCard = exports.FeatureGrid = exports.SectionHeading = exports.Navbar = exports.GradientHero = exports.AuroraBackground = void 0;
var AuroraBackground_1 = require("./AuroraBackground");
Object.defineProperty(exports, "AuroraBackground", { enumerable: true, get: function () { return AuroraBackground_1.AuroraBackground; } });
var GradientHero_1 = require("./GradientHero");
Object.defineProperty(exports, "GradientHero", { enumerable: true, get: function () { return GradientHero_1.GradientHero; } });
var Navbar_1 = require("./Navbar");
Object.defineProperty(exports, "Navbar", { enumerable: true, get: function () { return Navbar_1.Navbar; } });
var SectionHeading_1 = require("./SectionHeading");
Object.defineProperty(exports, "SectionHeading", { enumerable: true, get: function () { return SectionHeading_1.SectionHeading; } });
var FeatureGrid_1 = require("./FeatureGrid");
Object.defineProperty(exports, "FeatureGrid", { enumerable: true, get: function () { return FeatureGrid_1.FeatureGrid; } });
Object.defineProperty(exports, "FeatureCard", { enumerable: true, get: function () { return FeatureGrid_1.FeatureCard; } });
var StatBar_1 = require("./StatBar");
Object.defineProperty(exports, "StatBar", { enumerable: true, get: function () { return StatBar_1.StatBar; } });
Object.defineProperty(exports, "Stat", { enumerable: true, get: function () { return StatBar_1.Stat; } });
var Testimonials_1 = require("./Testimonials");
Object.defineProperty(exports, "Testimonials", { enumerable: true, get: function () { return Testimonials_1.Testimonials; } });
Object.defineProperty(exports, "Testimonial", { enumerable: true, get: function () { return Testimonials_1.Testimonial; } });
Object.defineProperty(exports, "initialsFromName", { enumerable: true, get: function () { return Testimonials_1.initialsFromName; } });
var PricingTable_1 = require("./PricingTable");
Object.defineProperty(exports, "PricingTable", { enumerable: true, get: function () { return PricingTable_1.PricingTable; } });
Object.defineProperty(exports, "PricingTier", { enumerable: true, get: function () { return PricingTable_1.PricingTier; } });
var FAQ_1 = require("./FAQ");
Object.defineProperty(exports, "FAQ", { enumerable: true, get: function () { return FAQ_1.FAQ; } });
Object.defineProperty(exports, "FAQItem", { enumerable: true, get: function () { return FAQ_1.FAQItem; } });
var CTABanner_1 = require("./CTABanner");
Object.defineProperty(exports, "CTABanner", { enumerable: true, get: function () { return CTABanner_1.CTABanner; } });
var Footer_1 = require("./Footer");
Object.defineProperty(exports, "Footer", { enumerable: true, get: function () { return Footer_1.Footer; } });
Object.defineProperty(exports, "FooterColumn", { enumerable: true, get: function () { return Footer_1.FooterColumn; } });
var LogoCloud_1 = require("./LogoCloud");
Object.defineProperty(exports, "LogoCloud", { enumerable: true, get: function () { return LogoCloud_1.LogoCloud; } });
var ProductMock_1 = require("./ProductMock");
Object.defineProperty(exports, "ProductMock", { enumerable: true, get: function () { return ProductMock_1.ProductMock; } });
var Bento_1 = require("./Bento");
Object.defineProperty(exports, "BentoGrid", { enumerable: true, get: function () { return Bento_1.BentoGrid; } });
Object.defineProperty(exports, "BentoCard", { enumerable: true, get: function () { return Bento_1.BentoCard; } });
var ParticleField_1 = require("./ParticleField");
Object.defineProperty(exports, "ParticleField", { enumerable: true, get: function () { return ParticleField_1.ParticleField; } });
Object.defineProperty(exports, "computeParticles", { enumerable: true, get: function () { return ParticleField_1.computeParticles; } });
var OrnamentRule_1 = require("./OrnamentRule");
Object.defineProperty(exports, "OrnamentRule", { enumerable: true, get: function () { return OrnamentRule_1.OrnamentRule; } });
var PriceList_1 = require("./PriceList");
Object.defineProperty(exports, "PriceList", { enumerable: true, get: function () { return PriceList_1.PriceList; } });
Object.defineProperty(exports, "PriceRow", { enumerable: true, get: function () { return PriceList_1.PriceRow; } });
var GenerativeCover_1 = require("./GenerativeCover");
Object.defineProperty(exports, "GenerativeCover", { enumerable: true, get: function () { return GenerativeCover_1.GenerativeCover; } });
Object.defineProperty(exports, "hashSeed", { enumerable: true, get: function () { return GenerativeCover_1.hashSeed; } });
Object.defineProperty(exports, "COVER_FORMS", { enumerable: true, get: function () { return GenerativeCover_1.COVER_FORMS; } });
var PointerHalo_1 = require("./PointerHalo");
Object.defineProperty(exports, "PointerHalo", { enumerable: true, get: function () { return PointerHalo_1.PointerHalo; } });
var EditorialGrid_1 = require("./EditorialGrid");
Object.defineProperty(exports, "EditorialGrid", { enumerable: true, get: function () { return EditorialGrid_1.EditorialGrid; } });
Object.defineProperty(exports, "EditorialItem", { enumerable: true, get: function () { return EditorialGrid_1.EditorialItem; } });
var SectionDivider_1 = require("./SectionDivider");
Object.defineProperty(exports, "SectionDivider", { enumerable: true, get: function () { return SectionDivider_1.SectionDivider; } });
var EntityCard_1 = require("./EntityCard");
Object.defineProperty(exports, "EntityCard", { enumerable: true, get: function () { return EntityCard_1.EntityCard; } });
//# sourceMappingURL=index.js.map