/** @jest-environment jsdom */
/**
 * Cross-cutting guarantees for the visual-machinery components promoted from
 * the template sites: they render under BOTH color schemes from real compiled
 * seeds, and the whole family stays hex-free (inline styles AND every
 * injected `xen-*` sheet) — the kit's token-only rule, end to end.
 */
import { render } from '@testing-library/react';
import { XenitionUIProvider } from '../provider';
import type { ThemeSeed } from '../theme/types';
import { Eyebrow } from '../primitives/Eyebrow';
import { GlassPanel } from '../primitives/GlassPanel';
import { GradientText } from '../primitives/GradientText';
import { StatusDot } from '../primitives/StatusDot';
import { BentoCard, BentoGrid } from './Bento';
import { EditorialGrid, EditorialItem } from './EditorialGrid';
import { GenerativeCover } from './GenerativeCover';
import { OrnamentRule } from './OrnamentRule';
import { ParticleField } from './ParticleField';
import { PriceList, PriceRow } from './PriceList';
import { ProductMock } from './ProductMock';
import { SectionDivider } from './SectionDivider';
import { installMatchMedia } from '../spec-support/mock-io';

const HEX_LITERAL = /#[0-9a-fA-F]{3,8}\b/;

/** A violet SaaS-ish seed and an ember restaurant-ish seed, opposite modes. */
const SEED_LIGHT: ThemeSeed = {
  primary: '#7C3AED',
  neutral: 'cool',
  font: { heading: 'Inter', body: 'Inter' },
  shape: 'rounded',
  mode: 'light',
};

const SEED_DARK: ThemeSeed = {
  primary: '#EA580C',
  accent: '#D4A24E',
  neutral: 'warm',
  font: { heading: 'Fraunces', body: 'Inter' },
  shape: 'sharp',
  mode: 'dark',
};

function Showcase(): React.ReactElement {
  return (
    <main>
      <Eyebrow rule>Now serving</Eyebrow>
      <h1>
        Every color is a <GradientText>token</GradientText>
      </h1>
      <GlassPanel intensity="strong">
        <StatusDot tone="accent" label="Live" />
      </GlassPanel>
      <ProductMock variant="commerce" footnote="all seeded" />
      <BentoGrid>
        <BentoCard span={4} title="Composed" metric="0 hex">
          Templates compose; the kit owns the design.
        </BentoCard>
        <BentoCard span={2} title="Themed" visual={<ParticleField mood="sparks" density={6} />} />
      </BentoGrid>
      <SectionDivider variant="ornament" />
      <PriceList heading="To Begin">
        <PriceRow name="Coal-baked flatbread" price="$12" description="Smoked butter." />
      </PriceList>
      <OrnamentRule ornament="dot" />
      <EditorialGrid>
        <EditorialItem span={7} caption={<h3>Atlas</h3>}>
          <GenerativeCover seed="atlas" label="Atlas cover" />
        </EditorialItem>
        <EditorialItem span={4} start={9} offset={-64}>
          <GenerativeCover seed="meridian" ink="accent-600" paper="neutral-50" />
        </EditorialItem>
      </EditorialGrid>
      <SectionDivider variant="fade" />
    </main>
  );
}

const injectedSheets = (): string =>
  Array.from(document.querySelectorAll<HTMLStyleElement>('style[id^="xen-"]'))
    .map((el) => el.textContent ?? '')
    .join('\n');

const inlineStyles = (root: HTMLElement): string =>
  Array.from(root.querySelectorAll<HTMLElement>('[style]'))
    .map((el) => el.getAttribute('style') ?? '')
    .join('\n');

beforeEach(() => {
  installMatchMedia(false);
});

describe.each([
  ['light seed', SEED_LIGHT, 'light'],
  ['dark seed', SEED_DARK, 'dark'],
])('visual machinery under the %s', (_name, seed, mode) => {
  it('renders the full composition with the compiled theme applied', () => {
    const { container, getByText, getByRole } = render(
      <XenitionUIProvider theme={seed}>
        <Showcase />
      </XenitionUIProvider>
    );
    expect(container.querySelector(`[data-theme="${mode}"]`)).not.toBeNull();
    // the provider injected real compiled variables
    const themeCss =
      container.querySelector('style[data-xenition-theme]')?.textContent ?? '';
    expect(themeCss).toContain('--xen-primary-500:');
    expect(themeCss).toContain('--xen-surface:');
    // a sample from each promoted component family is present
    expect(getByText('Now serving')).toBeTruthy();
    expect(getByText('token')).toBeTruthy();
    expect(getByRole('img', { name: 'Live' })).toBeTruthy();
    expect(container.querySelector('[data-xen-product-mock="commerce"]')).not.toBeNull();
    expect(container.querySelectorAll('[data-xen-bento-card]')).toHaveLength(2);
    expect(container.querySelectorAll('[data-xen-particle]')).toHaveLength(6);
    expect(getByText('Coal-baked flatbread')).toBeTruthy();
    expect(getByRole('img', { name: 'Atlas cover' })).toBeTruthy();
    expect(container.querySelector('[data-xen-section-divider="fade"]')).not.toBeNull();
  });

  it('keeps every component token-pure: no hex in inline styles or injected sheets', () => {
    const { container } = render(
      <XenitionUIProvider theme={seed}>
        <Showcase />
      </XenitionUIProvider>
    );
    // NB: the provider's own <style data-xenition-theme> legitimately holds
    // compiled hex values; component styling must never — sweep every inline
    // style attribute, every SVG paint attribute, and every injected sheet.
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    const paintAttrs = Array.from(
      container.querySelectorAll<SVGElement>('[fill], [stroke]')
    )
      .flatMap((el) => [el.getAttribute('fill') ?? '', el.getAttribute('stroke') ?? ''])
      .join('\n');
    expect(paintAttrs).not.toMatch(HEX_LITERAL);
    const sheets = injectedSheets();
    expect(sheets.length).toBeGreaterThan(0);
    expect(sheets).not.toMatch(HEX_LITERAL);
  });
});
