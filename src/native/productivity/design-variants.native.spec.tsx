import * as React from 'react';
import { fireEvent } from '@testing-library/react-native';
import { SEED_LIGHT, SEED_DARK, renderThemed, renderedStyleHexes, tokenHexSet } from '../spec-support/render-native';
import type { ThemeSeed } from '../../theme/types';
import { TaskRowV2 } from './TaskRowV2';
import { TaskRowV3 } from './TaskRowV3';
import { ProjectCardV2 } from './ProjectCardV2';
import { ProjectCardV3 } from './ProjectCardV3';
import { NoteCardV2 } from './NoteCardV2';
import { NoteCardV3 } from './NoteCardV3';
import { MilestoneRowV2 } from './MilestoneRowV2';
import { MilestoneRowV3 } from './MilestoneRowV3';
import {
  TaskRowV4,
  ProjectCardV4,
  NoteCardV4,
  MilestoneRowV4,
  ChecklistItemV4,
  SubtaskListV4,
  BoardColumnV4,
  ReminderRowV4,
  TimeTrackerV4,
  PriorityTagV4,
  LabelChipV4,
  DueDatePillV4,
  AssigneeGroupV4,
  ProjectHeader,
  TodayHeader,
  WeeklyReview,
  QuickAddTask,
  CalendarStrip,
  ActivityFeed,
} from './index';

const SEEDS: ReadonlyArray<ThemeSeed> = [SEED_LIGHT, SEED_DARK];

function expectTokenPure(root: Parameters<typeof renderedStyleHexes>[0], seed: ThemeSeed): void {
  const allowed = tokenHexSet(seed);
  const found = renderedStyleHexes(root);
  expect(found.length).toBeGreaterThan(0);
  found.forEach((hex) => expect(allowed.has(hex)).toBe(true));
}

describe('productivity alternate designs (V2 / V3, native)', () => {
  SEEDS.forEach((seed) => {
    it(`TaskRow V2/V3 mount token-pure (${seed.mode})`, () => {
      const a = renderThemed(<TaskRowV2 title="Write brief" variant="priority" priority="high" onToggle={() => undefined} />, seed);
      expect(a.getByText('Write brief')).toBeTruthy();
      expectTokenPure(a.root, seed);
      const b = renderThemed(<TaskRowV3 title="Review PR" variant="dated" dueLabel="Tomorrow" dueTone="upcoming" onToggle={() => undefined} />, seed);
      expectTokenPure(b.root, seed);
    });

    it(`ProjectCard V2/V3 mount token-pure (${seed.mode})`, () => {
      const a = renderThemed(<ProjectCardV2 title="Apollo" description="Launch" progress={65} taskCount={12} assignees={[{ name: 'Ada' }]} dueLabel="Aug 30" dueTone="upcoming" onPress={() => undefined} />, seed);
      expect(a.getByText('Apollo')).toBeTruthy();
      expectTokenPure(a.root, seed);
      const b = renderThemed(<ProjectCardV3 title="Zephyr" progress={30} taskCount={4} onPress={() => undefined} />, seed);
      expect(b.getByText('Zephyr')).toBeTruthy();
      expectTokenPure(b.root, seed);
    });

    it(`NoteCard V2/V3 mount token-pure (${seed.mode})`, () => {
      const a = renderThemed(<NoteCardV2 title="Idea" body="A great idea" timestamp="2h ago" pinned onPress={() => undefined} />, seed);
      expect(a.getByText('Idea')).toBeTruthy();
      expectTokenPure(a.root, seed);
      const b = renderThemed(<NoteCardV3 title="Reminder" body="Call client" timestamp="1d" />, seed);
      expect(b.getByText('Reminder')).toBeTruthy();
      expectTokenPure(b.root, seed);
    });

    it(`MilestoneRow V2/V3 mount token-pure (${seed.mode})`, () => {
      const a = renderThemed(<MilestoneRowV2 title="Beta launch" progress={80} dateLabel="Sep 1" dateTone="upcoming" />, seed);
      expect(a.getByText('Beta launch')).toBeTruthy();
      expectTokenPure(a.root, seed);
      const b = renderThemed(<MilestoneRowV3 title="Alpha done" reached dateLabel="Aug 1" />, seed);
      expect(b.getByText('Alpha done')).toBeTruthy();
      expectTokenPure(b.root, seed);
    });
  });

  it('TaskRowV2 fires onToggle from the checkbox', () => {
    const onToggle = jest.fn();
    const { getByRole } = renderThemed(<TaskRowV2 title="Ship it" onToggle={onToggle} />, SEED_LIGHT);
    fireEvent.press(getByRole('checkbox'));
    expect(onToggle).toHaveBeenCalled();
  });
});

describe('productivity V4 "flow" line (native)', () => {
  SEEDS.forEach((seed) => {
    it(`all 13 V4 variants mount token-pure (${seed.mode})`, () => {
      const r = renderThemed(
        <React.Fragment>
          <TaskRowV4 title="Write brief" variant="priority" priority="high" onToggle={() => undefined} />
          <TaskRowV4 title="Completed task" done onToggle={() => undefined} />
          <ProjectCardV4 title="Apollo" description="Launch" progress={65} taskCount={12} assignees={[{ name: 'Ada' }]} dueLabel="Aug 30" dueTone="upcoming" onPress={() => undefined} />
          <NoteCardV4 title="Idea" body="A great idea" timestamp="2h ago" pinned onPress={() => undefined} />
          <MilestoneRowV4 title="Beta launch" progress={80} dateLabel="Sep 1" dateTone="upcoming" />
          <ChecklistItemV4 label="Draft the plan" checked />
          <SubtaskListV4 subtasks={[{ id: 's1', title: 'Spec', done: true }, { id: 's2', title: 'Build' }]} showProgress />
          <BoardColumnV4 title="In progress" cards={[{ id: 'c1', title: 'Design', priority: 'med' }, { id: 'c2', title: 'Ship', dueLabel: 'Fri', dueTone: 'today' }]} onAddCard={() => undefined} />
          <ReminderRowV4 title="Standup" timeLabel="9:00 AM" tone="today" enabled />
          <TimeTrackerV4 elapsedLabel="01:24:07" running label="Deep work" />
          <PriorityTagV4 level="urgent" />
          <LabelChipV4 label="Design" tone="primary" />
          <DueDatePillV4 label="Tomorrow" tone="upcoming" />
          <AssigneeGroupV4 assignees={[{ name: 'Ada' }, { name: 'Grace' }]} />
        </React.Fragment>,
        seed
      );
      expect(r.getByText('Write brief')).toBeTruthy();
      expect(r.getByText('Apollo')).toBeTruthy();
      expectTokenPure(r.root, seed);
    });
  });

  it('TaskRowV4 fires onToggle from the checkbox', () => {
    const onToggle = jest.fn();
    const { getByRole } = renderThemed(<TaskRowV4 title="Ship it" onToggle={onToggle} />, SEED_LIGHT);
    fireEvent.press(getByRole('checkbox'));
    expect(onToggle).toHaveBeenCalled();
  });

  it('ChecklistItemV4 fires its toggle', () => {
    const onChange = jest.fn();
    const { getByRole } = renderThemed(<ChecklistItemV4 label="Do the thing" onChange={onChange} />, SEED_LIGHT);
    fireEvent.press(getByRole('checkbox'));
    expect(onChange).toHaveBeenCalledWith(true);
  });
});

describe('productivity V4 new blocks (native)', () => {
  SEEDS.forEach((seed) => {
    it(`all 6 new components mount token-pure incl. gradient pieces (${seed.mode})`, () => {
      const r = renderThemed(
        <React.Fragment>
          <ProjectHeader name="Apollo" description="Launch the thing" progressPct={65} taskCounts={{ done: 8, total: 12 }} members={[{ name: 'Ada' }, { name: 'Grace' }]} dueLabel="Aug 30" status="on-track" onAddTask={() => undefined} onSettings={() => undefined} />
          <TodayHeader greeting="Good morning" userName="Sam" dateLabel="Monday, Aug 31" dueToday={5} completedToday={3} focusLabel="Write the brief" />
          <WeeklyReview completed={24} streakDays={6} perDay={[{ label: 'M', count: 4 }, { label: 'T', count: 6 }, { label: 'W', count: 2 }]} focusHours="12h 30m" onShare={() => undefined} />
          <QuickAddTask value="New task" onChangeText={() => undefined} priority={{ label: 'High', active: true }} onPriority={() => undefined} />
          <CalendarStrip days={[{ date: '2026-08-31', label: '31', weekday: 'Mon', count: 3, today: true }, { date: '2026-09-01', label: '1', weekday: 'Tue' }]} selectedDate="2026-08-31" onSelect={() => undefined} />
          <ActivityFeed items={[{ id: 'a1', actor: { name: 'Ada' }, action: 'completed', target: 'Write brief', time: '2h ago' }, { id: 'a2', actor: { name: 'Grace' }, action: 'commented', target: 'Design', time: '3h ago' }]} />
        </React.Fragment>,
        seed
      );
      expect(r.getByText('Apollo')).toBeTruthy();
      expect(r.getByText('Ada')).toBeTruthy();
      expectTokenPure(r.root, seed);
    });
  });

  it('QuickAddTask fires onChangeText and onAdd', () => {
    const onChangeText = jest.fn();
    const onAdd = jest.fn();
    const { getByLabelText } = renderThemed(
      <QuickAddTask value="Buy milk" onChangeText={onChangeText} onAdd={onAdd} />,
      SEED_LIGHT
    );
    const input = getByLabelText('Add a task');
    fireEvent.changeText(input, 'Buy bread');
    expect(onChangeText).toHaveBeenCalledWith('Buy bread');
    fireEvent(input, 'submitEditing');
    expect(onAdd).toHaveBeenCalledWith('Buy milk');
  });

  it('CalendarStrip fires onSelect with the day date', () => {
    const onSelect = jest.fn();
    const { getByLabelText } = renderThemed(
      <CalendarStrip
        days={[{ date: '2026-08-31', label: '31', weekday: 'Mon' }, { date: '2026-09-01', label: '1', weekday: 'Tue' }]}
        selectedDate="2026-08-31"
        onSelect={onSelect}
      />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText('Tue 1'));
    expect(onSelect).toHaveBeenCalledWith('2026-09-01');
  });
});
