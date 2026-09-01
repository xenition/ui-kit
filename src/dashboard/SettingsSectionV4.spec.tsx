/** @jest-environment jsdom */
import * as React from 'react';
import { render } from '@testing-library/react';
import { XenitionUIProvider } from '../provider';
import type { ThemeSeed } from '../theme/types';
import { DASHBOARD_CARD_V4_GROUND_ATTR, DASHBOARD_CARD_V4_STYLE_ID } from './SectionCardV4';
import { SettingsSectionV4 } from './SettingsSectionV4';

const SEED: ThemeSeed = {
  primary: '#7C3AED',
  neutral: 'cool',
  font: { heading: 'Inter', body: 'Inter' },
  shape: 'rounded',
  mode: 'both',
};

/** `44 + spacing.md` — the row label's leading edge (§4.3/§4.4). */
const LEADING_ML = 'ml-[calc(44px+var(--xen-space-md))]';

/** The row family's own gutter — `ROW_V4_METRICS.padX` (§4.1, §5). */
const ROW_PAD_X = 'px-[var(--xen-space-md)]';

const sheet = (): string =>
  document.getElementById(DASHBOARD_CARD_V4_STYLE_ID)?.textContent ?? '';

function tree(ui: React.ReactElement): HTMLElement {
  return render(ui).container;
}

function root(ui: React.ReactElement): HTMLElement | null {
  return tree(ui).firstElementChild as HTMLElement | null;
}

function groupCard(container: HTMLElement): HTMLElement {
  return container.querySelector('[data-xen-v4-settings-section-card]') as HTMLElement;
}

function rules(container: HTMLElement): HTMLElement[] {
  return Array.from(container.querySelectorAll<HTMLElement>('.h-px'));
}

const ROWS = ['Notifications', 'Privacy', 'Language'].map((label) => (
  <div key={label}>{label}</div>
));

describe('SettingsSectionV4 (web)', () => {
  describe('§4.2 — the ground is `card`, not `surface`', () => {
    it('marks the grouped card as painting the card ground, on the card element', () => {
      const card = groupCard(tree(<SettingsSectionV4 title="Account">{ROWS}</SettingsSectionV4>));
      expect(card.getAttribute('data-xen-v4-card')).toBe('');
      expect(card.getAttribute(DASHBOARD_CARD_V4_GROUND_ATTR)).toBe('card');
      expect(DASHBOARD_CARD_V4_GROUND_ATTR).toBe('data-xen-v4-card-ground');
    });

    it('shares ONE sheet with SectionCardV4 — the card ground is declared once', () => {
      tree(<SettingsSectionV4>{ROWS}</SettingsSectionV4>);
      const css = sheet();
      expect(css).toContain('background-color: var(--xen-card);');
      expect(css).toContain('color: var(--xen-on-card);');
      expect(css).not.toContain('var(--xen-surface)');
      expect(document.querySelectorAll(`#${DASHBOARD_CARD_V4_STYLE_ID}`)).toHaveLength(1);
    });

    it('is the hairline-plus-soft-shadow card: elevated, radius lg, overflow hidden', () => {
      const card = groupCard(tree(<SettingsSectionV4>{ROWS}</SettingsSectionV4>));
      expect(card.getAttribute('data-raised')).toBe('true');
      expect(card.className).toContain('border border-border');
      expect(card.className).toContain('rounded-[var(--xen-radius-lg)]');
      expect(card.className).toContain('overflow-hidden');
      // The rows own their gutters; the card pays none (§4.3).
      expect(card.className).toContain('p-0');
    });

    it('takes elevation.card from the compiled theme, and nothing hand-picked', () => {
      const { container } = render(
        <XenitionUIProvider theme={SEED}>
          <SettingsSectionV4>{ROWS}</SettingsSectionV4>
        </XenitionUIProvider>
      );
      const card = groupCard(container);
      expect(card.style.getPropertyValue('--xen-v4-shadow-l')).not.toBe('');
    });

    it('variant is forwarded so a nested group can drop the shadow (§4.6)', () => {
      const card = groupCard(tree(<SettingsSectionV4 variant="flat">{ROWS}</SettingsSectionV4>));
      expect(card.getAttribute('data-raised')).toBe('false');
      expect(card.className).not.toContain('border-border');
      expect(card.getAttribute(DASHBOARD_CARD_V4_GROUND_ATTR)).toBe('card');
    });
  });

  describe('§4.3/§4.4 — one card with rows in it, and the rules between them', () => {
    it('draws a separator between the rows and none after the last', () => {
      const container = tree(<SettingsSectionV4>{ROWS}</SettingsSectionV4>);
      expect(rules(container)).toHaveLength(ROWS.length - 1);
      const card = groupCard(container);
      expect(card.lastElementChild?.textContent).toBe('Language');
      expect(card.lastElementChild?.className).not.toContain('h-px');
      // ...and none before the first, either.
      expect(card.firstElementChild?.textContent).toBe('Notifications');
    });

    it('one row and no rows draw no rule at all', () => {
      expect(rules(tree(<SettingsSectionV4>{ROWS[0]}</SettingsSectionV4>))).toHaveLength(0);
      expect(
        rules(tree(<SettingsSectionV4 empty={{ title: 'Nothing to configure' }} />))
      ).toHaveLength(0);
    });

    it('insetSeparators clears the 44 leading slot, composed as 44 + spacing.md', () => {
      const container = tree(<SettingsSectionV4 insetSeparators>{ROWS}</SettingsSectionV4>);
      rules(container).forEach((rule) => {
        expect(rule.className).toContain(LEADING_ML);
        expect(rule.className).toContain('bg-border');
      });
    });

    it('flush by default — rows with no leading slot get no invented inset', () => {
      rules(tree(<SettingsSectionV4>{ROWS}</SettingsSectionV4>)).forEach((rule) => {
        expect(rule.className).not.toMatch(/\bml-/);
      });
    });

    it('a separator is 1px of border and nothing else, and stays out of the a11y tree', () => {
      rules(tree(<SettingsSectionV4 insetSeparators>{ROWS}</SettingsSectionV4>)).forEach((rule) => {
        expect(rule.className).toContain('h-px');
        expect(rule.className).toContain('bg-border');
        expect(rule.getAttribute('aria-hidden')).toBe('true');
        expect(rule.className).not.toMatch(/bg-(primary|muted|neutral|surface)/);
        expect(rule.className).not.toMatch(/(^|\s)border(-[024]|\s|$)/);
      });
    });

    it('hand-rolls nothing — no `<div className="h-px bg-border" />` left in the source path', () => {
      const container = tree(<SettingsSectionV4 insetSeparators>{ROWS}</SettingsSectionV4>);
      // Every hairline in the tree is a ListSeparatorV4: decorative, aria-hidden.
      rules(container).forEach((rule) => expect(rule.getAttribute('aria-hidden')).toBe('true'));
    });
  });

  describe('the group heading and footnote', () => {
    it('heading is sentence-case sm/semibold/mutedText — the uppercase xs is gone', () => {
      const { getByText } = render(<SettingsSectionV4 title="Account">{ROWS}</SettingsSectionV4>);
      const heading = getByText('Account');
      expect(heading.className).toContain('text-sm');
      expect(heading.className).toContain('font-semibold');
      expect(heading.className).toContain('text-muted-text');
      expect(heading.className).not.toContain('uppercase');
      expect(heading.className).not.toContain('text-xs');
      // `muted` is a fill and carries no contrast promise (§4.3).
      expect(heading.className).not.toMatch(/text-muted(?!-text)/);
    });

    it('footnote is sm/mutedText, never the muted FILL', () => {
      const { getByText } = render(
        <SettingsSectionV4 footnote="Changes apply to this device.">{ROWS}</SettingsSectionV4>
      );
      const footnote = getByText('Changes apply to this device.');
      expect(footnote.className).toContain('text-sm');
      expect(footnote.className).toContain('text-muted-text');
      expect(footnote.className).not.toMatch(/text-muted(?!-text)/);
    });

    it('both pay the ROW gutter so they line up with the row labels, not px-sm', () => {
      const container = tree(
        <SettingsSectionV4 title="Account" footnote="A footnote.">
          {ROWS}
        </SettingsSectionV4>
      );
      const heading = container.querySelector(
        '[data-xen-v4-settings-section-heading]'
      ) as HTMLElement;
      const footnote = container.querySelector(
        '[data-xen-v4-settings-section-footnote]'
      ) as HTMLElement;
      expect(heading.className).toBe(ROW_PAD_X);
      expect(footnote.className).toBe(ROW_PAD_X);
      expect(container.innerHTML).not.toContain('px-sm');
    });

    it('each collapses on its own — no padded empty line above or below the card', () => {
      const bare = tree(<SettingsSectionV4>{ROWS}</SettingsSectionV4>);
      expect(bare.querySelector('[data-xen-v4-settings-section-heading]')).toBeNull();
      expect(bare.querySelector('[data-xen-v4-settings-section-footnote]')).toBeNull();
      expect(groupCard(bare)).not.toBeNull();

      const titled = tree(<SettingsSectionV4 title="Account">{ROWS}</SettingsSectionV4>);
      expect(titled.querySelector('[data-xen-v4-settings-section-heading]')).not.toBeNull();
      expect(titled.querySelector('[data-xen-v4-settings-section-footnote]')).toBeNull();
    });

    it('the heading-to-card step is spacing.xs', () => {
      const el = root(<SettingsSectionV4 title="Account">{ROWS}</SettingsSectionV4>) as HTMLElement;
      expect(el.className).toContain('gap-[var(--xen-space-xs)]');
    });
  });

  describe('§4.5 — empty states', () => {
    it('routes an empty group through EmptyStateV4, not a second implementation', () => {
      const { container, getByText } = render(
        <SettingsSectionV4
          title="Account"
          empty={{ title: 'Nothing to configure', description: 'Settings will appear here.' }}
        />
      );
      const empty = container.querySelector('[data-xen-empty-state]') as HTMLElement;
      expect(empty).not.toBeNull();
      expect(getByText('Nothing to configure')).not.toBeNull();
      expect(empty.className).toContain('py-2xl');
      expect(empty.className).not.toContain('max-w-[340px]');
      // It sits INSIDE the group card, so the group still reads as one object.
      expect(groupCard(container).contains(empty)).toBe(true);
    });

    it('carries the icon and the single action through to the primitive', () => {
      const { getByText, getByTestId } = render(
        <SettingsSectionV4
          empty={{
            icon: <span data-testid="badge" />,
            title: 'Nothing to configure',
            action: <button type="button">Add a device</button>,
          }}
        />
      );
      expect(getByTestId('badge')).not.toBeNull();
      expect(getByText('Add a device')).not.toBeNull();
    });

    it('rows win over the empty state — an empty state is for an EMPTY group', () => {
      const container = tree(
        <SettingsSectionV4 empty={{ title: 'Nothing to configure' }}>{ROWS}</SettingsSectionV4>
      );
      expect(container.querySelector('[data-xen-empty-state]')).toBeNull();
    });

    it('renders NOTHING for zero rows — not a bordered box, not a floating heading', () => {
      expect(root(<SettingsSectionV4 />)).toBeNull();
      expect(root(<SettingsSectionV4 title="Account" footnote="A footnote." />)).toBeNull();
      expect(root(<SettingsSectionV4>{null}</SettingsSectionV4>)).toBeNull();
      expect(root(<SettingsSectionV4>{[]}</SettingsSectionV4>)).toBeNull();
      expect(tree(<SettingsSectionV4 title="Account" />).innerHTML).toBe('');
    });
  });

  describe('token purity and parity', () => {
    it('paints no literal colour anywhere — every value traces to a --xen-* token', () => {
      const container = tree(
        <SettingsSectionV4 title="Account" footnote="A footnote." insetSeparators>
          {ROWS}
        </SettingsSectionV4>
      );
      expect(container.innerHTML).not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
      expect(container.innerHTML).not.toMatch(/rgb|hsl/);
      expect(container.innerHTML).not.toMatch(/bg-neutral-|hover:opacity-|disabled:opacity-/);
      expect(sheet()).not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
    });

    it('spends no bare number but 44 — the named leading slot §1 allows', () => {
      const container = tree(
        <SettingsSectionV4 title="Account" insetSeparators>
          {ROWS}
        </SettingsSectionV4>
      );
      const numbers = (container.innerHTML.match(/\d+px/g) ?? []).filter((n) => n !== '0px');
      expect(Array.from(new Set(numbers))).toEqual(['44px']);
    });

    it('ADDITIVE — every base prop still means what it meant', () => {
      const { getByText, container } = render(
        <SettingsSectionV4 title="Account" footnote="Changes apply to this device.">
          {ROWS}
        </SettingsSectionV4>
      );
      expect(getByText('Account')).not.toBeNull();
      expect(getByText('Changes apply to this device.')).not.toBeNull();
      expect(getByText('Privacy')).not.toBeNull();
      expect(rules(container)).toHaveLength(2);
    });

    it('forwards the ref, className and the rest of the div props', () => {
      const ref = React.createRef<HTMLDivElement>();
      const { getByTestId } = render(
        <SettingsSectionV4 ref={ref} className="mt-4" data-testid="ss" id="acct">
          {ROWS}
        </SettingsSectionV4>
      );
      const el = getByTestId('ss');
      expect(ref.current).toBe(el);
      expect(el.id).toBe('acct');
      expect(el.className).toContain('mt-4');
      expect(el.getAttribute('data-xen-v4-settings-section')).toBe('');
    });
  });
});
