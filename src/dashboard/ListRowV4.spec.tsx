/** @jest-environment jsdom */
import { fireEvent, render } from '@testing-library/react';
import { createRef, type ReactElement } from 'react';
import { XenitionUIProvider } from '../provider';
import { resolveIconGlyph } from '../primitives/icon-names';
import type { ThemeSeed } from '../theme/types';
import { ListRowV4 } from './ListRowV4';
import {
  ROW_V4_LEADING_CLASS,
  ROW_V4_STYLE_ID,
  ROW_V4_TEXT_CLASS,
  ROW_V4_TRAILING_CLASS,
  rowHeightClass,
} from './internal/row-v4';

const SEED: ThemeSeed = {
  primary: '#7C3AED',
  neutral: 'cool',
  font: { heading: 'Inter', body: 'Inter' },
  shape: 'rounded',
  mode: 'both',
};

function renderThemed(ui: ReactElement): ReturnType<typeof render> {
  return render(<XenitionUIProvider theme={SEED}>{ui}</XenitionUIProvider>);
}

/** The row element itself — the thing every metric assertion is about. */
function row(container: HTMLElement): HTMLElement {
  return container.querySelector('[data-xen-v4-row]') as HTMLElement;
}

/** Every `IconV4` in the subtree, by the attribute only that component stamps. */
function icons(container: HTMLElement): HTMLElement[] {
  return Array.from(container.querySelectorAll('[data-xen-v4-icon]'));
}

const CHEVRON = resolveIconGlyph('chevron-right');

function chevrons(container: HTMLElement): HTMLElement[] {
  return icons(container).filter((el) => el.textContent === CHEVRON);
}

describe('ListRowV4 (web) — props', () => {
  it('keeps every base prop working and adds only optional ones', () => {
    const seen: string[] = [];
    const { container, getByText } = renderThemed(
      <ListRowV4
        title="Ada Lovelace"
        meta="Analytical engine"
        avatarUrl="https://example.test/a.png"
        action={<span data-testid="action">3</span>}
        onClick={() => seen.push('tap')}
        className="custom-row"
      />
    );
    expect(getByText('Ada Lovelace')).toBeTruthy();
    expect(getByText('Analytical engine')).toBeTruthy();
    expect(container.querySelector('[data-testid="action"]')).toBeTruthy();
    expect(row(container).className).toContain('custom-row');
    fireEvent.click(getByText('Ada Lovelace'));
    expect(seen).toEqual(['tap']);
  });

  it('renders as a div until it is given something to do', () => {
    const { container } = renderThemed(<ListRowV4 title="Static" />);
    expect(row(container).tagName).toBe('DIV');
    expect(row(container).getAttribute('data-interactive')).toBe('false');

    const clickable = renderThemed(<ListRowV4 title="Tap" onClick={() => undefined} />);
    expect(row(clickable.container).tagName).toBe('BUTTON');
    expect(row(clickable.container).getAttribute('data-interactive')).toBe('true');
  });

  it('forwards its ref to whichever element it rendered', () => {
    const staticRef = createRef<HTMLElement>();
    renderThemed(<ListRowV4 ref={staticRef} title="Static" />);
    expect(staticRef.current?.tagName).toBe('DIV');

    const buttonRef = createRef<HTMLElement>();
    renderThemed(<ListRowV4 ref={buttonRef} title="Tap" onClick={() => undefined} />);
    expect(buttonRef.current?.tagName).toBe('BUTTON');
  });

  it('typesets the two lines from the V4 scale, and never inks with a fill', () => {
    const { getByText } = renderThemed(<ListRowV4 title="Ada" meta="Engines" />);
    const title = getByText('Ada');
    const meta = getByText('Engines');
    expect(title.className).toContain('text-base');
    expect(title.className).toContain('font-semibold');
    expect(title.className).toContain('text-on-surface');
    expect(meta.className).toContain('text-sm');
    // `mutedText`, not `muted` — `muted` is a FILL, and the shadcn pass closed
    // exactly this. The lookahead is load-bearing: `text-muted-text` contains
    // `text-muted` as a substring.
    expect(meta.className).toContain('text-muted-text');
    expect(meta.className).not.toMatch(/text-muted(?!-text)/);
    // One line each, so a long name ellipsises instead of pushing the trailing
    // readout off the row. `overflow` is the half of `TextV4`'s clamp jsdom's
    // CSSOM keeps — it drops `-webkit-line-clamp` as an unknown property.
    expect(title.style.overflow).toBe('hidden');
    expect(meta.style.overflow).toBe('hidden');
  });
});

describe('ListRowV4 (web) — the family metric', () => {
  it('takes the one-line height with a title alone', () => {
    const { container } = renderThemed(<ListRowV4 title="Ada" showAvatar={false} />);
    expect(row(container).className).toContain(rowHeightClass(false));
    expect(row(container).className).not.toContain(rowHeightClass(true));
  });

  it('takes the two-line height once it carries a supporting line', () => {
    const { container } = renderThemed(
      <ListRowV4 title="Ada" meta="Engines" showAvatar={false} />
    );
    expect(row(container).className).toContain(rowHeightClass(true));
  });

  it('treats an empty supporting line as no supporting line', () => {
    const { container } = renderThemed(<ListRowV4 title="Ada" meta="" showAvatar={false} />);
    expect(row(container).className).toContain(rowHeightClass(false));
  });

  it('wears the shared row skin rather than one of its own', () => {
    const { container } = renderThemed(<ListRowV4 title="Ada" />);
    const cls = row(container).className;
    // §4.1 row padding, and the gutter that the base row spelled `px-lg` on the
    // settings twin and `px-md` here.
    expect(cls).toContain('px-md');
    expect(cls).not.toContain('px-lg');
    // §4.3: the ground is the container's, and §4.6: a row carries no depth.
    expect(cls).toContain('bg-transparent');
    expect(cls).not.toContain('shadow');
    expect(cls).not.toContain('rounded');
    expect(cls).not.toContain('border-border');
  });

  it('puts the leading slot in the fixed 44 square and the text in the flexible column', () => {
    const { container } = renderThemed(<ListRowV4 title="Ada" meta="Engines" />);
    const slot = row(container).firstElementChild as HTMLElement;
    expect(slot.className).toBe(ROW_V4_LEADING_CLASS);
    // The avatar cannot be squeezed to pay for a long title.
    expect(slot.className).toContain('shrink-0');
    const text = container.querySelector(`[data-xen-v4-row] > span:nth-child(2)`) as HTMLElement;
    expect(text.className).toBe(ROW_V4_TEXT_CLASS);
    // `min-w-0` is what keeps the clamp working at all.
    expect(text.className).toContain('min-w-0');
  });
});

describe('ListRowV4 (web) — the leading slot', () => {
  it('shows a person as an avatar', () => {
    const { container } = renderThemed(<ListRowV4 title="Ada Lovelace" />);
    const slot = row(container).firstElementChild as HTMLElement;
    expect(slot.className).toBe(ROW_V4_LEADING_CLASS);
    // Initials, not a dot.
    expect(slot.textContent).toBe('AL');
  });

  it('shows a kind of thing as a tinted circular badge, never a bare dot', () => {
    const { container } = renderThemed(
      <ListRowV4 title="Billing" icon="star" iconTone="success" showAvatar={false} />
    );
    const badge = icons(container)[0] as HTMLElement;
    expect(badge.getAttribute('data-badge')).toBe('soft');
    expect(badge.getAttribute('data-shape')).toBe('circle');
  });

  it('lets an explicit leading slot win over both', () => {
    const { container } = renderThemed(
      <ListRowV4 title="Ada" icon="star" leading={<span data-testid="own" />} />
    );
    expect(container.querySelector('[data-testid="own"]')).toBeTruthy();
    expect(icons(container).filter((el) => el.getAttribute('data-badge') !== null)).toHaveLength(0);
  });

  it('omits the slot entirely when the row is plain text', () => {
    const { container } = renderThemed(<ListRowV4 title="Ada" showAvatar={false} />);
    expect((row(container).firstElementChild as HTMLElement).className).toBe(ROW_V4_TEXT_CLASS);
  });
});

describe('ListRowV4 (web) — the chevron means navigation', () => {
  it('draws no chevron on a row that does nothing', () => {
    const { container } = renderThemed(<ListRowV4 title="Ada" />);
    expect(chevrons(container)).toHaveLength(0);
  });

  it('draws one on a row that navigates', () => {
    const { container } = renderThemed(<ListRowV4 title="Ada" onClick={() => undefined} />);
    expect(chevrons(container)).toHaveLength(1);
  });

  it('lets a row that selects rather than navigates opt out', () => {
    const { container } = renderThemed(
      <ListRowV4 title="Ada" onClick={() => undefined} chevron={false} />
    );
    expect(chevrons(container)).toHaveLength(0);
  });

  it('lets a row wrapped in a link the component cannot see opt in', () => {
    const { container } = renderThemed(<ListRowV4 title="Ada" chevron />);
    expect(chevrons(container)).toHaveLength(1);
  });

  it('draws the chevron as an icon, not as a typed character', () => {
    const { container } = renderThemed(<ListRowV4 title="Ada" onClick={() => undefined} />);
    const mark = chevrons(container)[0] as HTMLElement;
    // A glyph the icon set resolved, inside the icon component — brief §1.2
    // retires the literal `›` a component typed into its own markup.
    expect(mark.getAttribute('data-xen-v4-icon')).toBe('');
    expect((mark.parentElement as HTMLElement).className).toBe(ROW_V4_TRAILING_CLASS);
  });

  it('keeps the chevron behind a trailing value, in anatomy order', () => {
    const { container } = renderThemed(
      <ListRowV4 title="Ada" action={<span>12</span>} onClick={() => undefined} />
    );
    const trailing = row(container).lastElementChild as HTMLElement;
    expect(trailing.className).toBe(ROW_V4_TRAILING_CLASS);
    expect(trailing.textContent).toBe(`12${CHEVRON}`);
  });
});

describe('ListRowV4 (web) — press is the state layer', () => {
  it('opts into the shared layer and nothing else', () => {
    const { container } = renderThemed(<ListRowV4 title="Ada" onClick={() => undefined} />);
    const el = row(container);
    expect(el.getAttribute('data-xen-v4-state')).toBe('');
    // The three feedbacks §4.3 deletes rather than translates.
    expect(el.className).not.toContain('hover:bg-neutral-100');
    expect(el.className).not.toMatch(/hover:/);
    expect(el.className).not.toMatch(/opacity/);
  });

  it('mixes the layer from the pair the row is actually drawn on', () => {
    renderThemed(<ListRowV4 title="Ada" onClick={() => undefined} />);
    const css = document.getElementById(ROW_V4_STYLE_ID)?.textContent ?? '';
    // `card` / `on-card`, not `surface` — a row lives in a card, and the pair
    // its text was contrast-checked against is the pair the layer mixes.
    expect(css).toContain('--xen-v4-state-ground: var(--xen-card)');
    expect(css).toContain('--xen-v4-state-ink: var(--xen-on-card)');
    // A tint, never a lift.
    expect(css).not.toContain('box-shadow');
  });

  it('paints the selected ground from the one token that ships a contrast pair', () => {
    const { container } = renderThemed(<ListRowV4 title="Ada" selected />);
    expect(row(container).className).toContain('bg-selected');
    expect(row(container).className).toContain('text-on-selected');
    // Not the neutral ramp the notification twin reached for.
    expect(row(container).className).not.toContain('neutral-');
  });
});

describe('ListRowV4 (web) — token purity', () => {
  it('names no colour, spacing, radius or size literal on the row itself', () => {
    const { container } = renderThemed(
      <ListRowV4 title="Ada" meta="Engines" selected onClick={() => undefined} />
    );
    const el = row(container);
    expect(el.className).not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
    expect(el.className).not.toMatch(/rgb|hsl/);
    // `min-h-[56px]` and `min-h-[48px]` are named in brief §1 as violations.
    expect(el.className).not.toMatch(/\[\d+px\]/);
    expect(el.className).not.toMatch(/neutral-/);
    // Every arbitrary value the row does use is composed from the scale.
    const arbitrary = el.className.match(/\[[^\]]+\]/g) ?? [];
    expect(arbitrary.length).toBeGreaterThan(0);
    arbitrary.forEach((value) => expect(value).toContain('var(--xen-'));
  });

  it('keeps hex out of the injected sheet too', () => {
    renderThemed(<ListRowV4 title="Ada" onClick={() => undefined} />);
    const css = document.getElementById(ROW_V4_STYLE_ID)?.textContent ?? '';
    expect(css).not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
    expect(css.length).toBeGreaterThan(0);
  });
});

describe('ListRowV4 (web) — the empty state', () => {
  it('renders nothing rather than a blank band when it has nothing to show', () => {
    const { container } = renderThemed(<ListRowV4 title="" />);
    expect(container.querySelector('[data-xen-v4-row]')).toBeNull();
  });

  it('treats whitespace as empty', () => {
    const { container } = renderThemed(<ListRowV4 title="   " meta="" />);
    expect(container.querySelector('[data-xen-v4-row]')).toBeNull();
  });

  it('does not count the default avatar as content', () => {
    const { container } = renderThemed(<ListRowV4 title="" showAvatar />);
    // A monogram of nothing is not a reason to keep a 56px band on screen.
    expect(container.querySelector('[data-xen-v4-row]')).toBeNull();
  });

  it('still renders when only a slot has something to say', () => {
    const { container } = renderThemed(<ListRowV4 title="" action={<span>7</span>} />);
    expect(row(container)).toBeTruthy();
    expect(row(container).textContent).toBe('7');
  });
});
