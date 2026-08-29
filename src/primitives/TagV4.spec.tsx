/** @jest-environment jsdom */
import { fireEvent, render, within } from '@testing-library/react';
import type { ReactElement } from 'react';
import { XenitionUIProvider } from '../provider';
import { resolveIconGlyph } from './icon-names';
import type { ThemeSeed } from '../theme/types';
import type { TagTone } from './Tag';
import { TagV4 } from './TagV4';

const SEED: ThemeSeed = {
  primary: '#7C3AED',
  neutral: 'cool',
  font: { heading: 'Inter', body: 'Inter' },
  shape: 'rounded',
  mode: 'both',
};

function renderThemed(ui: ReactElement) {
  const result = render(<XenitionUIProvider theme={SEED}>{ui}</XenitionUIProvider>);
  return within(result.container);
}

function tag(ui: ReactElement): HTMLElement {
  return renderThemed(ui).getByTestId('tag');
}

const TONES: TagTone[] = ['neutral', 'primary', 'success', 'warn', 'danger', 'accent'];

describe('TagV4 (web)', () => {
  it('makes `solid` actually solid, with the on-pair for that fill', () => {
    const el = tag(
      <TagV4 data-testid="tag" tone="primary">
        Design
      </TagV4>
    );
    // The base tag painted `bg-primary-50 text-primary` here — a soft tint
    // wearing the solid name, and a different tag from its native twin.
    expect(el.className).toContain('bg-primary');
    expect(el.className).toContain('text-on-primary');
    expect(el.className).not.toContain('bg-primary-50');
  });

  it('composites `soft` into `surface`, so every tone gets its own tint', () => {
    const success = tag(
      <TagV4 data-testid="tag" tone="success" variant="soft">
        Live
      </TagV4>
    );
    // The base tag sent success/warn/danger to `bg-neutral-100` "because they
    // have no -50 ramp", which made a soft success and a soft neutral the same
    // chip. `color-mix` needs no ramp step.
    expect(success.className).toContain(
      'bg-[color-mix(in_srgb,var(--xen-success)_14%,var(--xen-surface))]'
    );
    expect(success.className).not.toContain('bg-neutral-100');
    expect(success.className).toContain('text-success-text');
  });

  it('paints `surface` behind `outline` so its label has a known ground', () => {
    const el = tag(
      <TagV4 data-testid="tag" tone="danger" variant="outline">
        Blocked
      </TagV4>
    );
    expect(el.className).toContain('bg-surface');
    expect(el.className).toContain('border-danger');
    // The label is the contrast-safe text form; the ring keeps the vivid slot.
    expect(el.className).toContain('text-danger-text');
  });

  it('labels every tone with a contrast-checked text slot, never a raw fill', () => {
    TONES.forEach((tone) => {
      const el = tag(
        <TagV4 data-testid="tag" tone={tone} variant="soft">
          Label
        </TagV4>
      );
      // `text-danger` is the FILL; `text-danger-text` is the form the compiler
      // walked until it cleared AA on `surface`.
      expect(el.className).toMatch(/text-(on-surface|[a-z]+-text)/);
    });
  });

  it('lays a 44px target over the remove glyph without growing the chip', () => {
    const { getByLabelText } = renderThemed(
      <TagV4 data-testid="tag" onRemove={() => undefined}>
        Design
      </TagV4>
    );
    const button = getByLabelText('Remove');
    // The target is a pseudo-element in the injected sheet, so what the markup
    // has to carry is the hook the sheet keys off.
    expect(button.hasAttribute('data-xen-v4-tag-x')).toBe(true);
    const sheet = document.getElementById('xen-v4-tag-styles');
    expect(sheet?.textContent).toContain('[data-xen-v4-tag-x]::after');
    expect(sheet?.textContent).toContain('width: 44px');
    expect(sheet?.textContent).toContain('height: 44px');
  });

  it('gives the remove control a visible focus ring', () => {
    renderThemed(<TagV4 onRemove={() => undefined}>Design</TagV4>);
    const sheet = document.getElementById('xen-v4-tag-styles');
    expect(sheet?.textContent).toContain('[data-xen-v4-tag-x]:focus-visible');
    expect(sheet?.textContent).toContain('outline: 2px solid currentColor');
  });

  it('shows the remove affordance for `removable` as well as for `onRemove`', () => {
    expect(renderThemed(<TagV4 removable>Design</TagV4>).getByLabelText('Remove')).toBeTruthy();
    expect(renderThemed(<TagV4>Design</TagV4>).queryByLabelText('Remove')).toBeNull();
  });

  it('calls `onRemove` on click, from a real button', () => {
    const onRemove = jest.fn();
    const { getByLabelText } = renderThemed(<TagV4 onRemove={onRemove}>Design</TagV4>);
    const button = getByLabelText('Remove');
    expect(button.tagName).toBe('BUTTON');
    expect(button.getAttribute('type')).toBe('button');
    fireEvent.click(button);
    expect(onRemove).toHaveBeenCalledTimes(1);
  });

  it('takes the remove glyph from the kit’s named icon set', () => {
    const { getByLabelText } = renderThemed(<TagV4 removable>Design</TagV4>);
    expect(getByLabelText('Remove').textContent).toBe(resolveIconGlyph('close'));
  });

  it('keeps the brand corner instead of defaulting to a capsule — §8', () => {
    const el = tag(<TagV4 data-testid="tag">Design</TagV4>);
    expect(el.className).toContain('rounded-[var(--xen-radius-sm)]');
    expect(el.className).not.toContain('rounded-full');
  });

  it('sizes from the spacing scale, never a raw px', () => {
    const md = tag(<TagV4 data-testid="tag">Design</TagV4>);
    const sm = tag(
      <TagV4 data-testid="tag" size="sm">
        Design
      </TagV4>
    );
    expect(md.className).toContain('--xen-space-lg');
    expect(sm.className).toContain('--xen-space-md');
    expect(md.className).not.toMatch(/\bpy-0\.5\b/);
  });

  it('passes DOM props through and keeps the caller’s className', () => {
    const el = tag(
      <TagV4 data-testid="tag" title="Filter" className="shrink-0">
        Design
      </TagV4>
    );
    expect(el.getAttribute('title')).toBe('Filter');
    expect(el.className).toContain('shrink-0');
  });
});
