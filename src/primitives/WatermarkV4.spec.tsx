/** @jest-environment jsdom */
import { render } from '@testing-library/react';
import type { ReactElement } from 'react';
import { XenitionUIProvider } from '../provider';
import { WATERMARK_ALPHA, WATERMARK_SCALE, WATERMARK_TILT } from './internal/identity-v4';
import type { ThemeSeed } from '../theme/types';
import { WatermarkV4 } from './WatermarkV4';

const SEED: ThemeSeed = {
  primary: '#7C3AED',
  neutral: 'cool',
  font: { heading: 'Inter', body: 'Inter' },
  shape: 'rounded',
  mode: 'both',
};

function overlay(ui: ReactElement): HTMLElement {
  const { container } = render(<XenitionUIProvider theme={SEED}>{ui}</XenitionUIProvider>);
  return container.querySelector('[data-xen-v4-watermark]') as HTMLElement;
}

const rows = (el: HTMLElement): HTMLElement[] => Array.from(el.children) as HTMLElement[];
const tiles = (el: HTMLElement): HTMLElement[] =>
  Array.from(el.querySelectorAll<HTMLElement>('span'));

describe('WatermarkV4 (web)', () => {
  it('lays the tiles out as a lattice, not a wrapped blob', () => {
    const el = overlay(
      <WatermarkV4 text="CONFIDENTIAL" count={9}>
        <p>doc</p>
      </WatermarkV4>
    );
    // 9 tiles at 3 per row: explicit rows, so where they break no longer
    // depends on how wide the container happens to be.
    expect(rows(el)).toHaveLength(3);
    expect(tiles(el)).toHaveLength(9);
    expect(el.className).not.toContain('flex-wrap');
  });

  it('offsets every other row, so the lattice is a brick course', () => {
    const el = overlay(
      <WatermarkV4 text="CONFIDENTIAL" count={9}>
        <p>doc</p>
      </WatermarkV4>
    );
    expect(rows(el).map((r) => r.className.includes('ml-2xl'))).toEqual([false, true, false]);
  });

  it('renders exactly `count` tiles, and never fewer than one', () => {
    const at = (count: number): number =>
      tiles(
        overlay(
          <WatermarkV4 text="CONFIDENTIAL" count={count}>
            <p>doc</p>
          </WatermarkV4>
        )
      ).length;
    expect(at(24)).toBe(24);
    expect(at(7)).toBe(7);
    expect(at(0)).toBe(1);
  });

  it('prints in the page’s own ink, so it is one strength in both schemes', () => {
    const el = overlay(
      <WatermarkV4 text="CONFIDENTIAL">
        <p>doc</p>
      </WatermarkV4>
    );
    // `text-muted` is a MID tone: its distance from the page moves with the
    // scheme, so the same alpha was two different marks.
    expect((tiles(el)[0] as HTMLElement).className).toContain('text-on-surface');
    expect((tiles(el)[0] as HTMLElement).className).not.toContain('text-muted');
    expect(el.style.opacity).toBe(String(WATERMARK_ALPHA));
  });

  it('tilts and oversizes by the shared constants', () => {
    const el = overlay(
      <WatermarkV4 text="CONFIDENTIAL">
        <p>doc</p>
      </WatermarkV4>
    );
    expect(el.style.transform).toBe(`rotate(${WATERMARK_TILT}deg) scale(${WATERMARK_SCALE})`);
  });

  it('pads from the spacing scale, not from Tailwind’s rhythm', () => {
    const el = overlay(
      <WatermarkV4 text="CONFIDENTIAL">
        <p>doc</p>
      </WatermarkV4>
    );
    // `px-6 py-3` was 24/12 against native's 24/16.
    expect((tiles(el)[0] as HTMLElement).className).toContain('px-lg');
    expect((tiles(el)[0] as HTMLElement).className).toContain('py-md');
  });

  it('does not come along when you copy the document', () => {
    const el = overlay(
      <WatermarkV4 text="CONFIDENTIAL">
        <p>doc</p>
      </WatermarkV4>
    );
    expect(el.className).toContain('select-none');
  });

  it('takes no clicks and is hidden from assistive tech', () => {
    const { container, getByText } = render(
      <XenitionUIProvider theme={SEED}>
        <WatermarkV4 text="CONFIDENTIAL">
          <p>doc</p>
        </WatermarkV4>
      </XenitionUIProvider>
    );
    const el = container.querySelector('[data-xen-v4-watermark]') as HTMLElement;
    expect(el.className).toContain('pointer-events-none');
    expect(el.getAttribute('aria-hidden')).toBe('true');
    expect(getByText('doc')).toBeTruthy();
  });
});
