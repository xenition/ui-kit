/** @jest-environment jsdom */
import { render } from '@testing-library/react';
import { Button } from '../primitives/Button';
import {
  AnnouncementBarV4,
  AuroraBackgroundV4,
  BentoCardV4,
  BentoGridV4,
  CarouselV4,
  ComparisonTableV4,
  CountdownV4,
  CoverGalleryV4,
  CTABannerV4,
  EditorialGridV4,
  EditorialItemV4,
  EntityCardV4,
  FAQItemV4,
  FAQV4,
  FeatureCardV4,
  FeatureGridV4,
  FeatureSplitV4,
  FooterColumnV4,
  FooterV4,
  GenerativeCoverV4,
  GradientHeroV4,
  LocationBlockV4,
  LogoCloudV4,
  NavbarV4,
  NewsletterSignupV4,
  OrnamentRuleV4,
  ParticleFieldV4,
  PointerHaloV4,
  PriceListV4,
  PriceRowV4,
  PricingTableV4,
  PricingTierV4,
  PricingToggleV4,
  ProcessStepsV4,
  ProductMockV4,
  RichTextV4,
  SectionDividerV4,
  SectionHeadingV4,
  StatBarV4,
  StatV4,
  TeamGridV4,
  TestimonialsV4,
  TestimonialV4,
  VideoEmbedV4,
} from './index';
import {
  installMatchMedia,
  installMockIntersectionObserver,
} from '../spec-support/mock-io';

/**
 * Mounts the whole marketing V4 "showcase" line (web) with realistic props and
 * proves token purity: every V4 skin is Tailwind var-bound (`--xen-*`) classes,
 * so NO color-hex literal may appear in an inline `style` attribute — the same
 * invariant the base marketing spec asserts. Base components and index.ts are
 * untouched; this only adds coverage.
 */

const HEX_LITERAL = /#[0-9a-fA-F]{3,8}\b/;

const inlineStyles = (root: HTMLElement): string =>
  Array.from(root.querySelectorAll<HTMLElement>('[style]'))
    .map((el) => el.getAttribute('style') ?? '')
    .join('\n');

const expectNoInlineHex = (root: HTMLElement): void => {
  expect(inlineStyles(root)).not.toMatch(HEX_LITERAL);
};

beforeEach(() => {
  installMockIntersectionObserver();
  installMatchMedia(true); // reduced motion → deterministic (counters/countdown settle)
});

describe('marketing V4 "showcase" line (web)', () => {
  it('mounts the brand-gradient moments (hero / CTA / announcement / newsletter) hex-free', () => {
    const { getByText, getByRole, container } = render(
      <>
        <AnnouncementBarV4
          tone="primary"
          message="Launch week — 20% off annual plans"
          action={<Button>Claim offer</Button>}
        />
        <GradientHeroV4
          eyebrow="New"
          title="Ship a themed site in minutes"
          subtitle="Every template restyles by seed alone."
          actions={<Button>Get started</Button>}
          media={<img alt="product screenshot" />}
        />
        <CTABannerV4
          title="Ready to build?"
          subtitle="Start free — no card required."
          action={<Button>Create account</Button>}
        />
        <NewsletterSignupV4
          heading="Stay in the loop"
          subtext="Monthly product notes. No spam."
          onSubmit={async () => {}}
        />
      </>
    );
    expect(getByText('Launch week — 20% off annual plans')).toBeTruthy();
    expect(getByText('Ship a themed site in minutes').tagName).toBe('H1');
    expect(getByText('Ready to build?').tagName).toBe('H2');
    expect(getByText('Stay in the loop')).toBeTruthy();
    expect(getByRole('button', { name: 'Claim offer' })).toBeTruthy();
    expectNoInlineHex(container);
  });

  it('mounts the structured content sections hex-free', () => {
    const { getByText, container } = render(
      <>
        <NavbarV4 logo={<span>Acme</span>} actions={<Button>Sign in</Button>}>
          <a href="#features">Features</a>
          <a href="#pricing">Pricing</a>
        </NavbarV4>
        <SectionHeadingV4
          eyebrow="Why us"
          title="Everything token-driven"
          lede="One seed restyles the whole surface."
        />
        <FeatureGridV4 columns={3}>
          <FeatureCardV4 icon={<svg data-testid="icon" />} title="Fast">
            Ships in seconds.
          </FeatureCardV4>
          <FeatureCardV4 title="Themed">Restyles by seed.</FeatureCardV4>
          <FeatureCardV4 title="Accessible">WAI-ARIA baked in.</FeatureCardV4>
        </FeatureGridV4>
        <FeatureSplitV4
          eyebrow="Workflow"
          title="From prompt to production"
          description="Describe the brand; the kit compiles the theme."
          bullets={['Token pipeline', 'Dark-mode safe', 'Web + native']}
          media={<img alt="workflow" />}
          action={<Button>See how</Button>}
        />
        <StatBarV4>
          <StatV4 to={12000} label="Developers" suffix="+" />
          <StatV4 to={99} label="Uptime" suffix="%" />
        </StatBarV4>
        <TestimonialsV4>
          <TestimonialV4 name="Ada King" role="CTO, Acme">
            Best kit we have used.
          </TestimonialV4>
          <TestimonialV4 name="Grace Hopper" role="Staff Eng">
            Saved us weeks.
          </TestimonialV4>
        </TestimonialsV4>
        <ProcessStepsV4
          steps={[
            { title: 'Describe', description: 'Give a brand seed.' },
            { title: 'Compile', description: 'Tokens are generated.' },
            { title: 'Ship', description: 'Deploy the themed site.' },
          ]}
        />
        <TeamGridV4
          columns={3}
          members={[
            { name: 'Ada King', role: 'CTO', bio: 'Systems.' },
            { name: 'Linus Ada', role: 'Design', bio: 'Tokens.' },
          ]}
        />
        <LogoCloudV4 label="Trusted by">
          <span>Alpha</span>
          <span>Beta</span>
        </LogoCloudV4>
      </>
    );
    expect(getByText('Everything token-driven').tagName).toBe('H2');
    expect(getByText('Fast').tagName).toBe('H3');
    expect(getByText('Best kit we have used.')).toBeTruthy();
    expect(getByText('Describe')).toBeTruthy();
    expect(getByText('Trusted by')).toBeTruthy();
    expectNoInlineHex(container);
  });

  it('mounts the pricing / comparison / FAQ / footer sections hex-free', () => {
    const { getAllByText, getByText, getByRole, container } = render(
      <>
        <PricingToggleV4
          label="Billing period"
          options={[
            { label: 'Monthly', value: 'monthly' },
            { label: 'Yearly', value: 'yearly', badge: 'Save 20%' },
          ]}
          value="monthly"
          onChange={() => {}}
        />
        <PricingTableV4>
          <PricingTierV4
            name="Starter"
            price="$0"
            period="/month"
            description="For side projects."
            features={['1 site', 'Community support']}
            action={<Button>Choose</Button>}
          />
          <PricingTierV4
            name="Pro"
            price="$19"
            period="/month"
            features={['Unlimited sites', 'Priority support']}
            featured
            action={<Button>Upgrade</Button>}
          />
        </PricingTableV4>
        <PriceListV4 heading="Services">
          <PriceRowV4 name="Consultation" price="$120" description="60 min" />
          <PriceRowV4 name="Audit" price="$480" description="Full review" />
        </PriceListV4>
        <ComparisonTableV4
          featureLabel="Feature"
          highlightLabel="Recommended"
          columns={[{ name: 'Starter' }, { name: 'Pro', highlight: true }]}
          rows={[
            { label: 'Sites', values: ['1', 'Unlimited'] },
            { label: 'Support', values: [false, true] },
          ]}
        />
        <FAQV4>
          <FAQItemV4 question="Is it themed?" defaultOpen>
            Fully — tokens only.
          </FAQItemV4>
          <FAQItemV4 question="Native ready?">Yes, web + native.</FAQItemV4>
        </FAQV4>
        <FooterV4 logo={<span>Acme</span>} bottom={<span>© 2026 Acme</span>}>
          <FooterColumnV4 title="Product">
            <a href="#pricing">Pricing</a>
          </FooterColumnV4>
          <FooterColumnV4 title="Company">
            <a href="#about">About</a>
          </FooterColumnV4>
        </FooterV4>
      </>
    );
    expect(getAllByText('Starter').length).toBeGreaterThan(0);
    expect(getByText('Consultation')).toBeTruthy();
    expect(getByRole('button', { name: 'Is it themed?' })).toBeTruthy();
    expect(getByText('© 2026 Acme')).toBeTruthy();
    expectNoInlineHex(container);
  });

  it('mounts the media / visual-machinery sections hex-free', () => {
    const { getByText, container } = render(
      <>
        <AuroraBackgroundV4 variant="mesh" grain pattern="grid" />
        <ParticleFieldV4 mood="fireflies" density={12} seed={7} />
        <PointerHaloV4 label="Cursor halo" />
        <OrnamentRuleV4 ornament="diamond" tone="accent" />
        <SectionDividerV4 variant="ornament" ornament="dot" tone="primary" />
        <ProductMockV4
          variant="analytics"
          title="analytics / production"
          kpis={[
            { label: 'MRR', value: '$48.2k' },
            { label: 'Active', value: '3,120' },
          ]}
          chart="bars"
          feed={['New signup', 'Invoice paid']}
          footnote="9,214 events in the last 5s"
        />
        <BentoGridV4 columns={6}>
          <BentoCardV4 title="Speed" metric="12ms" span={3}>
            Fast by default.
          </BentoCardV4>
          <BentoCardV4 title="Themed" metric="1 seed" span={3}>
            Restyles instantly.
          </BentoCardV4>
        </BentoGridV4>
        <EditorialGridV4 columns={12}>
          <EditorialItemV4 span={6} caption="Plate one">
            <GenerativeCoverV4 seed="alpha" form="orbit" label="Alpha" />
          </EditorialItemV4>
          <EditorialItemV4 span={6} caption="Plate two">
            <GenerativeCoverV4 seed="beta" form="grid" label="Beta" />
          </EditorialItemV4>
        </EditorialGridV4>
        <CoverGalleryV4
          columns={3}
          items={[
            { seed: 'one', label: 'One', caption: 'First work', meta: 'Oil, 2024' },
            { seed: 'two', label: 'Two', caption: 'Second work', meta: 'Ink, 2025' },
          ]}
        />
        <EntityCardV4
          eyebrow="Article"
          title="Designing with tokens"
          description="A guide to seed-driven theming."
          meta="8 min read"
          media={{ seed: 'entity', form: 'bands' }}
        />
        <CarouselV4 label="Highlights">
          <div>Slide one</div>
          <div>Slide two</div>
        </CarouselV4>
        <VideoEmbedV4 src="https://example.com/embed/xyz" title="Product tour" />
        <CountdownV4 to="2099-01-01T00:00:00Z" />
        <LocationBlockV4
          name="Acme HQ"
          address="1 Market St, Springfield"
          phone="+1 555 0100"
          email="hi@acme.test"
          hours={[{ label: 'Mon–Fri', value: '9:00–17:00' }]}
        />
        <RichTextV4 html="<p>Hello <strong>world</strong>.</p>" />
      </>
    );
    expect(getByText('Designing with tokens')).toBeTruthy();
    expect(getByText('Slide one')).toBeTruthy();
    expect(getByText('Acme HQ')).toBeTruthy();
    expect(getByText('world')).toBeTruthy();
    expectNoInlineHex(container);
  });
});
