/** @jest-environment jsdom */
import { render, fireEvent } from '@testing-library/react';
import { createRef } from 'react';
import {
  StatCard,
  KpiRow,
  ActivityFeed,
  NotificationItem,
  ProfileHeader,
  SettingsRow,
  SettingsSection,
  ListRow,
  PageContainer,
  FilterChips,
  SearchHeader,
  EmptyDashboard,
  SectionCard,
  MetricTile,
  QuickActions,
  OnboardingChecklist,
} from './index';

describe('dashboard (web)', () => {
  it('StatCard renders the value and a success-toned delta on an up trend', () => {
    const { getByText } = render(
      <StatCard label="Revenue" value="$12.4k" delta="+12%" trend="up" />
    );
    expect(getByText('$12.4k')).toBeTruthy();
    const delta = getByText(/\+12%/);
    expect(delta.className).toContain('text-success');
  });

  it('StatCard forwards its ref to the root div', () => {
    const ref = createRef<HTMLDivElement>();
    render(<StatCard ref={ref} label="Users" value={128} />);
    expect(ref.current?.tagName).toBe('DIV');
  });

  it('KpiRow renders one StatCard per item', () => {
    const { getByText } = render(
      <KpiRow
        items={[
          { label: 'A', value: 1 },
          { label: 'B', value: 2 },
        ]}
      />
    );
    expect(getByText('A')).toBeTruthy();
    expect(getByText('B')).toBeTruthy();
  });

  it('ActivityFeed shows a real empty state when there are no items', () => {
    const { getByText } = render(
      <ActivityFeed items={[]} emptyMessage="Nothing has happened." />
    );
    expect(getByText('No activity yet')).toBeTruthy();
    expect(getByText('Nothing has happened.')).toBeTruthy();
  });

  it('ActivityFeed lists its items when present', () => {
    const { getByText } = render(
      <ActivityFeed items={[{ id: '1', title: 'Signed up', meta: 'by Ada', time: '2h' }]} />
    );
    expect(getByText('Signed up')).toBeTruthy();
    expect(getByText('by Ada')).toBeTruthy();
  });

  it('NotificationItem renders a button and fires onClick when interactive', () => {
    const onClick = jest.fn();
    const { getByRole } = render(
      <NotificationItem title="New comment" unread onClick={onClick} />
    );
    const btn = getByRole('button', { name: /New comment, unread/ });
    fireEvent.click(btn);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('ProfileHeader renders name, subtitle and an action slot', () => {
    const { getByText } = render(
      <ProfileHeader name="Ada Lovelace" subtitle="Owner" actions={<button>Edit</button>} />
    );
    expect(getByText('Ada Lovelace')).toBeTruthy();
    expect(getByText('Owner')).toBeTruthy();
    expect(getByText('Edit')).toBeTruthy();
  });

  it('SettingsSection groups SettingsRows and SettingsRow becomes a button when clickable', () => {
    const onClick = jest.fn();
    const { getByRole, getByText } = render(
      <SettingsSection title="Account" footnote="Signed in as you">
        <SettingsRow label="Email" value="a@b.co" />
        <SettingsRow label="Password" onClick={onClick} />
      </SettingsSection>
    );
    expect(getByText('Account')).toBeTruthy();
    fireEvent.click(getByRole('button', { name: 'Password' }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('ListRow renders a title/meta and is a plain div without onClick', () => {
    const { getByText, queryByRole } = render(<ListRow title="report.pdf" meta="2 MB" />);
    expect(getByText('report.pdf')).toBeTruthy();
    expect(queryByRole('button')).toBeNull();
  });

  it('PageContainer renders a heading and its children', () => {
    const { getByRole, getByText } = render(
      <PageContainer title="Overview" subtitle="This month">
        <div>body</div>
      </PageContainer>
    );
    expect(getByRole('heading', { name: 'Overview' })).toBeTruthy();
    expect(getByText('body')).toBeTruthy();
  });

  it('FilterChips reports the new single selection on click', () => {
    const onChange = jest.fn();
    const { getByRole } = render(
      <FilterChips options={['All', 'Open', 'Done']} selected="All" onChange={onChange} />
    );
    fireEvent.click(getByRole('button', { name: 'Open' }));
    expect(onChange).toHaveBeenCalledWith('Open');
  });

  it('SearchHeader is controlled and can be cleared', () => {
    const onChangeText = jest.fn();
    const { getByLabelText, getByRole } = render(
      <SearchHeader value="ada" onChangeText={onChangeText} placeholder="Find" />
    );
    fireEvent.change(getByLabelText('Find'), { target: { value: 'adax' } });
    expect(onChangeText).toHaveBeenCalledWith('adax');
    fireEvent.click(getByRole('button', { name: 'Clear search' }));
    expect(onChangeText).toHaveBeenCalledWith('');
  });

  it('EmptyDashboard renders one dominant action that fires onAction', () => {
    const onAction = jest.fn();
    const { getByRole } = render(
      <EmptyDashboard
        title="No projects yet"
        message="Create your first project to get going."
        actionLabel="New project"
        onAction={onAction}
      />
    );
    fireEvent.click(getByRole('button', { name: 'New project' }));
    expect(onAction).toHaveBeenCalledTimes(1);
  });

  it('SectionCard renders its title and body', () => {
    const { getByRole, getByText } = render(
      <SectionCard title="Recent" subtitle="Last 7 days">
        <div>content</div>
      </SectionCard>
    );
    expect(getByRole('heading', { name: 'Recent' })).toBeTruthy();
    expect(getByText('content')).toBeTruthy();
  });

  it('MetricTile applies the accent tone class to the value', () => {
    const { getByText } = render(<MetricTile label="Errors" value="3" tone="danger" />);
    expect(getByText('3').className).toContain('text-danger');
  });

  it('QuickActions renders one button per action and fires the handler', () => {
    const onClick = jest.fn();
    const { getByRole } = render(
      <QuickActions
        title="Shortcuts"
        actions={[
          { key: 'new', label: 'New', onClick },
          { key: 'imp', label: 'Import', disabled: true },
        ]}
      />
    );
    fireEvent.click(getByRole('button', { name: 'New' }));
    expect(onClick).toHaveBeenCalledTimes(1);
    expect((getByRole('button', { name: 'Import' }) as HTMLButtonElement).disabled).toBe(true);
  });

  it('OnboardingChecklist reports progress and marks done steps', () => {
    const { getByRole, getByText } = render(
      <OnboardingChecklist
        steps={[
          { label: 'Create account', done: true },
          { label: 'Invite team', done: false },
        ]}
      />
    );
    expect(getByText('1 of 2')).toBeTruthy();
    const bar = getByRole('progressbar');
    expect(bar.getAttribute('aria-valuenow')).toBe('50');
  });
});
