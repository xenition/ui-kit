/** @jest-environment jsdom */
/**
 * Alternate productivity designs (v2 / v3) for the web (React DOM) — drop-in
 * redesigns of TaskRow, ProjectCard, NoteCard, MilestoneRow. Each variant keeps the
 * base props; these specs prove they (a) mount, (b) stay token-pure (no literal hex
 * in inline styles beyond geometric widths), and (c) honor a key interaction/state.
 */
import { fireEvent, render } from '@testing-library/react';
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

const HEX_LITERAL = /#[0-9a-fA-F]{3,8}\b/;
const inlineStyles = (root: HTMLElement): string =>
  Array.from(root.querySelectorAll<HTMLElement>('[style]'))
    .map((el) => el.getAttribute('style') ?? '')
    .join('\n');

describe('TaskRow alternates (web)', () => {
  it('V2 toggles done', () => {
    const onToggle = jest.fn();
    const { getByRole, container } = render(<TaskRowV2 title="Write brief" variant="priority" priority="high" onToggle={onToggle} />);
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    fireEvent.click(getByRole('checkbox'));
    expect(onToggle).toHaveBeenCalledWith(true);
  });
  it('V3 toggles done', () => {
    const onToggle = jest.fn();
    const { getByRole, container } = render(<TaskRowV3 title="Review PR" variant="dated" dueLabel="Tomorrow" dueTone="upcoming" onToggle={onToggle} />);
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    fireEvent.click(getByRole('checkbox'));
    expect(onToggle).toHaveBeenCalledWith(true);
  });
});

describe('ProjectCard alternates (web)', () => {
  it('V2 fires onClick', () => {
    const onClick = jest.fn();
    const { getByText, container } = render(<ProjectCardV2 title="Apollo" description="Launch" progress={65} taskCount={12} assignees={[{ name: 'Ada' }]} dueLabel="Aug 30" dueTone="upcoming" onClick={onClick} />);
    expect(getByText('Apollo')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    fireEvent.click(getByText('Apollo'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
  it('V3 fires onClick', () => {
    const onClick = jest.fn();
    const { getByText, container } = render(<ProjectCardV3 title="Zephyr" progress={30} taskCount={4} onClick={onClick} />);
    expect(getByText('Zephyr')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    fireEvent.click(getByText('Zephyr'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});

describe('NoteCard alternates (web)', () => {
  it('V2 fires onClick', () => {
    const onClick = jest.fn();
    const { getByText, container } = render(<NoteCardV2 title="Idea" body="A great idea" timestamp="2h ago" pinned onClick={onClick} />);
    expect(getByText('Idea')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    fireEvent.click(getByText('Idea'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
  it('V3 renders a dense line', () => {
    const { getByText, container } = render(<NoteCardV3 title="Reminder" body="Call client" timestamp="1d" />);
    expect(getByText('Reminder')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
  });
});

describe('MilestoneRow alternates (web)', () => {
  it('V2 renders progress', () => {
    const { getByText, container } = render(<MilestoneRowV2 title="Beta launch" progress={80} dateLabel="Sep 1" dateTone="upcoming" />);
    expect(getByText('Beta launch')).toBeTruthy();
    expect(getByText('80%')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
  });
  it('V3 renders a reached milestone', () => {
    const { getByText, container } = render(<MilestoneRowV3 title="Alpha done" reached dateLabel="Aug 1" />);
    expect(getByText('Alpha done')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
  });
});

describe('productivity V4 "flow" line (web)', () => {
  it('mounts all 13 V4 variants token-pure', () => {
    const { getByText, container } = render(
      <div>
        <TaskRowV4 title="Write brief" variant="priority" priority="high" onToggle={() => undefined} />
        <ProjectCardV4 title="Apollo" description="Launch" progress={65} taskCount={12} assignees={[{ name: 'Ada' }]} dueLabel="Aug 30" dueTone="upcoming" onClick={() => undefined} />
        <NoteCardV4 title="Idea" body="A great idea" timestamp="2h ago" pinned />
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
      </div>
    );
    expect(getByText('Write brief')).toBeTruthy();
    expect(getByText('Apollo')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
  });

  it('TaskRowV4 toggles done from the checkbox', () => {
    const onToggle = jest.fn();
    const { getByRole, container } = render(<TaskRowV4 title="Ship it" onToggle={onToggle} />);
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    fireEvent.click(getByRole('checkbox'));
    expect(onToggle).toHaveBeenCalledWith(true);
  });

  it('TaskRowV4 renders the done soft-success state token-pure', () => {
    const { getByText, container } = render(<TaskRowV4 title="Completed task" done variant="priority" priority="low" />);
    expect(getByText('Completed task')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
  });

  it('ChecklistItemV4 fires its toggle', () => {
    const onChange = jest.fn();
    const { getByRole, container } = render(<ChecklistItemV4 label="Do the thing" onChange={onChange} />);
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    fireEvent.click(getByRole('checkbox'));
    expect(onChange).toHaveBeenCalledWith(true);
  });
});

describe('productivity V4 new blocks (web)', () => {
  it('mounts all 6 new components token-pure', () => {
    const { getByText, container } = render(
      <div>
        <ProjectHeader name="Apollo" description="Launch the thing" progressPct={65} taskCounts={{ done: 8, total: 12 }} members={[{ name: 'Ada' }, { name: 'Grace' }]} dueLabel="Aug 30" status="on-track" onAddTask={() => undefined} onSettings={() => undefined} />
        <TodayHeader greeting="Good morning" userName="Sam" dateLabel="Monday, Aug 31" dueToday={5} completedToday={3} focusLabel="Write the brief" />
        <WeeklyReview completed={24} streakDays={6} perDay={[{ label: 'M', count: 4 }, { label: 'T', count: 6 }, { label: 'W', count: 2 }]} focusHours="12h 30m" onShare={() => undefined} />
        <QuickAddTask value="New task" onChangeText={() => undefined} priority={{ label: 'High', active: true }} onPriority={() => undefined} />
        <CalendarStrip days={[{ date: '2026-08-31', label: '31', weekday: 'Mon', count: 3, today: true }, { date: '2026-09-01', label: '1', weekday: 'Tue' }]} selectedDate="2026-08-31" onSelect={() => undefined} />
        <ActivityFeed items={[{ id: 'a1', actor: { name: 'Ada' }, action: 'completed', target: 'Write brief', time: '2h ago' }, { id: 'a2', actor: { name: 'Grace' }, action: 'commented', target: 'Design', time: '3h ago' }]} />
      </div>
    );
    expect(getByText('Apollo')).toBeTruthy();
    expect(getByText('Ada')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
  });

  it('QuickAddTask fires onChangeText and onAdd', () => {
    const onChangeText = jest.fn();
    const onAdd = jest.fn();
    const { getByRole } = render(<QuickAddTask value="Buy milk" onChangeText={onChangeText} onAdd={onAdd} />);
    const input = getByRole('textbox');
    fireEvent.change(input, { target: { value: 'Buy bread' } });
    expect(onChangeText).toHaveBeenCalledWith('Buy bread');
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(onAdd).toHaveBeenCalledWith('Buy milk');
  });

  it('CalendarStrip fires onSelect with the day date', () => {
    const onSelect = jest.fn();
    const { getByRole } = render(
      <CalendarStrip
        days={[{ date: '2026-08-31', label: '31', weekday: 'Mon' }, { date: '2026-09-01', label: '1', weekday: 'Tue' }]}
        selectedDate="2026-08-31"
        onSelect={onSelect}
      />
    );
    fireEvent.click(getByRole('radio', { name: /Tue 1/ }));
    expect(onSelect).toHaveBeenCalledWith('2026-09-01');
  });
});
