/** @jest-environment jsdom */
import { fireEvent, render, within } from '@testing-library/react';
import type { ReactElement } from 'react';
import { XenitionUIProvider } from '../provider';
import type { ThemeSeed } from '../theme/types';
import { UploadV4, acceptHint } from './UploadV4';

const SEED: ThemeSeed = {
  primary: '#7C3AED',
  neutral: 'cool',
  font: { heading: 'Inter', body: 'Inter' },
  shape: 'rounded',
  mode: 'both',
};

function renderThemed(ui: ReactElement) {
  const result = render(<XenitionUIProvider theme={SEED}>{ui}</XenitionUIProvider>);
  return { ...result, q: within(result.container) };
}

const css = (): string => document.getElementById('xen-v4-picker-styles')?.textContent ?? '';
const noop = (): void => undefined;

const zoneOf = (container: HTMLElement): HTMLElement =>
  container.querySelector('[role="button"]') as HTMLElement;

describe('acceptHint', () => {
  it('claims only what the component actually knows', () => {
    expect(acceptHint('image/*', true)).toBe('Accepts image/* · more than one is fine');
    expect(acceptHint('image/*', false)).toBe('Accepts image/*');
    expect(acceptHint(undefined, true)).toBe('More than one is fine');
    // Nothing to say, so nothing is said — §7, not "Any file type".
    expect(acceptHint(undefined, false)).toBeNull();
  });
});

describe('UploadV4 (web)', () => {
  it('reads as a place, not a button: three tap targets tall, dashed', () => {
    const { container } = renderThemed(<UploadV4 onFiles={noop} />);
    const zone = zoneOf(container);
    expect(zone.className).toContain('min-h-[calc(var(--xen-space-2xl)_*_3)]');
    expect(zone.className).toContain('border-dashed');
    expect(zone.className).toContain('rounded-[var(--xen-radius-lg)]');
  });

  it('makes the headline the loudest thing in the box, not muted sm', () => {
    const { q } = renderThemed(<UploadV4 onFiles={noop} label="Add your receipts" />);
    const headline = q.getByText('Add your receipts');
    expect(headline.className).toContain('text-on-surface');
    expect(headline.className).toContain('text-base');
    expect(headline.className).toContain('font-semibold');
    expect(headline.className).not.toContain('text-muted');
  });

  it('washes the drag state with a color-mix, never bg-primary-50', () => {
    const { container } = renderThemed(<UploadV4 onFiles={noop} />);
    const zone = zoneOf(container);
    expect(zone.hasAttribute('data-xen-v4-wash')).toBe(false);

    fireEvent.dragOver(zone);
    expect(zone.hasAttribute('data-xen-v4-wash')).toBe(true);
    expect(zone.className).toContain('border-primary');
    // The ramp step the base used keeps the light orientation in both schemes.
    expect(zone.className).not.toContain('primary-50');
    expect(css()).toContain(
      '[data-xen-v4-wash] { background-color: color-mix(in srgb, var(--xen-primary) 16%, var(--xen-surface)); }'
    );

    fireEvent.dragLeave(zone);
    expect(zone.hasAttribute('data-xen-v4-wash')).toBe(false);
  });

  it('says what fits, from the only two facts it has', () => {
    const { q } = renderThemed(<UploadV4 onFiles={noop} accept="image/*" multiple />);
    expect(q.getByText('Accepts image/* · more than one is fine')).toBeTruthy();
  });

  it('says nothing rather than padding the space', () => {
    const { q } = renderThemed(<UploadV4 onFiles={noop} />);
    expect(q.queryByText(/Accepts/)).toBeNull();
    expect(q.queryByText(/Any file type/)).toBeNull();
  });

  it('reports dropped files', () => {
    const onFiles = jest.fn();
    const { container } = renderThemed(<UploadV4 onFiles={onFiles} />);
    const file = new File(['x'], 'a.png', { type: 'image/png' });
    fireEvent.drop(zoneOf(container), { dataTransfer: { files: [file] } });
    expect(onFiles).toHaveBeenCalledWith([file]);
  });

  it('reports browsed files', () => {
    const onFiles = jest.fn();
    const { container } = renderThemed(<UploadV4 onFiles={onFiles} />);
    const input = container.querySelector('input[type="file"]') as HTMLInputElement;
    const file = new File(['x'], 'a.png', { type: 'image/png' });
    fireEvent.change(input, { target: { files: [file] } });
    expect(onFiles).toHaveBeenCalledWith([file]);
  });

  it('passes accept and multiple to the file input', () => {
    const { container } = renderThemed(
      <UploadV4 onFiles={noop} accept="image/*" multiple />
    );
    const input = container.querySelector('input[type="file"]') as HTMLInputElement;
    expect(input.accept).toBe('image/*');
    expect(input.multiple).toBe(true);
  });

  it('opens the picker from the keyboard', () => {
    const { container } = renderThemed(<UploadV4 onFiles={noop} />);
    const input = container.querySelector('input[type="file"]') as HTMLInputElement;
    const click = jest.spyOn(input, 'click');
    fireEvent.keyDown(zoneOf(container), { key: 'Enter' });
    expect(click).toHaveBeenCalled();
  });

  it('spends no depth: a drop target is a hole, not a raised object', () => {
    const { container } = renderThemed(<UploadV4 onFiles={noop} />);
    expect(zoneOf(container).className).not.toContain('shadow');
  });

  it('paints no literal colour', () => {
    const { container } = renderThemed(<UploadV4 onFiles={noop} accept="image/*" />);
    expect(zoneOf(container).outerHTML).not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
  });
});
