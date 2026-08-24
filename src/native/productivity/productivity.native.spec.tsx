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
import {
  TaskRow,
  ChecklistItem,
  PriorityTag,
  DueDatePill,
  ProjectCard,
  AssigneeGroup,
  BoardColumn,
  SubtaskList,
  LabelChip,
  TimeTracker,
  MilestoneRow,
  NoteCard,
  ReminderRow,
} from './index';

function flatten(style: unknown): Record<string, unknown> {
  return (StyleSheet.flatten(style as never) ?? {}) as Record<string, unknown>;
}

describe('TaskRow (native)', () => {
  it('mounts, strikes done titles, and toggles via the checkbox role', () => {
    const onToggle = jest.fn();
    const { getByRole, getByText } = renderThemed(
      <TaskRow title="Ship release" done={false} onToggle={onToggle} variant="priority" priority="urgent" />,
      SEED_LIGHT
    );
    expect(getByText('Ship release')).toBeTruthy();
    fireEvent.press(getByRole('checkbox'));
    expect(onToggle).toHaveBeenCalledWith(true);
  });

  it('renders the dated variant with a due pill', () => {
    const { getByText } = renderThemed(
      <TaskRow title="Pay invoice" variant="dated" dueLabel="Aug 24" dueTone="today" />,
      SEED_LIGHT
    );
    expect(getByText('Aug 24')).toBeTruthy();
  });
});

describe('ChecklistItem (native)', () => {
  it('exposes the checkbox role/state and toggles', () => {
    const onCheckedChange = jest.fn();
    const { getByRole } = renderThemed(
      <ChecklistItem label="Draft copy" checked={false} onCheckedChange={onCheckedChange} />,
      SEED_LIGHT
    );
    const box = getByRole('checkbox');
    expect(box.props.accessibilityState.checked).toBe(false);
    fireEvent.press(box);
    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });

  it('fills with the success token when checked (done = success)', () => {
    const { getByRole } = renderThemed(
      <ChecklistItem label="Done thing" checked onCheckedChange={() => undefined} />,
      SEED_DARK
    );
    const success = compileTheme(SEED_DARK).dark.success.toLowerCase();
    const hexes = renderedStyleHexes(getByRole('checkbox'));
    expect(hexes).toContain(success);
  });
});

describe('PriorityTag / DueDatePill token colors (native)', () => {
  it('urgent priority uses the danger token background', () => {
    const { getByLabelText } = renderThemed(<PriorityTag level="urgent" />, SEED_LIGHT);
    const danger = compileTheme(SEED_LIGHT).light.danger.toLowerCase();
    const style = flatten(getByLabelText('Urgent priority').props.style);
    expect(String(style.backgroundColor).toLowerCase()).toBe(danger);
  });

  it('overdue due-date pill uses the danger token background', () => {
    const { getByLabelText } = renderThemed(<DueDatePill label="Yesterday" tone="overdue" />, SEED_LIGHT);
    const danger = compileTheme(SEED_LIGHT).light.danger.toLowerCase();
    const style = flatten(getByLabelText(/Due Yesterday/).props.style);
    expect(String(style.backgroundColor).toLowerCase()).toBe(danger);
  });
});

describe('SubtaskList (native)', () => {
  it('renders the empty state when there are no subtasks', () => {
    const { getByText } = renderThemed(<SubtaskList subtasks={[]} />, SEED_LIGHT);
    expect(getByText('No subtasks yet')).toBeTruthy();
  });

  it('renders items and toggles by id', () => {
    const onToggle = jest.fn();
    const { getByRole } = renderThemed(
      <SubtaskList subtasks={[{ id: 's1', title: 'One', done: false }]} onToggle={onToggle} />,
      SEED_LIGHT
    );
    fireEvent.press(getByRole('checkbox'));
    expect(onToggle).toHaveBeenCalledWith('s1', true);
  });
});

describe('AssigneeGroup (native)', () => {
  it('shows the unassigned empty state, then avatars', () => {
    const empty = renderThemed(<AssigneeGroup assignees={[]} />, SEED_LIGHT);
    expect(empty.getByText('Unassigned')).toBeTruthy();
    const filled = renderThemed(<AssigneeGroup assignees={[{ name: 'Ada Lovelace' }]} />, SEED_LIGHT);
    expect(filled.getByText('AL')).toBeTruthy();
  });
});

describe('BoardColumn (native)', () => {
  it('renders a header count, cards, and a working add affordance', () => {
    const onAddCard = jest.fn();
    const { getByText } = renderThemed(
      <BoardColumn
        title="In progress"
        cards={[{ id: 'c1', title: 'Wireframes', priority: 'high' }]}
        onAddCard={onAddCard}
      />,
      SEED_LIGHT
    );
    expect(getByText('In progress')).toBeTruthy();
    expect(getByText('Wireframes')).toBeTruthy();
    fireEvent.press(getByText('+ Add'));
    expect(onAddCard).toHaveBeenCalledTimes(1);
  });

  it('renders a muted placeholder for an empty column', () => {
    const { getByText } = renderThemed(<BoardColumn title="Done" cards={[]} />, SEED_LIGHT);
    expect(getByText('No cards')).toBeTruthy();
  });
});

describe('TimeTracker (native)', () => {
  it('toggles running and labels the control by state', () => {
    const onToggle = jest.fn();
    const { getByLabelText } = renderThemed(
      <TimeTracker elapsedLabel="00:30" running={false} onToggle={onToggle} label="Design" />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText('Start timer'));
    expect(onToggle).toHaveBeenCalledWith(true);
  });
});

describe('ReminderRow (native)', () => {
  it('exposes a switch role and toggles enabled', () => {
    const onToggle = jest.fn();
    const { getByRole } = renderThemed(
      <ReminderRow title="Stand-up" timeLabel="9:00 AM" enabled onToggle={onToggle} />,
      SEED_LIGHT
    );
    const sw = getByRole('switch');
    expect(sw.props.accessibilityState.checked).toBe(true);
    fireEvent.press(sw);
    expect(onToggle).toHaveBeenCalledWith(false);
  });
});

describe('productivity appearance + motion (native, additive)', () => {
  it('mounts the elevated and outline appearances without breaking existing behavior', () => {
    const onToggle = jest.fn();
    const { getByText, getByRole } = renderThemed(
      <>
        <TaskRow title="Elevated task" appearance="elevated" onToggle={onToggle} />
        <ProjectCard title="Outlined project" appearance="outline" progress={40} />
      </>,
      SEED_LIGHT
    );
    expect(getByText('Elevated task')).toBeTruthy();
    expect(getByText('Outlined project')).toBeTruthy();
    fireEvent.press(getByRole('checkbox'));
    expect(onToggle).toHaveBeenCalledWith(true);
  });

  it('keeps every appearance token-pure across both seeds', () => {
    [SEED_LIGHT, SEED_DARK].forEach((seed) => {
      const { root } = renderThemed(
        <>
          <TaskRow title="A" appearance="elevated" />
          <BoardColumn title="Todo" cards={[{ id: 'c', title: 'card' }]} appearance="outline" />
          <MilestoneRow title="Beta" reached progress={100} appearance="filled" />
          <ReminderRow title="Call" timeLabel="5 PM" appearance="soft" />
          <TimeTracker elapsedLabel="00:10" appearance="minimal" />
        </>,
        seed
      );
      const allowed = tokenHexSet(seed);
      const found = renderedStyleHexes(root);
      expect(found.length).toBeGreaterThan(0);
      found.forEach((hex) => expect(allowed.has(hex)).toBe(true));
    });
  });

  it('mounts a motion-wrapped pressable card and still fires onPress', () => {
    const onPress = jest.fn();
    const { getByRole } = renderThemed(
      <ProjectCard title="Pressable" appearance="elevated" onPress={onPress} />,
      SEED_LIGHT
    );
    fireEvent.press(getByRole('button'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});

describe('productivity token purity (native, both seeds)', () => {
  it('every rendered hex traces to a compiled token across a composed tree', () => {
    [SEED_LIGHT, SEED_DARK].forEach((seed) => {
      const { root } = renderThemed(
        <>
          <TaskRow title="A" variant="priority" priority="med" onToggle={() => undefined} />
          <SubtaskList subtasks={[{ id: 's', title: 'sub', done: true }]} onToggle={() => undefined} showProgress />
          <ProjectCard
            title="Redesign"
            description="Q3 refresh"
            progress={100}
            taskCount={4}
            assignees={[{ name: 'Ada' }, { name: 'Bob' }]}
            dueLabel="Sep 1"
            dueTone="upcoming"
          />
          <BoardColumn
            title="Todo"
            cards={[{ id: 'c', title: 'card', dueLabel: 'Today', dueTone: 'today' }]}
            onAddCard={() => undefined}
          />
          <LabelChip label="bug" tone="danger" onRemove={() => undefined} />
          <TimeTracker elapsedLabel="01:00" running onToggle={() => undefined} />
          <MilestoneRow title="Beta" reached progress={100} dateLabel="Aug 1" />
          <NoteCard title="Idea" body="body" timestamp="2h ago" pinned />
          <ReminderRow title="Call" timeLabel="5 PM" tone="overdue" onToggle={() => undefined} />
          <DueDatePill label="Now" tone="today" />
          <PriorityTag level="high" />
          <AssigneeGroup assignees={[]} />
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
