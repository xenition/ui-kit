import * as React from 'react';
import { StyleSheet } from 'react-native';
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
import { DealCard } from './DealCard';
import { PipelineBoard, type PipelineStage } from './PipelineBoard';
import { LeadRow } from './LeadRow';
import { WinLossBadge } from './WinLossBadge';
import { QuoteCard } from './QuoteCard';
import { DealForecast } from './DealForecast';
import { TagFilterBar, type FilterTag } from './TagFilterBar';
import { ActivityLogRow } from './ActivityLogRow';
import { NextStepRow } from './NextStepRow';
import { ContactTimeline } from './ContactTimeline';
import { EmailThreadRow } from './EmailThreadRow';
import { ContactCard } from './ContactCard';

const flatten = (style: unknown): Record<string, unknown> =>
  (StyleSheet.flatten(style as never) ?? {}) as Record<string, unknown>;

const lightColors = toNativeTokens(compileTheme(SEED_LIGHT)).colors.light;

describe('DealCard (native)', () => {
  it('mounts with value, stage and outcome, and tones the value as onSurface token', () => {
    const { getByText } = renderThemed(
      <DealCard name="Acme renewal" company="Acme Inc" valueCents={4500000} stage="Negotiation" probability={70} outcome="won" />,
      SEED_LIGHT
    );
    const value = getByText('$45,000.00');
    expect(value).toBeTruthy();
    expect(flatten(value.props.style).color).toBe(lightColors.onSurface);
    // Outcome carried by word, not color alone.
    expect(getByText('✓ Won')).toBeTruthy();
  });

  it('fires onPress', () => {
    const onPress = jest.fn();
    const { getByLabelText } = renderThemed(
      <DealCard name="Beta deal" valueCents={1000} onPress={onPress} />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText('Deal Beta deal'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('renders a loading skeleton with no crash', () => {
    const { getByLabelText } = renderThemed(<DealCard name="X" valueCents={0} loading />, SEED_LIGHT);
    expect(getByLabelText('Loading deal')).toBeTruthy();
  });
});

describe('WinLossBadge (native)', () => {
  it('tones a won inline badge with the success token and a lost one with danger', () => {
    const won = renderThemed(<WinLossBadge outcome="won" variant="inline" />, SEED_LIGHT);
    expect(flatten(won.getByText('Won').props.style).color).toBe(lightColors.success);

    const lost = renderThemed(<WinLossBadge outcome="lost" variant="inline" />, SEED_LIGHT);
    expect(flatten(lost.getByText('Lost').props.style).color).toBe(lightColors.danger);
  });
});

describe('PipelineBoard (native)', () => {
  const stages: PipelineStage[] = [
    { id: 'lead', name: 'Lead', deals: [{ id: 'd1', name: 'Deal One', valueCents: 100000 }] },
    { id: 'won', name: 'Won', deals: [{ id: 'd2', name: 'Deal Two', valueCents: 250000, outcome: 'won' }] },
  ];

  it('renders an empty board placeholder when there are no stages', () => {
    const { getByLabelText } = renderThemed(<PipelineBoard stages={[]} />, SEED_LIGHT);
    expect(getByLabelText('No stages in this pipeline yet')).toBeTruthy();
  });

  it('moves a deal forward via the arrow affordance (interaction)', () => {
    const onMoveDeal = jest.fn();
    const { getByLabelText } = renderThemed(
      <PipelineBoard stages={stages} onMoveDeal={onMoveDeal} />,
      SEED_LIGHT
    );
    // First stage: back is disabled, forward is enabled.
    fireEvent.press(getByLabelText('Move Deal One forward'));
    expect(onMoveDeal).toHaveBeenCalledWith(
      expect.objectContaining({ id: 'd1' }),
      expect.objectContaining({ id: 'lead' }),
      'forward'
    );
  });

  it('does not fire move when the arrow is disabled at a pipeline end', () => {
    const onMoveDeal = jest.fn();
    const { getByLabelText } = renderThemed(
      <PipelineBoard stages={stages} onMoveDeal={onMoveDeal} />,
      SEED_LIGHT
    );
    // Last stage: forward disabled.
    fireEvent.press(getByLabelText('Move Deal Two forward'));
    expect(onMoveDeal).not.toHaveBeenCalled();
  });
});

describe('LeadRow (native)', () => {
  it('shows temperature by glyph + word and tones a hot lead as danger', () => {
    const { getByText } = renderThemed(
      <LeadRow name="Jane Doe" company="Globex" temperature="hot" valueCents={500000} score={88} />,
      SEED_LIGHT
    );
    const label = getByText('Hot');
    expect(label).toBeTruthy();
    expect(flatten(label.props.style).color).toBe(lightColors.danger);
    expect(getByText('🔥')).toBeTruthy();
  });
});

describe('TagFilterBar (native)', () => {
  const tags: FilterTag[] = [
    { key: 'enterprise', label: 'Enterprise', count: 4 },
    { key: 'inbound', label: 'Inbound' },
  ];

  it('toggles a filter chip (interaction)', () => {
    const onToggle = jest.fn();
    const { getByLabelText } = renderThemed(
      <TagFilterBar tags={tags} selected={[]} onToggle={onToggle} />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText('Filter Enterprise'));
    expect(onToggle).toHaveBeenCalledWith('enterprise');
  });

  it('renders an empty placeholder when there are no tags', () => {
    const { getByLabelText } = renderThemed(<TagFilterBar tags={[]} selected={[]} onToggle={jest.fn()} />, SEED_LIGHT);
    expect(getByLabelText('No filters')).toBeTruthy();
  });
});

describe('ActivityLogRow (native)', () => {
  it('logs an activity via onPress (interaction) and labels the kind', () => {
    const onPress = jest.fn();
    const { getByLabelText } = renderThemed(
      <ActivityLogRow kind="call" title="Left a voicemail" actor="Sam" timestamp="2h ago" onPress={onPress} />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText('Call: Left a voicemail'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});

describe('NextStepRow (native)', () => {
  it('toggles completion and surfaces overdue by word', () => {
    const onToggle = jest.fn();
    const { getByLabelText, getByText } = renderThemed(
      <NextStepRow title="Send proposal" dueDate="Yesterday" overdue onToggle={onToggle} />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText('Mark complete: Send proposal'));
    expect(onToggle).toHaveBeenCalledWith(true);
    expect(getByText('⚠ Overdue · Yesterday')).toBeTruthy();
  });
});

describe('QuoteCard / DealForecast / timeline / email / contact (native smoke)', () => {
  it('mounts a quote with its status word', () => {
    const { getByText } = renderThemed(
      <QuoteCard number="Q-1042" company="Acme" totalCents={1299900} status="sent" lineItems={3} />,
      SEED_LIGHT
    );
    expect(getByText('$12,999.00')).toBeTruthy();
    expect(getByText('➤ Sent')).toBeTruthy();
  });

  it('renders a forecast and its empty state', () => {
    const withData = renderThemed(
      <DealForecast periods={[{ label: 'Jan', valueCents: 100000 }, { label: 'Feb', valueCents: 220000 }]} targetCents={200000} />,
      SEED_LIGHT
    );
    expect(withData.getByText('$3,200.00')).toBeTruthy();
    const empty = renderThemed(<DealForecast periods={[]} />, SEED_LIGHT);
    expect(empty.getByText('No forecast data')).toBeTruthy();
  });

  it('renders a contact timeline and its empty state', () => {
    const empty = renderThemed(<ContactTimeline items={[]} />, SEED_LIGHT);
    expect(empty.getByLabelText('No activity yet')).toBeTruthy();
    const filled = renderThemed(
      <ContactTimeline items={[{ id: 'a', kind: 'email', title: 'Sent intro' }]} />,
      SEED_LIGHT
    );
    expect(filled.getByText('Sent intro')).toBeTruthy();
  });

  it('mounts an email thread row and a contact card', () => {
    const email = renderThemed(
      <EmailThreadRow subject="Re: pricing" from="Dana" snippet="Sounds good" unread messageCount={3} />,
      SEED_LIGHT
    );
    expect(email.getByLabelText('Unread, Dana: Re: pricing')).toBeTruthy();

    const contact = renderThemed(
      <ContactCard name="Lee Park" title="VP Sales" company="Initech" tags={['Champion']} />,
      SEED_LIGHT
    );
    expect(contact.getByText('Lee Park')).toBeTruthy();
  });
});

describe('token purity (native crm, both seeds)', () => {
  it('every rendered style hex traces to a compiled token', () => {
    [SEED_LIGHT, SEED_DARK].forEach((seed) => {
      const { root } = renderThemed(
        <>
          <DealCard name="Acme" company="Acme Inc" valueCents={4500000} stage="Negotiation" probability={70} outcome="won" owner={{ name: 'Ada Rae' }} closeDate="Mar 4" />
          <WinLossBadge outcome="lost" />
          <LeadRow name="Jane" company="Globex" temperature="cold" valueCents={5000} score={40} />
          <PipelineBoard
            stages={[
              { id: 's1', name: 'Lead', deals: [{ id: 'd1', name: 'One', valueCents: 100000 }] },
              { id: 's2', name: 'Won', deals: [] },
            ]}
            onMoveDeal={jest.fn()}
          />
          <QuoteCard number="Q-1" totalCents={100000} status="accepted" lineItems={2} actionLabel="Convert" onAction={jest.fn()} />
          <DealForecast periods={[{ label: 'Jan', valueCents: 100000 }]} targetCents={50000} />
          <TagFilterBar tags={[{ key: 'k', label: 'Enterprise', count: 2 }]} selected={['k']} onToggle={jest.fn()} onClear={jest.fn()} />
          <ActivityLogRow kind="meeting" title="Kickoff" actor="Sam" timestamp="1d" />
          <NextStepRow title="Follow up" dueDate="Fri" priority="high" overdue done={false} onToggle={jest.fn()} />
          <ContactTimeline items={[{ id: 'a', kind: 'note', title: 'Note', timestamp: 'now' }]} />
          <EmailThreadRow subject="Hi" from="Dana" unread messageCount={2} hasAttachment />
          <ContactCard name="Lee Park" title="VP" company="Initech" tags={['Champion', 'Exec']} actions={[{ key: 'call', glyph: '📞', label: 'Call', onPress: jest.fn() }]} />
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
