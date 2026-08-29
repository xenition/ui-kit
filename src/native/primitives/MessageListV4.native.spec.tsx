import * as React from 'react';
import { ScrollView } from 'react-native';
import type { ReactTestInstance } from 'react-test-renderer';
import { SEED_LIGHT, renderThemed } from '../spec-support/render-native';
import { flatStyle } from '../spec-support/surface-v4';
import { compileTheme } from '../../theme/compile';
import { ChatBubbleV4 } from './ChatBubbleV4';
import type { MessageListProps } from './MessageList';
import { MessageListV4 } from './MessageListV4';

function mount(props: Partial<MessageListProps> = {}) {
  return renderThemed(
    <MessageListV4 {...props}>
      <ChatBubbleV4 side="them">Morning.</ChatBubbleV4>
      <ChatBubbleV4 side="me">Morning!</ChatBubbleV4>
    </MessageListV4>,
    SEED_LIGHT
  );
}

function scrollOf(root: ReactTestInstance): ReactTestInstance {
  return root.findAllByType(ScrollView)[0]!;
}

describe('MessageListV4 (native)', () => {
  it('takes exactly the base component’s props', () => {
    const same: MessageListProps = {
      children: <ChatBubbleV4>a message</ChatBubbleV4>,
      testID: 'thread',
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
    // The base used `spacing.md` here and `gap-3` on the web — two different
    // numbers for the same idea, and one of them not a token at all.
    const theme = compileTheme(SEED_LIGHT);
    const content = flatStyle(scrollOf(mount().UNSAFE_root).props.contentContainerStyle);
    expect(content.gap).toBe(theme.spacing.sm);
    expect(content.padding).toBe(theme.spacing.lg);
    expect(content.gap).not.toBe(theme.spacing.md);
  });

  it('paints no ground — it is the page the bubbles sit on', () => {
    // A viewport that fills itself with `surface` puts a second surface behind
    // bubbles that are already `surface` (§11, §8).
    const scroll = scrollOf(mount().UNSAFE_root);
    expect(flatStyle(scroll.props.style).backgroundColor).toBeUndefined();
    expect(flatStyle(scroll.props.contentContainerStyle).backgroundColor).toBeUndefined();
  });

  it('lets a tap reach the message it landed on', () => {
    // Without this the first tap while the keyboard is up is spent dismissing
    // it, and the link or retry the user actually pressed needs a second tap
    // most people never make (§31).
    expect(scrollOf(mount().UNSAFE_root).props.keyboardShouldPersistTaps).toBe('handled');
  });

  it('survives its empty state: a thread with no messages', () => {
    const { toJSON } = renderThemed(<MessageListV4 />, SEED_LIGHT);
    expect(toJSON()).toBeTruthy();
  });

  it('merges a caller’s styles rather than replacing its own', () => {
    const theme = compileTheme(SEED_LIGHT);
    const { UNSAFE_root } = mount({ contentContainerStyle: { paddingBottom: 99 } });
    const content = flatStyle(scrollOf(UNSAFE_root).props.contentContainerStyle);
    expect(content.paddingBottom).toBe(99);
    expect(content.gap).toBe(theme.spacing.sm);
  });
});
