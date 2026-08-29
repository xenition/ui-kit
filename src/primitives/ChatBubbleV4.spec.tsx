/** @jest-environment jsdom */
import * as React from 'react';
import { render } from '@testing-library/react';
import { XenitionUIProvider } from '../provider';
import { compileTheme, MIN_CONTRAST } from '../theme/compile';
import { contrastRatio } from '../theme/color';
import type { ThemeSeed } from '../theme/types';
import type { ChatBubble } from './ChatBubble';
import { ChatBubbleV4 } from './ChatBubbleV4';

const seed: ThemeSeed = {
  primary: '#7C3AED',
  neutral: 'cool',
  font: { heading: 'Inter', body: 'Inter' },
  shape: 'rounded',
  mode: 'both',
};

function mount(props: Partial<React.ComponentProps<typeof ChatBubbleV4>> = {}) {
  return render(
    <XenitionUIProvider theme={seed}>
      <ChatBubbleV4 meta="Ada · 09:14" {...props}>
        Shipping tonight.
      </ChatBubbleV4>
    </XenitionUIProvider>
  );
}

const bubble = (root: HTMLElement): HTMLElement =>
  root.querySelector('[data-xen-v4-chat-bubble]')!.lastElementChild as HTMLElement;

describe('ChatBubbleV4', () => {
  it('takes exactly the base component’s props', () => {
    const same: React.ComponentProps<typeof ChatBubble> = {
      side: 'me',
      meta: 'Ada · 09:14',
      children: 'Shipping tonight.',
      className: 'extra',
    };
    const asV4: React.ComponentProps<typeof ChatBubbleV4> = same;
    expect(asV4).toBe(same);
  });

  it('spends only compiler-guaranteed pairs, in both directions', () => {
    // The bug: the base fills the received bubble with `bg-neutral-100`, a
    // LIGHT-oriented ramp step, and inks it with `on-surface` — which in dark
    // mode is near-white text on a near-white bubble.
    const them = bubble(mount().container);
    expect(them.className).not.toContain('neutral-100');
    expect(them.className).toContain('bg-surface');
    expect(them.className).toContain('text-on-surface');
    expect(them.className).toContain('border-border');

    const me = bubble(mount({ side: 'me' }).container);
    expect(me.className).toContain('bg-primary');
    expect(me.className).toContain('text-on-primary');
  });

  it('both pairs clear AA in BOTH schemes', () => {
    const theme = compileTheme(seed);
    for (const scheme of [theme.light, theme.dark]) {
      expect(contrastRatio(scheme.onPrimary, scheme.primary)).toBeGreaterThanOrEqual(
        MIN_CONTRAST
      );
      expect(contrastRatio(scheme.onSurface, scheme.surface)).toBeGreaterThanOrEqual(
        MIN_CONTRAST
      );
    }
  });

  it('says direction three ways: alignment, fill and one tightened corner', () => {
    const them = mount().container.querySelector('[data-xen-v4-chat-bubble]')!;
    expect(them.className).toContain('items-start');
    expect(bubble(them.parentElement as HTMLElement).className).toContain(
      'rounded-bl-[var(--xen-radius-sm)]'
    );

    const meRoot = mount({ side: 'me' }).container;
    expect(meRoot.querySelector('[data-xen-v4-chat-bubble]')!.className).toContain('items-end');
    expect(bubble(meRoot).className).toContain('rounded-br-[var(--xen-radius-sm)]');
  });

  it('pads and sizes off the scale, not off literals', () => {
    const el = bubble(mount().container);
    // The base wrote `px-3.5 py-2`, which no seed can re-scale.
    expect(el.className).toContain('px-md');
    expect(el.className).toContain('py-sm');
    // The two base twins disagreed — `text-sm` on the web, `base` on native.
    expect(el.className).toContain('text-base');
    expect(el.className).toContain('max-w-[75%]');
  });

  it('writes the meta line in the AA-promising muted slot', () => {
    const { getByText } = mount();
    expect(getByText('Ada · 09:14').className).toContain('text-muted-text');
    expect(getByText('Ada · 09:14').className).not.toMatch(/text-muted(?!-text)/);
  });

  it('survives its empty state: no meta at all', () => {
    const { container } = mount({ meta: undefined });
    expect(container.querySelector('[data-xen-v4-chat-bubble]')!.children).toHaveLength(1);
  });

  it('introduces no literal colours', () => {
    const { container } = mount({ side: 'me' });
    for (const el of Array.from(container.querySelectorAll('*'))) {
      expect(el.getAttribute('style') ?? '').not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
    }
  });
});
