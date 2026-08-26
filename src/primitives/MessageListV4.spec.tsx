/** @jest-environment jsdom */
import * as React from 'react';
import { render } from '@testing-library/react';
import { XenitionUIProvider } from '../provider';
import type { ThemeSeed } from '../theme/types';
import { ChatBubbleV4 } from './ChatBubbleV4';
import type { MessageList } from './MessageList';
import { MessageListV4 } from './MessageListV4';

const seed: ThemeSeed = {
  primary: '#7C3AED',
  neutral: 'cool',
  font: { heading: 'Inter', body: 'Inter' },
  shape: 'rounded',
  mode: 'both',
};

function mount(props: Partial<React.ComponentProps<typeof MessageListV4>> = {}) {
  return render(
    <XenitionUIProvider theme={seed}>
      <MessageListV4 {...props}>
        <ChatBubbleV4 side="them">Morning.</ChatBubbleV4>
        <ChatBubbleV4 side="me">Morning!</ChatBubbleV4>
      </MessageListV4>
    </XenitionUIProvider>
  );
}

const list = (root: HTMLElement): HTMLElement =>
  root.querySelector('[data-xen-v4-message-list]') as HTMLElement;

describe('MessageListV4', () => {
  it('takes exactly the base component’s props', () => {
    const same: React.ComponentProps<typeof MessageList> = {
      className: 'extra',
      children: <span>a message</span>,
      id: 'thread',
    };
    const asV4: React.ComponentProps<typeof MessageListV4> = same;
    expect(asV4).toBe(same);
  });

  it('renders its bubbles', () => {
    const { getByText } = mount();
    expect(getByText('Morning.')).toBeTruthy();
    expect(getByText('Morning!')).toBeTruthy();
  });

  it('spaces turns off the token scale, tighter than the base', () => {
    // The base wrote `gap-3` and `p-4` — neither is a token, and native used a
    // third number for the same idea.
    const el = list(mount().container);
    expect(el.className).toContain('gap-sm');
    expect(el.className).toContain('p-lg');
    expect(el.className).not.toContain('gap-3');
    expect(el.className).not.toContain('p-4');
  });

  it('paints no ground — it is the page the bubbles sit on', () => {
    // A viewport that fills itself with `surface` puts a second surface behind
    // bubbles that are already `surface` (§11, §8).
    const el = list(mount().container);
    expect(el.className).not.toMatch(/\bbg-/);
    expect(el.className).not.toMatch(/\bborder\b/);
    expect(el.className).not.toMatch(/shadow/);
  });

  it('announces new turns, and stops scrolling out of the conversation', () => {
    const el = list(mount().container);
    // The ARIA role for a running transcript.
    expect(el.getAttribute('role')).toBe('log');
    // Chain-scrolling out of a thread while reading it is the kind of motion
    // §36.11 asks components not to introduce.
    expect(el.className).toContain('overscroll-contain');
    expect(el.className).toContain('overflow-y-auto');
  });

  it('survives its empty state: a thread with no messages', () => {
    const { container } = render(
      <XenitionUIProvider theme={seed}>
        <MessageListV4 />
      </XenitionUIProvider>
    );
    expect(list(container)).not.toBeNull();
    expect(list(container).children).toHaveLength(0);
  });

  it('passes a className and other div props through', () => {
    const { container } = mount({ className: 'extra', id: 'thread' });
    expect(list(container).className).toContain('extra');
    expect(list(container).id).toBe('thread');
  });

  it('introduces no literal colours', () => {
    const { container } = mount();
    expect(list(container).getAttribute('style') ?? '').not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
  });
});
