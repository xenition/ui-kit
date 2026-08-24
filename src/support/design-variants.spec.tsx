/** @jest-environment jsdom */
/**
 * Alternate support designs (v2 / v3) for the web (React DOM) — drop-in redesigns
 * of AgentStatus, ConversationPanel, SatisfactionRating, TicketRow. Each variant
 * keeps the base props; these specs prove they (a) mount, (b) stay token-pure (no
 * literal hex in inline styles), and (c) honor a key interaction/state.
 */
import { fireEvent, render } from '@testing-library/react';
import { AgentStatusV2 } from './AgentStatusV2';
import { AgentStatusV3 } from './AgentStatusV3';
import { ConversationPanelV2 } from './ConversationPanelV2';
import { ConversationPanelV3 } from './ConversationPanelV3';
import { SatisfactionRatingV2 } from './SatisfactionRatingV2';
import { SatisfactionRatingV3 } from './SatisfactionRatingV3';
import { TicketRowV2 } from './TicketRowV2';
import { TicketRowV3 } from './TicketRowV3';

const HEX_LITERAL = /#[0-9a-fA-F]{3,8}\b/;
const inlineStyles = (root: HTMLElement): string =>
  Array.from(root.querySelectorAll<HTMLElement>('[style]'))
    .map((el) => el.getAttribute('style') ?? '')
    .join('\n');

const MESSAGES = [
  { id: 'm1', author: 'customer' as const, body: 'Help please', authorName: 'Ada', timeLabel: '09:40' },
  { id: 'm2', author: 'agent' as const, body: 'On it', authorName: 'Sam', timeLabel: '09:41' },
];
const TICKET = { id: 't1', subject: 'Cannot log in', status: 'open' as const, priority: 'high' as const, requester: 'Ada', updatedLabel: '2h ago', unread: 3 };

describe('AgentStatus alternates (web)', () => {
  it('V2 fires onClick', () => {
    const onClick = jest.fn();
    const { getByText, container } = render(<AgentStatusV2 presence="online" name="Sam" detail="3 chats" onClick={onClick} />);
    expect(getByText('Sam')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    fireEvent.click(getByText('Sam'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
  it('V3 renders an inline tag', () => {
    const { getByText, container } = render(<AgentStatusV3 presence="away" name="Lee" />);
    expect(getByText('Lee')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
  });
});

describe('ConversationPanel alternates (web)', () => {
  it('V2 sends a reply', () => {
    const onReply = jest.fn();
    const { getByLabelText, getByText, container } = render(<ConversationPanelV2 messages={MESSAGES} onReply={onReply} />);
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    fireEvent.change(getByLabelText('Reply'), { target: { value: 'Thanks' } });
    fireEvent.click(getByText('Reply'));
    expect(onReply).toHaveBeenCalledWith('Thanks');
  });
  it('V3 sends a reply', () => {
    const onReply = jest.fn();
    const { getByLabelText, getByText, container } = render(<ConversationPanelV3 messages={MESSAGES} onReply={onReply} />);
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    fireEvent.change(getByLabelText('Reply'), { target: { value: 'Done' } });
    fireEvent.click(getByText('Reply'));
    expect(onReply).toHaveBeenCalledWith('Done');
  });
});

describe('SatisfactionRating alternates (web)', () => {
  it('V2 emits the score', () => {
    const onRate = jest.fn();
    const { getByLabelText, container } = render(<SatisfactionRatingV2 variant="faces" onRate={onRate} label="How did we do?" />);
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    fireEvent.click(getByLabelText('Rate 5'));
    expect(onRate).toHaveBeenCalledWith(5);
  });
  it('V3 emits the score', () => {
    const onRate = jest.fn();
    const { getByLabelText, container } = render(<SatisfactionRatingV3 variant="stars" onRate={onRate} />);
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    fireEvent.click(getByLabelText('Rate 4'));
    expect(onRate).toHaveBeenCalledWith(4);
  });
});

describe('TicketRow alternates (web)', () => {
  it('V2 fires onClick with the id', () => {
    const onClick = jest.fn();
    const { getByText, container } = render(<TicketRowV2 ticket={TICKET} onClick={onClick} />);
    expect(getByText('Cannot log in')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    fireEvent.click(getByText('Cannot log in'));
    expect(onClick).toHaveBeenCalledWith('t1');
  });
  it('V3 fires onClick with the id', () => {
    const onClick = jest.fn();
    const { getByText, container } = render(<TicketRowV3 ticket={TICKET} onClick={onClick} />);
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    fireEvent.click(getByText('Cannot log in'));
    expect(onClick).toHaveBeenCalledWith('t1');
  });
});
