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
import {
  TicketRowV4,
  AgentStatusV4,
  ConversationPanelV4,
  SatisfactionRatingV4,
  TicketPriorityV4,
  SLABadgeV4,
  ResolutionTimerV4,
  CannedResponseV4,
  MacroListV4,
  KBArticleRowV4,
  EscalationBannerV4,
  QueueStatV4,
  TicketDetailHeader,
  AgentPerformanceCard,
  CSATResultCard,
  QueueOverview,
  MessageBubble,
  ReplyBox,
} from './index';

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

// ── V4 "console" line smoke coverage (web) ──────────────────────────────────
const MACROS = [
  { id: 'mac-close', name: 'Close + notify', description: 'Solve and email the requester', actionCount: 2, glyph: '✅' },
  { id: 'mac-refund', name: 'Issue refund', description: 'Refund + reply', actionCount: 3, glyph: '💸' },
];
const CANNED = {
  id: 'cr-reset',
  title: 'Password reset',
  body: 'Follow this link to reset your password, then try again.',
  shortcut: '/reset',
  category: 'Account',
};
const KB_ARTICLE = {
  id: 'kb-42',
  title: 'Resetting your password',
  category: 'Account',
  views: 1280,
  helpful: 312,
  status: 'published' as const,
  updatedLabel: 'Updated 3d ago',
};

describe('support V4 "console" line (web)', () => {
  it('mounts all 12 V4 variants token-pure', () => {
    const { container, getAllByText } = render(
      <>
        <TicketRowV4 ticket={TICKET} onClick={() => {}} />
        <TicketRowV4 ticket={{ ...TICKET, status: 'solved', priority: 'low', unread: 0 }} />
        <AgentStatusV4 presence="online" name="Sam Rivera" detail="3 chats" onClick={() => {}} />
        <AgentStatusV4 presence="offline" name="Lee" />
        <ConversationPanelV4 messages={MESSAGES} onReply={() => {}} />
        <ConversationPanelV4 messages={[]} loading />
        <SatisfactionRatingV4 variant="faces" onRate={() => {}} label="How did we do?" />
        <SatisfactionRatingV4 value={4} variant="stars" readOnly />
        <TicketPriorityV4 level="urgent" />
        <TicketPriorityV4 level="normal" variant="bars" size="sm" />
        <SLABadgeV4 state="at-risk" hint="12m left" />
        <ResolutionTimerV4 remainingSeconds={600} />
        <CannedResponseV4 response={CANNED} onInsert={() => {}} />
        <MacroListV4 macros={MACROS} onApply={() => {}} />
        <KBArticleRowV4 article={KB_ARTICLE} onClick={() => {}} />
        <EscalationBannerV4 level="critical" title="SLA breach imminent" message="Respond within 15m." onEscalate={() => {}} />
        <QueueStatV4 label="Open tickets" value={42} delta={3} tone="primary" glyph="📥" />
      </>
    );
    // Every V4 surface rendered its subject/labels.
    expect(getAllByText('Cannot log in').length).toBeGreaterThanOrEqual(2);
    // Token purity: no literal hex anywhere in inline styles.
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
  });

  it('TicketRowV4 fires onClick with the id', () => {
    const onClick = jest.fn();
    const { getByText } = render(<TicketRowV4 ticket={TICKET} onClick={onClick} />);
    fireEvent.click(getByText('Cannot log in'));
    expect(onClick).toHaveBeenCalledWith('t1');
  });
});

describe('support V4 new blocks (web)', () => {
  it('mounts all 6 new components token-pure', () => {
    const { container, getByText } = render(
      <>
        <TicketDetailHeader
          subject="Cannot log in"
          ticketId="#4821"
          status="open"
          priority="high"
          requester="Ada Lovelace"
          assignee="Sam Rivera"
          slaLabel="Due in 2h 05m"
          tags={['billing', 'vip']}
          onSolve={() => {}}
          onAssign={() => {}}
        />
        <AgentPerformanceCard
          agentName="Sam Rivera"
          stats={[
            { label: 'Solved', value: '128' },
            { label: 'CSAT', value: '96%' },
            { label: 'Avg reply', value: '4m' },
          ]}
          period="This week"
        />
        <CSATResultCard score={92} responses={148} positive={130} neutral={12} negative={6} />
        <QueueOverview
          title="Today"
          stats={[
            { label: 'Open', value: 42, tone: 'primary', delta: 3 },
            { label: 'Breached SLA', value: 5, tone: 'danger', delta: -2 },
          ]}
        />
        <MessageBubble author="Ada" body="Still cannot log in." side="customer" time="2:14 PM" />
        <MessageBubble author="Sam" body="Looking into it now." side="agent" time="2:15 PM" status="sent" />
        <ReplyBox
          value="Thanks"
          onChangeText={() => {}}
          onSend={() => {}}
          cannedReplies={[{ id: 'greet', label: 'Greeting', body: 'Hi there!' }]}
        />
      </>
    );
    expect(getByText('Cannot log in')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
  });

  it('ReplyBox fires onSend', () => {
    const onSend = jest.fn();
    const { getByLabelText } = render(<ReplyBox value="Refund issued." onChangeText={() => {}} onSend={onSend} />);
    fireEvent.click(getByLabelText('Send'));
    expect(onSend).toHaveBeenCalledTimes(1);
  });

  it('TicketDetailHeader fires onSolve', () => {
    const onSolve = jest.fn();
    const { getByLabelText } = render(
      <TicketDetailHeader subject="Cannot log in" ticketId="#4821" status="open" onSolve={onSolve} />
    );
    fireEvent.click(getByLabelText('Solve'));
    expect(onSolve).toHaveBeenCalledTimes(1);
  });
});
