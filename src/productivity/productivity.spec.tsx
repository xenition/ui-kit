/** @jest-environment jsdom */
/**
 * Web productivity components: render smoke, token-class purity (semantic
 * `--xen-*` utility classes, never literal colors), a11y roles, the empty
 * `SubtaskList` state, and the toggle contracts (checkbox, checklist, board
 * card, reminder switch, time tracker).
 */
import { fireEvent, render } from '@testing-library/react';
import { createRef } from 'react';
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

const HEX_LITERAL = /#[0-9a-fA-F]{3,8}\b/;

describe('TaskRow (web)', () => {
  it('renders, strikes done titles, and toggles via the checkbox role', () => {
    const onToggle = jest.fn();
    const { getByRole, getByText } = render(
      <TaskRow title="Ship release" done onToggle={onToggle} variant="priority" priority="urgent" />
    );
    const title = getByText('Ship release');
    expect(title.className).toContain('line-through');
    expect(title.className).toContain('text-muted');
    fireEvent.click(getByRole('checkbox'));
    expect(onToggle).toHaveBeenCalledWith(false); // checked=true → click unchecks
  });

  it('forwards a ref to the row div and shows the dated pill', () => {
    const ref = createRef<HTMLDivElement>();
    const { getByText } = render(
      <TaskRow ref={ref} title="Pay invoice" variant="dated" dueLabel="Aug 24" dueTone="today" />
    );
    expect(ref.current?.tagName).toBe('DIV');
    expect(getByText('Aug 24')).toBeTruthy();
  });
});

describe('ChecklistItem (web)', () => {
  it('exposes the checkbox role/state and toggles', () => {
    const onCheckedChange = jest.fn();
    const { getByRole } = render(
      <ChecklistItem label="Draft copy" checked={false} onCheckedChange={onCheckedChange} />
    );
    const box = getByRole('checkbox');
    expect(box.getAttribute('aria-checked')).toBe('false');
    fireEvent.click(box);
    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });

  it('fills with the success token class when checked (done = success)', () => {
    const { container } = render(<ChecklistItem label="Done thing" checked />);
    expect(container.innerHTML).toContain('bg-success');
  });
});

describe('PriorityTag / DueDatePill token classes (web)', () => {
  it('urgent priority uses the danger token class', () => {
    const { getByLabelText } = render(<PriorityTag level="urgent" />);
    expect(getByLabelText('Urgent priority').className).toContain('bg-danger');
  });

  it('high priority uses the warn token class', () => {
    const { getByLabelText } = render(<PriorityTag level="high" />);
    expect(getByLabelText('High priority').className).toContain('bg-warn');
  });

  it('overdue due-date pill uses the danger token class', () => {
    const { getByLabelText } = render(<DueDatePill label="Yesterday" tone="overdue" />);
    expect(getByLabelText(/Due Yesterday/).className).toContain('bg-danger');
  });
});

describe('SubtaskList (web)', () => {
  it('renders the empty state when there are no subtasks', () => {
    const { getByText } = render(<SubtaskList subtasks={[]} />);
    expect(getByText('No subtasks yet')).toBeTruthy();
  });

  it('renders items with a counter and toggles by id', () => {
    const onToggle = jest.fn();
    const { getByRole, getByText } = render(
      <SubtaskList
        subtasks={[{ id: 's1', title: 'One', done: false }]}
        onToggle={onToggle}
        showProgress
      />
    );
    expect(getByText('0/1 done')).toBeTruthy();
    fireEvent.click(getByRole('checkbox'));
    expect(onToggle).toHaveBeenCalledWith('s1', true);
  });
});

describe('AssigneeGroup (web)', () => {
  it('shows the unassigned empty state, then avatars', () => {
    const empty = render(<AssigneeGroup assignees={[]} />);
    expect(empty.getByText('Unassigned')).toBeTruthy();
    const filled = render(<AssigneeGroup assignees={[{ name: 'Ada Lovelace' }]} />);
    expect(filled.getByText('AL')).toBeTruthy();
  });
});

describe('BoardColumn (web)', () => {
  it('renders a header count, cards, and a working add affordance', () => {
    const onAddCard = jest.fn();
    const { getByText, getByLabelText } = render(
      <BoardColumn
        title="In progress"
        cards={[{ id: 'c1', title: 'Wireframes', priority: 'high' }]}
        onAddCard={onAddCard}
      />
    );
    expect(getByText('In progress')).toBeTruthy();
    expect(getByText('Wireframes')).toBeTruthy();
    fireEvent.click(getByLabelText('Add card'));
    expect(onAddCard).toHaveBeenCalledTimes(1);
  });

  it('renders a muted placeholder for an empty column', () => {
    const { getByText } = render(<BoardColumn title="Done" cards={[]} />);
    expect(getByText('No cards')).toBeTruthy();
  });

  it('toggles a card done by id', () => {
    const onToggleCard = jest.fn();
    const { getByRole } = render(
      <BoardColumn
        title="Todo"
        cards={[{ id: 'c1', title: 'Card', priority: 'low' }]}
        onToggleCard={onToggleCard}
      />
    );
    fireEvent.click(getByRole('checkbox'));
    expect(onToggleCard).toHaveBeenCalledWith('c1', true);
  });
});

describe('TimeTracker (web)', () => {
  it('toggles running and labels the control by state', () => {
    const onToggle = jest.fn();
    const { getByLabelText } = render(
      <TimeTracker elapsedLabel="00:30" running={false} onToggle={onToggle} label="Design" />
    );
    const btn = getByLabelText('Start timer');
    fireEvent.click(btn);
    expect(onToggle).toHaveBeenCalledWith(true);
  });

  it('uses the success token class while running', () => {
    const { getByLabelText } = render(<TimeTracker elapsedLabel="01:00" running />);
    expect(getByLabelText('Stop timer').className).toContain('bg-success');
  });
});

describe('LabelChip (web)', () => {
  it('fires onClick and a separate onRemove without leaking', () => {
    const onClick = jest.fn();
    const onRemove = jest.fn();
    const { getByLabelText } = render(
      <LabelChip label="bug" tone="danger" onClick={onClick} onRemove={onRemove} />
    );
    fireEvent.click(getByLabelText('Remove bug'));
    expect(onRemove).toHaveBeenCalledTimes(1);
    expect(onClick).not.toHaveBeenCalled();
  });
});

describe('MilestoneRow (web)', () => {
  it('marks a reached milestone with the success token class', () => {
    const { getByLabelText } = render(<MilestoneRow title="Beta" reached progress={100} dateLabel="Aug 1" />);
    expect(getByLabelText('Milestone reached').className).toContain('bg-success');
  });
});

describe('NoteCard (web)', () => {
  it('renders as a button when pressable and fires onClick', () => {
    const onClick = jest.fn();
    const { getByRole } = render(<NoteCard title="Idea" body="body" timestamp="2h ago" pinned onClick={onClick} />);
    fireEvent.click(getByRole('button', { name: 'Idea' }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});

describe('ReminderRow (web)', () => {
  it('exposes a switch role and toggles enabled', () => {
    const onToggle = jest.fn();
    const { getByRole } = render(
      <ReminderRow title="Stand-up" timeLabel="9:00 AM" enabled onToggle={onToggle} />
    );
    const sw = getByRole('switch');
    expect(sw.getAttribute('aria-checked')).toBe('true');
    fireEvent.click(sw);
    expect(onToggle).toHaveBeenCalledWith(false);
  });
});

describe('ProjectCard (web)', () => {
  it('renders progress meta and assignees', () => {
    const { getByText } = render(
      <ProjectCard
        title="Redesign"
        description="Q3 refresh"
        progress={100}
        taskCount={4}
        assignees={[{ name: 'Ada' }, { name: 'Bob' }]}
        dueLabel="Sep 1"
      />
    );
    expect(getByText('Redesign')).toBeTruthy();
    expect(getByText('100% complete · 4 tasks')).toBeTruthy();
  });
});

describe('productivity token purity (web)', () => {
  it('emits no literal hex colors in the rendered class markup', () => {
    const { container } = render(
      <div>
        <TaskRow title="A" variant="priority" priority="med" onToggle={() => undefined} />
        <SubtaskList subtasks={[{ id: 's', title: 'sub', done: true }]} onToggle={() => undefined} showProgress />
        <ProjectCard title="P" description="d" progress={100} taskCount={4} assignees={[{ name: 'Ada' }]} dueLabel="Sep 1" />
        <BoardColumn title="Todo" cards={[{ id: 'c', title: 'card', dueLabel: 'Today', dueTone: 'today' }]} onAddCard={() => undefined} />
        <LabelChip label="bug" tone="danger" onRemove={() => undefined} />
        <TimeTracker elapsedLabel="01:00" running onToggle={() => undefined} />
        <MilestoneRow title="Beta" reached progress={100} dateLabel="Aug 1" />
        <NoteCard title="Idea" body="body" timestamp="2h ago" pinned />
        <ReminderRow title="Call" timeLabel="5 PM" tone="overdue" onToggle={() => undefined} />
        <DueDatePill label="Now" tone="today" />
        <PriorityTag level="high" />
        <AssigneeGroup assignees={[]} />
      </div>
    );
    // className strings only carry token utility classes — no inline hex paint.
    const classAttrs = Array.from(container.querySelectorAll('[class]'))
      .map((el) => el.getAttribute('class') ?? '')
      .join(' ');
    expect(classAttrs).not.toMatch(HEX_LITERAL);
  });
});
