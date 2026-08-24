import * as React from 'react';
import { fireEvent } from '@testing-library/react-native';
import {
  SEED_LIGHT,
  SEED_DARK,
  renderThemed,
  renderedStyleHexes,
  tokenHexSet,
} from '../spec-support/render-native';
import {
  StatCard,
  KpiRow,
  ActivityFeed,
  NotificationItem,
  ProfileHeader,
  SettingsRow,
  SettingsSection,
  FilterChips,
  SearchHeader,
  EmptyDashboard,
  SectionCard,
  MetricTile,
  QuickActions,
  OnboardingChecklist,
  type ActivityItem,
} from './index';

const activity: ActivityItem[] = [
  { id: '1', title: 'Invoice paid', meta: 'Acme Co', time: '2h ago' },
  { id: '2', title: 'New signup', meta: 'jules@x.io', time: '5h ago' },
];

describe('StatCard / KpiRow (native)', () => {
  it('renders the value, delta, and label', () => {
    const { getByText } = renderThemed(
      <StatCard label="Revenue" value="$12.4k" delta="+12%" trend="up" />,
      SEED_LIGHT
    );
    expect(getByText('Revenue')).toBeTruthy();
    expect(getByText('$12.4k')).toBeTruthy();
    expect(getByText(/\+12%/)).toBeTruthy();
  });

  it('lays out multiple KPIs in a row', () => {
    const { getByText } = renderThemed(
      <KpiRow
        items={[
          { label: 'Users', value: 128 },
          { label: 'Churn', value: '2%', delta: '-1%', trend: 'down' },
        ]}
      />,
      SEED_DARK
    );
    expect(getByText('Users')).toBeTruthy();
    expect(getByText('Churn')).toBeTruthy();
  });
});

describe('ActivityFeed (native)', () => {
  it('renders each item', () => {
    const { getByText } = renderThemed(
      <ActivityFeed title="Recent" items={activity} />,
      SEED_LIGHT
    );
    expect(getByText('Recent')).toBeTruthy();
    expect(getByText('Invoice paid')).toBeTruthy();
    expect(getByText('New signup')).toBeTruthy();
  });

  it('shows a real empty state when there are no items', () => {
    const { getByText } = renderThemed(
      <ActivityFeed items={[]} emptyMessage="Nothing has happened." />,
      SEED_DARK
    );
    expect(getByText('No activity yet')).toBeTruthy();
    expect(getByText('Nothing has happened.')).toBeTruthy();
  });
});

describe('NotificationItem (native)', () => {
  it('fires onPress and announces unread', () => {
    const onPress = jest.fn();
    const { getByLabelText } = renderThemed(
      <NotificationItem title="Server down" body="Region eu-1" unread onPress={onPress} />,
      SEED_LIGHT
    );
    const node = getByLabelText(/Server down, unread/);
    fireEvent.press(node);
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});

describe('ProfileHeader (native)', () => {
  it('renders name and subtitle', () => {
    const { getByText } = renderThemed(
      <ProfileHeader name="Ada Lovelace" subtitle="Owner" />,
      SEED_LIGHT
    );
    expect(getByText('Ada Lovelace')).toBeTruthy();
    expect(getByText('Owner')).toBeTruthy();
  });
});

describe('SettingsSection / SettingsRow (native)', () => {
  it('renders grouped rows and fires row onPress', () => {
    const onPress = jest.fn();
    const { getByText, getByLabelText } = renderThemed(
      <SettingsSection title="Account">
        <SettingsRow label="Email" value="ada@x.io" onPress={onPress} />
        <SettingsRow label="Notifications" />
      </SettingsSection>,
      SEED_DARK
    );
    expect(getByText('Account')).toBeTruthy();
    fireEvent.press(getByLabelText('Email'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});

describe('FilterChips (native)', () => {
  it('toggles single selection', () => {
    const onChange = jest.fn();
    const { getByLabelText } = renderThemed(
      <FilterChips options={['All', 'Open', 'Closed']} selected="All" onChange={onChange} />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText('Open'));
    expect(onChange).toHaveBeenCalledWith('Open');
  });

  it('accumulates multi selection', () => {
    const onChange = jest.fn();
    const { getByLabelText } = renderThemed(
      <FilterChips
        options={['A', 'B']}
        selected={['A']}
        multi
        onChange={onChange}
      />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText('B'));
    expect(onChange).toHaveBeenCalledWith(['A', 'B']);
  });
});

describe('SearchHeader (native)', () => {
  it('edits and clears text', () => {
    const onChangeText = jest.fn();
    const { getByLabelText } = renderThemed(
      <SearchHeader value="foo" onChangeText={onChangeText} placeholder="Find" />,
      SEED_DARK
    );
    fireEvent.changeText(getByLabelText('Find'), 'bar');
    expect(onChangeText).toHaveBeenCalledWith('bar');
    fireEvent.press(getByLabelText('Clear search'));
    expect(onChangeText).toHaveBeenCalledWith('');
  });
});

describe('EmptyDashboard (native)', () => {
  it('renders the empty state with a single dominant action', () => {
    const onAction = jest.fn();
    const { getByText } = renderThemed(
      <EmptyDashboard
        title="Nothing here yet"
        message="Create your first project to get going."
        actionLabel="New project"
        onAction={onAction}
      />,
      SEED_LIGHT
    );
    expect(getByText('Nothing here yet')).toBeTruthy();
    fireEvent.press(getByText('New project'));
    expect(onAction).toHaveBeenCalledTimes(1);
  });
});

describe('SectionCard / MetricTile (native)', () => {
  it('wraps content under a title', () => {
    const { getByText } = renderThemed(
      <SectionCard title="Overview" subtitle="This week">
        <MetricTile label="Sessions" value="1.2k" tone="primary" />
      </SectionCard>,
      SEED_DARK
    );
    expect(getByText('Overview')).toBeTruthy();
    expect(getByText('This week')).toBeTruthy();
    expect(getByText('Sessions')).toBeTruthy();
    expect(getByText('1.2k')).toBeTruthy();
  });
});

describe('QuickActions (native)', () => {
  it('fires the pressed action', () => {
    const onPress = jest.fn();
    const { getByLabelText } = renderThemed(
      <QuickActions
        title="Actions"
        actions={[
          { key: 'invite', label: 'Invite', onPress },
          { key: 'export', label: 'Export' },
        ]}
      />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText('Invite'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});

describe('OnboardingChecklist (native)', () => {
  it('shows the completion count and step state', () => {
    const { getByText, getByLabelText } = renderThemed(
      <OnboardingChecklist
        steps={[
          { label: 'Verify email', done: true },
          { label: 'Add a project', done: false },
        ]}
      />,
      SEED_DARK
    );
    expect(getByText('1 of 2')).toBeTruthy();
    expect(getByLabelText(/Verify email, completed/)).toBeTruthy();
    expect(getByLabelText(/Add a project, not completed/)).toBeTruthy();
  });
});

describe('token purity (native dashboard, both seeds)', () => {
  it('every rendered hex traces to a compiled token', () => {
    [SEED_LIGHT, SEED_DARK].forEach((seed) => {
      const { root } = renderThemed(
        <>
          <StatCard label="Revenue" value="$12k" delta="+3%" trend="up" />
          <KpiRow items={[{ label: 'Users', value: 10 }]} />
          <ActivityFeed items={activity} />
          <ActivityFeed items={[]} />
          <NotificationItem title="Ping" unread />
          <ProfileHeader name="Ada" subtitle="Owner" />
          <SettingsSection title="Account">
            <SettingsRow label="Email" value="a@x.io" onPress={() => {}} />
          </SettingsSection>
          <FilterChips options={['A', 'B']} selected="A" onChange={() => {}} />
          <SearchHeader value="q" onChangeText={() => {}} />
          <EmptyDashboard title="Empty" message="Nothing" actionLabel="Go" onAction={() => {}} />
          <SectionCard title="Overview" divided>
            <MetricTile label="Sessions" value="12" tone="success" />
          </SectionCard>
          <QuickActions actions={[{ key: 'a', label: 'A' }]} />
          <OnboardingChecklist
            steps={[
              { label: 'One', done: true },
              { label: 'Two', done: false },
            ]}
          />
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
