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
import { toNativeTokens } from '../../theme/outputs';
import { DeviceTile } from './DeviceTile';
import { ThermostatDial } from './ThermostatDial';
import { LightControl } from './LightControl';
import { SceneCard } from './SceneCard';
import { SensorReading } from './SensorReading';
import { LockControl } from './LockControl';
import { CameraTile } from './CameraTile';
import { RoomGroup, type RoomDevice } from './RoomGroup';
import { ScheduleRow } from './ScheduleRow';

const flatten = (style: unknown): Record<string, unknown> =>
  (StyleSheet.flatten(style as never) ?? {}) as Record<string, unknown>;

const lightColors = toNativeTokens(compileTheme(SEED_LIGHT)).colors.light;

describe('DeviceTile (native)', () => {
  it('renders name + status and toggles the device on', () => {
    const onToggle = jest.fn();
    const { getByText, getByLabelText } = renderThemed(
      <DeviceTile name="Living Lamp" icon="💡" state="off" subtitle="Dimmable" onToggle={onToggle} />,
      SEED_LIGHT
    );
    expect(getByText('Living Lamp')).toBeTruthy();
    expect(getByText('Off')).toBeTruthy();
    // Interaction: press the switch → requests the on state.
    fireEvent.press(getByLabelText('Living Lamp power'));
    expect(onToggle).toHaveBeenCalledWith(true);
  });

  it('disables the switch when unavailable and shows an offline label', () => {
    const onToggle = jest.fn();
    const { getByText, getByLabelText } = renderThemed(
      <DeviceTile name="Hall Plug" state="unavailable" onToggle={onToggle} />,
      SEED_DARK
    );
    expect(getByText('Offline')).toBeTruthy();
    fireEvent.press(getByLabelText('Hall Plug power'));
    expect(onToggle).not.toHaveBeenCalled();
  });

  it('renders a loading placeholder', () => {
    expect(renderThemed(<DeviceTile name="X" loading />, SEED_LIGHT).toJSON()).toBeTruthy();
  });
});

describe('ThermostatDial (native)', () => {
  it('mounts and raises the setpoint by one step', () => {
    const onChange = jest.fn();
    const { getByText, getByLabelText } = renderThemed(
      <ThermostatDial target={21} ambient={19} mode="heat" min={10} max={30} step={0.5} onTargetChange={onChange} />,
      SEED_LIGHT
    );
    expect(getByText('21°')).toBeTruthy();
    expect(getByText('Heating')).toBeTruthy();
    // Interaction: bump target up by step.
    fireEvent.press(getByLabelText('Raise target temperature'));
    expect(onChange).toHaveBeenCalledWith(21.5);
  });

  it('blocks changes when offline', () => {
    const onChange = jest.fn();
    const { getByLabelText } = renderThemed(
      <ThermostatDial target={21} mode="cool" offline onTargetChange={onChange} />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText('Raise target temperature'));
    expect(onChange).not.toHaveBeenCalled();
  });
});

describe('SensorReading (native)', () => {
  it('colors a danger reading with the danger token (paired with a text chip)', () => {
    const { getByText } = renderThemed(
      <SensorReading label="CO₂" value={1450} unit="ppm" status="danger" />,
      SEED_LIGHT
    );
    // Token color assertion: value uses the danger slot.
    expect(flatten(getByText('1450').props.style).color).toBe(lightColors.danger);
    // Not color-alone: a text status chip is present.
    expect(getByText('Alert')).toBeTruthy();
  });

  it('shows an em dash when offline', () => {
    const { getByText } = renderThemed(
      <SensorReading label="Humidity" value={50} unit="%" status="offline" />,
      SEED_DARK
    );
    expect(getByText('—')).toBeTruthy();
  });
});

describe('LockControl (native)', () => {
  it('unlocks a locked door via the action button', () => {
    const onToggle = jest.fn();
    const { getByText } = renderThemed(
      <LockControl name="Front Door" state="locked" batteryPct={88} onToggle={onToggle} />,
      SEED_LIGHT
    );
    expect(getByText('Locked')).toBeTruthy();
    // Interaction: press Unlock → requests unlocked (false).
    fireEvent.press(getByText('Unlock'));
    expect(onToggle).toHaveBeenCalledWith(false);
  });

  it('is non-actionable when offline', () => {
    const onToggle = jest.fn();
    const { getByText } = renderThemed(
      <LockControl name="Back Door" state="offline" onToggle={onToggle} />,
      SEED_LIGHT
    );
    fireEvent.press(getByText('Unavailable'));
    expect(onToggle).not.toHaveBeenCalled();
  });
});

describe('SceneCard (native)', () => {
  it('activates on press and marks the active scene', () => {
    const onActivate = jest.fn();
    const { getByText } = renderThemed(
      <SceneCard name="Movie Night" icon="🎬" description="Dim lights, close blinds" deviceCount={4} active onActivate={onActivate} />,
      SEED_LIGHT
    );
    expect(getByText('Movie Night')).toBeTruthy();
    expect(getByText('Active')).toBeTruthy();
    expect(getByText('4 devices')).toBeTruthy();
    fireEvent.press(getByText('Movie Night'));
    expect(onActivate).toHaveBeenCalledTimes(1);
  });
});

describe('LightControl (native)', () => {
  it('mounts with brightness + color-temp rows and toggles power', () => {
    const onToggle = jest.fn();
    const { getByText, getByLabelText } = renderThemed(
      <LightControl name="Kitchen" on brightness={72} colorTemp={40} onToggle={onToggle} />,
      SEED_LIGHT
    );
    expect(getByText('72%')).toBeTruthy();
    expect(getByText('Warm')).toBeTruthy();
    fireEvent.press(getByLabelText('Kitchen power'));
    expect(onToggle).toHaveBeenCalledWith(false);
  });
});

describe('CameraTile (native)', () => {
  it('labels live and offline states with text', () => {
    const live = renderThemed(<CameraTile name="Front Door" online recording timestamp="Live" />, SEED_LIGHT);
    expect(live.getByText('LIVE')).toBeTruthy();
    expect(live.getByText('REC')).toBeTruthy();
    const off = renderThemed(<CameraTile name="Garage" online={false} />, SEED_DARK);
    expect(off.getByText('OFFLINE')).toBeTruthy();
  });
});

describe('RoomGroup (native)', () => {
  const devices: RoomDevice[] = [
    { id: 'a', label: 'Ceiling', icon: '💡', on: true },
    { id: 'b', label: 'Lamp', icon: '💡', on: false },
    { id: 'c', label: 'Fan', icon: '🌀', on: false, offline: true },
  ];

  it('summarizes on-count and toggles a single device', () => {
    const onDeviceToggle = jest.fn();
    const { getByText, getByLabelText } = renderThemed(
      <RoomGroup name="Living Room" devices={devices} onDeviceToggle={onDeviceToggle} />,
      SEED_LIGHT
    );
    expect(getByText('Living Room')).toBeTruthy();
    expect(getByText('1 of 2 on · 1 offline')).toBeTruthy();
    fireEvent.press(getByLabelText('Lamp'));
    expect(onDeviceToggle).toHaveBeenCalledWith('b', true);
  });

  it('renders an empty state when the room has no devices', () => {
    const { getByText, queryByText } = renderThemed(
      <RoomGroup name="Attic" devices={[]} emptyTitle="Nothing up here yet" />,
      SEED_DARK
    );
    expect(getByText('Nothing up here yet')).toBeTruthy();
    expect(queryByText('Ceiling')).toBeNull();
  });
});

describe('ScheduleRow (native)', () => {
  it('renders time + day chips and toggles enablement', () => {
    const onToggle = jest.fn();
    const { getByText, getByLabelText } = renderThemed(
      <ScheduleRow label="Wake-up lights" time="06:30" days={['Mon', 'Tue', 'Wed']} enabled onToggle={onToggle} />,
      SEED_LIGHT
    );
    expect(getByText('06:30')).toBeTruthy();
    expect(getByText('Mon')).toBeTruthy();
    fireEvent.press(getByLabelText('Wake-up lights schedule'));
    expect(onToggle).toHaveBeenCalledWith(false);
  });
});

describe('token purity (native smarthome, both seeds)', () => {
  it('every rendered style hex traces to a compiled token', () => {
    [SEED_LIGHT, SEED_DARK].forEach((seed) => {
      const { root } = renderThemed(
        <>
          <DeviceTile name="Lamp" icon="💡" state="on" subtitle="On" />
          <ThermostatDial target={22} ambient={20} mode="heat" />
          <LightControl name="Kitchen" on brightness={60} colorTemp={50} />
          <SceneCard name="Away" icon="🌙" description="All off" deviceCount={6} active />
          <SensorReading label="Temp" value={21} unit="°C" status="warn" trend="↑ 1°" />
          <LockControl name="Front" state="locked" batteryPct={12} />
          <CameraTile name="Yard" online recording timestamp="Live" />
          <RoomGroup name="Den" devices={[{ id: 'a', label: 'Light', on: true }]} />
          <RoomGroup name="Empty" devices={[]} />
          <ScheduleRow label="Night" time="22:00" days={['Fri', 'Sat']} enabled />
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
