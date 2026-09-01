/**
 * `@xenition/ui/native/marketing` — composed content sections for React Native
 * templates, mirroring the web `@xenition/ui/marketing` prop contracts
 * (`href`→`onPress` is the idiomatic swap). Genuine RN components styled only
 * from the compiled theme tokens via `useXenitionTheme()` — no literal colors,
 * no DOM.
 */

export { EntityCard } from './EntityCard';
export type { EntityCardProps, EntityCardMedia } from './EntityCard';

// ── native marketing sections (parity with @xenition/ui/marketing) ────
export { GradientHero } from './GradientHero';
export type { GradientHeroProps } from './GradientHero';
export { SectionHeading } from './SectionHeading';
export type { SectionHeadingProps } from './SectionHeading';
export { RichText, parseRichText } from './RichText';
export type { RichTextProps } from './RichText';
export { CTABanner } from './CTABanner';
export type { CTABannerProps } from './CTABanner';
export { Footer } from './Footer';
export type { FooterProps, FooterColumn, FooterLink } from './Footer';
export { FeatureGrid } from './FeatureGrid';
export type { FeatureGridProps, FeatureItem } from './FeatureGrid';
export { Testimonials, initialsFromName } from './Testimonials';
export type { TestimonialsProps, TestimonialItem } from './Testimonials';
export { FAQ } from './FAQ';
export type { FAQProps, FAQItemData } from './FAQ';
export { PricingTable } from './PricingTable';
export type { PricingTableProps, PricingPlan, PricingPlanCta } from './PricingTable';
export { StatBar, Stat } from './StatBar';
export type { StatBarProps, StatItem } from './StatBar';
export { LogoCloud } from './LogoCloud';
export type { LogoCloudProps } from './LogoCloud';

// ── full parity with @xenition/ui/marketing (native ports) ────────────
export { BentoGrid, BentoCard } from './Bento';
export type { BentoGridProps, BentoCardProps, BentoCardData } from './Bento';
export { EditorialGrid, EditorialItem } from './EditorialGrid';
export type { EditorialGridProps, EditorialItemProps, EditorialItemData } from './EditorialGrid';
export { OrnamentRule } from './OrnamentRule';
export type { OrnamentRuleProps, OrnamentShape, OrnamentTone } from './OrnamentRule';
export { SectionDivider } from './SectionDivider';
export type { SectionDividerProps, SectionDividerVariant } from './SectionDivider';
export { AnnouncementBar } from './AnnouncementBar';
export type { AnnouncementBarProps, AnnouncementTone } from './AnnouncementBar';
export { PriceList } from './PriceList';
export type { PriceListProps, PriceRow } from './PriceList';
export { PricingToggle } from './PricingToggle';
export type { PricingToggleProps, PricingToggleOption } from './PricingToggle';
export { ComparisonTable } from './ComparisonTable';
export type { ComparisonTableProps, ComparisonColumn, ComparisonRow } from './ComparisonTable';
export { Navbar } from './Navbar';
export type { NavbarProps, NavbarLink } from './Navbar';
export { ProductMock } from './ProductMock';
export type {
  ProductMockProps,
  ProductMockVariant,
  ProductMockChart,
  ProductMockKpi,
} from './ProductMock';
export { ProcessSteps } from './ProcessSteps';
export type { ProcessStepsProps, ProcessStep } from './ProcessSteps';
export { TeamGrid } from './TeamGrid';
export type { TeamGridProps, TeamMember } from './TeamGrid';
export { FeatureSplit } from './FeatureSplit';
export type { FeatureSplitProps } from './FeatureSplit';
export { LocationBlock } from './LocationBlock';
export type { LocationBlockProps, LocationHour } from './LocationBlock';
export { Carousel } from './Carousel';
export type { CarouselProps } from './Carousel';
export { CoverGallery } from './CoverGallery';
export type { CoverGalleryProps, CoverGalleryItem } from './CoverGallery';
export { VideoEmbed } from './VideoEmbed';
export type { VideoEmbedProps } from './VideoEmbed';
export { Countdown } from './Countdown';
export type { CountdownProps } from './Countdown';
export { NewsletterSignup } from './NewsletterSignup';
export type { NewsletterSignupProps } from './NewsletterSignup';
export { AuroraBackground } from './AuroraBackground';
export type { AuroraBackgroundProps, AuroraVariant, AuroraPattern } from './AuroraBackground';
export { ParticleField } from './ParticleField';
export type { ParticleFieldProps, ParticleMood } from './ParticleField';
export { PointerHalo } from './PointerHalo';
export type { PointerHaloProps, PointerHaloMode } from './PointerHalo';
// GenerativeCover: re-export the existing native commerce implementation
// (mirrors how the web marketing index surfaces GenerativeCover).
export { GenerativeCover } from '../commerce/GenerativeCover';
export type { GenerativeCoverProps } from '../commerce/GenerativeCover';

/*
 * ── V4 "showcase" design line ──
 * A drop-in V4 variant for every marketing component: a bold, conversion-forward
 * landing language — extra-bold headlines, elevated cards, refined visual
 * machinery, and a vibrant primary→accent brand gradient reserved for the
 * hero / CTA / announcement / newsletter moments. Base components untouched; V4
 * is additive. Token-driven, dark-mode safe, web + native.
 */
export { AnnouncementBarV4, type AnnouncementBarV4Props } from './AnnouncementBarV4';
export { AuroraBackgroundV4, type AuroraBackgroundV4Props } from './AuroraBackgroundV4';
export { BentoCardV4,BentoGridV4, type BentoCardV4Props,type BentoGridV4Props } from './BentoV4';
export { CTABannerV4, type CTABannerV4Props } from './CTABannerV4';
export { CarouselV4, type CarouselV4Props } from './CarouselV4';
export { ComparisonTableV4, type ComparisonTableV4Props } from './ComparisonTableV4';
export { CountdownV4, type CountdownV4Props } from './CountdownV4';
export { CoverGalleryV4, type CoverGalleryV4Props } from './CoverGalleryV4';
export { EditorialGridV4,EditorialItemV4, type EditorialGridV4Props,type EditorialItemV4Props } from './EditorialGridV4';
export { EntityCardV4, type EntityCardV4Props } from './EntityCardV4';
export { FAQV4, type FAQItemV4Props,type FAQV4Props } from './FAQV4';
export { FeatureGridV4, type FeatureGridV4Props } from './FeatureGridV4';
export { FeatureSplitV4, type FeatureSplitV4Props } from './FeatureSplitV4';
export { FooterV4, type FooterColumnV4Props,type FooterV4Props } from './FooterV4';
export { GenerativeCoverV4, type GenerativeCoverV4Props } from './GenerativeCoverV4';
export { GradientHeroV4, type GradientHeroV4Props } from './GradientHeroV4';
export { LocationBlockV4, type LocationBlockV4Props } from './LocationBlockV4';
export { LogoCloudV4, type LogoCloudV4Props } from './LogoCloudV4';
export { NavbarV4, type NavbarV4Props } from './NavbarV4';
export { NewsletterSignupV4, type NewsletterSignupV4Props } from './NewsletterSignupV4';
export { OrnamentRuleV4, type OrnamentRuleV4Props } from './OrnamentRuleV4';
export { ParticleFieldV4, type ParticleFieldV4Props } from './ParticleFieldV4';
export { PointerHaloV4, type PointerHaloV4Props } from './PointerHaloV4';
export { PriceListV4,PriceRowV4, type PriceListV4Props,type PriceRowV4Props } from './PriceListV4';
export { PricingTableV4,PricingTierV4, type PricingTableV4Props,type PricingTierV4Props } from './PricingTableV4';
export { PricingToggleV4, type PricingToggleV4Props } from './PricingToggleV4';
export { ProcessStepsV4, type ProcessStepsV4Props } from './ProcessStepsV4';
export { ProductMockV4, type ProductMockV4Props } from './ProductMockV4';
export { RichTextV4, type RichTextV4Props } from './RichTextV4';
export { SectionDividerV4, type SectionDividerV4Props } from './SectionDividerV4';
export { SectionHeadingV4, type SectionHeadingV4Props } from './SectionHeadingV4';
export { StatBarV4,StatV4, type StatBarV4Props,type StatV4Props } from './StatBarV4';
export { TeamGridV4, type TeamGridV4Props } from './TeamGridV4';
export { TestimonialV4,TestimonialsV4, type TestimonialV4Props,type TestimonialsV4Props } from './TestimonialsV4';
export { VideoEmbedV4, type VideoEmbedV4Props } from './VideoEmbedV4';
