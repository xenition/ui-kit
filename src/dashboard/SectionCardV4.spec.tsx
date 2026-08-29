/** @jest-environment jsdom */
import * as React from 'react';
import { render } from '@testing-library/react';
import { XenitionUIProvider } from '../provider';
import type { ThemeSeed } from '../theme/types';
import {
  DASHBOARD_CARD_V4_GROUND_ATTR,
  DASHBOARD_CARD_V4_STYLE_ID,
  SectionCardV4,
} from './SectionCardV4';

const SEED: ThemeSeed = {
  primary: '#7C3AED',
  neutral: 'cool',
  font: { heading: 'Inter', body: 'Inter' },
  shape: 'rounded',
  mode: 'both',
};

/** `44 + spacing.md` — the row title's leading edge (§4.3/§4.4). */
const LEADING_ML = 'ml-[calc(44px+var(--xen-space-md))]';

/** The one padding variable every slot reads (§4.2, shadcn's `--card-spacing`). */
const PAD_VAR = '--xen-v4-card-pad';

const sheet = (): string =>
  document.getElementById(DASHBOARD_CARD_V4_STYLE_ID)?.textContent ?? '';

function card(ui: React.ReactElement): HTMLElement | null {
  const { container } = render(ui);
  return container.firstElementChild as HTMLElement | null;
}

function tree(ui: React.ReactElement): HTMLElement {
  return render(ui).container;
}

/** Row separators only — the header rule carries its own marker. */
function rowRules(container: HTMLElement): HTMLElement[] {
  return Array.from(
    container.querySelectorAll<HTMLElement>('.h-px:not([data-xen-v4-section-card-rule])')
  );
}

const ROWS = ['Alpha', 'Beta', 'Gamma'].map((label) => <div key={label}>{label}</div>);

describe('SectionCardV4 (web)', () => {
  describe('§4.2 — the ground is `card`, not `surface`', () => {
    it('marks the card as painting the card ground, on the card element itself', () => {
      const el = card(<SectionCardV4 title="Revenue">body</SectionCardV4>) as HTMLElement;
      // Both attributes on one element, or the two-attribute selector cannot
      // bite and the card silently falls back to the page colour.
      expect(el.getAttribute('data-xen-v4-card')).toBe('');
      expect(el.getAttribute(DASHBOARD_CARD_V4_GROUND_ATTR)).toBe('card');
      expect(DASHBOARD_CARD_V4_GROUND_ATTR).toBe('data-xen-v4-card-ground');
    });

    it('paints --xen-card and --xen-on-card, never the page surface', () => {
      card(<SectionCardV4 title="Revenue">body</SectionCardV4>);
      const css = sheet();
      expect(css).toContain('background-color: var(--xen-card);');
      expect(css).toContain('color: var(--xen-on-card);');
      expect(css).not.toContain('var(--xen-surface)');
      expect(css).not.toContain('var(--xen-on-surface)');
    });

    it('the rule outranks CardV4 own bg-surface class whichever order the sheets load in', () => {
      card(<SectionCardV4 title="Revenue">body</SectionCardV4>);
      // Two attribute selectors = 0-2-0, which beats a utility class (0-1-0)
      // without depending on Tailwind emission order.
      expect(sheet()).toContain(`[data-xen-v4-card][${DASHBOARD_CARD_V4_GROUND_ATTR}="card"]`);
    });

    it('never a heavy border AND a heavy shadow — the sheet carries neither weight', () => {
      card(<SectionCardV4 title="Revenue">body</SectionCardV4>);
      const css = sheet();
      expect(css).not.toMatch(/border-width|border:/);
      expect(css).not.toMatch(/box-shadow/);
    });

    it('is the hairline-plus-soft-shadow card: elevated, radius lg, overflow hidden', () => {
      const el = card(<SectionCardV4 title="Revenue">body</SectionCardV4>) as HTMLElement;
      expect(el.getAttribute('data-raised')).toBe('true');
      expect(el.className).toContain('border border-border');
      expect(el.className).toContain('rounded-[var(--xen-radius-lg)]');
      expect(el.className).toContain('overflow-hidden');
    });

    it('takes elevation.card from the compiled theme, and nothing hand-picked', () => {
      const { container } = render(
        <XenitionUIProvider theme={SEED}>
          <SectionCardV4 title="Revenue">body</SectionCardV4>
        </XenitionUIProvider>
      );
      const el = container.querySelector('[data-xen-v4-section-card]') as HTMLElement;
      expect(el.style.getPropertyValue('--xen-v4-shadow-l')).not.toBe('');
      expect(el.style.getPropertyValue('--xen-v4-shadow-d')).not.toBe('');
    });

    it('variant is forwarded so a nested card can drop the shadow (§4.6)', () => {
      const el = card(
        <SectionCardV4 title="Revenue" variant="flat">
          body
        </SectionCardV4>
      ) as HTMLElement;
      expect(el.getAttribute('data-raised')).toBe('false');
      expect(el.className).not.toContain('border-border');
      // The ground survives — a flat card is still a card, not the page.
      expect(el.getAttribute(DASHBOARD_CARD_V4_GROUND_ATTR)).toBe('card');
    });
  });

  describe('§4.2 — one padding variable, read by every slot', () => {
    it('declares the variable once, on the card', () => {
      const el = card(<SectionCardV4 title="Revenue">body</SectionCardV4>) as HTMLElement;
      expect(el.style.getPropertyValue(PAD_VAR)).toBe('var(--xen-space-lg)');
      // The card pays none of it itself — the slots do.
      expect(el.className).toContain('p-0');
    });

    it('every padding key resolves to a token, and `none` to zero', () => {
      expect(
        (card(<SectionCardV4 padding="sm">b</SectionCardV4>) as HTMLElement).style.getPropertyValue(
          PAD_VAR
        )
      ).toBe('var(--xen-space-sm)');
      expect(
        (card(<SectionCardV4 padding="md">b</SectionCardV4>) as HTMLElement).style.getPropertyValue(
          PAD_VAR
        )
      ).toBe('var(--xen-space-md)');
      expect(
        (
          card(<SectionCardV4 padding="none">b</SectionCardV4>) as HTMLElement
        ).style.getPropertyValue(PAD_VAR)
      ).toBe('0px');
    });

    it('the header and the body read the same variable, never a second number', () => {
      const container = tree(<SectionCardV4 title="Revenue">body</SectionCardV4>);
      const header = container.querySelector('[data-xen-v4-section-card-header]') as HTMLElement;
      const body = container.querySelector('[data-xen-v4-section-card-body]') as HTMLElement;
      expect(header.className).toContain(`px-[var(${PAD_VAR})]`);
      expect(header.className).toContain(`pt-[var(${PAD_VAR})]`);
      expect(body.className).toContain(`px-[var(${PAD_VAR})]`);
      expect(body.className).toContain(`pb-[var(${PAD_VAR})]`);
      // The header already paid the top; the body must not pay it twice.
      expect(body.className).not.toContain(`pt-[var(${PAD_VAR})]`);
    });

    it('a headerless card pays the top padding on the body instead', () => {
      const container = tree(<SectionCardV4>body</SectionCardV4>);
      const body = container.querySelector('[data-xen-v4-section-card-body]') as HTMLElement;
      expect(body.className).toContain(`pt-[var(${PAD_VAR})]`);
    });

    it('the header-to-body step is §4.1 16, not a second card padding', () => {
      const el = card(<SectionCardV4 title="Revenue">body</SectionCardV4>) as HTMLElement;
      expect(el.className).toContain('gap-[var(--xen-space-md)]');
    });
  });

  describe('the header — Section anatomy, on the type ramp', () => {
    it('renders title, subtitle and action in the shadcn slot order', () => {
      const { getByText } = render(
        <SectionCardV4 title="Revenue" subtitle="Last 30 days" action={<a href="#x">See all</a>}>
          body
        </SectionCardV4>
      );
      expect(getByText('Revenue').tagName).toBe('SPAN');
      expect(getByText('Revenue').closest('h3')).not.toBeNull();
      expect(getByText('Last 30 days')).not.toBeNull();
      expect(getByText('See all').closest('[data-xen-v4-section-card-action]')).not.toBeNull();
    });

    it('title is lg/bold/onCard and the subtitle is sm/mutedText — never the muted FILL', () => {
      const { getByText } = render(
        <SectionCardV4 title="Revenue" subtitle="Last 30 days">
          body
        </SectionCardV4>
      );
      const title = getByText('Revenue');
      expect(title.className).toContain('text-lg');
      expect(title.className).toContain('font-bold');
      expect(title.className).toContain('text-on-card');

      const subtitle = getByText('Last 30 days');
      expect(subtitle.className).toContain('text-sm');
      expect(subtitle.className).toContain('text-muted-text');
      // `muted` is a fill and carries no contrast promise (§4.3).
      expect(subtitle.className).not.toMatch(/text-muted(?!-text)/);
    });

    it('the title-to-subtitle step is spacing.xs — gap-0.5 is a §1 violation', () => {
      const container = tree(
        <SectionCardV4 title="Revenue" subtitle="Last 30 days">
          body
        </SectionCardV4>
      );
      const html = container.innerHTML;
      expect(html).toContain('gap-[var(--xen-space-xs)]');
      expect(html).not.toContain('gap-0.5');
    });

    it('HEADER COLLAPSE — no title, subtitle or action renders no header at all', () => {
      const container = tree(<SectionCardV4>body</SectionCardV4>);
      expect(container.querySelector('[data-xen-v4-section-card-header]')).toBeNull();
      expect(container.querySelector('[data-xen-v4-section-card-body]')).not.toBeNull();
    });

    it('HEADER COLLAPSE — an action alone still earns a header', () => {
      const container = tree(<SectionCardV4 action={<button type="button">Edit</button>}>b</SectionCardV4>);
      const header = container.querySelector('[data-xen-v4-section-card-header]');
      expect(header).not.toBeNull();
      // ...and no empty text column beside it.
      expect(header?.querySelector('h3')).toBeNull();
    });
  });

  describe('§4.3/§4.4 — grouped rows are ONE card with rows in it', () => {
    it('draws a separator between the rows and none after the last', () => {
      const container = tree(<SectionCardV4 grouped>{ROWS}</SectionCardV4>);
      expect(rowRules(container)).toHaveLength(ROWS.length - 1);
      // The last child of the body is a row, never a rule.
      const body = container.querySelector('[data-xen-v4-section-card-body]') as HTMLElement;
      expect(body.lastElementChild?.textContent).toBe('Gamma');
      expect(body.lastElementChild?.className).not.toContain('h-px');
    });

    it('one row and no rows draw no rule at all', () => {
      expect(rowRules(tree(<SectionCardV4 grouped>{ROWS[0]}</SectionCardV4>))).toHaveLength(0);
      expect(
        rowRules(tree(<SectionCardV4 grouped title="t" empty={{ title: 'Nothing' }} />))
      ).toHaveLength(0);
    });

    it('insetSeparators clears the 44 leading slot, composed as 44 + spacing.md', () => {
      const container = tree(
        <SectionCardV4 grouped insetSeparators>
          {ROWS}
        </SectionCardV4>
      );
      rowRules(container).forEach((rule) => {
        expect(rule.className).toContain(LEADING_ML);
        expect(rule.className).toContain('bg-border');
      });
    });

    it('flush by default — rows with no leading slot get no invented inset', () => {
      const container = tree(<SectionCardV4 grouped>{ROWS}</SectionCardV4>);
      rowRules(container).forEach((rule) => {
        expect(rule.className).not.toMatch(/\bml-/);
        expect(rule.className).toContain('h-px');
        expect(rule.className).toContain('bg-border');
      });
    });

    it('a separator is 1px of border and nothing else — never two weights', () => {
      const container = tree(<SectionCardV4 grouped insetSeparators>{ROWS}</SectionCardV4>);
      rowRules(container).forEach((rule) => {
        expect(rule.getAttribute('aria-hidden')).toBe('true');
        expect(rule.className).not.toMatch(/bg-(primary|muted|neutral|surface)/);
        expect(rule.className).not.toMatch(/(^|\s)border(-[024]|\s|$)/);
      });
    });

    it('a grouped body gives up the card padding so the rows run flush and clip', () => {
      const container = tree(<SectionCardV4 title="Alerts" grouped>{ROWS}</SectionCardV4>);
      const el = container.firstElementChild as HTMLElement;
      const body = container.querySelector('[data-xen-v4-section-card-body]') as HTMLElement;
      expect(body.className ?? '').toBe('');
      expect(el.className).toContain('overflow-hidden');
      expect(el.getAttribute('data-grouped')).toBe('true');
    });

    it('an ungrouped body keeps its padding and draws no separators between children', () => {
      const container = tree(<SectionCardV4>{ROWS}</SectionCardV4>);
      expect(rowRules(container)).toHaveLength(0);
      const body = container.querySelector('[data-xen-v4-section-card-body]') as HTMLElement;
      expect(body.className).toContain(`px-[var(${PAD_VAR})]`);
    });

    it('divided draws ONE flush rule, and only between a header and a body', () => {
      const withBoth = tree(<SectionCardV4 title="Alerts" divided grouped>{ROWS}</SectionCardV4>);
      const rule = withBoth.querySelector('[data-xen-v4-section-card-rule]') as HTMLElement;
      expect(rule).not.toBeNull();
      expect(rule.className).toContain('h-px');
      expect(rule.className).not.toMatch(/\bml-/);

      // A rule under a header with nothing below it is a line on the card floor.
      const headerOnly = tree(<SectionCardV4 title="Alerts" divided />);
      expect(headerOnly.querySelector('[data-xen-v4-section-card-rule]')).toBeNull();

      // ...and a rule above a body with no header is the same mistake.
      const bodyOnly = tree(<SectionCardV4 divided>{ROWS}</SectionCardV4>);
      expect(bodyOnly.querySelector('[data-xen-v4-section-card-rule]')).toBeNull();
    });

    it('divided is off by default — the base rendering, preserved', () => {
      const container = tree(<SectionCardV4 title="Alerts">body</SectionCardV4>);
      expect(container.querySelector('[data-xen-v4-section-card-rule]')).toBeNull();
    });
  });

  describe('§4.5 — empty states', () => {
    it('routes an empty body through EmptyStateV4, not a second implementation', () => {
      const { container, getByText } = render(
        <SectionCardV4
          title="Activity"
          empty={{ title: 'Nothing yet', description: 'Your activity will show up here.' }}
        />
      );
      const empty = container.querySelector('[data-xen-empty-state]') as HTMLElement;
      expect(empty).not.toBeNull();
      expect(getByText('Nothing yet')).not.toBeNull();
      // The primitive's own recipe, not a hand-rolled one.
      expect(empty.className).toContain('py-2xl');
      expect(empty.className).not.toContain('max-w-[340px]');
    });

    it('carries the icon and the single action through to the primitive', () => {
      const { getByText, getByTestId } = render(
        <SectionCardV4
          empty={{
            icon: <span data-testid="badge" />,
            title: 'Nothing yet',
            action: <button type="button">Add one</button>,
          }}
        />
      );
      expect(getByTestId('badge')).not.toBeNull();
      expect(getByText('Add one')).not.toBeNull();
    });

    it('children win over the empty state — an empty state is for an EMPTY body', () => {
      const container = tree(<SectionCardV4 empty={{ title: 'Nothing yet' }}>{ROWS}</SectionCardV4>);
      expect(container.querySelector('[data-xen-empty-state]')).toBeNull();
    });

    it('renders NOTHING with no header, no children and no empty state', () => {
      expect(card(<SectionCardV4 />)).toBeNull();
      expect(card(<SectionCardV4>{null}</SectionCardV4>)).toBeNull();
      expect(card(<SectionCardV4 grouped>{[]}</SectionCardV4>)).toBeNull();
      // Not a blank bordered box (§4.5).
      expect(tree(<SectionCardV4 />).innerHTML).toBe('');
    });

    it('a header with no body is still a card, not a padded hole', () => {
      const container = tree(<SectionCardV4 title="Revenue" subtitle="Last 30 days" />);
      expect(container.firstElementChild).not.toBeNull();
      const body = container.querySelector('[data-xen-v4-section-card-body]') as HTMLElement;
      expect(body.innerHTML).toBe('');
    });
  });

  describe('token purity and parity', () => {
    it('paints no literal colour anywhere — every value traces to a --xen-* token', () => {
      const container = tree(
        <SectionCardV4 title="Revenue" subtitle="Last 30 days" divided grouped insetSeparators>
          {ROWS}
        </SectionCardV4>
      );
      expect(container.innerHTML).not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
      expect(container.innerHTML).not.toMatch(/rgb|hsl/);
      expect(container.innerHTML).not.toMatch(/bg-neutral-|hover:opacity-|disabled:opacity-/);
      expect(sheet()).not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
    });

    it('spends no bare number but 44 — the named leading slot §1 allows', () => {
      const container = tree(
        <SectionCardV4 title="Revenue" grouped insetSeparators>
          {ROWS}
        </SectionCardV4>
      );
      const numbers = (container.innerHTML.match(/\d+px/g) ?? []).filter((n) => n !== '0px');
      expect(Array.from(new Set(numbers))).toEqual(['44px']);
    });

    it('ADDITIVE — every base prop still means what it meant', () => {
      const { getByText, container } = render(
        <SectionCardV4 title="Revenue" subtitle="Last 30 days" action={<span>See all</span>} divided>
          <p>body</p>
        </SectionCardV4>
      );
      expect(getByText('Revenue')).not.toBeNull();
      expect(getByText('Last 30 days')).not.toBeNull();
      expect(getByText('See all')).not.toBeNull();
      expect(getByText('body')).not.toBeNull();
      expect(container.querySelector('[data-xen-v4-section-card-rule]')).not.toBeNull();
    });

    it('forwards the ref, className and the rest of the div props', () => {
      const ref = React.createRef<HTMLDivElement>();
      const { getByTestId } = render(
        <SectionCardV4 ref={ref} title="Revenue" className="mt-4" data-testid="sc" id="rev">
          body
        </SectionCardV4>
      );
      const el = getByTestId('sc');
      expect(ref.current).toBe(el);
      expect(el.id).toBe('rev');
      expect(el.className).toContain('mt-4');
      expect(el.getAttribute(DASHBOARD_CARD_V4_GROUND_ATTR)).toBe('card');
    });

    it('a caller style merges with the padding variable rather than replacing it', () => {
      const el = card(
        <SectionCardV4 title="Revenue" style={{ marginTop: 12 }}>
          body
        </SectionCardV4>
      ) as HTMLElement;
      expect(el.style.marginTop).toBe('12px');
      expect(el.style.getPropertyValue(PAD_VAR)).toBe('var(--xen-space-lg)');
    });
  });
});
