import * as React from 'react';
import { Text, View } from 'react-native';
import {
  SEED_LIGHT,
  SEED_DARK,
  renderThemed,
  renderedStyleHexes,
  tokenHexSet,
} from '../spec-support/render-native';
import { Button } from '../primitives/Button';
import {
  AnnouncementBarV4,
  AuroraBackgroundV4,
  BentoGridV4,
  CarouselV4,
  ComparisonTableV4,
  CountdownV4,
  CoverGalleryV4,
  CTABannerV4,
  EditorialGridV4,
  EntityCardV4,
  FAQV4,
  FeatureGridV4,
  FeatureSplitV4,
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
  PricingTableV4,
  PricingToggleV4,
  ProcessStepsV4,
  ProductMockV4,
  RichTextV4,
  SectionDividerV4,
  SectionHeadingV4,
  StatBarV4,
  TeamGridV4,
  TestimonialsV4,
  VideoEmbedV4,
} from './index';

/**
 * Mounts the whole native marketing V4 "showcase" line with realistic props and
 * proves token purity: on native the tokens ARE resolved hex, so the invariant
 * is that EVERY hex found in a rendered `style` traces to a compiled-theme token
 * (no literal). The brand-gradient moments — CTABannerV4, GradientHeroV4,
 * AnnouncementBarV4 (tone="primary"), NewsletterSignupV4 — carry near-white ink
 * on a primary→accent gradient, so they are included in BOTH seeds to prove that
 * ink/gradient also traces to tokens. Base components and index.ts are untouched.
 */

/** The whole native V4 line in one tree, with realistic props. */
function AllV4(): React.ReactElement {
  return (
    <>
      <AnnouncementBarV4
        tone="primary"
        message="Launch week — 20% off annual plans"
        actionLabel="Claim"
        onPress={() => {}}
      />
      <NavbarV4
        logo={<Text>Acme</Text>}
        links={[
          { label: 'Features', onPress: () => {} },
          { label: 'Pricing', active: true, onPress: () => {} },
        ]}
        actions={<Button onPress={() => {}}>Sign in</Button>}
      />
      <GradientHeroV4
        eyebrow="New"
        title="Ship a themed app in minutes"
        subtitle="Every template restyles by seed alone."
        actions={<Button onPress={() => {}}>Get started</Button>}
      />
      <SectionHeadingV4
        eyebrow="Why us"
        title="Everything token-driven"
        lede="One seed restyles the whole surface."
        align="center"
      />
      <FeatureGridV4
        columns={2}
        features={[
          { icon: '★', title: 'Fast', description: 'Ships in milliseconds.' },
          { title: 'Themed', description: 'Token-driven styling.' },
        ]}
      />
      <FeatureSplitV4
        eyebrow="Workflow"
        title="From prompt to production"
        description="Describe the brand; the kit compiles the theme."
        bullets={['Token pipeline', 'Dark-mode safe']}
        action={<Button onPress={() => {}}>See how</Button>}
      />
      <StatBarV4
        stats={[
          { value: 0, to: 12000, label: 'Developers', suffix: '+' },
          { value: 0, to: 99, label: 'Uptime', suffix: '%' },
        ]}
      />
      <TestimonialsV4
        items={[
          { quote: 'Best kit ever.', author: 'Ada Lovelace', role: 'Engineer' },
          { quote: 'Saved us weeks.', author: 'Grace Hopper' },
        ]}
      />
      <ProcessStepsV4
        steps={[
          { title: 'Describe', description: 'Give a brand seed.' },
          { title: 'Compile', description: 'Tokens are generated.' },
          { title: 'Ship', description: 'Deploy the themed app.' },
        ]}
      />
      <TeamGridV4
        columns={2}
        members={[
          { name: 'Ada King', role: 'CTO', bio: 'Systems.' },
          { name: 'Linus Ada', role: 'Design', bio: 'Tokens.' },
        ]}
      />
      <LogoCloudV4 label="Trusted by" logos={['Alpha', 'Beta', 'Gamma']} />
      <PricingToggleV4
        label="Billing period"
        options={[
          { value: 'monthly', label: 'Monthly' },
          { value: 'yearly', label: 'Yearly', badge: 'Save 20%' },
        ]}
        value="monthly"
        onChange={() => {}}
      />
      <PricingTableV4
        plans={[
          {
            name: 'Starter',
            price: '$0',
            period: '/mo',
            features: ['1 app', 'Community support'],
          },
          {
            name: 'Pro',
            price: '$19',
            period: '/mo',
            features: ['Unlimited apps', 'Priority support'],
            highlighted: true,
            cta: { label: 'Upgrade', onPress: () => {} },
          },
        ]}
      />
      <PriceListV4
        heading="Services"
        rows={[
          { name: 'Consultation', price: '$120', description: '60 min' },
          { name: 'Audit', price: '$480', description: 'Full review' },
        ]}
      />
      <ComparisonTableV4
        featureLabel="Feature"
        highlightLabel="Recommended"
        columns={[{ name: 'Starter' }, { name: 'Pro', highlight: true }]}
        rows={[
          { label: 'Apps', values: ['1', 'Unlimited'] },
          { label: 'Support', values: [false, true] },
        ]}
      />
      <FAQV4
        items={[
          { question: 'Is it themed?', answer: 'Fully — tokens only.' },
          { question: 'Native ready?', answer: 'Yes, web + native.' },
        ]}
      />
      <CTABannerV4
        title="Ready to build?"
        description="Spin up your first template today."
        action={<Button onPress={() => {}}>Start free</Button>}
      />
      <NewsletterSignupV4
        heading="Stay in the loop"
        subtext="Monthly product notes. No spam."
        onSubmit={() => {}}
      />
      <FooterV4
        logo={<Text>Acme</Text>}
        columns={[
          {
            title: 'Product',
            links: [{ label: 'Pricing', onPress: () => {} }, { label: 'Docs' }],
          },
        ]}
        bottom={<Text>© 2026 Acme</Text>}
      />
      <BentoGridV4
        cards={[
          { title: 'Speed', metric: '12ms', body: 'Fast by default.' },
          { title: 'Themed', metric: '1 seed', body: 'Restyles instantly.' },
        ]}
      />
      <EditorialGridV4
        items={[
          {
            media: <GenerativeCoverV4 seed="alpha" form="orbit" label="Alpha" />,
            caption: <Text>Plate one</Text>,
          },
          {
            media: <GenerativeCoverV4 seed="beta" form="grid" label="Beta" />,
            caption: <Text>Plate two</Text>,
          },
        ]}
      />
      <EntityCardV4
        eyebrow="Article"
        title="Designing with tokens"
        description="A guide to seed-driven theming."
        meta="8 min read"
        media={{ seed: 'entity' }}
        onPress={() => {}}
      />
      <CoverGalleryV4
        columns={3}
        items={[
          { seed: 'one', label: 'One', caption: 'First work', meta: 'Oil, 2024' },
          { seed: 'two', label: 'Two', caption: 'Second work', meta: 'Ink, 2025' },
        ]}
      />
      <CarouselV4
        label="Highlights"
        items={[
          <View key="a"><Text>Slide one</Text></View>,
          <View key="b"><Text>Slide two</Text></View>,
        ]}
      />
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
      <VideoEmbedV4 url="https://example.com/embed/xyz" title="Product tour" />
      <CountdownV4 to="2099-01-01T00:00:00Z" />
      <LocationBlockV4
        name="Acme HQ"
        address="1 Market St, Springfield"
        phone="+1 555 0100"
        email="hi@acme.test"
        hours={[{ label: 'Mon–Fri', value: '9:00–17:00' }]}
      />
      <RichTextV4 html="<p>Hello <strong>world</strong>.</p>" />
      <GenerativeCoverV4 seed="cover" form="wave" label="Cover" />
      <AuroraBackgroundV4 variant="mesh" grain>
        <Text>Aurora child</Text>
      </AuroraBackgroundV4>
      <ParticleFieldV4 mood="fireflies" density={12} seed={7} />
      <PointerHaloV4 label="Cursor halo" />
      <OrnamentRuleV4 ornament="diamond" tone="accent" />
      <SectionDividerV4 variant="ornament" ornament="dot" tone="primary" />
    </>
  );
}

describe('marketing V4 "showcase" line (native)', () => {
  it('mounts the whole V4 line (SEED_LIGHT) and shows key copy', () => {
    const { getByText, getAllByText } = renderThemed(<AllV4 />, SEED_LIGHT);
    expect(getByText('Ship a themed app in minutes')).toBeTruthy();
    expect(getByText('Everything token-driven')).toBeTruthy();
    expect(getByText('Ready to build?')).toBeTruthy();
    expect(getByText('Stay in the loop')).toBeTruthy();
    expect(getByText('Launch week — 20% off annual plans')).toBeTruthy();
    expect(getByText('Designing with tokens')).toBeTruthy();
    expect(getByText('Slide one')).toBeTruthy();
    expect(getByText('Acme HQ')).toBeTruthy();
    // "Starter" appears in both the pricing table and the comparison column.
    expect(getAllByText('Starter').length).toBeGreaterThan(0);
  });
});

describe('marketing V4 token purity (native)', () => {
  it.each([SEED_LIGHT, SEED_DARK])(
    'every rendered V4 style hex traces to a token',
    (seed) => {
      const { root } = renderThemed(<AllV4 />, seed);
      const allowed = tokenHexSet(seed);
      const found = renderedStyleHexes(root);
      expect(found.length).toBeGreaterThan(0);
      found.forEach((hex) => expect(allowed.has(hex)).toBe(true));
    }
  );
});
