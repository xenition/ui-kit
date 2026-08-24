/** @jest-environment jsdom */
/**
 * Jobs V2/V3 alternate designs (web / React DOM): render smoke, token-class
 * purity (no literal hex leaks into markup), and one key interaction / a11y
 * assertion per variant. Drop-in parity with the base components — same props.
 */
import { fireEvent, render } from '@testing-library/react';
import { ApplicationRowV2 } from './ApplicationRowV2';
import { ApplicationRowV3 } from './ApplicationRowV3';
import { CompanyCardV2 } from './CompanyCardV2';
import { CompanyCardV3 } from './CompanyCardV3';
import { JobCardV2 } from './JobCardV2';
import { JobCardV3 } from './JobCardV3';
import { StatusPipelineV2 } from './StatusPipelineV2';
import { StatusPipelineV3 } from './StatusPipelineV3';
import type { Application, Company, Job } from './types';

const HEX_LITERAL = /#[0-9a-fA-F]{3,8}\b/;

/** Assert no inline hex literal appears anywhere in a subtree's markup. */
function noHex(el: HTMLElement): void {
  expect(el.outerHTML).not.toMatch(HEX_LITERAL);
}

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

describe('JobCard V2/V3', () => {
  it('V2 renders on a token surface with no hex, and fires onApply', () => {
    const onApply = jest.fn();
    const { container, getByText, getByLabelText } = render(
      <JobCardV2 job={JOB} onApply={onApply} />
    );
    expect(getByText('Senior React Engineer')).toBeTruthy();
    const card = container.querySelector('[data-xen-job-card="v2"]') as HTMLElement;
    expect(card.className).toContain('bg-surface');
    noHex(container.firstChild as HTMLElement);
    fireEvent.click(getByLabelText('Apply to this job'));
    expect(onApply).toHaveBeenCalledTimes(1);
  });

  it('V3 renders with a left accent rail, no hex, and collapses overflow skills', () => {
    const { container, getByText } = render(<JobCardV3 job={JOB} maxSkills={2} />);
    expect(getByText('+3')).toBeTruthy();
    const card = container.querySelector('[data-xen-job-card="v3"]') as HTMLElement;
    expect(card.querySelector('.bg-primary')).toBeTruthy();
    noHex(card);
  });
});

describe('CompanyCard V2/V3', () => {
  it('V2 renders a banner card with no hex and toggles follow', () => {
    const onToggleFollow = jest.fn();
    const { container, getByLabelText } = render(
      <CompanyCardV2 company={COMPANY} following={false} onToggleFollow={onToggleFollow} />
    );
    const card = container.querySelector('[data-xen-company-card="v2"]') as HTMLElement;
    expect(card).toBeTruthy();
    noHex(card);
    fireEvent.click(getByLabelText('Follow Acme Corp'));
    expect(onToggleFollow).toHaveBeenCalledTimes(1);
  });

  it('V3 renders a compact row with the open-roles badge and no hex', () => {
    const { container, getByText } = render(<CompanyCardV3 company={COMPANY} />);
    expect(getByText('7 open')).toBeTruthy();
    noHex(container.firstChild as HTMLElement);
  });
});

describe('ApplicationRow V2/V3', () => {
  it('V2 renders the title with the full funnel and no hex', () => {
    const { container, getByText } = render(<ApplicationRowV2 application={APPLICATION} />);
    expect(getByText('Senior React Engineer')).toBeTruthy();
    expect(container.querySelector('[data-xen-status-pipeline="v2"]')).toBeTruthy();
    noHex(container.firstChild as HTMLElement);
  });

  it('V3 states the stage as a word (not color alone) and fires onClick', () => {
    const onClick = jest.fn();
    const { container, getByText, getByRole } = render(
      <ApplicationRowV3 application={APPLICATION} onClick={onClick} />
    );
    expect(getByText('Interview')).toBeTruthy();
    noHex(container.firstChild as HTMLElement);
    fireEvent.click(getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});

describe('StatusPipeline V2/V3', () => {
  it('V2 announces the stage as text and shows the danger word on rejection', () => {
    const { getByLabelText, getByText } = render(<StatusPipelineV2 stage="offer" rejected />);
    expect(getByLabelText('Rejected at stage 4 of 5: Offer')).toBeTruthy();
    expect(getByText('✕ Rejected at Offer')).toBeTruthy();
  });

  it('V3 announces the stage as text with an n-of-total position and no hex', () => {
    const { container, getByLabelText, getByText } = render(<StatusPipelineV3 stage="interview" />);
    expect(getByLabelText('Stage 3 of 5: Interview')).toBeTruthy();
    expect(getByText('3 of 5')).toBeTruthy();
    noHex(container.firstChild as HTMLElement);
  });
});
