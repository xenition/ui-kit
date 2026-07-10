import * as React from 'react';
import { Text } from 'react-native';
import { act, fireEvent } from '@testing-library/react-native';
import { SEED_LIGHT, renderThemed } from '../spec-support/render-native';
import { Drawer } from './Drawer';
import { Popover } from './Popover';
import { Menu } from './Menu';
import { Accordion } from './Accordion';
import { Popconfirm } from './Popconfirm';
import { Tooltip } from './Tooltip';

describe('Drawer (native)', () => {
  // The Drawer runs an Animated.timing on open; drive it with fake timers so the
  // animation frames settle inside the test instead of firing after teardown.
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => {
    act(() => {
      jest.runAllTimers();
    });
    jest.useRealTimers();
  });

  it('renders title + children only when open, and closes on backdrop press', () => {
    const closed = renderThemed(
      <Drawer open={false} onClose={() => {}} title="Filters">
        <Text>panel body</Text>
      </Drawer>,
      SEED_LIGHT
    );
    expect(closed.queryByText('panel body')).toBeNull();

    const onClose = jest.fn();
    const { getByText, getByLabelText } = renderThemed(
      <Drawer open onClose={onClose} side="left" title="Filters">
        <Text>panel body</Text>
      </Drawer>,
      SEED_LIGHT
    );
    // Settle the slide-in animation before asserting.
    act(() => {
      jest.runAllTimers();
    });
    expect(getByText('Filters')).toBeTruthy();
    expect(getByText('panel body')).toBeTruthy();
    // The panel sets accessibilityViewIsModal, so its sibling backdrop "Close" is
    // hidden from default queries — opt into hidden elements to reach it.
    fireEvent.press(getByLabelText('Close', { includeHiddenElements: true }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});

describe('Popover (native)', () => {
  it('reveals its panel when the trigger is pressed', () => {
    const { getByText, queryByText } = renderThemed(
      <Popover trigger={<Text>Open</Text>}>
        <Text>popover panel</Text>
      </Popover>,
      SEED_LIGHT
    );
    expect(queryByText('popover panel')).toBeNull();
    fireEvent.press(getByText('Open'));
    expect(getByText('popover panel')).toBeTruthy();
  });

  it('reports open state through onOpenChange', () => {
    const onOpenChange = jest.fn();
    const { getByText } = renderThemed(
      <Popover trigger={<Text>Open</Text>} onOpenChange={onOpenChange}>
        <Text>panel</Text>
      </Popover>,
      SEED_LIGHT
    );
    fireEvent.press(getByText('Open'));
    expect(onOpenChange).toHaveBeenCalledWith(true);
  });
});

describe('Menu (native)', () => {
  it('opens on trigger press and fires the item onSelect', () => {
    const onSelect = jest.fn();
    const { getByText, queryByText } = renderThemed(
      <Menu
        trigger={<Text>Actions</Text>}
        items={[
          { label: 'Edit', onSelect },
          { label: 'Delete', danger: true },
        ]}
      />,
      SEED_LIGHT
    );
    expect(queryByText('Edit')).toBeNull();
    fireEvent.press(getByText('Actions'));
    expect(getByText('Edit')).toBeTruthy();
    fireEvent.press(getByText('Edit'));
    expect(onSelect).toHaveBeenCalledTimes(1);
  });
});

describe('Accordion (native)', () => {
  it('expands a section on press and keeps only one open in single mode', () => {
    const { getByText, queryByText } = renderThemed(
      <Accordion
        items={[
          { value: 'a', title: 'Section A', content: 'body A' },
          { value: 'b', title: 'Section B', content: 'body B' },
        ]}
      />,
      SEED_LIGHT
    );
    expect(queryByText('body A')).toBeNull();
    fireEvent.press(getByText('Section A'));
    expect(getByText('body A')).toBeTruthy();
    fireEvent.press(getByText('Section B'));
    expect(getByText('body B')).toBeTruthy();
    expect(queryByText('body A')).toBeNull(); // single mode closes A
  });
});

describe('Popconfirm (native)', () => {
  it('shows the message on trigger press and fires onConfirm', () => {
    const onConfirm = jest.fn();
    const { getByText, queryByText } = renderThemed(
      <Popconfirm trigger={<Text>Delete</Text>} message="Are you sure?" onConfirm={onConfirm} />,
      SEED_LIGHT
    );
    expect(queryByText('Are you sure?')).toBeNull();
    fireEvent.press(getByText('Delete'));
    expect(getByText('Are you sure?')).toBeTruthy();
    fireEvent.press(getByText('Confirm'));
    expect(onConfirm).toHaveBeenCalledTimes(1);
  });
});

describe('Tooltip (native)', () => {
  it('reveals its label on press (native press-vs-hover)', () => {
    const { getByText, queryByText } = renderThemed(
      <Tooltip label="Helpful tip">
        <Text>info</Text>
      </Tooltip>,
      SEED_LIGHT
    );
    expect(queryByText('Helpful tip')).toBeNull();
    fireEvent.press(getByText('info'));
    expect(getByText('Helpful tip')).toBeTruthy();
  });
});
