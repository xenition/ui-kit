/** @jest-environment jsdom */
import { render, fireEvent } from '@testing-library/react';
import { createRef } from 'react';
import {
  DeviceTile,
  ThermostatDial,
  LightControl,
  SceneCard,
  SensorReading,
  AutomationRule,
  EnergyUsage,
  CameraTile,
  LockControl,
  RoomGroup,
  ScheduleRow,
  type RoomDevice,
} from './index';

describe('smarthome (web)', () => {
  it('DeviceTile renders name + status label and toggles without a nested-button violation', () => {
    const onToggle = jest.fn();
    const { getByText, getByRole } = render(
      <DeviceTile name="Living Room Lamp" state="on" subtitle="72% brightness" onToggle={onToggle} />
    );
    expect(getByText('Living Room Lamp')).toBeTruthy();
    // Status is textual, not color-only.
    expect(getByText('On')).toBeTruthy();
    const sw = getByRole('switch');
    expect(sw.getAttribute('aria-checked')).toBe('true');
    fireEvent.click(sw);
    expect(onToggle).toHaveBeenCalledWith(false);
  });

  it('DeviceTile shows a loading skeleton (aria-busy) instead of content', () => {
    const { container } = render(<DeviceTile name="X" loading />);
    expect(container.querySelector('[aria-busy="true"]')).not.toBeNull();
  });

  it('ThermostatDial draws a token-bound arc and steps the target', () => {
    const onTargetChange = jest.fn();
    const { container, getByLabelText, getByText } = render(
      <ThermostatDial target={21} ambient={19} mode="heat" onTargetChange={onTargetChange} />
    );
    // Value arc stroke references a token var, never a literal color.
    const strokes = Array.from(container.querySelectorAll('path')).map((p) => p.getAttribute('stroke'));
    expect(strokes).toContain('var(--xen-danger)');
    expect(getByText('21°')).toBeTruthy();
    fireEvent.click(getByLabelText('Raise target temperature'));
    expect(onTargetChange).toHaveBeenCalledWith(21.5);
    fireEvent.click(getByLabelText('Lower target temperature'));
    expect(onTargetChange).toHaveBeenCalledWith(20.5);
  });

  it('ThermostatDial guards divide-by-zero when min === max', () => {
    // Should not throw and should clamp to the single valid setpoint.
    const { getByText } = render(<ThermostatDial target={25} min={20} max={20} />);
    expect(getByText('20°')).toBeTruthy();
  });

  it('LightControl toggles power and exposes a disabled slider when off', () => {
    const onToggle = jest.fn();
    const { getByRole, container } = render(
      <LightControl name="Kitchen" on={false} brightness={40} onToggle={onToggle} />
    );
    fireEvent.click(getByRole('switch'));
    expect(onToggle).toHaveBeenCalledWith(true);
    const slider = container.querySelector('input[type="range"]') as HTMLInputElement;
    expect(slider.disabled).toBe(true);
  });

  it('SceneCard is a role=button surface firing onActivate', () => {
    const onActivate = jest.fn();
    const { getByRole } = render(<SceneCard name="Movie Night" active onActivate={onActivate} />);
    const btn = getByRole('button');
    expect(btn.getAttribute('aria-pressed')).toBe('true');
    fireEvent.click(btn);
    expect(onActivate).toHaveBeenCalledTimes(1);
  });

  it('SensorReading shows a token value color class + a status chip', () => {
    const { getByText } = render(<SensorReading label="CO₂" value={1200} unit="ppm" status="danger" />);
    expect(getByText('Alert')).toBeTruthy();
    const value = getByText('1200');
    expect(value.className).toContain('text-danger');
  });

  it('AutomationRule renders when → then and toggles enabled', () => {
    const onToggle = jest.fn();
    const { getByText, getByRole } = render(
      <AutomationRule name="Sunset" trigger="When sunset" action="Turn off lights" enabled onToggle={onToggle} />
    );
    expect(getByText('When sunset')).toBeTruthy();
    expect(getByText('→')).toBeTruthy();
    fireEvent.click(getByRole('switch'));
    expect(onToggle).toHaveBeenCalledWith(false);
  });

  it('EnergyUsage renders a BarChart with data and an empty line without', () => {
    const withData = render(<EnergyUsage data={[2, 4, 3]} labels={['M', 'T', 'W']} total={9} unit="kWh" />);
    expect(withData.container.querySelectorAll('rect').length).toBe(3);
    const empty = render(<EnergyUsage data={[]} />);
    expect(empty.getByText('No usage data yet')).toBeTruthy();
  });

  it('CameraTile is a button with a textual LIVE/OFFLINE status', () => {
    const onClick = jest.fn();
    const { getByRole, getByText } = render(<CameraTile name="Front Door" online recording onClick={onClick} />);
    expect(getByText('LIVE')).toBeTruthy();
    expect(getByText('REC')).toBeTruthy();
    fireEvent.click(getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('LockControl flips the action label and fires the lock/unlock request', () => {
    const onToggle = jest.fn();
    const { getByRole, getByText, rerender } = render(
      <LockControl name="Front Door" state="locked" batteryPct={12} onToggle={onToggle} />
    );
    // Locked → the action offers to Unlock.
    const btn = getByRole('button');
    expect(btn.textContent).toBe('Unlock');
    fireEvent.click(btn);
    expect(onToggle).toHaveBeenCalledWith(false);
    // Status is textual and the low battery hint shows.
    expect(getByText('Locked')).toBeTruthy();
    expect(getByText('🔋 12%')).toBeTruthy();

    rerender(<LockControl name="Front Door" state="unlocked" onToggle={onToggle} />);
    expect(getByRole('button').textContent).toBe('Lock');
    fireEvent.click(getByRole('button'));
    expect(onToggle).toHaveBeenCalledWith(true);
  });

  it('LockControl disables the button when offline', () => {
    const { getByRole } = render(<LockControl name="Back Door" state="offline" />);
    expect((getByRole('button') as HTMLButtonElement).disabled).toBe(true);
  });

  it('RoomGroup renders rows, summarizes, and toggles a specific device', () => {
    const onDeviceToggle = jest.fn();
    const devices: RoomDevice[] = [
      { id: 'a', label: 'Lamp', on: true },
      { id: 'b', label: 'Fan', on: false },
      { id: 'c', label: 'Heater', offline: true },
    ];
    const { getByLabelText, getByText } = render(
      <RoomGroup name="Living Room" devices={devices} onDeviceToggle={onDeviceToggle} />
    );
    // Summary derived defensively (2 reachable, 1 on, 1 offline).
    expect(getByText('1 of 2 on · 1 offline')).toBeTruthy();
    fireEvent.click(getByLabelText('Fan'));
    expect(onDeviceToggle).toHaveBeenCalledWith('b', true);
  });

  it('RoomGroup renders the shared EmptyState when there are no devices', () => {
    const { container, getByText } = render(<RoomGroup name="Garage" devices={[]} />);
    expect(container.querySelector('[data-xen-empty-state]')).not.toBeNull();
    expect(getByText('No devices in this room')).toBeTruthy();
    // Token class present somewhere in the tree.
    expect(container.querySelector('.bg-surface')).not.toBeNull();
  });

  it('ScheduleRow forwards its ref to the DOM root and renders day chips', () => {
    const ref = createRef<HTMLDivElement>();
    const { getByText } = render(
      <ScheduleRow ref={ref} label="Wake-up" time="06:30" days={['Mon', 'Tue']} enabled />
    );
    expect(ref.current?.tagName).toBe('DIV');
    expect(getByText('06:30')).toBeTruthy();
    expect(getByText('Mon')).toBeTruthy();
  });
});
