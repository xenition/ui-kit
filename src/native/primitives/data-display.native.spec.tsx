import * as React from 'react';
import { fireEvent } from '@testing-library/react-native';
import { SEED_LIGHT, renderThemed } from '../spec-support/render-native';
import { Tag } from './Tag';
import { List } from './List';
import { Pagination } from './Pagination';
import { Timeline } from './Timeline';
import { Descriptions } from './Descriptions';
import { AvatarGroup } from './AvatarGroup';
import { Segmented } from './Segmented';
import { Steps } from './Steps';
import { Breadcrumb } from './Breadcrumb';

describe('data-display primitives (native)', () => {
  it('Tag renders its label and fires onRemove when the × is pressed', () => {
    const onRemove = jest.fn();
    const { getByText } = renderThemed(
      <Tag tone="primary" onRemove={onRemove}>
        Design
      </Tag>,
      SEED_LIGHT
    );
    expect(getByText('Design')).toBeTruthy();
    fireEvent.press(getByText('×'));
    expect(onRemove).toHaveBeenCalledTimes(1);
  });

  it('List renders rows and fires onPress for a pressable row', () => {
    const onPress = jest.fn();
    const { getByText } = renderThemed(
      <List
        items={[
          { title: 'Inbox', description: '3 unread', onPress },
          { title: 'Archive' },
        ]}
      />,
      SEED_LIGHT
    );
    expect(getByText('3 unread')).toBeTruthy();
    fireEvent.press(getByText('Inbox'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('Pagination renders pages, truncates with an ellipsis, and fires onPageChange', () => {
    const onPageChange = jest.fn();
    const { getByText } = renderThemed(
      <Pagination page={1} pageCount={10} onPageChange={onPageChange} />,
      SEED_LIGHT
    );
    expect(getByText('…')).toBeTruthy();
    expect(getByText('10')).toBeTruthy();
    fireEvent.press(getByText('10'));
    expect(onPageChange).toHaveBeenCalledWith(10);
    // single page collapses to null
    const solo = renderThemed(<Pagination page={1} pageCount={1} onPageChange={onPageChange} />, SEED_LIGHT);
    expect(solo.toJSON()).toBeNull();
  });

  it('Timeline renders each item title and description', () => {
    const { getByText } = renderThemed(
      <Timeline
        items={[
          { title: 'Created', description: 'by Ana', tone: 'success' },
          { title: 'Shipped', time: '2h ago', tone: 'warn' },
        ]}
      />,
      SEED_LIGHT
    );
    expect(getByText('Created')).toBeTruthy();
    expect(getByText('Shipped')).toBeTruthy();
    expect(getByText('2h ago')).toBeTruthy();
  });

  it('Descriptions renders label/value pairs across columns', () => {
    const { getByText } = renderThemed(
      <Descriptions
        columns={2}
        items={[
          { label: 'Name', value: 'Ada Lovelace' },
          { label: 'Role', value: 'Engineer' },
        ]}
      />,
      SEED_LIGHT
    );
    expect(getByText('Name')).toBeTruthy();
    expect(getByText('Ada Lovelace')).toBeTruthy();
    expect(getByText('Engineer')).toBeTruthy();
  });

  it('AvatarGroup shows a +N overflow chip beyond max', () => {
    const { getByText } = renderThemed(
      <AvatarGroup
        max={2}
        avatars={[{ name: 'A B' }, { name: 'C D' }, { name: 'E F' }, { name: 'G H' }]}
      />,
      SEED_LIGHT
    );
    expect(getByText('+2')).toBeTruthy();
  });

  it('Segmented renders options and fires onChange on press', () => {
    const onChange = jest.fn();
    const { getByText } = renderThemed(
      <Segmented
        value="list"
        onChange={onChange}
        options={[
          { label: 'List', value: 'list' },
          { label: 'Grid', value: 'grid' },
        ]}
      />,
      SEED_LIGHT
    );
    expect(getByText('List')).toBeTruthy();
    fireEvent.press(getByText('Grid'));
    expect(onChange).toHaveBeenCalledWith('grid');
  });

  it('Steps renders each step title and marks completed steps', () => {
    const { getByText } = renderThemed(
      <Steps
        current={1}
        steps={[{ title: 'Cart' }, { title: 'Shipping' }, { title: 'Pay' }]}
      />,
      SEED_LIGHT
    );
    expect(getByText('Cart')).toBeTruthy();
    expect(getByText('Shipping')).toBeTruthy();
    // step 0 is done → rendered as a check
    expect(getByText('✓')).toBeTruthy();
  });

  it('Breadcrumb renders the trail and fires onPress on a non-terminal link', () => {
    const onPress = jest.fn();
    const { getByText, getAllByText } = renderThemed(
      <Breadcrumb
        items={[
          { label: 'Home', onPress },
          { label: 'Docs', onPress: jest.fn() },
          { label: 'Page' },
        ]}
      />,
      SEED_LIGHT
    );
    expect(getByText('Page')).toBeTruthy();
    expect(getAllByText('/')).toHaveLength(2);
    fireEvent.press(getByText('Home'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
