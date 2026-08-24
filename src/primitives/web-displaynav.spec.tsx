/** @jest-environment jsdom */
import { render, fireEvent } from '@testing-library/react';
import { useState } from 'react';

import { Tree } from './Tree';
import { Statistic } from './Statistic';
import { Calendar } from './Calendar';
import { Kanban } from './Kanban';
import { VirtualList } from './VirtualList';
import { CodeBlock } from './CodeBlock';
import { JsonViewer } from './JsonViewer';
import { Toolbar } from './Toolbar';
import { SplitButton } from './SplitButton';
import { ScrollableTabs } from './ScrollableTabs';

describe('Tree', () => {
  const data = [
    {
      id: 'src',
      label: 'src',
      children: [{ id: 'index', label: 'index.ts' }],
    },
  ];

  it('renders a role="tree" and toggles children on click', () => {
    const onSelect = jest.fn();
    const { getByText, queryByText, getByRole } = render(<Tree data={data} onSelect={onSelect} />);
    expect(getByRole('tree')).toBeTruthy();
    // Collapsed by default — child not visible.
    expect(queryByText('index.ts')).toBeNull();
    fireEvent.click(getByText('src'));
    expect(onSelect).toHaveBeenCalledTimes(1);
    // Expanded — child now rendered.
    expect(queryByText('index.ts')).not.toBeNull();
  });

  it('marks the selected node with aria-selected', () => {
    const { getByText } = render(<Tree data={data} selectedId="src" />);
    const row = getByText('src').closest('[role="treeitem"]');
    expect(row?.getAttribute('aria-selected')).toBe('true');
  });
});

describe('Statistic', () => {
  it('renders label/value and infers an up trend from a positive delta', () => {
    const { getByText } = render(<Statistic label="Revenue" value="$12k" delta={8} suffix="%" />);
    expect(getByText('Revenue')).toBeTruthy();
    expect(getByText('$12k')).toBeTruthy();
    const delta = getByText('8');
    expect(delta.className).toContain('text-success');
  });

  it('uses the danger tone for a negative delta', () => {
    const { getByText } = render(<Statistic label="Churn" value={5} delta={-3} />);
    expect(getByText('-3').className).toContain('text-danger');
  });
});

describe('Calendar', () => {
  it('renders a grid for the given month and selects a day', () => {
    const onSelectDate = jest.fn();
    const month = new Date(2026, 0, 1); // January 2026
    const { getByText, getByRole } = render(
      <Calendar month={month} onSelectDate={onSelectDate} />
    );
    expect(getByRole('grid')).toBeTruthy();
    expect(getByText('January 2026')).toBeTruthy();
    fireEvent.click(getByText('15'));
    expect(onSelectDate).toHaveBeenCalledTimes(1);
    const arg = onSelectDate.mock.calls[0][0] as Date;
    expect(arg.getDate()).toBe(15);
  });

  it('pages the month via the next chevron', () => {
    const onMonthChange = jest.fn();
    const { getByLabelText } = render(
      <Calendar month={new Date(2026, 0, 1)} onMonthChange={onMonthChange} />
    );
    fireEvent.click(getByLabelText('Next month'));
    expect(onMonthChange).toHaveBeenCalledTimes(1);
    expect((onMonthChange.mock.calls[0][0] as Date).getMonth()).toBe(1);
  });
});

describe('Kanban', () => {
  const columns = [
    { key: 'todo', title: 'Todo', cards: [{ id: 'a', title: 'Task A' }] },
    { key: 'done', title: 'Done', cards: [] },
  ];

  it('renders columns/cards and fires onCardPress with card + column', () => {
    const onCardPress = jest.fn();
    const { getByText } = render(<Kanban columns={columns} onCardPress={onCardPress} />);
    expect(getByText('Todo')).toBeTruthy();
    expect(getByText('No cards')).toBeTruthy();
    fireEvent.click(getByText('Task A'));
    expect(onCardPress).toHaveBeenCalledTimes(1);
    expect(onCardPress.mock.calls[0][0].id).toBe('a');
    expect(onCardPress.mock.calls[0][1].key).toBe('todo');
  });
});

describe('VirtualList', () => {
  it('renders each row via renderItem', () => {
    const { getByText, getAllByRole } = render(
      <VirtualList
        data={['x', 'y', 'z']}
        keyExtractor={(it) => it}
        renderItem={(it) => <div>{`row-${it}`}</div>}
      />
    );
    expect(getAllByRole('listitem')).toHaveLength(3);
    expect(getByText('row-y')).toBeTruthy();
  });

  it('shows the empty state when data is empty', () => {
    const { getByText } = render(
      <VirtualList data={[]} emptyText="Nothing" renderItem={() => null} />
    );
    expect(getByText('Nothing')).toBeTruthy();
  });
});

describe('CodeBlock', () => {
  it('renders line numbers and copies on click', () => {
    const onCopy = jest.fn();
    const { getByText, getByLabelText } = render(
      <CodeBlock code={'const a = 1;\nconst b = 2;'} language="ts" onCopy={onCopy} />
    );
    expect(getByText('ts')).toBeTruthy();
    // Two gutter line numbers.
    expect(getByText('1')).toBeTruthy();
    expect(getByText('2')).toBeTruthy();
    fireEvent.click(getByLabelText('Copy code'));
    expect(onCopy).toHaveBeenCalledWith('const a = 1;\nconst b = 2;');
  });
});

describe('JsonViewer', () => {
  it('collapses/expands a branch on click', () => {
    const { getByText, queryByText } = render(
      <JsonViewer value={{ nested: { a: 1 } }} defaultExpandDepth={1} rootLabel="root" />
    );
    // root open at depth 0, nested branch collapsed at depth 1.
    expect(queryByText('a:')).toBeNull();
    fireEvent.click(getByText('nested:'));
    expect(queryByText('a:')).not.toBeNull();
  });
});

describe('Toolbar', () => {
  it('fires inline actions and reveals overflow actions', () => {
    const onClick = jest.fn();
    const onOverflow = jest.fn();
    const { getByText, getByLabelText, queryByText } = render(
      <Toolbar
        title="Docs"
        actions={[{ key: 'new', label: 'New', onClick }]}
        overflowActions={[{ key: 'del', label: 'Delete', onClick: onOverflow, destructive: true }]}
      />
    );
    fireEvent.click(getByText('New'));
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(queryByText('Delete')).toBeNull();
    fireEvent.click(getByLabelText('More actions'));
    fireEvent.click(getByText('Delete'));
    expect(onOverflow).toHaveBeenCalledTimes(1);
  });
});

describe('SplitButton', () => {
  it('fires the primary action and opens the caret menu', () => {
    const onClick = jest.fn();
    const onSecond = jest.fn();
    const { getByText, getByLabelText, queryByText } = render(
      <SplitButton
        label="Save"
        onClick={onClick}
        actions={[{ key: 'draft', label: 'Save as draft', onClick: onSecond }]}
      />
    );
    fireEvent.click(getByText('Save'));
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(queryByText('Save as draft')).toBeNull();
    fireEvent.click(getByLabelText('More actions'));
    fireEvent.click(getByText('Save as draft'));
    expect(onSecond).toHaveBeenCalledTimes(1);
  });
});

describe('ScrollableTabs', () => {
  function Harness() {
    const [value, setValue] = useState('one');
    return (
      <>
        <ScrollableTabs
          value={value}
          onValueChange={setValue}
          items={[
            { value: 'one', label: 'One' },
            { value: 'two', label: 'Two', badge: 3 },
          ]}
        />
        <span>active:{value}</span>
      </>
    );
  }

  it('changes the active tab on click and reflects aria-selected', () => {
    const { getByText, getByRole } = render(<Harness />);
    expect(getByText('active:one')).toBeTruthy();
    fireEvent.click(getByText('Two'));
    expect(getByText('active:two')).toBeTruthy();
    const tab = getByRole('tab', { selected: true });
    expect(tab.textContent).toContain('Two');
  });
});
