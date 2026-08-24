import * as React from 'react';
import { fireEvent } from '@testing-library/react-native';
import {
  SEED_LIGHT,
  SEED_DARK,
  renderThemed,
  renderedStyleHexes,
  tokenHexSet,
} from '../spec-support/render-native';
import { JobCard } from './JobCard';
import { CompanyCard } from './CompanyCard';
import { ApplicationRow } from './ApplicationRow';
import { SalaryRange } from './SalaryRange';
import { ApplyButton } from './ApplyButton';
import { JobFilterBar } from './JobFilterBar';
import { InterviewSlot } from './InterviewSlot';
import { StatusPipeline } from './StatusPipeline';
import { SavedJobRow } from './SavedJobRow';
import { RecruiterMessage } from './RecruiterMessage';
import type { Application, Company, Interview, Job, RecruiterMessagePayload } from './types';

const JOB: Job = {
  id: 'j1',
  title: 'Senior React Native Engineer',
  companyName: 'Acme Corp',
  location: 'Remote',
  type: 'full-time',
  salary: { min: 140000, max: 180000, currency: 'USD', period: 'year' },
  skills: ['TypeScript', 'React Native', 'GraphQL', 'CI/CD', 'Testing'],
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
  jobTitle: 'Senior React Native Engineer',
  companyName: 'Acme Corp',
  stage: 'interview',
  appliedAt: '2026-08-15T09:00:00Z',
};

const INTERVIEW: Interview = {
  id: 'i1',
  startsAt: '2026-08-28T15:00:00Z',
  endsAt: '2026-08-28T15:45:00Z',
  mode: 'video',
  interviewer: 'Dana Lee',
};

const MESSAGE: RecruiterMessagePayload = {
  id: 'm1',
  senderName: 'Priya Shah',
  company: 'Acme Corp',
  preview: 'Loved your portfolio — do you have time to chat this week?',
  sentAt: '2026-08-22T12:00:00Z',
  unread: true,
};

describe('JobCard (native)', () => {
  it('mounts with title, company, and the employment-type variant badge', () => {
    const { getByText } = renderThemed(<JobCard job={JOB} />, SEED_LIGHT);
    expect(getByText('Senior React Native Engineer')).toBeTruthy();
    expect(getByText('Full-time')).toBeTruthy();
  });

  it('fires onApply when the apply CTA is pressed', () => {
    const onApply = jest.fn();
    const { getByLabelText } = renderThemed(<JobCard job={JOB} onApply={onApply} />, SEED_LIGHT);
    fireEvent.press(getByLabelText('Apply to this job'));
    expect(onApply).toHaveBeenCalledTimes(1);
    expect(onApply.mock.calls[0][0].id).toBe('j1');
  });

  it('fires onSave (bookmark) and reflects saved state via a11y', () => {
    const onSave = jest.fn();
    const { getByLabelText } = renderThemed(
      <JobCard job={JOB} saved={false} onSave={onSave} />,
      SEED_LIGHT
    );
    const bookmark = getByLabelText('Save job');
    expect(bookmark.props.accessibilityState.selected).toBe(false);
    fireEvent.press(bookmark);
    expect(onSave).toHaveBeenCalledTimes(1);
  });

  it('renders a skeleton in the loading state', () => {
    const { getByLabelText } = renderThemed(<JobCard job={JOB} loading />, SEED_DARK);
    expect(getByLabelText('Loading job')).toBeTruthy();
  });

  it('collapses overflow skills to a +N chip', () => {
    const { getByText } = renderThemed(<JobCard job={JOB} maxSkills={2} />, SEED_LIGHT);
    expect(getByText('+3')).toBeTruthy();
  });
});

describe('ApplyButton (native)', () => {
  it('withdraws from the applied state (undo)', () => {
    const onWithdraw = jest.fn();
    const { getByLabelText } = renderThemed(
      <ApplyButton state="applied" onWithdraw={onWithdraw} />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText('Applied — press to withdraw'));
    expect(onWithdraw).toHaveBeenCalledTimes(1);
  });
});

describe('JobFilterBar (native)', () => {
  it('fires onToggleType when a type chip is pressed', () => {
    const onToggleType = jest.fn();
    const { getByLabelText } = renderThemed(
      <JobFilterBar active={[]} onToggleType={onToggleType} resultCount={12} />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText('Contract'));
    expect(onToggleType).toHaveBeenCalledWith('contract');
  });

  it('marks an active chip as selected', () => {
    const { getByLabelText } = renderThemed(
      <JobFilterBar active={['remote']} onToggleType={jest.fn()} />,
      SEED_DARK
    );
    expect(getByLabelText('Remote').props.accessibilityState.selected).toBe(true);
  });
});

describe('SavedJobRow (native)', () => {
  it('fires onRemove when the bookmark is pressed', () => {
    const onRemove = jest.fn();
    const { getByLabelText } = renderThemed(
      <SavedJobRow job={JOB} savedAt="2026-08-21T09:00:00Z" onRemove={onRemove} />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText('Remove Senior React Native Engineer from saved'));
    expect(onRemove).toHaveBeenCalledTimes(1);
  });
});

describe('SalaryRange (native)', () => {
  it('formats a bounded range', () => {
    const { getByText } = renderThemed(
      <SalaryRange salary={{ min: 140000, max: 180000, currency: 'USD', period: 'year' }} />,
      SEED_LIGHT
    );
    expect(getByText(/\/yr$/)).toBeTruthy();
  });

  it('shows the empty hint when nothing is disclosed', () => {
    const { getByText } = renderThemed(<SalaryRange salary={{}} />, SEED_DARK);
    expect(getByText('Salary not disclosed')).toBeTruthy();
  });
});

describe('StatusPipeline (native)', () => {
  it('announces the stage as text, not color alone', () => {
    const { getByLabelText } = renderThemed(<StatusPipeline stage="interview" />, SEED_LIGHT);
    // Position + label are in the accessible summary.
    expect(getByLabelText('Stage 3 of 5: Interview')).toBeTruthy();
  });

  it('announces rejection in the compact variant', () => {
    const { getByLabelText } = renderThemed(
      <StatusPipeline stage="offer" rejected variant="compact" />,
      SEED_DARK
    );
    expect(getByLabelText('Rejected at stage 4 of 5: Offer')).toBeTruthy();
  });
});

describe('CompanyCard / ApplicationRow / InterviewSlot / RecruiterMessage (native)', () => {
  it('CompanyCard toggles follow', () => {
    const onToggleFollow = jest.fn();
    const { getByLabelText } = renderThemed(
      <CompanyCard company={COMPANY} following={false} onToggleFollow={onToggleFollow} />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText('Follow Acme Corp'));
    expect(onToggleFollow).toHaveBeenCalledTimes(1);
  });

  it('ApplicationRow mounts with the job title', () => {
    const { getByText } = renderThemed(<ApplicationRow application={APPLICATION} />, SEED_LIGHT);
    expect(getByText('Senior React Native Engineer')).toBeTruthy();
  });

  it('InterviewSlot fires onSelect and skips disabled', () => {
    const onSelect = jest.fn();
    const { getByLabelText } = renderThemed(
      <InterviewSlot interview={INTERVIEW} onSelect={onSelect} />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText(/Video, with Dana Lee/));
    expect(onSelect).toHaveBeenCalledTimes(1);
  });

  it('RecruiterMessage marks unread in the a11y label', () => {
    const { getByLabelText } = renderThemed(<RecruiterMessage message={MESSAGE} />, SEED_DARK);
    expect(getByLabelText(/^Unread\. Message from Priya Shah at Acme Corp/)).toBeTruthy();
  });
});

describe('token purity (native jobs, both seeds)', () => {
  it('every rendered hex traces to a compiled token', () => {
    [SEED_LIGHT, SEED_DARK].forEach((seed) => {
      const { root } = renderThemed(
        <>
          <JobCard job={JOB} saved onSave={jest.fn()} onApply={jest.fn()} />
          <CompanyCard company={COMPANY} following onToggleFollow={jest.fn()} />
          <ApplicationRow application={{ ...APPLICATION, rejected: true }} onPress={jest.fn()} />
          <SalaryRange salary={{}} />
          <ApplyButton state="applied" onWithdraw={jest.fn()} />
          <JobFilterBar active={['remote']} onToggleType={jest.fn()} query="" onQueryChange={jest.fn()} onClear={jest.fn()} resultCount={3} />
          <InterviewSlot interview={INTERVIEW} selected onSelect={jest.fn()} />
          <StatusPipeline stage="interview" />
          <SavedJobRow job={JOB} savedAt="2026-08-21T09:00:00Z" onRemove={jest.fn()} />
          <RecruiterMessage message={MESSAGE} onPress={jest.fn()} onReply={jest.fn()} />
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
