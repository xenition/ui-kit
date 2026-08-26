/** @jest-environment jsdom */
import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { XenitionUIProvider } from '../provider';
import type { ThemeSeed } from '../theme/types';
import { Button } from './Button';
import type { Popconfirm } from './Popconfirm';
import { PopconfirmV4 } from './PopconfirmV4';
import { CHROME_V4_STYLE_ID } from './internal/chrome-v4';

const seed: ThemeSeed = {
  primary: '#7C3AED',
  neutral: 'cool',
  font: { heading: 'Inter', body: 'Inter' },
  shape: 'rounded',
  mode: 'both',
};

function mount(
  props: Partial<React.ComponentProps<typeof PopconfirmV4>> = {},
  depth?: ThemeSeed['depth']
) {
  return render(
    <XenitionUIProvider theme={{ ...seed, depth }}>
      <PopconfirmV4
        // A real kit `<Button>`, not a bare `<span>`. The bare element is
        // exactly what hid the original responder bug on the native twin.
        trigger={<Button>Delete</Button>}
        message="This cannot be undone."
        onConfirm={() => {}}
        {...props}
      />
    </XenitionUIProvider>
  );
}

const panel = (): HTMLElement | null => document.querySelector('[data-xen-v4-nav-panel]');
const navCss = (): string => document.getElementById('xen-v4-nav-styles')?.textContent ?? '';
const chromeCss = (): string => document.getElementById(CHROME_V4_STYLE_ID)?.textContent ?? '';

describe('PopconfirmV4', () => {
  it('takes exactly the base component’s props', () => {
    const same: React.ComponentProps<typeof Popconfirm> = {
      trigger: <Button>Delete</Button>,
      message: 'This cannot be undone.',
      onConfirm: () => {},
      confirmLabel: 'Delete',
      cancelLabel: 'Keep',
    };
    const asV4: React.ComponentProps<typeof PopconfirmV4> = same;
    expect(asV4).toBe(same);
  });

  it('opens from a real kit Button trigger and confirms through it', () => {
    const onConfirm = jest.fn();
    const { getByText } = mount({ onConfirm });
    expect(panel()).toBeNull();

    fireEvent.click(getByText('Delete'));
    expect(panel()).not.toBeNull();
    expect(getByText('This cannot be undone.')).toBeTruthy();

    fireEvent.click(getByText('Confirm'));
    expect(onConfirm).toHaveBeenCalledTimes(1);
    expect(panel()).toBeNull();
  });

  it('does not open from a DISABLED trigger — the trigger is the button', () => {
    // The reason the base clones the trigger instead of wrapping it: a wrapper
    // opens the dialog on a control the user was told was dead.
    const { getByText } = mount({ trigger: <Button disabled>Delete</Button> });
    fireEvent.click(getByText('Delete'));
    expect(panel()).toBeNull();
  });

  it('still runs whatever the trigger already did on click', () => {
    const onClick = jest.fn();
    const { getByText } = mount({ trigger: <Button onClick={onClick}>Delete</Button> });
    fireEvent.click(getByText('Delete'));
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(panel()).not.toBeNull();
  });

  it('falls back to a wrapper for a trigger that cannot take an onClick', () => {
    const { getByText } = mount({ trigger: 'Delete' });
    fireEvent.click(getByText('Delete'));
    expect(panel()).not.toBeNull();
  });

  it('floats on the shared V4 panel skin, not a fixed Tailwind shadow', () => {
    const { getByText } = mount();
    fireEvent.click(getByText('Delete'));
    expect(panel()!.getAttribute('data-xen-v4-nav-panel')).toBe('solid');
    expect(navCss()).toContain('box-shadow: var(--xen-elevation-sheet);');
    expect(panel()!.className).not.toContain('shadow-lg');
  });

  it('turns translucent only when the seed asks for glass', () => {
    const glass = mount({}, 'glass');
    fireEvent.click(glass.getByText('Delete'));
    expect(panel()!.getAttribute('data-xen-v4-nav-panel')).toBe('glass');
  });

  it('makes the destructive button the only coloured thing, in its PAIRED ink', () => {
    const { getByText } = mount();
    fireEvent.click(getByText('Delete'));
    const confirm = getByText('Confirm');
    expect(confirm.className).toContain('bg-danger');
    // `on-danger`, not `on-primary` — the base made a contrast promise against
    // a colour it was not painting on.
    expect(confirm.className).toContain('text-on-danger');
    expect(confirm.className).not.toContain('on-primary');

    const cancel = getByText('Cancel');
    expect(cancel.className).not.toMatch(/bg-(primary|danger|accent)/);
    // `muted-text`, which carries an AA promise; `muted` does not.
    expect(cancel.className).toContain('text-muted-text');
  });

  it('gives both choices a real tap target', () => {
    const { getByText } = mount();
    fireEvent.click(getByText('Delete'));
    for (const label of ['Cancel', 'Confirm']) {
      expect(getByText(label).className).toContain(
        'min-h-[calc(var(--xen-space-2xl)_-_var(--xen-space-xs))]'
      );
    }
  });

  it('lands focus on the safe choice', () => {
    const { getByText } = mount();
    fireEvent.click(getByText('Delete'));
    expect(document.activeElement).toBe(getByText('Cancel'));
  });

  it('layers press feedback from the M3 scale, never from a ramp step', () => {
    const { getByText } = mount();
    fireEvent.click(getByText('Delete'));
    const css = chromeCss();
    expect(css).toContain('[data-xen-v4-chrome="filled-danger"]:hover');
    expect(css).toContain('var(--xen-on-danger) 8%, var(--xen-danger)');
    expect(css).not.toContain('--xen-neutral-');
  });

  it('closes on Escape and on an outside click', () => {
    const { getByText } = mount();
    fireEvent.click(getByText('Delete'));
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(panel()).toBeNull();

    fireEvent.click(getByText('Delete'));
    fireEvent.mouseDown(document.body);
    expect(panel()).toBeNull();
  });

  it('introduces no literal colours', () => {
    const { getByText } = mount({}, 'glass');
    fireEvent.click(getByText('Delete'));
    expect(chromeCss()).not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
    expect(panel()!.getAttribute('style') ?? '').not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
  });
});
