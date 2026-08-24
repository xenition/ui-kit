/** @jest-environment jsdom */
/**
 * Jobs components (web / React DOM): render smoke, token-class binding (no
 * literal colors — every surface/text class resolves to a `--xen-*` token), and
 * the behavioral contracts — JobCard apply, JobFilterBar filter toggle,
 * ApplyButton withdraw, StatusPipeline text-not-color a11y, SkillTag matched
 * marker, SalaryRange empty hint, plus an empty state.
 */
import { fireEvent, render } from '@testing-library/react';
import { EmptyState } from '../commerce';
import { JobCard } from './JobCard';
import { CompanyCard } from './CompanyCard';
import { ApplicationRow } from './ApplicationRow';
import { SalaryRange } from './SalaryRange';
import { SkillTag } from './SkillTag';
import { ApplyButton } from './ApplyButton';
import { JobFilterBar } from './JobFilterBar';
import { StatusPipeline } from './StatusPipeline';
import { RecruiterMessage } from './RecruiterMessage';
import type { Application, Company, Job, RecruiterMessagePayload } from './types';

const HEX_LITERAL = /#[0-9a-fA-F]{3,8}\b/;

const JOB: Job = {
  id: 'j1',
  title: 'Senior React Engineer',
  companyName: 'Acme Corp',
  location: 'Remote',
  type: 'full-time',
  salary: { min: 140000, max: 180000, currency: 'USD', period: 'year' },
  skills: ['TypeScript', 'React', 'GraphQL', 'CI/CD', 'Testing'],
  postedAt: '2026-08-20T09:00:00Z',
};

const COMPANY: Company = {
  id: 'c1',
  name: 'Acme Corp',
  industry: 'Software',
  location: 'San Francisco',
  size: '201–500',
  openRoles: 7,
};

const APPLICATION: Application = {
  id: 'a1',
  jobTitle: 'Senior React Engineer',
  companyName: 'Acme Corp',
  stage: 'interview',
  appliedAt: '2026-08-15T09:00:00Z',
};

const MESSAGE: RecruiterMessagePayload = {
  id: 'm1',
  senderName: 'Priya Shah',
  company: 'Acme Corp',
  preview: 'Loved your portfolio — do you have time to chat this week?',
  sentAt: '2026-08-22T12:00:00Z',
  unread: true,
};

describe('JobCard', () => {
  it('renders title, company, and the employment-type badge on a token surface', () => {
    const { container, getByText } = render(<JobCard job={JOB} />);
    expect(getByText('Senior React Engineer')).toBeTruthy();
    expect(getByText('Full-time')).toBeTruthy();
    const card = container.querySelector('[data-xen-job-card]') as HTMLElement;
    expect(card.className).toContain('bg-surface');
    expect(card.className).toContain('border-border');
    // No literal colors leak into the markup.
    expect(card.className).not.toMatch(HEX_LITERAL);
  });

  it('fires onApply when the apply CTA is clicked', () => {
    const onApply = jest.fn();
    const { getByLabelText } = render(<JobCard job={JOB} onApply={onApply} />);
    fireEvent.click(getByLabelText('Apply to this job'));
    expect(onApply).toHaveBeenCalledTimes(1);
    expect(onApply.mock.calls[0][0].id).toBe('j1');
  });

  it('reflects saved state via aria-pressed and fires onSave', () => {
    const onSave = jest.fn();
    const { getByLabelText } = render(<JobCard job={JOB} saved={false} onSave={onSave} />);
    const bookmark = getByLabelText('Save job');
    expect(bookmark.getAttribute('aria-pressed')).toBe('false');
    fireEvent.click(bookmark);
    expect(onSave).toHaveBeenCalledTimes(1);
  });

  it('renders a skeleton in the loading state', () => {
    const { getByLabelText } = render(<JobCard job={JOB} loading />);
    expect(getByLabelText('Loading job')).toBeTruthy();
  });

  it('collapses overflow skills to a +N chip', () => {
    const { getByText } = render(<JobCard job={JOB} maxSkills={2} />);
    expect(getByText('+3')).toBeTruthy();
  });
});

describe('ApplyButton', () => {
  it('withdraws from the applied state (undo) and names the state in the label', () => {
    const onWithdraw = jest.fn();
    const { getByLabelText } = render(<ApplyButton state="applied" onWithdraw={onWithdraw} />);
    fireEvent.click(getByLabelText('Applied — press to withdraw'));
    expect(onWithdraw).toHaveBeenCalledTimes(1);
  });

  it('disables and marks busy while loading', () => {
    const { getByLabelText } = render(<ApplyButton state="apply" loading onApply={jest.fn()} />);
    const btn = getByLabelText('Apply to this job') as HTMLButtonElement;
    expect(btn.disabled).toBe(true);
    expect(btn.getAttribute('aria-busy')).toBe('true');
  });
});

describe('JobFilterBar', () => {
  it('fires onToggleType when a type chip is clicked (filter interaction)', () => {
    const onToggleType = jest.fn();
    const { getByRole } = render(
      <JobFilterBar active={[]} onToggleType={onToggleType} resultCount={12} />
    );
    fireEvent.click(getByRole('button', { name: 'Contract' }));
    expect(onToggleType).toHaveBeenCalledWith('contract');
  });

  it('marks an active chip as pressed with a token background', () => {
    const { getByRole } = render(<JobFilterBar active={['remote']} onToggleType={jest.fn()} />);
    const chip = getByRole('button', { name: 'Remote' });
    expect(chip.getAttribute('aria-pressed')).toBe('true');
    expect(chip.className).toContain('bg-success');
  });
});

describe('SkillTag', () => {
  it('renders the matched ✓ marker so variant is not color-alone', () => {
    const { getByText, container } = render(<SkillTag label="React" variant="matched" />);
    expect(getByText('✓ React')).toBeTruthy();
    expect((container.firstChild as HTMLElement).className).toContain('bg-success');
  });
});

describe('SalaryRange', () => {
  it('formats a bounded range', () => {
    const { container } = render(
      <SalaryRange salary={{ min: 140000, max: 180000, currency: 'USD', period: 'year' }} />
    );
    expect(container.textContent).toMatch(/\/yr$/);
  });

  it('shows the empty hint when nothing is disclosed', () => {
    const { getByText } = render(<SalaryRange salary={{}} />);
    expect(getByText('Salary not disclosed')).toBeTruthy();
  });
});

describe('StatusPipeline', () => {
  it('announces the stage as text (not color alone)', () => {
    const { getByLabelText } = render(<StatusPipeline stage="interview" />);
    expect(getByLabelText('Stage 3 of 5: Interview')).toBeTruthy();
  });

  it('announces rejection in the compact variant', () => {
    const { getByLabelText } = render(
      <StatusPipeline stage="offer" rejected variant="compact" />
    );
    expect(getByLabelText('Rejected at stage 4 of 5: Offer')).toBeTruthy();
  });
});

describe('CompanyCard / ApplicationRow / RecruiterMessage', () => {
  it('CompanyCard toggles follow', () => {
    const onToggleFollow = jest.fn();
    const { getByLabelText } = render(
      <CompanyCard company={COMPANY} following={false} onToggleFollow={onToggleFollow} />
    );
    fireEvent.click(getByLabelText('Follow Acme Corp'));
    expect(onToggleFollow).toHaveBeenCalledTimes(1);
  });

  it('ApplicationRow mounts with the job title', () => {
    const { getByText } = render(<ApplicationRow application={APPLICATION} />);
    expect(getByText('Senior React Engineer')).toBeTruthy();
  });

  it('RecruiterMessage marks unread in the a11y label', () => {
    const { getByLabelText } = render(<RecruiterMessage message={MESSAGE} />);
    expect(getByLabelText(/^Unread\. Message from Priya Shah at Acme Corp/)).toBeTruthy();
  });
});

describe('empty state', () => {
  it('renders a no-jobs empty state', () => {
    const { getByText } = render(
      <EmptyState title="No jobs found" description="Try widening your filters." />
    );
    expect(getByText('No jobs found')).toBeTruthy();
    expect(getByText('Try widening your filters.')).toBeTruthy();
  });
});
