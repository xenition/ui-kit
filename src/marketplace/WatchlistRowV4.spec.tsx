/** @jest-environment jsdom */
import { fireEvent, render } from '@testing-library/react';
import { createRef, type ReactElement } from 'react';
import { XenitionUIProvider } from '../provider';
import { resolveIconGlyph } from '../primitives/icon-names';
import type { ThemeSeed } from '../theme/types';
import { WatchlistRowV4 } from './WatchlistRowV4';
import { rowHeightClass } from '../dashboard/internal/row-v4';

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

function row(container: HTMLElement): HTMLElement | null {
  return container.querySelector('[data-xen-watchlist-row]');
}

function toggle(container: HTMLElement): HTMLButtonElement | null {
  return container.querySelector('[data-xen-watch-toggle]');
}

const HEART = resolveIconGlyph('heart');

describe('WatchlistRowV4 (web) — props', () => {
  it('keeps every base prop working', () => {
    const onClick = jest.fn();
    const onToggleWatch = jest.fn();
    const { container, getByText, getByLabelText } = renderThemed(
      <WatchlistRowV4
        title="Vintage film camera"
        priceCents={12500}
        compareAtCents={15000}
        condition="used"
        imageUrl="https://example.test/a.jpg"
        onClick={onClick}
        onToggleWatch={onToggleWatch}
        className="custom"
      />
    );
    expect(getByText('Vintage film camera')).toBeTruthy();
    expect(getByText('$125.00')).toBeTruthy();
    // `ConditionBadgeV4` sets its glyph and its word in one run, so the
    // accessible name is the honest assertion here.
    expect(getByLabelText('Used')).toBeTruthy();
    expect(row(container)?.className).toContain('custom');

    fireEvent.click(getByLabelText('Vintage film camera'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('keeps the watch toggle out of the row press target', () => {
    const onClick = jest.fn();
    const onToggleWatch = jest.fn();
    const { container } = renderThemed(
      <WatchlistRowV4
        title="Camera"
        priceCents={100}
        onClick={onClick}
        onToggleWatch={onToggleWatch}
      />
    );
    fireEvent.click(toggle(container) as HTMLButtonElement);
    expect(onToggleWatch).toHaveBeenCalledWith(false);
    // Un-watching must not also navigate.
    expect(onClick).not.toHaveBeenCalled();
  });

  it('placeholderIcon (new) replaces the "No photo" caption', () => {
    const { container, queryByText } = renderThemed(
      <WatchlistRowV4 title="Camera" priceCents={100} placeholderIcon="camera" />
    );
    expect(queryByText('No photo')).toBeNull();
    const glyphs = Array.from(container.querySelectorAll('[data-xen-v4-icon]')).map(
      (el) => el.textContent
    );
    expect(glyphs).toContain(resolveIconGlyph('camera'));
  });

  it('selected (new) paints the row family selected ground', () => {
    const plain = renderThemed(<WatchlistRowV4 title="Camera" priceCents={100} />);
    expect(row(plain.container)?.className).toContain('bg-transparent');

    const chosen = renderThemed(<WatchlistRowV4 title="Camera" priceCents={100} selected />);
    expect(row(chosen.container)?.className).toContain('bg-selected');
  });

  it('forwards its ref', () => {
    const ref = createRef<HTMLDivElement>();
    renderThemed(<WatchlistRowV4 ref={ref} title="Camera" priceCents={100} />);
    expect(ref.current?.getAttribute('data-xen-watchlist-row')).toBe('');
  });
});

describe('WatchlistRowV4 (web) — the design line', () => {
  it('takes the row metric and composes PriceTagV4 rather than drawing a price', () => {
    const { container, getByText } = renderThemed(
      <WatchlistRowV4 title="Camera" priceCents={12500} compareAtCents={15000} />
    );
    expect(row(container)?.className).toContain(rowHeightClass(true));
    expect(container.querySelector('[data-xen-price-tag]')).toBeTruthy();
    // PriceTagV4's own tabular figures, not a hand-drawn amount.
    expect(getByText('$125.00').className).toContain('[font-variant-numeric:tabular-nums]');
    expect(container.querySelector('[data-xen-compare-at]')?.getAttribute('aria-label')).toBe(
      'Was $150.00'
    );
  });

  it('signals watched by shape, not by the error tone (rules 3 and 6)', () => {
    const watched = renderThemed(
      <WatchlistRowV4 title="Camera" priceCents={100} onToggleWatch={jest.fn()} watched />
    );
    expect(toggle(watched.container)?.textContent).toBe(HEART);
    expect(toggle(watched.container)?.outerHTML).not.toContain('danger');
    expect(toggle(watched.container)?.getAttribute('aria-pressed')).toBe('true');

    const unwatched = renderThemed(
      <WatchlistRowV4 title="Camera" priceCents={100} onToggleWatch={jest.fn()} watched={false} />
    );
    // A hollow heart, so the state survives without colour.
    expect(unwatched.container.querySelector('[data-xen-watch-toggle]')?.textContent).toBe('♡');
  });

  it('clears the 44 tap floor on the toggle', () => {
    const { container } = renderThemed(
      <WatchlistRowV4 title="Camera" priceCents={100} onToggleWatch={jest.fn()} />
    );
    expect(toggle(container)?.className).toContain(
      'min-h-[calc(var(--xen-space-2xl)_-_var(--xen-space-xs))]'
    );
    expect(toggle(container)?.className).toContain(
      'min-w-[calc(var(--xen-space-2xl)_-_var(--xen-space-xs))]'
    );
  });

  it('says "Sold" with a mark and a word, and does not dim the price', () => {
    const { container, getByText } = renderThemed(
      <WatchlistRowV4 title="Camera" priceCents={12500} ended />
    );
    expect(getByText('Sold')).toBeTruthy();
    const glyphs = Array.from(container.querySelectorAll('[data-xen-v4-icon]')).map(
      (el) => el.textContent
    );
    expect(glyphs).toContain(resolveIconGlyph('close'));
    expect(row(container)?.className).not.toContain('opacity-60');
    expect(getByText('$125.00')).toBeTruthy();
  });
});

describe('WatchlistRowV4 (web) — the empty case and the label', () => {
  it('renders nothing for an untitled listing', () => {
    const { container } = renderThemed(<WatchlistRowV4 title="  " priceCents={100} />);
    expect(row(container)).toBeNull();
  });

  it('survives having no image, no condition, no toggle and no press', () => {
    const { container, getByText } = renderThemed(<WatchlistRowV4 title="Camera" priceCents={100} />);
    expect(getByText('Camera')).toBeTruthy();
    expect(toggle(container)).toBeNull();
    expect(container.querySelector('[role="button"]')).toBeNull();
  });

  it('names the row and both directions of the toggle', () => {
    const { getByLabelText, rerender } = renderThemed(
      <WatchlistRowV4 title="Camera" priceCents={100} onClick={jest.fn()} onToggleWatch={jest.fn()} />
    );
    expect(getByLabelText('Camera')).toBeTruthy();
    expect(getByLabelText('Remove Camera from watchlist')).toBeTruthy();

    rerender(
      <XenitionUIProvider theme={SEED}>
        <WatchlistRowV4
          title="Camera"
          priceCents={100}
          watched={false}
          onToggleWatch={jest.fn()}
        />
      </XenitionUIProvider>
    );
    expect(getByLabelText('Add Camera to watchlist')).toBeTruthy();
  });
});
