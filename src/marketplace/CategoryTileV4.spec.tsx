/** @jest-environment jsdom */
import { fireEvent, render } from '@testing-library/react';
import type { ReactElement } from 'react';
import { CategoryTileV4, CATEGORY_TILE_V4_STYLE_ID } from './CategoryTileV4';

function tile(ui: ReactElement): HTMLElement | null {
  const { container } = render(ui);
  return container.querySelector('[data-xen-v4-category-tile]');
}

/** The sheet this component injects — where the `card` ground override lives. */
function sheet(): string {
  return document.getElementById(CATEGORY_TILE_V4_STYLE_ID)?.textContent ?? '';
}

describe('CategoryTileV4 (web)', () => {
  // ── §4.2 / the selected token ──────────────────────────────────────

  it('paints `card`, not the page colour, and composes CardV4 rather than re-rolling it', () => {
    const el = tile(<CategoryTileV4 label="Cameras" glyph="📷" />) as HTMLElement;
    expect(el.hasAttribute('data-xen-v4-card')).toBe(true);
    const css = sheet();
    expect(css).toContain('[data-xen-v4-card][data-xen-v4-category-tile]');
    expect(css).toContain('background-color: var(--xen-card)');
  });

  it('uses the `selected` token pair for selection, not a brand ramp step', () => {
    const css = sheet();
    expect(css).toContain('background-color: var(--xen-selected)');
    expect(css).toContain('color: var(--xen-on-selected)');
    // The base reached for `bg-primary-50`, which is a near-white in dark mode.
    expect(css).not.toContain('primary-50');
  });

  // ── rule 6: selection is not colour alone ──────────────────────────

  it('a selected tile shows a checkmark, not only a shade', () => {
    const off = tile(<CategoryTileV4 label="Cameras" glyph="📷" />) as HTMLElement;
    const on = tile(<CategoryTileV4 label="Cameras" glyph="📷" selected />) as HTMLElement;
    expect(off.getAttribute('data-selected')).toBe('false');
    expect(on.getAttribute('data-selected')).toBe('true');
    expect(on.textContent).toContain('✓');
    expect(off.textContent).not.toContain('✓');
  });

  // ── §4.7: the tinted circular badge, and the new `iconName` prop ────

  it('draws the glyph in the tinted circular badge for a tile, bare for a chip (§4.7)', () => {
    const { container: asTile } = render(<CategoryTileV4 label="Cameras" iconName="camera" />);
    const { container: asChip } = render(
      <CategoryTileV4 label="Cameras" iconName="camera" variant="chip" />
    );
    expect(asTile.querySelector('[data-xen-v4-icon][data-badge]')).not.toBeNull();
    expect(asChip.querySelector('[data-xen-v4-icon][data-badge]')).toBeNull();
  });

  it('`iconName` resolves through the kit’s named set; `glyph` still wins as the escape hatch', () => {
    expect((tile(<CategoryTileV4 label="Cameras" iconName="camera" />) as HTMLElement).textContent)
      .toContain('📷');
    expect(
      (tile(<CategoryTileV4 label="Bikes" iconName="camera" glyph="🚲" />) as HTMLElement).textContent
    ).toContain('🚲');
  });

  // ── the tap floor and the state layer ──────────────────────────────

  it('clears the 44 tap floor and takes the state layer, not an opacity dimmer', () => {
    const el = tile(<CategoryTileV4 label="Cameras" variant="chip" onClick={() => {}} />) as HTMLElement;
    expect(el.className).toContain('min-h-[calc(var(--xen-space-2xl)_-_var(--xen-space-xs))]');
    expect(el.hasAttribute('data-xen-v4-state')).toBe(true);
    expect(el.className).not.toMatch(/hover:opacity/);
  });

  it('fires onClick from a pointer press and from the keyboard', () => {
    const onClick = jest.fn();
    const el = tile(<CategoryTileV4 label="Cameras" onClick={onClick} />) as HTMLElement;
    fireEvent.click(el);
    fireEvent.keyDown(el, { key: 'Enter' });
    expect(onClick).toHaveBeenCalledTimes(2);
  });

  // ── the empty case ─────────────────────────────────────────────────

  it('renders nothing with neither a label nor a mark — never a blank bordered box (§4.5)', () => {
    const { container } = render(<CategoryTileV4 label="" />);
    expect(container.firstChild).toBeNull();
  });

  it('a glyph with no label still renders, because there is something to show', () => {
    expect(tile(<CategoryTileV4 label="" glyph="📷" />)).not.toBeNull();
  });

  it('omits the count line when there is no count', () => {
    const el = tile(<CategoryTileV4 label="Cameras" />) as HTMLElement;
    expect(el.textContent).toBe('Cameras');
  });

  // ── the accessible label ───────────────────────────────────────────

  it('names itself with the label and the count, and carries the pressed state', () => {
    const el = tile(
      <CategoryTileV4 label="Cameras" count={1234} selected onClick={() => {}} />
    ) as HTMLElement;
    expect(el.getAttribute('aria-label')).toBe('Cameras, 1,234 items');
    expect(el.getAttribute('aria-pressed')).toBe('true');
    expect(el.getAttribute('role')).toBe('button');
  });

  it('a non-interactive tile is not a button', () => {
    const el = tile(<CategoryTileV4 label="Cameras" count={2} />) as HTMLElement;
    expect(el.getAttribute('role')).toBeNull();
    expect(el.textContent).toContain('2 items');
  });
});
