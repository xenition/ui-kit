import * as React from 'react';
import { Text } from 'react-native';
import { act, fireEvent } from '@testing-library/react-native';
import { SEED_LIGHT, renderThemed } from '../spec-support/render-native';
import { Drawer } from './Drawer';
import { Popover } from './Popover';
import { Menu } from './Menu';
import { Accordion } from './Accordion';
import { Button } from './Button';
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

  /*
    The two tests above pass a bare `<Text>`, and that is exactly why the real bug
    shipped. A kit `Button` is itself a `Pressable`, and on native the deepest
    `Pressable` under the finger wins the touch responder — so while Popover
    wrapped the trigger in its own `Pressable`, a `Button` trigger swallowed the
    tap and the panel never opened. Anything the kit ships as a trigger has to be
    exercised as a trigger; a `<Text>` proves only that inert children work.
  */
  it('opens from a kit Button trigger, and still runs the trigger own onPress', () => {
    const onPress = jest.fn();
    const { getByText, queryByText } = renderThemed(
      <Popover trigger={<Button onPress={onPress}>Open</Button>}>
        <Text>popover panel</Text>
      </Popover>,
      SEED_LIGHT
    );
    expect(queryByText('popover panel')).toBeNull();
    fireEvent.press(getByText('Open'));
    expect(getByText('popover panel')).toBeTruthy();
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('does not open from a disabled trigger', () => {
    const { getByText, queryByText } = renderThemed(
      <Popover trigger={<Button disabled>Open</Button>}>
        <Text>popover panel</Text>
      </Popover>,
      SEED_LIGHT
    );
    fireEvent.press(getByText('Open'));
    expect(queryByText('popover panel')).toBeNull();
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

  // Same regression as Popover/Popconfirm: the test above passes a bare `<Text>`,
  // which cannot steal the touch responder, so it never saw that a kit `Button`
  // trigger did — and left the menu unopenable.
  it('opens from a kit Button trigger, and still runs the trigger own onPress', () => {
    const onPress = jest.fn();
    const { getByText, queryByText } = renderThemed(
      <Menu trigger={<Button onPress={onPress}>Actions</Button>} items={[{ label: 'Edit' }]} />,
      SEED_LIGHT
    );
    expect(queryByText('Edit')).toBeNull();
    fireEvent.press(getByText('Actions'));
    expect(getByText('Edit')).toBeTruthy();
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('does not open from a disabled trigger', () => {
    const { getByText, queryByText } = renderThemed(
      <Menu trigger={<Button disabled>Actions</Button>} items={[{ label: 'Edit' }]} />,
      SEED_LIGHT
    );
    fireEvent.press(getByText('Actions'));
    expect(queryByText('Edit')).toBeNull();
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

  /*
    The test above passes a bare `<Text>`, and that is exactly why the real bug
    shipped. A kit `Button` is itself a `Pressable`, and on native the deepest
    `Pressable` under the finger wins the touch responder — so while Popconfirm
    wrapped the trigger in its own `Pressable`, a `Button` trigger swallowed the
    tap and the bubble never opened. Anything the kit ships as a trigger has to be
    exercised as a trigger; a `<Text>` proves only that inert children work.
  */
  it('opens from a kit Button trigger, and still runs the trigger own onPress', () => {
    const onPress = jest.fn();
    const { getByText, queryByText } = renderThemed(
      <Popconfirm
        trigger={<Button onPress={onPress}>Delete</Button>}
        message="Are you sure?"
        onConfirm={() => {}}
      />,
      SEED_LIGHT
    );
    expect(queryByText('Are you sure?')).toBeNull();
    fireEvent.press(getByText('Delete'));
    expect(getByText('Are you sure?')).toBeTruthy();
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('does not open from a disabled trigger', () => {
    const { getByText, queryByText } = renderThemed(
      <Popconfirm
        trigger={<Button disabled>Delete</Button>}
        message="Are you sure?"
        onConfirm={() => {}}
      />,
      SEED_LIGHT
    );
    fireEvent.press(getByText('Delete'));
    expect(queryByText('Are you sure?')).toBeNull();
  });
});

describe('Tooltip (native)', () => {
  it('reveals its label on long-press (native long-press-vs-hover)', () => {
    const { getByText, queryByText } = renderThemed(
      <Tooltip label="Helpful tip">
        <Text>info</Text>
      </Tooltip>,
      SEED_LIGHT
    );
    expect(queryByText('Helpful tip')).toBeNull();
    fireEvent(getByText('info'), 'longPress');
    expect(getByText('Helpful tip')).toBeTruthy();
  });

  /*
    Tooltip had the same swallowed-tap bug as its three siblings — a kit `Button`
    child took the touch responder and the tip never appeared — but not the same
    fix. A tooltip is not an action: on web it comes up on hover, which activates
    nothing, so on native it comes up on long-press and the control keeps its own
    press. These two tests pin both halves of that.
  */
  it('reveals its label from a kit Button child without stealing its press', () => {
    const onPress = jest.fn();
    const { getByText, queryByText } = renderThemed(
      <Tooltip label="Helpful tip">
        <Button onPress={onPress}>Save</Button>
      </Tooltip>,
      SEED_LIGHT
    );
    // A plain press is the control's own — it acts, and no tip appears over it.
    fireEvent.press(getByText('Save'));
    expect(onPress).toHaveBeenCalledTimes(1);
    expect(queryByText('Helpful tip')).toBeNull();
    // Long-press is the tooltip's gesture.
    fireEvent(getByText('Save'), 'longPress');
    expect(getByText('Helpful tip')).toBeTruthy();
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('shows nothing from a disabled child', () => {
    const { getByText, queryByText } = renderThemed(
      <Tooltip label="Helpful tip">
        <Button disabled>Save</Button>
      </Tooltip>,
      SEED_LIGHT
    );
    fireEvent(getByText('Save'), 'longPress');
    expect(queryByText('Helpful tip')).toBeNull();
  });
});
