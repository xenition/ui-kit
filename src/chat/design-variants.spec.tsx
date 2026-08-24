/** @jest-environment jsdom */
/**
 * Web (React DOM) design-variant coverage for the chat v2/v3 blocks. Each
 * variant must (a) render (smoke), (b) stay token-pure — no hex literal in any
 * inline style — and (c) keep the base component's key interaction wired.
 */
import { fireEvent, render } from '@testing-library/react';
import {
  ChatHeaderV2,
  ChatHeaderV3,
  ConversationRowV2,
  ConversationRowV3,
  MessageComposerV2,
  MessageComposerV3,
  MessageGroupV2,
  MessageGroupV3,
} from './index';

const HEX_LITERAL = /#[0-9a-fA-F]{3,8}\b/;

/** Concatenated `style` attributes of every styled node under `root`. */
const inlineStyles = (root: HTMLElement): string =>
  Array.from(root.querySelectorAll<HTMLElement>('[style]'))
    .map((el) => el.getAttribute('style') ?? '')
    .join('\n');

describe('ChatHeader design variants', () => {
  it('V2 fires back + action callbacks and stays token-pure', () => {
    const onBack = jest.fn();
    const onCall = jest.fn();
    const { container, getByLabelText, getByText } = render(
      <ChatHeaderV2
        title="Ada Lovelace"
        subtitle="Online"
        presence="online"
        onBack={onBack}
        actions={[{ id: 'call', glyph: '📞', label: 'Call', onClick: onCall }]}
      />
    );
    expect(getByText('Ada Lovelace')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    fireEvent.click(getByLabelText('Back'));
    fireEvent.click(getByLabelText('Call'));
    expect(onBack).toHaveBeenCalledTimes(1);
    expect(onCall).toHaveBeenCalledTimes(1);
  });

  it('V3 renders a centered typing caption and stays token-pure', () => {
    const { container, getByText } = render(
      <ChatHeaderV3 title="Alan Turing" typing onBack={() => {}} actions={[{ id: 'i', glyph: 'ℹ', label: 'Info' }]} />
    );
    expect(getByText('typing…')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
  });
});

describe('ConversationRow design variants', () => {
  it('V2 shows the unread count, reports a click, and stays token-pure', () => {
    const onClick = jest.fn();
    const { container, getByText, getByLabelText } = render(
      <ConversationRowV2 name="Alan Turing" lastMessage="Decoded it" unreadCount={3} onClick={onClick} />
    );
    expect(getByText('3')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    fireEvent.click(getByLabelText(/Alan Turing/));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('V3 renders a typing state instead of the preview and stays token-pure', () => {
    const { container, getByLabelText } = render(
      <ConversationRowV3 name="Grace Hopper" typing muted timestamp="Mon" presence="busy" />
    );
    expect(getByLabelText(/Grace Hopper, typing/)).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
  });
});

describe('MessageComposer design variants', () => {
  it('V2 sends the current draft and stays token-pure', () => {
    const onSend = jest.fn();
    const { container, getByLabelText } = render(<MessageComposerV2 value="Ship it" onSend={onSend} />);
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    fireEvent.click(getByLabelText('Send message'));
    expect(onSend).toHaveBeenCalledWith('Ship it');
  });

  it('V3 keeps send disabled for a blank draft and stays token-pure', () => {
    const onSend = jest.fn();
    const { container, getByLabelText } = render(<MessageComposerV3 value="   " onSend={onSend} />);
    const send = getByLabelText('Send message') as HTMLButtonElement;
    expect(send.disabled).toBe(true);
    fireEvent.click(send);
    expect(onSend).not.toHaveBeenCalled();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
  });
});

describe('MessageGroup design variants', () => {
  it('V2 renders tailed bubbles with an outgoing receipt and stays token-pure', () => {
    const { container, getByText, getByLabelText } = render(
      <MessageGroupV2
        side="me"
        receipt="read"
        messages={[
          { id: 'm1', text: 'On my way' },
          { id: 'm2', text: 'Two minutes', time: '09:41' },
        ]}
      />
    );
    expect(getByText('On my way')).toBeTruthy();
    expect(getByLabelText('Read')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
  });

  it('V3 renders a flat channel row and stays token-pure', () => {
    const { container, getByText } = render(
      <MessageGroupV3 side="them" authorName="Ada" messages={[{ id: 'm1', text: 'Flat channel row' }]} />
    );
    expect(getByText('Flat channel row')).toBeTruthy();
    expect(getByText('Ada')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
  });
});
