import * as React from 'react';
import { fireEvent } from '@testing-library/react-native';
import {
  SEED_LIGHT,
  SEED_DARK,
  renderThemed,
  renderedStyleHexes,
  tokenHexSet,
} from '../spec-support/render-native';
import { compileTheme } from '../../theme/compile';
import { toNativeTokens } from '../../theme/outputs';

import { TicketRow, type Ticket } from './TicketRow';
import { SLABadge } from './SLABadge';
import { CannedResponse } from './CannedResponse';
import { AgentStatus } from './AgentStatus';
import { SatisfactionRating } from './SatisfactionRating';
import { TicketPriority } from './TicketPriority';
import { ConversationPanel, type ConversationMessage } from './ConversationPanel';
import { MacroList, type Macro } from './MacroList';
import { EscalationBanner } from './EscalationBanner';
import { QueueStat } from './QueueStat';
import { ResolutionTimer } from './ResolutionTimer';
import { KBArticleRow } from './KBArticleRow';

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

describe('support/TicketRow (native)', () => {
  it('mounts under both seeds and announces subject + status', () => {
    [SEED_LIGHT, SEED_DARK].forEach((seed) => {
      const { getByLabelText } = renderThemed(<TicketRow ticket={ticket} />, seed);
      expect(getByLabelText(/Cannot log in to dashboard/)).toBeTruthy();
      expect(getByLabelText(/Open/)).toBeTruthy();
    });
  });

  it('fires onPress with the ticket id', () => {
    const onPress = jest.fn();
    const { getByLabelText } = renderThemed(<TicketRow ticket={ticket} onPress={onPress} />, SEED_LIGHT);
    fireEvent.press(getByLabelText(/Cannot log in to dashboard/));
    expect(onPress).toHaveBeenCalledWith('t-1');
  });

  it('renders a loading skeleton without crashing', () => {
    const { getByLabelText } = renderThemed(<TicketRow ticket={ticket} loading />, SEED_LIGHT);
    expect(getByLabelText('Loading ticket')).toBeTruthy();
  });
});

describe('support/SLABadge (native)', () => {
  it('paints a breached badge with the danger token color', () => {
    const dangerHex = toNativeTokens(compileTheme(SEED_LIGHT)).colors.light.danger.toLowerCase();
    const { getByLabelText, root } = renderThemed(<SLABadge state="breached" hint="12m over" />, SEED_LIGHT);
    // State is conveyed by text, not color alone.
    expect(getByLabelText(/SLA Breached, 12m over/)).toBeTruthy();
    // …and the danger token hex actually appears in the rendered styles.
    expect(renderedStyleHexes(root)).toContain(dangerHex);
  });

  it('maps on-track to the success token and at-risk to warn', () => {
    const tokens = toNativeTokens(compileTheme(SEED_LIGHT)).colors.light;
    const onTrack = renderThemed(<SLABadge state="on-track" />, SEED_LIGHT);
    expect(renderedStyleHexes(onTrack.root)).toContain(tokens.success.toLowerCase());
    const atRisk = renderThemed(<SLABadge state="at-risk" />, SEED_LIGHT);
    expect(renderedStyleHexes(atRisk.root)).toContain(tokens.warn.toLowerCase());
  });
});

describe('support/ConversationPanel (native)', () => {
  it('renders an empty ticket conversation with its empty text', () => {
    const { getByText } = renderThemed(
      <ConversationPanel messages={[]} emptyText="No messages yet." />,
      SEED_LIGHT
    );
    expect(getByText('No messages yet.')).toBeTruthy();
  });

  it('fires onReply with the trimmed draft when Reply is pressed', () => {
    const onReply = jest.fn();
    const { getByLabelText, getByText } = renderThemed(
      <ConversationPanel messages={messages} onReply={onReply} />,
      SEED_LIGHT
    );
    fireEvent.changeText(getByLabelText('Reply message'), '  On it, resending now.  ');
    fireEvent.press(getByText('Reply'));
    expect(onReply).toHaveBeenCalledWith('On it, resending now.');
  });

  it('shows a loading state', () => {
    const { getByLabelText } = renderThemed(<ConversationPanel messages={[]} loading />, SEED_DARK);
    expect(getByLabelText('Loading conversation')).toBeTruthy();
  });
});

describe('support/EscalationBanner (native)', () => {
  it('fires onEscalate when the primary action is pressed', () => {
    const onEscalate = jest.fn();
    const { getByText } = renderThemed(
      <EscalationBanner level="critical" title="SLA breach imminent" onEscalate={onEscalate} />,
      SEED_LIGHT
    );
    fireEvent.press(getByText('Escalate'));
    expect(onEscalate).toHaveBeenCalledTimes(1);
  });
});

describe('support/SatisfactionRating (native)', () => {
  it('fires onRate with the 1-based score', () => {
    const onRate = jest.fn();
    const { getByLabelText } = renderThemed(
      <SatisfactionRating variant="stars" onRate={onRate} />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText('Rate 4 of 5'));
    expect(onRate).toHaveBeenCalledWith(4);
  });
});

describe('support/MacroList (native)', () => {
  it('applies an enabled macro but not a disabled one', () => {
    const onApply = jest.fn();
    const { getByLabelText } = renderThemed(<MacroList macros={macros} onApply={onApply} />, SEED_LIGHT);
    fireEvent.press(getByLabelText('Apply macro Close + notify'));
    fireEvent.press(getByLabelText('Apply macro Escalate to tier 2'));
    expect(onApply).toHaveBeenCalledTimes(1);
    expect(onApply.mock.calls[0][0].id).toBe('mac1');
  });

  it('renders an empty list message', () => {
    const { getByText } = renderThemed(<MacroList macros={[]} emptyText="No macros available." />, SEED_LIGHT);
    expect(getByText('No macros available.')).toBeTruthy();
  });
});

describe('support/ResolutionTimer (native)', () => {
  it('derives a breached state when overdue', () => {
    const { getByLabelText } = renderThemed(<ResolutionTimer remainingSeconds={-120} />, SEED_LIGHT);
    expect(getByLabelText(/SLA Breached/)).toBeTruthy();
  });

  it('derives at-risk under the threshold', () => {
    const { getByLabelText } = renderThemed(
      <ResolutionTimer remainingSeconds={300} atRiskThresholdSeconds={900} />,
      SEED_LIGHT
    );
    expect(getByLabelText(/SLA At risk/)).toBeTruthy();
  });
});

describe('support/token purity (both seeds)', () => {
  it('every rendered hex traces to a compiled token', () => {
    [SEED_LIGHT, SEED_DARK].forEach((seed) => {
      const { root } = renderThemed(
        <>
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
        </>,
        seed
      );
      const allowed = tokenHexSet(seed);
      const found = renderedStyleHexes(root);
      expect(found.length).toBeGreaterThan(0);
      found.forEach((hex) => expect(allowed.has(hex)).toBe(true));
    });
  });
});
