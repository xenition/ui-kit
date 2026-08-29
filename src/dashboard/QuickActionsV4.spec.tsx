/** @jest-environment jsdom */
import { fireEvent, render } from '@testing-library/react';
import { createRef, type ReactElement } from 'react';
import { XenitionUIProvider } from '../provider';
import { compileTheme } from '../theme/compile';
import type { ThemeSeed } from '../theme/types';
import { QuickActions } from './QuickActions';
import { QuickActionsV4, type QuickActionV4 } from './QuickActionsV4';

const SEED: ThemeSeed = {
  primary: '#7C3AED',
  neutral: 'cool',
  font: { heading: 'Inter', body: 'Inter' },
  shape: 'rounded',
  mode: 'both',
};

function renderThemed(ui: ReactElement) {
  return render(<XenitionUIProvider theme={SEED}>{ui}</XenitionUIProvider>);
}

/**
 * What the component actually rendered. `XenitionUIProvider` emits its own
 * `<style>` block of compiled tokens into the same container, so
 * `container.innerHTML` is never a statement about the component.
 */
function painted(container: HTMLElement): HTMLElement {
  const node = container.querySelector<HTMLElement>('[data-theme]');
  expect(node).not.toBeNull();
  return node as HTMLElement;
}

/** Every tile in the render, in source order. */
function tiles(container: HTMLElement): HTMLButtonElement[] {
  return Array.from(container.querySelectorAll<HTMLButtonElement>('[data-xen-v4-quick-action]'));
}

/** The badge a tile draws its glyph in, if it drew one. */
function badge(tile: HTMLElement): HTMLElement | null {
  return tile.querySelector<HTMLElement>('[data-xen-v4-icon][data-badge]');
}

const ACTIONS: QuickActionV4[] = [
  { key: 'send', label: 'Send', iconName: 'send' },
  { key: 'scan', label: 'Scan', icon: '📷' },
  { key: 'top-up', label: 'Top up', iconName: 'add', tone: 'success' },
];

describe('QuickActionsV4 (web)', () => {
  // ---------------------------------------------------------------- props --

  it('renders one tile per action, labelled and in source order', () => {
    const { container } = renderThemed(
      <QuickActionsV4 actions={ACTIONS} />
    );
    expect(tiles(container).map((t) => t.getAttribute('aria-label'))).toEqual([
      'Send',
      'Scan',
      'Top up',
    ]);
    // Each label sits under its badge; the badge draws the resolved glyph.
    expect(tiles(container).map((t) => t.textContent)).toEqual([
      '➤Send',
      '📷Scan',
      '＋Top up',
    ]);
  });

  it('renders the optional title as a real heading, typed from the scale', () => {
    const { container, queryByRole } = renderThemed(
      <QuickActionsV4 actions={ACTIONS} title="Shortcuts" />
    );
    const heading = queryByRole('heading', { level: 3 });
    expect(heading?.textContent).toBe('Shortcuts');
    // `m-0` because a bare h3 carries a user-agent margin that fights §4.1.
    expect(heading?.className).toContain('m-0');
    const label = heading?.querySelector('span') as HTMLElement;
    expect(label.className).toContain('text-lg');
    expect(label.className).toContain('font-bold');
    // No title, no heading — and no empty gap where one would have been.
    expect(painted(container).querySelectorAll('h3')).toHaveLength(1);
    const untitled = renderThemed(<QuickActionsV4 actions={ACTIONS} />);
    expect(untitled.container.querySelector('h3')).toBeNull();
  });

  it('fires onClick, and a disabled tile is inert and announced as such', () => {
    const seen: string[] = [];
    const { container } = renderThemed(
      <QuickActionsV4
        actions={[
          { key: 'a', label: 'Live', onClick: () => seen.push('a') },
          { key: 'b', label: 'Dead', onClick: () => seen.push('b'), disabled: true },
        ]}
      />
    );
    fireEvent.click(tiles(container)[0] as HTMLButtonElement);
    fireEvent.click(tiles(container)[1] as HTMLButtonElement);
    expect(seen).toEqual(['a']);
    expect((tiles(container)[1] as HTMLButtonElement).disabled).toBe(true);
  });

  it('routes the grid through GridV4 — columns default 3, gutter spacing.md', () => {
    const { container } = renderThemed(<QuickActionsV4 actions={ACTIONS} />);
    const grid = painted(container).querySelector('.grid') as HTMLElement;
    expect(grid.style.gridTemplateColumns).toBe('repeat(3, minmax(0, 1fr))');
    // §4.1's grid gutter — the base packed these at `sm`, too tight for §3.
    expect(grid.className).toContain('gap-[var(--xen-space-md)]');
    expect(grid.className).not.toContain('gap-[var(--xen-space-sm)]');
  });

  it('columns is still the caller’s, and minItemWidth lets the grid fit its own', () => {
    const two = renderThemed(<QuickActionsV4 actions={ACTIONS} columns={2} />);
    expect((two.container.querySelector('.grid') as HTMLElement).style.gridTemplateColumns).toBe(
      'repeat(2, minmax(0, 1fr))'
    );
    const fluid = renderThemed(<QuickActionsV4 actions={ACTIONS} minItemWidth={160} />);
    expect((fluid.container.querySelector('.grid') as HTMLElement).style.gridTemplateColumns).toBe(
      'repeat(auto-fit, minmax(160px, 1fr))'
    );
  });

  // ------------------------------------------------------- the warm tile --

  it('§4.2 — the tile is the CARD ground, not the page ground the base painted', () => {
    const { container } = renderThemed(<QuickActionsV4 actions={ACTIONS} />);
    tiles(container).forEach((tile) => {
      expect(tile.className).toContain('bg-card');
      expect(tile.className).toContain('text-on-card');
      expect(tile.className).not.toContain('bg-surface');
    });
    // The base is what this replaced.
    const base = render(<QuickActions actions={[{ key: 'a', label: 'A' }]} />);
    expect(base.container.innerHTML).toContain('bg-surface');
  });

  it('§4.2 — radius.lg, no border, and the seed’s elevation.card rather than a Tailwind step', () => {
    const theme = compileTheme(SEED);
    const { container } = renderThemed(<QuickActionsV4 actions={ACTIONS} />);
    const tile = tiles(container)[0] as HTMLElement;
    expect(tile.className).toContain('rounded-[var(--xen-radius-lg)]');
    // Never a heavy border AND a shadow — the house look is one or the other.
    expect(tile.className).not.toContain('border');
    expect(tile.style.getPropertyValue('--xen-v4-shadow-l')).toContain(
      `${theme.lightElevation.card.offsetY}px`
    );
    // A dark page needs MORE shadow, not less; a fixed utility cannot say that.
    expect(tile.style.getPropertyValue('--xen-v4-shadow-d')).not.toBe(
      tile.style.getPropertyValue('--xen-v4-shadow-l')
    );
  });

  it('§4.7 — the glyph moves into a tinted circular badge, primary by default', () => {
    const { container } = renderThemed(<QuickActionsV4 actions={ACTIONS} />);
    const named = badge(tiles(container)[0] as HTMLElement);
    expect(named?.getAttribute('data-badge')).toBe('soft');
    expect(named?.getAttribute('data-shape')).toBe('circle');
    // A string `icon` is a glyph, so it is badged too.
    expect(badge(tiles(container)[1] as HTMLElement)?.textContent).toBe('📷');
  });

  it('§4.7 — tone picks the semantic family the badge tints from', () => {
    const theme = compileTheme(SEED);
    const { container } = renderThemed(<QuickActionsV4 actions={ACTIONS} />);
    const success = badge(tiles(container)[2] as HTMLElement) as HTMLElement;
    const primary = badge(tiles(container)[0] as HTMLElement) as HTMLElement;
    expect(success.style.getPropertyValue('--xen-v4-icon-ground-l')).not.toBe(
      primary.style.getPropertyValue('--xen-v4-icon-ground-l')
    );
    // And it is a wash of the theme's own slot, not an invented colour.
    expect(theme.light.success).toBeTruthy();
  });

  it('an arbitrary React node icon still renders, unbadged and hidden from a11y', () => {
    const { container } = renderThemed(
      <QuickActionsV4 actions={[{ key: 'x', label: 'Custom', icon: <svg data-testid="mark" /> }]} />
    );
    const tile = tiles(container)[0] as HTMLElement;
    expect(badge(tile)).toBeNull();
    expect(tile.querySelector('[aria-hidden]')).not.toBeNull();
    expect(tile.querySelector('svg')).not.toBeNull();
  });

  // ------------------------------------------------------------ the floor --

  it('every tile clears the 44 tap floor, composed from the scale and never typed', () => {
    const { container } = renderThemed(<QuickActionsV4 actions={ACTIONS} />);
    tiles(container).forEach((tile) => {
      // 2xl (48) - xs (4) = 44, said in tokens.
      expect(tile.className).toContain(
        'min-h-[calc(var(--xen-space-2xl)_-_var(--xen-space-xs))]'
      );
      expect(tile.className).not.toMatch(/min-h-\[\d+px\]/);
      expect(tile.className).toContain('p-md');
    });
  });

  // ------------------------------------------------- state, not opacity --

  it('press and hover are the STATE LAYER — no bg-neutral-100, no opacity dim', () => {
    const { container } = renderThemed(<QuickActionsV4 actions={ACTIONS} />);
    tiles(container).forEach((tile) => {
      expect(tile.hasAttribute('data-xen-v4-state')).toBe(true);
      expect(tile.className).not.toContain('bg-neutral-100');
      expect(tile.className).not.toContain('hover:');
      // The tile declares its own opaque pair, so the layer suits the card.
      expect(tile.style.getPropertyValue('--xen-v4-state-ground')).toBe('var(--xen-card)');
      expect(tile.style.getPropertyValue('--xen-v4-state-ink')).toBe('var(--xen-on-card)');
    });
    const base = render(<QuickActions actions={[{ key: 'a', label: 'A' }]} />);
    expect(base.container.innerHTML).toContain('hover:bg-neutral-100');
  });

  it('disabled is M3’s 0.38 content opacity, not the base’s round-number 50%', () => {
    const { container } = renderThemed(
      <QuickActionsV4 actions={[{ key: 'a', label: 'A', disabled: true }]} />
    );
    const tile = tiles(container)[0] as HTMLElement;
    expect(tile.className).toContain('disabled:opacity-[0.38]');
    expect(tile.className).not.toContain('disabled:opacity-50');
  });

  it('injects the shared state sheet and its own depth sheet once each', () => {
    renderThemed(<QuickActionsV4 actions={ACTIONS} />);
    renderThemed(<QuickActionsV4 actions={ACTIONS} />);
    expect(document.querySelectorAll('#xen-v4-state-styles')).toHaveLength(1);
    expect(document.querySelectorAll('#xen-v4-quick-actions-styles')).toHaveLength(1);
  });

  // ------------------------------------------------------------- purity --

  it('§1.1 — no literal colours, spacings, radii or font sizes in the markup', () => {
    const { container } = renderThemed(<QuickActionsV4 actions={ACTIONS} title="Shortcuts" />);
    const nodes = [...tiles(container), painted(container).querySelector('.grid') as HTMLElement];
    nodes.forEach((node) => {
      (node.className.match(/\[[^\]]+\]/g) ?? []).forEach((value) => {
        // `[0.38]` is M3's disabled-content opacity from `v4-state.ts` — a
        // state token, not a colour, spacing, radius or font size.
        if (value === '[0.38]') return;
        expect(value).toContain('var(--xen-');
      });
    });
    // The only px and hex in the tree belong to the compiled elevation token,
    // which is the seed's decision reaching the page — never a typed literal.
    const withoutShadow = painted(container).innerHTML.replace(
      /--xen-v4-(shadow|icon-ground|icon-ink)-[ld]:[^;"]*/g,
      ''
    );
    expect(withoutShadow).not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
    expect(withoutShadow).not.toMatch(/[1-9]\d*px/);
  });

  it('text never takes the muted FILL', () => {
    const { container } = renderThemed(<QuickActionsV4 actions={ACTIONS} title="Shortcuts" />);
    painted(container)
      .querySelectorAll('span[data-xen-v4-text]')
      .forEach((span) => {
        expect(span.className.split(/\s+/)).not.toContain('text-muted');
      });
  });

  // -------------------------------------------------------- empty state --

  it('EMPTY STATE — actions: [] renders nothing at all, not a blank bordered box', () => {
    const { container } = renderThemed(<QuickActionsV4 actions={[]} />);
    expect(painted(container).innerHTML).toBe('');
    expect(tiles(container)).toHaveLength(0);
  });

  it('EMPTY STATE — a title with no actions is still nothing: no heading over a void', () => {
    const { container } = renderThemed(<QuickActionsV4 actions={[]} title="Shortcuts" />);
    expect(painted(container).innerHTML).toBe('');
  });

  it('EMPTY STATE — an action with no icon at all renders its label and no badge', () => {
    const { container } = renderThemed(
      <QuickActionsV4 actions={[{ key: 'bare', label: 'Bare' }]} />
    );
    const tile = tiles(container)[0] as HTMLElement;
    expect(badge(tile)).toBeNull();
    expect(tile.textContent).toBe('Bare');
    // Still a full tile: the ground, the radius and the floor are unconditional.
    expect(tile.className).toContain('bg-card');
  });

  // ---------------------------------------------------------- plumbing --

  it('forwards the ref and merges className and the rest of the div props', () => {
    const ref = createRef<HTMLDivElement>();
    const { container } = renderThemed(
      <QuickActionsV4 ref={ref} actions={ACTIONS} className="mt-lg" data-testid="qa" />
    );
    const root = painted(container).firstElementChild as HTMLElement;
    expect(ref.current).toBe(root);
    expect(root.className).toContain('mt-lg');
    expect(root.getAttribute('data-testid')).toBe('qa');
    // §4.1: a card header sits `spacing.md` from its body.
    expect(root.className).toContain('gap-md');
  });

  it('is additive — the base still exists and is untouched by this file', () => {
    const { container } = render(<QuickActions actions={[{ key: 'a', label: 'A' }]} />);
    expect(container.querySelectorAll('button')).toHaveLength(1);
    expect(container.querySelector('[data-xen-v4-quick-action]')).toBeNull();
  });
});
