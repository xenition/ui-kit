/** @jest-environment jsdom */
import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { XenitionUIProvider } from '../provider';
import type { ThemeSeed } from '../theme/types';
import type { Modal } from './Modal';
import { ModalV4 } from './ModalV4';
import { scrimCss } from './internal/surface-v4';

const seed: ThemeSeed = {
  primary: '#7C3AED',
  neutral: 'cool',
  font: { heading: 'Inter', body: 'Inter' },
  shape: 'rounded',
  mode: 'both',
};

function open(
  props: Partial<React.ComponentProps<typeof ModalV4>> = {},
  depth?: ThemeSeed['depth']
) {
  return render(
    <XenitionUIProvider theme={{ ...seed, depth }}>
      <ModalV4 open onClose={() => {}} title="Delete file" {...props}>
        <p>dialog body</p>
      </ModalV4>
    </XenitionUIProvider>
  );
}

/* The LAST match: a test that opens twice leaves two portals in the body. */
const last = (sel: string): HTMLElement => {
  const all = document.querySelectorAll(sel);
  return all[all.length - 1] as HTMLElement;
};
const panel = (): HTMLElement => last('[data-xen-v4-dialog]');
const scrim = (): HTMLElement => last('[data-xen-v4-scrim]');
const v4css = (): string => document.getElementById('xen-surface-v4-styles')?.textContent ?? '';

describe('ModalV4', () => {
  it('takes exactly the base component’s props', () => {
    const same: React.ComponentProps<typeof Modal> = {
      open: true,
      onClose: () => {},
      title: 'Delete file',
      className: 'extra',
    };
    const asV4: React.ComponentProps<typeof ModalV4> = same;
    expect(asV4).toBe(same);
  });

  it('renders nothing until open, then portals to the body', () => {
    const closed = render(
      <XenitionUIProvider theme={seed}>
        <ModalV4 open={false} onClose={() => {}}>
          <p>dialog body</p>
        </ModalV4>
      </XenitionUIProvider>
    );
    expect(closed.queryByText('dialog body')).toBeNull();

    const { getByText } = open();
    expect(getByText('Delete file')).toBeTruthy();
    // Portalled, so an ancestor with overflow:hidden or a transform cannot clip
    // it — which the base Modal, rendered in place, can be.
    expect(panel().parentElement!.parentElement).toBe(document.body);
  });

  it('floats on the sheet elevation — a halo, not a drop shadow', () => {
    open();
    expect(panel().getAttribute('data-xen-v4-panel')).toBe('solid');
    expect(v4css()).toContain('box-shadow: var(--xen-elevation-sheet);');
    expect(panel().className).not.toContain('shadow-xl');
  });

  it('scrims from the shadow colour, which does not invert with the scheme', () => {
    open();
    expect(v4css()).toContain(scrimCss());
    expect(scrimCss()).toContain('--xen-elevation-color');
    expect(scrim().className).not.toContain('neutral-950');
  });

  it('turns translucent only when the seed asks for glass', () => {
    open({}, 'soft');
    expect(panel().getAttribute('data-xen-v4-panel')).toBe('solid');
    open({}, 'glass');
    expect(panel().getAttribute('data-xen-v4-panel')).toBe('glass');
    open({}, 'flat');
    expect(panel().getAttribute('data-xen-v4-panel')).toBe('solid');
  });

  it('gives the caller a header and a body without asking them to pad either', () => {
    const { getByText } = open();
    const header = getByText('Delete file').parentElement!;
    expect(header.className).toContain('px-lg');
    expect(header.className).toContain('border-b');
    expect(header.className).toContain('shrink-0');

    const body = getByText('dialog body').parentElement!;
    expect(body.className).toContain('p-lg');
    // The body scrolls; the header stays put. A long dialog must not push its
    // own title off the screen.
    expect(body.className).toContain('overflow-auto');
    expect(panel().className).toContain('max-h-[80vh]');
  });

  it('renders without a header when no title is given, and still pads its body', () => {
    const { getByText, container } = render(
      <XenitionUIProvider theme={seed}>
        <ModalV4 open onClose={() => {}}>
          <p>dialog body</p>
        </ModalV4>
      </XenitionUIProvider>
    );
    expect(container.querySelector('h2')).toBeNull();
    expect(getByText('dialog body').parentElement!.className).toContain('p-lg');
  });

  it('closes on the scrim and on Escape', () => {
    const onClose = jest.fn();
    open({ onClose });
    fireEvent.click(scrim());
    expect(onClose).toHaveBeenCalledTimes(1);
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).toHaveBeenCalledTimes(2);
  });

  it('scales in slightly rather than travelling — it did not come from anywhere', () => {
    open();
    const css = v4css();
    expect(css).toContain('@keyframes xen-v4-dialog-in');
    const frames = css.slice(css.indexOf('@keyframes xen-v4-dialog-in'));
    expect(frames.slice(0, frames.indexOf('}\n'))).toContain('scale(0.96)');
    // …and under reduced motion, not even that.
    const reduced = css.slice(css.indexOf('@media (prefers-reduced-motion'));
    expect(reduced).toContain('xen-v4-fade-in');
    expect(reduced).not.toContain('xen-v4-dialog-in ');
  });

  it('introduces no literal colours', () => {
    open({}, 'glass');
    expect(v4css()).not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
    for (const el of [panel(), scrim()]) {
      expect(el.getAttribute('style') ?? '').not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
    }
  });
});
