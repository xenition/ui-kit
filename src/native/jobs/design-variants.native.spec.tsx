import * as React from 'react';
import { fireEvent } from '@testing-library/react-native';
import {
  SEED_LIGHT,
  SEED_DARK,
  renderThemed,
  renderedStyleHexes,
  tokenHexSet,
} from '../spec-support/render-native';
import { JobCardV2 } from './JobCardV2';
import { JobCardV3 } from './JobCardV3';
import { CompanyCardV2 } from './CompanyCardV2';
import { CompanyCardV3 } from './CompanyCardV3';
import { ApplicationRowV2 } from './ApplicationRowV2';
import { ApplicationRowV3 } from './ApplicationRowV3';
import { StatusPipelineV2 } from './StatusPipelineV2';
import { StatusPipelineV3 } from './StatusPipelineV3';
import type { Application, Company, Job } from './types';

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

describe('jobs design variants — mount', () => {
  it('JobCard V2/V3 mount with title + type', () => {
    const v2 = renderThemed(<JobCardV2 job={JOB} />, SEED_LIGHT);
    expect(v2.getByText('Senior React Native Engineer')).toBeTruthy();
    expect(v2.getByText('Full-time')).toBeTruthy();
    const v3 = renderThemed(<JobCardV3 job={JOB} />, SEED_DARK);
    expect(v3.getByText('Senior React Native Engineer')).toBeTruthy();
  });

  it('CompanyCard V2/V3 mount with name', () => {
    expect(renderThemed(<CompanyCardV2 company={COMPANY} />, SEED_LIGHT).getByText('Acme Corp')).toBeTruthy();
    expect(renderThemed(<CompanyCardV3 company={COMPANY} />, SEED_DARK).getByText('Acme Corp')).toBeTruthy();
  });

  it('ApplicationRow V2/V3 mount with job title', () => {
    expect(
      renderThemed(<ApplicationRowV2 application={APPLICATION} />, SEED_LIGHT).getByText('Senior React Native Engineer')
    ).toBeTruthy();
    expect(
      renderThemed(<ApplicationRowV3 application={APPLICATION} />, SEED_DARK).getByText('Senior React Native Engineer')
    ).toBeTruthy();
  });

  it('StatusPipeline V2/V3 announce the stage as text (not color alone)', () => {
    expect(
      renderThemed(<StatusPipelineV2 stage="interview" />, SEED_LIGHT).getByLabelText('Stage 3 of 5: Interview')
    ).toBeTruthy();
    expect(
      renderThemed(<StatusPipelineV3 stage="offer" rejected />, SEED_DARK).getByLabelText(
        'Rejected at stage 4 of 5: Offer'
      )
    ).toBeTruthy();
  });

  it('empty/degenerate inputs still mount', () => {
    const bare: Job = { id: 'j0', title: 'Role', companyName: 'Co', type: 'contract' };
    expect(renderThemed(<JobCardV2 job={bare} />, SEED_LIGHT).getByText('Role')).toBeTruthy();
    expect(renderThemed(<JobCardV3 job={bare} loading />, SEED_DARK).getByLabelText('Loading job')).toBeTruthy();
    expect(renderThemed(<CompanyCardV3 company={{ id: 'c0', name: 'Co' }} />, SEED_LIGHT).getByText('Co')).toBeTruthy();
  });
});

describe('jobs design variants — interaction', () => {
  it('JobCardV2 fires onApply', () => {
    const onApply = jest.fn();
    const { getByLabelText } = renderThemed(<JobCardV2 job={JOB} onApply={onApply} />, SEED_LIGHT);
    fireEvent.press(getByLabelText('Apply to this job'));
    expect(onApply).toHaveBeenCalledTimes(1);
    expect(onApply.mock.calls[0][0].id).toBe('j1');
  });

  it('JobCardV3 fires onSave and reflects saved state', () => {
    const onSave = jest.fn();
    const { getByLabelText } = renderThemed(<JobCardV3 job={JOB} saved={false} onSave={onSave} />, SEED_DARK);
    const bookmark = getByLabelText('Save job');
    expect(bookmark.props.accessibilityState.selected).toBe(false);
    fireEvent.press(bookmark);
    expect(onSave).toHaveBeenCalledTimes(1);
  });

  it('CompanyCardV2 toggles follow', () => {
    const onToggleFollow = jest.fn();
    const { getByLabelText } = renderThemed(
      <CompanyCardV2 company={COMPANY} following={false} onToggleFollow={onToggleFollow} />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText('Follow Acme Corp'));
    expect(onToggleFollow).toHaveBeenCalledTimes(1);
  });

  it('CompanyCardV3 fires onPress', () => {
    const onPress = jest.fn();
    const { getByLabelText } = renderThemed(<CompanyCardV3 company={COMPANY} onPress={onPress} />, SEED_DARK);
    fireEvent.press(getByLabelText('Acme Corp, Software'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('ApplicationRowV2 fires onPress', () => {
    const onPress = jest.fn();
    const { getByLabelText } = renderThemed(
      <ApplicationRowV2 application={APPLICATION} onPress={onPress} />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText('Senior React Native Engineer at Acme Corp'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('ApplicationRowV3 fires onPress and announces the stage in its label', () => {
    const onPress = jest.fn();
    const { getByLabelText } = renderThemed(
      <ApplicationRowV3 application={{ ...APPLICATION, rejected: true }} onPress={onPress} />,
      SEED_DARK
    );
    fireEvent.press(getByLabelText(/rejected at Interview/));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});

describe('jobs design variants — token purity (both seeds)', () => {
  it('every rendered hex traces to a compiled token', () => {
    [SEED_LIGHT, SEED_DARK].forEach((seed) => {
      const { root } = renderThemed(
        <>
          <JobCardV2 job={JOB} saved onSave={jest.fn()} onApply={jest.fn()} />
          <JobCardV3 job={{ ...JOB, type: 'remote' }} saved onSave={jest.fn()} applyState="applied" onWithdraw={jest.fn()} />
          <CompanyCardV2 company={COMPANY} following onToggleFollow={jest.fn()} onPress={jest.fn()} />
          <CompanyCardV3 company={{ ...COMPANY, openRoles: 0 }} following onToggleFollow={jest.fn()} />
          <ApplicationRowV2 application={{ ...APPLICATION, rejected: true }} onPress={jest.fn()} />
          <ApplicationRowV3 application={{ ...APPLICATION, stage: 'hired' }} onPress={jest.fn()} />
          <StatusPipelineV2 stage="offer" rejected />
          <StatusPipelineV3 stage="applied" />
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
