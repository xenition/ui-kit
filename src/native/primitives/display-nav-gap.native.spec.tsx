import * as React from 'react';
import { Text } from 'react-native';
import { fireEvent } from '@testing-library/react-native';
import { SEED_LIGHT, SEED_DARK, renderThemed, tokenHexSet, renderedStyleHexes } from '../spec-support/render-native';
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

describe('display + nav gap primitives (native)', () => {
  it('Tree expands a branch on press and fires onSelect with the node', () => {
    const onSelect = jest.fn();
    const { getByText, queryByText } = renderThemed(
      <Tree
        data={[{ id: 'root', label: 'Root', children: [{ id: 'child', label: 'Child' }] }]}
        onSelect={onSelect}
      />,
      SEED_LIGHT
    );
    // collapsed: child not visible
    expect(queryByText('Child')).toBeNull();
    fireEvent.press(getByText('Root'));
    expect(onSelect).toHaveBeenCalledWith(expect.objectContaining({ id: 'root' }));
    expect(getByText('Child')).toBeTruthy();
  });

  it('Statistic renders label, value and an inferred-up delta', () => {
    const { getByText } = renderThemed(
      <Statistic label="Revenue" value="$12.4k" delta={8} suffix="MoM" />,
      SEED_LIGHT
    );
    expect(getByText('Revenue')).toBeTruthy();
    expect(getByText('$12.4k')).toBeTruthy();
    expect(getByText('8')).toBeTruthy();
    expect(getByText('▲')).toBeTruthy();
  });

  it('Calendar renders the month header and fires onSelectDate on a day tap', () => {
    const onSelectDate = jest.fn();
    const { getByText } = renderThemed(
      <Calendar month={new Date(2026, 0, 1)} onSelectDate={onSelectDate} />,
      SEED_LIGHT
    );
    expect(getByText('January 2026')).toBeTruthy();
    fireEvent.press(getByText('15'));
    expect(onSelectDate).toHaveBeenCalledTimes(1);
    expect(onSelectDate.mock.calls[0]?.[0]?.getDate()).toBe(15);
  });

  it('Kanban renders columns with counts and fires onCardPress', () => {
    const onCardPress = jest.fn();
    const { getByText } = renderThemed(
      <Kanban
        onCardPress={onCardPress}
        columns={[
          { key: 'todo', title: 'To do', cards: [{ id: 'a', title: 'Task A' }] },
          { key: 'done', title: 'Done', cards: [] },
        ]}
      />,
      SEED_LIGHT
    );
    expect(getByText('To do')).toBeTruthy();
    expect(getByText('No cards')).toBeTruthy();
    fireEvent.press(getByText('Task A'));
    expect(onCardPress).toHaveBeenCalledTimes(1);
  });

  it('VirtualList renders rows via renderItem and shows the empty state', () => {
    const { getByText } = renderThemed(
      <VirtualList
        data={[{ id: '1', name: 'Alpha' }]}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Text>{item.name}</Text>}
      />,
      SEED_LIGHT
    );
    expect(getByText('Alpha')).toBeTruthy();

    const empty = renderThemed(
      <VirtualList data={[]} renderItem={() => null} emptyText="Nothing" />,
      SEED_LIGHT
    );
    expect(empty.getByText('Nothing')).toBeTruthy();
  });

  it('CodeBlock renders numbered lines and fires onCopy with the source', () => {
    const onCopy = jest.fn();
    const { getByText } = renderThemed(
      <CodeBlock code={"const a = 1;\nconst b = 2;"} language="ts" onCopy={onCopy} />,
      SEED_LIGHT
    );
    expect(getByText('ts')).toBeTruthy();
    expect(getByText('const a = 1;')).toBeTruthy();
    fireEvent.press(getByText('Copy'));
    expect(onCopy).toHaveBeenCalledWith('const a = 1;\nconst b = 2;');
  });

  it('JsonViewer renders keys and toggles a branch open on press', () => {
    const { getByText, queryByText } = renderThemed(
      <JsonViewer value={{ user: { name: 'Ada' } }} defaultExpandDepth={1} />,
      SEED_LIGHT
    );
    // depth 1 open shows `user`, but nested `name` is collapsed
    expect(getByText('user:')).toBeTruthy();
    expect(queryByText('name:')).toBeNull();
    fireEvent.press(getByText('user:'));
    expect(getByText('name:')).toBeTruthy();
  });

  it('Toolbar renders a title, inline action, and reveals overflow actions', () => {
    const onArchive = jest.fn();
    const { getByText, queryByText, getByLabelText } = renderThemed(
      <Toolbar
        title="Files"
        actions={[{ key: 'new', label: 'New', onPress: jest.fn() }]}
        overflowActions={[{ key: 'archive', label: 'Archive', onPress: onArchive }]}
      />,
      SEED_LIGHT
    );
    expect(getByText('Files')).toBeTruthy();
    expect(getByText('New')).toBeTruthy();
    expect(queryByText('Archive')).toBeNull();
    fireEvent.press(getByLabelText('More actions'));
    fireEvent.press(getByText('Archive'));
    expect(onArchive).toHaveBeenCalledTimes(1);
  });

  it('SplitButton fires the primary action and opens its secondary menu', () => {
    const onPrimary = jest.fn();
    const onDup = jest.fn();
    const { getByText, queryByText, getByLabelText } = renderThemed(
      <SplitButton
        label="Save"
        onPress={onPrimary}
        actions={[{ key: 'dup', label: 'Duplicate', onPress: onDup }]}
      />,
      SEED_LIGHT
    );
    fireEvent.press(getByText('Save'));
    expect(onPrimary).toHaveBeenCalledTimes(1);
    expect(queryByText('Duplicate')).toBeNull();
    fireEvent.press(getByLabelText('More actions'));
    fireEvent.press(getByText('Duplicate'));
    expect(onDup).toHaveBeenCalledTimes(1);
  });

  it('ScrollableTabs renders tabs with a badge and fires onValueChange', () => {
    const onValueChange = jest.fn();
    const { getByText } = renderThemed(
      <ScrollableTabs
        value="all"
        onValueChange={onValueChange}
        items={[
          { value: 'all', label: 'All' },
          { value: 'unread', label: 'Unread', badge: 3 },
        ]}
      />,
      SEED_LIGHT
    );
    expect(getByText('All')).toBeTruthy();
    expect(getByText('3')).toBeTruthy();
    fireEvent.press(getByText('Unread'));
    expect(onValueChange).toHaveBeenCalledWith('unread');
  });

  it('every rendered color traces to a theme token (no hardcoded hex)', () => {
    [SEED_LIGHT, SEED_DARK].forEach((seed) => {
      const allowed = tokenHexSet(seed);
      const { root } = renderThemed(
        <>
          <Tree data={[{ id: 'r', label: 'R', children: [{ id: 'c', label: 'C' }] }]} defaultExpanded={['r']} selectedId="r" />
          <Statistic label="Users" value="1,204" delta={-3} />
          <Calendar month={new Date(2026, 5, 1)} selected={new Date(2026, 5, 10)} marks={[new Date(2026, 5, 12)]} />
          <Kanban columns={[{ key: 'k', title: 'K', cards: [{ id: 'x', title: 'X', description: 'd' }] }]} />
          <CodeBlock code={'a\nb'} language="js" onCopy={jest.fn()} />
          <JsonViewer value={{ a: 1, b: 'two', c: true, d: null }} defaultExpandDepth={2} />
          <Toolbar title="T" actions={[{ key: 'a', label: 'A' }]} overflowActions={[{ key: 'o', label: 'O' }]} />
          <SplitButton label="S" actions={[{ key: 'd', label: 'D', destructive: true }]} />
          <ScrollableTabs value="a" onValueChange={jest.fn()} items={[{ value: 'a', label: 'A', badge: 1 }, { value: 'b', label: 'B' }]} />
        </>,
        seed
      );
      renderedStyleHexes(root).forEach((hex) => expect(allowed.has(hex)).toBe(true));
    });
  });
});
