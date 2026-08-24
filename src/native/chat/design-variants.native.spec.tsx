import * as React from 'react';
import { fireEvent } from '@testing-library/react-native';
import {
  SEED_LIGHT,
  SEED_DARK,
  renderThemed,
  renderedStyleHexes,
  tokenHexSet,
} from '../spec-support/render-native';
import type { ThemeSeed } from '../theme';
import {
  ConversationRowV2,
  ConversationRowV3,
  ChatHeaderV2,
  ChatHeaderV3,
  MessageComposerV2,
  MessageComposerV3,
  MessageGroupV2,
  MessageGroupV3,
} from './index';

/**
 * Design-variant coverage for the v2/v3 chat blocks. Every variant must (a)
 * mount, (b) stay token-pure under both the light and dark seeds — exactly the
 * "every rendered hex traces to a compiled token" invariant the base chat spec
 * enforces — and (c) keep the base component's interactions wired.
 */

const SEEDS: ThemeSeed[] = [SEED_LIGHT, SEED_DARK];

const assertTokenPure = (
  root: Parameters<typeof renderedStyleHexes>[0],
  seed: ThemeSeed
): void => {
  const allowed = tokenHexSet(seed);
  renderedStyleHexes(root).forEach((hex) => expect(allowed.has(hex)).toBe(true));
};

describe('chat design variants — mount + token purity (both seeds)', () => {
  it.each(SEEDS)('ConversationRowV2 / V3 (%#)', (seed) => {
    const { root: r2 } = renderThemed(
      <ConversationRowV2
        name="Ada Lovelace"
        lastMessage="See you at nine, bring the notes"
        timestamp="09:41"
        presence="online"
        unreadCount={4}
      />,
      seed
    );
    assertTokenPure(r2, seed);

    const { root: r3 } = renderThemed(
      <ConversationRowV3
        name="Grace Hopper"
        typing
        muted
        timestamp="Mon"
        presence="busy"
      />,
      seed
    );
    assertTokenPure(r3, seed);
  });

  it.each(SEEDS)('ChatHeaderV2 / V3 (%#)', (seed) => {
    const actions = [{ id: 'call', glyph: '📞', label: 'Call' }];
    const { root: r2 } = renderThemed(
      <ChatHeaderV2
        title="Ada Lovelace"
        subtitle="Online"
        presence="online"
        onBack={() => {}}
        actions={actions}
      />,
      seed
    );
    assertTokenPure(r2, seed);

    const { root: r3 } = renderThemed(
      <ChatHeaderV3 title="Alan Turing" typing onBack={() => {}} actions={actions} />,
      seed
    );
    assertTokenPure(r3, seed);
  });

  it.each(SEEDS)('MessageComposerV2 / V3 (%#)', (seed) => {
    const { root: r2 } = renderThemed(
      <MessageComposerV2 value="Hello" attachments={[{ id: 'x', name: 'a.jpg', kind: 'image' }]} />,
      seed
    );
    assertTokenPure(r2, seed);

    const { root: r3 } = renderThemed(<MessageComposerV3 value="Hi there" />, seed);
    assertTokenPure(r3, seed);
  });

  it.each(SEEDS)('MessageGroupV2 / V3 (%#)', (seed) => {
    const { root: r2, getByText } = renderThemed(
      <MessageGroupV2
        side="me"
        receipt="read"
        messages={[
          { id: 'm1', text: 'On my way' },
          { id: 'm2', text: 'Two minutes', time: '09:41' },
        ]}
      />,
      seed
    );
    expect(getByText('On my way')).toBeTruthy();
    assertTokenPure(r2, seed);

    const { root: r3 } = renderThemed(
      <MessageGroupV3
        side="them"
        authorName="Ada"
        messages={[{ id: 'm1', text: 'Flat channel row' }]}
      />,
      seed
    );
    assertTokenPure(r3, seed);
  });
});

describe('chat design variants — interactions', () => {
  it('MessageComposerV2 sends the current draft', () => {
    const onSend = jest.fn();
    const { getByLabelText } = renderThemed(
      <MessageComposerV2 value="Ship it" onSend={onSend} />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText('Send message'));
    expect(onSend).toHaveBeenCalledWith('Ship it');
  });

  it('MessageComposerV2 keeps send disabled for a blank draft', () => {
    const onSend = jest.fn();
    const { getByLabelText } = renderThemed(
      <MessageComposerV2 value="   " onSend={onSend} />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText('Send message'));
    expect(onSend).not.toHaveBeenCalled();
  });

  it('ConversationRowV2 reports a press', () => {
    const onPress = jest.fn();
    const { getByLabelText } = renderThemed(
      <ConversationRowV2 name="Alan Turing" lastMessage="Decoded it" unreadCount={3} onPress={onPress} />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText(/Alan Turing/));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
