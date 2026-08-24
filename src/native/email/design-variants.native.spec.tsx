import * as React from 'react';
import { fireEvent } from '@testing-library/react-native';
import type { ReactTestInstance } from 'react-test-renderer';
import type { ThemeSeed } from '../../theme/types';
import {
  SEED_LIGHT,
  SEED_DARK,
  renderThemed,
  renderedStyleHexes,
  tokenHexSet,
} from '../spec-support/render-native';
import {
  MessageListRowV2,
  MessageListRowV3,
  EmailThreadV2,
  EmailThreadV3,
  ComposeBarV2,
  ComposeBarV3,
  FolderRowV2,
  FolderRowV3,
  type ThreadMessage,
} from './index';

/** Assert every rendered style hex traces to a token in the given seed's theme. */
const assertTokenPure = (root: ReactTestInstance, seed: ThemeSeed): void => {
  const allowed = tokenHexSet(seed);
  renderedStyleHexes(root).forEach((hex) => expect(allowed.has(hex)).toBe(true));
};

const SEEDS: ReadonlyArray<readonly [string, ThemeSeed]> = [
  ['light seed', SEED_LIGHT],
  ['dark seed', SEED_DARK],
];

const MESSAGES: ThreadMessage[] = [
  { id: 'm1', sender: 'Ada', body: 'First message', timestamp: '09:00' },
  {
    id: 'm2',
    sender: 'Alan',
    body: 'Reply with the attachment',
    timestamp: '09:41',
    attachments: [{ id: 'a1', name: 'notes.pdf', kind: 'pdf', size: '2 MB' }],
  },
];

describe('email design variants (native)', () => {
  describe.each(SEEDS)('token purity — %s', (_name, seed) => {
    it('MessageListRow V2 + V3 render token-pure', () => {
      const v2 = renderThemed(
        <MessageListRowV2
          sender="Ada Lovelace"
          subject="Analytical Engine notes"
          preview="Attached the latest diagrams for review"
          timestamp="09:41"
          unread
          hasAttachments
          threadCount={3}
          labels={[{ id: 'w', label: 'Work', tone: 'primary' }]}
        />,
        seed
      );
      assertTokenPure(v2.root, seed);

      const v3 = renderThemed(
        <MessageListRowV3
          sender="Alan Turing"
          subject="Re: notes"
          preview="Looks good to me"
          timestamp="Tue"
          unread
          starred
          onToggleStar={jest.fn()}
        />,
        seed
      );
      assertTokenPure(v3.root, seed);
    });

    it('EmailThread V2 + V3 render token-pure (with empty thread)', () => {
      const v2 = renderThemed(
        <EmailThreadV2
          subject="Analytical Engine"
          messages={MESSAGES}
          labels={[{ id: 'w', label: 'Work', tone: 'primary' }]}
          expandedIds={['m2']}
        />,
        seed
      );
      assertTokenPure(v2.root, seed);

      const v3 = renderThemed(
        <EmailThreadV3 subject="Analytical Engine" messages={MESSAGES} expandedIds={['m1']} />,
        seed
      );
      assertTokenPure(v3.root, seed);

      // Empty thread state for both.
      const v2empty = renderThemed(<EmailThreadV2 subject="Empty" messages={[]} />, seed);
      expect(v2empty.getByText('No messages')).toBeTruthy();
      assertTokenPure(v2empty.root, seed);

      const v3empty = renderThemed(<EmailThreadV3 subject="Empty" messages={[]} />, seed);
      expect(v3empty.getByText('No messages')).toBeTruthy();
      assertTokenPure(v3empty.root, seed);
    });

    it('ComposeBar V2 + V3 render token-pure', () => {
      const v2 = renderThemed(<ComposeBarV2 to="ada@x.dev" subject="Re" body="Hello" onSend={jest.fn()} />, seed);
      assertTokenPure(v2.root, seed);

      const v3 = renderThemed(<ComposeBarV3 body="Hello" onSend={jest.fn()} />, seed);
      assertTokenPure(v3.root, seed);
    });

    it('FolderRow V2 + V3 render token-pure', () => {
      const v2 = renderThemed(<FolderRowV2 name="Inbox" glyph="📥" count={12} selected />, seed);
      assertTokenPure(v2.root, seed);

      const v3 = renderThemed(<FolderRowV3 name="Drafts" glyph="📝" count={3} depth={2} />, seed);
      assertTokenPure(v3.root, seed);
    });
  });

  describe('interactions', () => {
    it('MessageListRow V2 opens on press and announces unread (not color-alone)', () => {
      const onPress = jest.fn();
      const { getByLabelText } = renderThemed(
        <MessageListRowV2 sender="Ada Lovelace" subject="Notes" unread onPress={onPress} />,
        SEED_LIGHT
      );
      const row = getByLabelText(/Unread, from Ada Lovelace/);
      fireEvent.press(row);
      expect(onPress).toHaveBeenCalledTimes(1);
    });

    it('MessageListRow V3 opens on press', () => {
      const onPress = jest.fn();
      const { getByLabelText } = renderThemed(
        <MessageListRowV3 sender="Alan" subject="Hi" onPress={onPress} />,
        SEED_LIGHT
      );
      fireEvent.press(getByLabelText(/Read, from Alan/));
      expect(onPress).toHaveBeenCalledTimes(1);
    });

    it('EmailThread V2 expands a collapsed message', () => {
      const onToggleMessage = jest.fn();
      const { getByLabelText } = renderThemed(
        <EmailThreadV2 subject="T" messages={MESSAGES} expandedIds={['m2']} onToggleMessage={onToggleMessage} />,
        SEED_LIGHT
      );
      fireEvent.press(getByLabelText('Expand message from Ada'));
      expect(onToggleMessage).toHaveBeenCalledWith('m1');
    });

    it('EmailThread V3 expands a collapsed message', () => {
      const onToggleMessage = jest.fn();
      const { getByLabelText } = renderThemed(
        <EmailThreadV3 subject="T" messages={MESSAGES} expandedIds={['m1']} onToggleMessage={onToggleMessage} />,
        SEED_LIGHT
      );
      fireEvent.press(getByLabelText('Expand message from Alan'));
      expect(onToggleMessage).toHaveBeenCalledWith('m2');
    });

    it('ComposeBar V2 sends an assembled draft', () => {
      const onSend = jest.fn();
      const { getByLabelText } = renderThemed(
        <ComposeBarV2 to="ada@x.dev" subject="Re: notes" body="Sounds good" onSend={onSend} />,
        SEED_LIGHT
      );
      fireEvent.press(getByLabelText('Send email'));
      expect(onSend).toHaveBeenCalledWith({ to: 'ada@x.dev', subject: 'Re: notes', body: 'Sounds good' });
    });

    it('ComposeBar V3 sends and blocks empty sends', () => {
      const onSend = jest.fn();
      const { getByLabelText } = renderThemed(<ComposeBarV3 body="Ping" onSend={onSend} />, SEED_LIGHT);
      fireEvent.press(getByLabelText('Send email'));
      expect(onSend).toHaveBeenCalledWith({ to: undefined, subject: undefined, body: 'Ping' });

      const blocked = jest.fn();
      const { getByLabelText: getByLabel2 } = renderThemed(
        <ComposeBarV3 body="   " onSend={blocked} />,
        SEED_LIGHT
      );
      fireEvent.press(getByLabel2('Send email'));
      expect(blocked).not.toHaveBeenCalled();
    });

    it('FolderRow V2 + V3 report selection and fire onPress', () => {
      const onPressV2 = jest.fn();
      const { getByLabelText } = renderThemed(
        <FolderRowV2 name="Inbox" glyph="📥" count={12} selected onPress={onPressV2} />,
        SEED_LIGHT
      );
      fireEvent.press(getByLabelText('Inbox, 12 unread'));
      expect(onPressV2).toHaveBeenCalledTimes(1);

      const onPressV3 = jest.fn();
      const { getByLabelText: getByLabel3 } = renderThemed(
        <FolderRowV3 name="Sent" glyph="📤" onPress={onPressV3} />,
        SEED_LIGHT
      );
      fireEvent.press(getByLabel3('Sent'));
      expect(onPressV3).toHaveBeenCalledTimes(1);
    });
  });
});
