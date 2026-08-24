/** @jest-environment jsdom */
/**
 * Web CRM blocks: render smoke, `--xen-*` token-class assertions (won →
 * `text-success`, lost → `text-danger`, hot lead → `text-danger`), the empty
 * `PipelineBoard`, and the behavioral contracts — moving a deal a stage,
 * toggling a filter chip, logging an activity, and toggling a next-step.
 */
import { fireEvent, render } from '@testing-library/react';
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

describe('WinLossBadge (web)', () => {
  it('tones a won inline badge with text-success and a lost one with text-danger', () => {
    const won = render(<WinLossBadge outcome="won" variant="inline" />);
    expect(won.getByLabelText('Won deal').className).toContain('text-success');

    const lost = render(<WinLossBadge outcome="lost" variant="inline" />);
    expect(lost.getByLabelText('Lost deal').className).toContain('text-danger');
  });
});

describe('DealCard (web)', () => {
  it('mounts with value, stage and outcome (word, not color alone)', () => {
    const { getByText } = render(
      <DealCard name="Acme renewal" company="Acme Inc" valueCents={4500000} stage="Negotiation" probability={70} outcome="won" />
    );
    expect(getByText('$45,000.00')).toBeTruthy();
    expect(getByText('Won')).toBeTruthy();
  });

  it('becomes a keyboard-accessible button when onClick is set', () => {
    const onClick = jest.fn();
    const { getByLabelText } = render(<DealCard name="Beta deal" valueCents={1000} onClick={onClick} />);
    const card = getByLabelText('Deal Beta deal');
    expect(card.getAttribute('role')).toBe('button');
    expect(card.getAttribute('tabindex')).toBe('0');
    fireEvent.keyDown(card, { key: 'Enter' });
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});

describe('PipelineBoard (web)', () => {
  const stages: PipelineStage[] = [
    { id: 'lead', name: 'Lead', deals: [{ id: 'd1', name: 'Deal One', valueCents: 100000 }] },
    { id: 'won', name: 'Won', deals: [{ id: 'd2', name: 'Deal Two', valueCents: 250000, outcome: 'won' }] },
  ];

  it('renders an empty board placeholder when there are no stages', () => {
    const { getByText, getByLabelText } = render(<PipelineBoard stages={[]} />);
    expect(getByText('No stages in this pipeline yet')).toBeTruthy();
    expect(getByLabelText('No stages in this pipeline yet')).toBeTruthy();
  });

  it('moves a deal forward via the arrow affordance (interaction)', () => {
    const onMoveDeal = jest.fn();
    const { getByLabelText } = render(<PipelineBoard stages={stages} onMoveDeal={onMoveDeal} />);
    fireEvent.click(getByLabelText('Move Deal One forward'));
    expect(onMoveDeal).toHaveBeenCalledWith(
      expect.objectContaining({ id: 'd1' }),
      expect.objectContaining({ id: 'lead' }),
      'forward'
    );
  });

  it('does not fire move when the arrow is disabled at a pipeline end', () => {
    const onMoveDeal = jest.fn();
    const { getByLabelText } = render(<PipelineBoard stages={stages} onMoveDeal={onMoveDeal} />);
    const forwardAtEnd = getByLabelText('Move Deal Two forward') as HTMLButtonElement;
    expect(forwardAtEnd.disabled).toBe(true);
    fireEvent.click(forwardAtEnd);
    expect(onMoveDeal).not.toHaveBeenCalled();
  });
});

describe('LeadRow (web)', () => {
  it('shows temperature by glyph + word and tones a hot lead as text-danger', () => {
    const { getByText } = render(<LeadRow name="Jane Doe" company="Globex" temperature="hot" valueCents={500000} score={88} />);
    expect(getByText('🔥')).toBeTruthy();
    const label = getByText('Hot');
    expect(label.parentElement?.className).toContain('text-danger');
  });
});

describe('TagFilterBar (web)', () => {
  const tags: FilterTag[] = [
    { key: 'enterprise', label: 'Enterprise', count: 4 },
    { key: 'inbound', label: 'Inbound' },
  ];

  it('toggles a filter chip (interaction)', () => {
    const onToggle = jest.fn();
    const { getByLabelText } = render(<TagFilterBar tags={tags} selected={[]} onToggle={onToggle} />);
    fireEvent.click(getByLabelText('Filter Enterprise'));
    expect(onToggle).toHaveBeenCalledWith('enterprise');
  });

  it('renders an empty placeholder when there are no tags', () => {
    const { getByText } = render(<TagFilterBar tags={[]} selected={[]} onToggle={jest.fn()} />);
    expect(getByText('No filters')).toBeTruthy();
  });
});

describe('ActivityLogRow (web)', () => {
  it('logs an activity via onClick (interaction) and labels the kind', () => {
    const onClick = jest.fn();
    const { getByLabelText } = render(
      <ActivityLogRow kind="call" title="Left a voicemail" actor="Sam" timestamp="2h ago" onClick={onClick} />
    );
    fireEvent.click(getByLabelText('Call: Left a voicemail'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});

describe('NextStepRow (web)', () => {
  it('toggles completion and surfaces overdue by word', () => {
    const onToggle = jest.fn();
    const { getByLabelText, getByText } = render(<NextStepRow title="Send proposal" dueDate="Yesterday" overdue onToggle={onToggle} />);
    fireEvent.click(getByLabelText('Mark complete: Send proposal'));
    expect(onToggle).toHaveBeenCalledWith(true);
    expect(getByText('⚠ Overdue · Yesterday')).toBeTruthy();
  });
});

describe('QuoteCard / DealForecast / timeline (web smoke)', () => {
  it('mounts a quote with its status word', () => {
    const { getByText } = render(<QuoteCard number="Q-1042" company="Acme" totalCents={1299900} status="sent" lineItems={3} />);
    expect(getByText('$12,999.00')).toBeTruthy();
    expect(getByText('Sent')).toBeTruthy();
  });

  it('renders a forecast total, attainment token class, and its empty state', () => {
    const withData = render(
      <DealForecast periods={[{ label: 'Jan', valueCents: 100000 }, { label: 'Feb', valueCents: 220000 }]} targetCents={200000} />
    );
    expect(withData.getByText('$3,200.00')).toBeTruthy();
    // 320000 / 200000 = 160% → over target reads success.
    expect(withData.getByText('160%').className).toContain('text-success');

    const empty = render(<DealForecast periods={[]} />);
    expect(empty.getByText('No forecast data')).toBeTruthy();
  });

  it('renders a contact timeline and its empty state', () => {
    const empty = render(<ContactTimeline items={[]} />);
    expect(empty.getByLabelText('No activity yet')).toBeTruthy();
    const filled = render(<ContactTimeline items={[{ id: 'a', kind: 'email', title: 'Sent intro' }]} />);
    expect(filled.getByText('Sent intro')).toBeTruthy();
  });
});
