/** @jest-environment jsdom */
import { act, fireEvent, render } from '@testing-library/react';
import { Button } from '../primitives/Button';
import { CTABanner } from './CTABanner';
import { FAQ, FAQItem } from './FAQ';
import { FeatureCard, FeatureGrid } from './FeatureGrid';
import { Footer, FooterColumn } from './Footer';
import { GradientHero } from './GradientHero';
import { LogoCloud } from './LogoCloud';
import { Navbar } from './Navbar';
import { PricingTable, PricingTier } from './PricingTable';
import { SectionHeading } from './SectionHeading';
import { Stat, StatBar } from './StatBar';
import { Testimonial, Testimonials, initialsFromName } from './Testimonials';
import {
  installMatchMedia,
  installMockIntersectionObserver,
} from '../spec-support/mock-io';

const HEX_LITERAL = /#[0-9a-fA-F]{3,8}\b/;

const inlineStyles = (root: HTMLElement): string =>
  Array.from(root.querySelectorAll<HTMLElement>('[style]'))
    .map((el) => el.getAttribute('style') ?? '')
    .join('\n');

beforeEach(() => {
  installMockIntersectionObserver();
  installMatchMedia(false);
});

describe('GradientHero', () => {
  it('renders all slots over an aurora background', () => {
    const { getByText, container } = render(
      <GradientHero
        eyebrow="New"
        title="Ship faster"
        subtitle="Templates that restyle by seed."
        actions={<Button>Start</Button>}
        media={<img alt="screenshot" />}
      />
    );
    expect(getByText('New')).toBeTruthy();
    expect(getByText('Ship faster').tagName).toBe('H1');
    expect(getByText('Templates that restyle by seed.')).toBeTruthy();
    expect(getByText('Start')).toBeTruthy();
    expect(container.querySelector('[data-xen-aurora="aurora"]')).not.toBeNull();
  });

  it('forwards variant/grain/pattern to the aurora and stays hex-free', () => {
    const { container } = render(
      <GradientHero title="T" variant="mesh" grain pattern="grid" />
    );
    expect(container.querySelector('[data-xen-aurora="mesh"]')).not.toBeNull();
    expect(container.querySelector('[data-xen-aurora-grain]')).not.toBeNull();
    expect(container.querySelector('[data-xen-aurora-pattern="grid"]')).not.toBeNull();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
  });
});

describe('Navbar', () => {
  it('renders logo, links, and actions', () => {
    const { getByText } = render(
      <Navbar logo={<span>Acme</span>} actions={<Button>Sign in</Button>}>
        <a href="#features">Features</a>
      </Navbar>
    );
    expect(getByText('Acme')).toBeTruthy();
    expect(getByText('Features')).toBeTruthy();
    expect(getByText('Sign in')).toBeTruthy();
  });

  it('gains blur chrome once scrolled past the threshold', () => {
    const { container } = render(<Navbar logo={<span>Acme</span>} />);
    const header = container.querySelector<HTMLElement>('[data-xen-navbar]');
    expect(header?.getAttribute('data-scrolled')).toBe('false');

    Object.defineProperty(window, 'scrollY', { value: 40, writable: true, configurable: true });
    act(() => {
      window.dispatchEvent(new Event('scroll'));
    });
    expect(header?.getAttribute('data-scrolled')).toBe('true');
    expect(header?.className).toContain('backdrop-blur');
    // translucent bar color comes from an injected color-mix-over-token rule
    const navbarCss = document.getElementById('xen-navbar-styles')?.textContent ?? '';
    expect(navbarCss).toContain('[data-xen-navbar][data-scrolled="true"]');
    expect(navbarCss).toContain('color-mix(in srgb, var(--xen-surface) 80%, transparent)');

    Object.defineProperty(window, 'scrollY', { value: 0, writable: true, configurable: true });
    act(() => {
      window.dispatchEvent(new Event('scroll'));
    });
    expect(header?.getAttribute('data-scrolled')).toBe('false');
  });

  it('toggles the mobile disclosure menu with aria-expanded', () => {
    const { getByRole, container } = render(
      <Navbar>
        <a href="#pricing">Pricing</a>
      </Navbar>
    );
    const button = getByRole('button', { name: 'Menu' });
    expect(button.getAttribute('aria-expanded')).toBe('false');
    expect(container.querySelector('[data-xen-navbar-menu]')).toBeNull();

    fireEvent.click(button);
    expect(button.getAttribute('aria-expanded')).toBe('true');
    const menu = container.querySelector('[data-xen-navbar-menu]');
    expect(menu).not.toBeNull();
    expect(menu?.id).toBe(button.getAttribute('aria-controls'));

    fireEvent.click(button);
    expect(button.getAttribute('aria-expanded')).toBe('false');
    expect(container.querySelector('[data-xen-navbar-menu]')).toBeNull();
  });
});

describe('SectionHeading', () => {
  it('renders eyebrow, title, and lede', () => {
    const { getByText } = render(
      <SectionHeading eyebrow="Why us" title="Features" lede="Everything you need." />
    );
    expect(getByText('Why us')).toBeTruthy();
    expect(getByText('Features').tagName).toBe('H2');
    expect(getByText('Everything you need.')).toBeTruthy();
  });

  it('supports centered alignment and a custom heading level', () => {
    const { getByText, container } = render(
      <SectionHeading title="Centered" align="center" as="h3" />
    );
    expect(getByText('Centered').tagName).toBe('H3');
    expect(container.querySelector('[data-xen-section-heading]')?.className).toContain(
      'text-center'
    );
  });
});

describe('FeatureGrid', () => {
  it('renders feature cards with icon, title, and body', () => {
    const { getByText, container } = render(
      <FeatureGrid>
        <FeatureCard icon={<svg data-testid="icon" />} title="Fast">
          Ships in seconds.
        </FeatureCard>
        <FeatureCard title="Themed">Restyles by seed.</FeatureCard>
      </FeatureGrid>
    );
    expect(container.querySelectorAll('[data-xen-feature-card]')).toHaveLength(2);
    expect(getByText('Fast').tagName).toBe('H3');
    expect(getByText('Ships in seconds.')).toBeTruthy();
  });

  it('applies hover-lift by default and can disable it', () => {
    const { container, rerender } = render(
      <FeatureGrid>
        <FeatureCard title="A">a</FeatureCard>
      </FeatureGrid>
    );
    expect(container.querySelector('[data-xen-feature-card]')?.className).toContain(
      'hover:-translate-y-1'
    );
    rerender(
      <FeatureGrid>
        <FeatureCard title="A" hoverLift={false}>
          a
        </FeatureCard>
      </FeatureGrid>
    );
    expect(container.querySelector('[data-xen-feature-card]')?.className).not.toContain(
      'hover:-translate-y-1'
    );
  });
});

describe('StatBar', () => {
  it('renders stats with counters, prefix/suffix, and labels', () => {
    installMatchMedia(true); // reduced motion → counters show final values
    const { getByText } = render(
      <StatBar>
        <Stat to={12000} label="Developers" suffix="+" />
        <Stat to={99} label="Uptime" suffix="%" />
      </StatBar>
    );
    expect(getByText('12,000')).toBeTruthy();
    expect(getByText('+')).toBeTruthy();
    expect(getByText('Developers')).toBeTruthy();
    expect(getByText('99')).toBeTruthy();
    expect(getByText('Uptime')).toBeTruthy();
  });
});

describe('Testimonials', () => {
  it('renders quote cards in grid mode', () => {
    const { getByText, container } = render(
      <Testimonials>
        <Testimonial name="Ada King" role="CTO, Acme">
          Best kit we have used.
        </Testimonial>
      </Testimonials>
    );
    expect(container.querySelector('[data-xen-testimonials="grid"]')).not.toBeNull();
    expect(getByText('Best kit we have used.')).toBeTruthy();
    expect(getByText('Ada King')).toBeTruthy();
    expect(getByText('CTO, Acme')).toBeTruthy();
  });

  it('falls back to avatar initials derived from the name', () => {
    const { container } = render(
      <Testimonials>
        <Testimonial name="Ada King">Quote</Testimonial>
      </Testimonials>
    );
    expect(container.querySelector('[data-xen-avatar-initials]')?.textContent).toBe('AK');
    expect(initialsFromName('grace')).toBe('G');
    expect(initialsFromName('Mary Jane Watson')).toBe('MJ');
  });

  it('uses the avatar slot when provided', () => {
    const { container, getByAltText } = render(
      <Testimonials>
        <Testimonial name="Ada King" avatar={<img alt="Ada" />}>
          Quote
        </Testimonial>
      </Testimonials>
    );
    expect(getByAltText('Ada')).toBeTruthy();
    expect(container.querySelector('[data-xen-avatar-initials]')).toBeNull();
  });

  it('loops through a marquee in marquee mode (duplicate aria-hidden)', () => {
    const { container, getAllByText } = render(
      <Testimonials mode="marquee">
        <Testimonial name="Ada King">Quote</Testimonial>
      </Testimonials>
    );
    expect(container.querySelector('[data-xen-marquee]')).not.toBeNull();
    const copies = getAllByText('Quote');
    expect(copies).toHaveLength(2);
    expect(copies.filter((el) => el.closest('[aria-hidden="true"]'))).toHaveLength(1);
  });
});

describe('PricingTable', () => {
  it('renders tiers with prices and feature checklists', () => {
    const { getByText, container } = render(
      <PricingTable>
        <PricingTier
          name="Starter"
          price="$0"
          period="/month"
          description="For side projects."
          features={['1 site', 'Community support']}
          action={<Button>Choose</Button>}
        />
      </PricingTable>
    );
    expect(getByText('Starter')).toBeTruthy();
    expect(getByText('$0')).toBeTruthy();
    expect(getByText('/month')).toBeTruthy();
    expect(getByText('1 site')).toBeTruthy();
    expect(getByText('Community support')).toBeTruthy();
    expect(getByText('Choose')).toBeTruthy();
    // check icons are decorative
    expect(container.querySelectorAll('svg[aria-hidden="true"]')).toHaveLength(2);
  });

  it('emphasizes the featured tier with token ring, scale, and badge', () => {
    const { container, getByText } = render(
      <PricingTable>
        <PricingTier name="Pro" price="$19" featured />
        <PricingTier name="Starter" price="$0" />
      </PricingTable>
    );
    const featured = container.querySelector<HTMLElement>('[data-featured="true"]');
    expect(featured?.className).toContain('ring-primary-300');
    expect(featured?.className).toContain('lg:scale-105');
    expect(getByText('Most popular')).toBeTruthy();
    const plain = container.querySelector<HTMLElement>('[data-featured="false"]');
    expect(plain?.className).not.toContain('ring-primary-300');
  });
});

describe('FAQ', () => {
  it('toggles aria-expanded on click', () => {
    const { getByRole } = render(
      <FAQ>
        <FAQItem question="Is it themed?">Fully — tokens only.</FAQItem>
      </FAQ>
    );
    const button = getByRole('button', { name: 'Is it themed?' });
    expect(button.getAttribute('aria-expanded')).toBe('false');
    fireEvent.click(button);
    expect(button.getAttribute('aria-expanded')).toBe('true');
    fireEvent.click(button);
    expect(button.getAttribute('aria-expanded')).toBe('false');
  });

  it('wires the button to a labelled region', () => {
    const { getByRole } = render(
      <FAQ>
        <FAQItem question="Q1" defaultOpen>
          A1
        </FAQItem>
      </FAQ>
    );
    const button = getByRole('button', { name: 'Q1' });
    expect(button.getAttribute('aria-expanded')).toBe('true');
    const region = getByRole('region');
    expect(region.id).toBe(button.getAttribute('aria-controls'));
    expect(region.getAttribute('aria-labelledby')).toBe(button.id);
    expect(region.textContent).toBe('A1');
  });

  it('animates height via the grid-rows trick', () => {
    const { getByRole, container } = render(
      <FAQ>
        <FAQItem question="Q1">A1</FAQItem>
      </FAQ>
    );
    const wrapper = container.querySelector<HTMLElement>(
      '[data-xen-faq-item] div[style]'
    );
    expect(wrapper?.style.gridTemplateRows).toBe('0fr');
    fireEvent.click(getByRole('button', { name: 'Q1' }));
    expect(wrapper?.style.gridTemplateRows).toBe('1fr');
  });
});

describe('CTABanner', () => {
  it('renders title, subtitle, and action over the aurora machinery', () => {
    const { getByText, container } = render(
      <CTABanner
        title="Ready to build?"
        subtitle="Start free."
        action={<Button>Get started</Button>}
      />
    );
    expect(getByText('Ready to build?').tagName).toBe('H2');
    expect(getByText('Start free.')).toBeTruthy();
    expect(getByText('Get started')).toBeTruthy();
    expect(container.querySelector('[data-xen-aurora="radial"]')).not.toBeNull();
  });

  it('emits no hex literals in inline styles', () => {
    const { container } = render(<CTABanner title="T" grain pattern="dots" />);
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
  });
});

describe('Footer', () => {
  it('renders logo, link columns, and the bottom bar', () => {
    const { getByText } = render(
      <Footer logo={<span>Acme</span>} bottom={<span>© 2026 Acme</span>}>
        <FooterColumn title="Product">
          <a href="#pricing">Pricing</a>
        </FooterColumn>
        <FooterColumn title="Company">
          <a href="#about">About</a>
        </FooterColumn>
      </Footer>
    );
    expect(getByText('Acme')).toBeTruthy();
    expect(getByText('Product')).toBeTruthy();
    expect(getByText('Pricing')).toBeTruthy();
    expect(getByText('Company')).toBeTruthy();
    expect(getByText('© 2026 Acme')).toBeTruthy();
  });
});

describe('LogoCloud', () => {
  it('dims each logo slot until hover (class-based restore)', () => {
    const { container, getByText } = render(
      <LogoCloud label="Trusted by">
        <span>Alpha</span>
        <span>Beta</span>
      </LogoCloud>
    );
    expect(getByText('Trusted by')).toBeTruthy();
    const slots = container.querySelectorAll<HTMLElement>('[data-xen-logo]');
    expect(slots).toHaveLength(2);
    for (const slot of Array.from(slots)) {
      expect(slot.className).toContain('grayscale');
      expect(slot.className).toContain('hover:opacity-100');
    }
  });
});
