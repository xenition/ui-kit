/** @jest-environment jsdom */
/**
 * Web (React DOM) support module: render smoke, token-class conveyance (SLA /
 * priority / status via `text-danger`/`text-warn`/… never color-alone), the
 * empty ticket-list / empty-conversation states, and the core interactions
 * (reply, escalate, rate, apply-macro, row activation). Rendered without a
 * provider — these assertions are about class names + callbacks, not computed
 * colors — mirroring `primitives/Button.spec.tsx`.
 */
import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';

import { TicketRow, type Ticket } from './TicketRow';
import { SLABadge } from './SLABadge';
import { TicketPriority } from './TicketPriority';
import { CannedResponse } from './CannedResponse';
import { AgentStatus } from './AgentStatus';
import { SatisfactionRating } from './SatisfactionRating';
import { ConversationPanel, type ConversationMessage } from './ConversationPanel';
import { MacroList, type Macro } from './MacroList';
import { EscalationBanner } from './EscalationBanner';
import { QueueStat } from './QueueStat';
import { ResolutionTimer } from './ResolutionTimer';
import { KBArticleRow } from './KBArticleRow';

const HEX_LITERAL = /#[0-9a-fA-F]{3,8}\b/;

const ticket: Ticket = {
  id: 't-1',
  subject: 'Cannot log in to dashboard',
  status: 'open',
  priority: 'urgent',
  requester: 'Ada Lovelace',
  updatedLabel: '2h ago',
  unread: 3,
};

const messages: ConversationMessage[] = [
  { id: 'm1', author: 'customer', body: 'My password reset link is broken.', authorName: 'Ada' },
  { id: 'm2', author: 'agent', body: 'Let me resend that for you.', authorName: 'Sam' },
];

const macros: Macro[] = [
  { id: 'mac1', name: 'Close + notify', description: 'Solve and email the requester', actionCount: 2 },
  { id: 'mac2', name: 'Escalate to tier 2', disabled: true },
];

describe('support/TicketRow (web)', () => {
  it('renders the subject + status and fires onClick with the id', () => {
    const onClick = jest.fn();
    const { getByRole, getByText } = render(<TicketRow ticket={ticket} onClick={onClick} />);
    expect(getByText('Cannot log in to dashboard')).toBeTruthy();
    // status conveyed by text, not color alone
    expect(getByText('Open')).toBeTruthy();
    const row = getByRole('button');
    fireEvent.click(row);
    expect(onClick).toHaveBeenCalledWith('t-1');
    // keyboard activation
    fireEvent.keyDown(row, { key: 'Enter' });
    expect(onClick).toHaveBeenCalledTimes(2);
  });

  it('renders a loading skeleton without crashing', () => {
    const { getByLabelText } = render(<TicketRow ticket={ticket} loading />);
    expect(getByLabelText('Loading ticket')).toBeTruthy();
  });
});

describe('support/SLABadge (web)', () => {
  it('uses text-danger for breached and text-warn for at-risk (text, not color-only)', () => {
    const breached = render(<SLABadge state="breached" hint="12m over" />);
    const badge = breached.getByRole('img', { name: /SLA Breached, 12m over/ });
    expect(badge.className).toContain('text-danger');
    expect(badge.textContent).toContain('Breached');

    const atRisk = render(<SLABadge state="at-risk" />);
    expect(atRisk.getByRole('img', { name: /SLA At risk/ }).className).toContain('text-warn');
  });
});

describe('support/TicketPriority (web)', () => {
  it('maps urgent to text-danger and announces the level', () => {
    const { getByRole } = render(<TicketPriority level="urgent" />);
    const chip = getByRole('img', { name: 'Priority Urgent' });
    expect(chip.className).toContain('text-danger');
  });
});

describe('support/ConversationPanel (web)', () => {
  it('renders an empty ticket conversation via EmptyState', () => {
    const { getByText } = render(<ConversationPanel messages={[]} emptyText="No messages yet." />);
    expect(getByText('No messages yet.')).toBeTruthy();
  });

  it('fires onReply with the trimmed draft when Reply is pressed', () => {
    const onReply = jest.fn();
    const { getByLabelText, getByText } = render(
      <ConversationPanel messages={messages} onReply={onReply} />
    );
    fireEvent.change(getByLabelText('Reply message'), { target: { value: '  On it, resending now.  ' } });
    fireEvent.click(getByText('Reply'));
    expect(onReply).toHaveBeenCalledWith('On it, resending now.');
  });
});

describe('support/MacroList (web)', () => {
  it('renders an empty ticket list via EmptyState', () => {
    const { getByText } = render(<MacroList macros={[]} emptyText="No macros available." />);
    expect(getByText('No macros available.')).toBeTruthy();
  });

  it('applies an enabled macro but not a disabled one', () => {
    const onApply = jest.fn();
    const { getByLabelText } = render(<MacroList macros={macros} onApply={onApply} />);
    fireEvent.click(getByLabelText('Apply macro Close + notify'));
    fireEvent.click(getByLabelText('Apply macro Escalate to tier 2'));
    expect(onApply).toHaveBeenCalledTimes(1);
    expect(onApply.mock.calls[0][0].id).toBe('mac1');
  });
});

describe('support/EscalationBanner (web)', () => {
  it('fires onEscalate when the primary action is pressed', () => {
    const onEscalate = jest.fn();
    const { getByText, getByRole } = render(
      <EscalationBanner level="critical" title="SLA breach imminent" onEscalate={onEscalate} />
    );
    expect(getByRole('alert')).toBeTruthy();
    fireEvent.click(getByText('Escalate'));
    expect(onEscalate).toHaveBeenCalledTimes(1);
  });
});

describe('support/SatisfactionRating (web)', () => {
  it('fires onRate with the 1-based score', () => {
    const onRate = jest.fn();
    const { getByLabelText } = render(<SatisfactionRating variant="stars" onRate={onRate} />);
    fireEvent.click(getByLabelText('Rate 4 of 5'));
    expect(onRate).toHaveBeenCalledWith(4);
  });
});

describe('support/ResolutionTimer (web)', () => {
  it('derives a breached state when overdue', () => {
    const { getByRole } = render(<ResolutionTimer remainingSeconds={-120} />);
    expect(getByRole('img', { name: /SLA Breached/ })).toBeTruthy();
  });

  it('derives at-risk under the threshold', () => {
    const { getByRole } = render(<ResolutionTimer remainingSeconds={300} atRiskThresholdSeconds={900} />);
    expect(getByRole('img', { name: /SLA At risk/ })).toBeTruthy();
  });
});

describe('support/composition (web)', () => {
  it('renders the full support composition and stays free of hex literals in inline styles', () => {
    const { container, getByText } = render(
      <main>
        <TicketRow ticket={ticket} />
        <SLABadge state="breached" hint="12m over" />
        <TicketPriority level="urgent" variant="bars" />
        <AgentStatus presence="online" name="Sam Rivera" detail="3 chats" />
        <CannedResponse response={{ id: 'c1', title: 'Password reset', body: 'Here is how to reset…', shortcut: '/reset' }} />
        <ConversationPanel messages={messages} />
        <MacroList macros={macros} />
        <EscalationBanner level="warning" title="At risk" message="Reply soon" onEscalate={() => {}} onAcknowledge={() => {}} />
        <QueueStat label="Open tickets" value={42} delta={3} tone="primary" glyph="🎫" />
        <ResolutionTimer remainingSeconds={5400} />
        <KBArticleRow article={{ id: 'a1', title: 'Reset your password', category: 'Account', views: 1200, status: 'draft' }} />
        <SatisfactionRating value={4} readOnly />
      </main>
    );
    expect(getByText('Password reset')).toBeTruthy();
    expect(getByText('Draft')).toBeTruthy();
    const inlineStyles = Array.from(container.querySelectorAll<HTMLElement>('[style]'))
      .map((el) => el.getAttribute('style') ?? '')
      .join('\n');
    expect(inlineStyles).not.toMatch(HEX_LITERAL);
  });
});
