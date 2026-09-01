/** @jest-environment jsdom */
/**
 * Alternate smarthome designs (v2 / v3) for the web (React DOM) — drop-in
 * redesigns of DeviceTile, LightControl, SceneCard, ThermostatDial. Each variant
 * keeps the base props; these specs prove they (a) mount, (b) keep colors
 * token-bound (no color hex in inline styles — arc strokes use `var(--xen-*)`),
 * and (c) honor a key interaction/state.
 */
import { fireEvent, render } from '@testing-library/react';
import { DeviceTileV2 } from './DeviceTileV2';
import { DeviceTileV3 } from './DeviceTileV3';
import { LightControlV2 } from './LightControlV2';
import { LightControlV3 } from './LightControlV3';
import { SceneCardV2 } from './SceneCardV2';
import { SceneCardV3 } from './SceneCardV3';
import { ThermostatDialV2 } from './ThermostatDialV2';
import { ThermostatDialV3 } from './ThermostatDialV3';
import {
  DeviceTileV4,
  LightControlV4,
  ThermostatDialV4,
  SceneCardV4,
  DeviceToggleRowV4,
  LockControlV4,
  CameraTileV4,
  RoomGroupV4,
  AutomationRuleV4,
  ScheduleRowV4,
  SensorReadingV4,
  EnergyUsageV4,
  HomeHeader,
  RoomHeader,
  EnergyDashboard,
  ModeSelector,
  FavoritesGrid,
  AlertCard,
} from './index';

const inlineStyles = (root: HTMLElement): string =>
  Array.from(root.querySelectorAll<HTMLElement>('[style]'))
    .map((el) => el.getAttribute('style') ?? '')
    .join('\n');
const COLOR_HEX = /(?:color|background|border|fill|stroke)[^;]*#[0-9a-fA-F]{3,8}/;

describe('DeviceTile alternates (web)', () => {
  it('V2 toggles without opening details', () => {
    const onToggle = jest.fn();
    const onClick = jest.fn();
    const { getByLabelText, container } = render(<DeviceTileV2 name="Lamp" state="off" onToggle={onToggle} onClick={onClick} />);
    expect(inlineStyles(container)).not.toMatch(COLOR_HEX);
    fireEvent.click(getByLabelText('Toggle Lamp'));
    expect(onToggle).toHaveBeenCalledWith(true);
    expect(onClick).not.toHaveBeenCalled();
  });
  it('V3 renders a dense row', () => {
    const { getByText, container } = render(<DeviceTileV3 name="Plug" state="on" subtitle="72%" />);
    expect(getByText('Plug')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(COLOR_HEX);
  });
});

describe('LightControl alternates (web)', () => {
  it('V2 toggles power', () => {
    const onToggle = jest.fn();
    const { getByLabelText, container } = render(<LightControlV2 name="Ceiling" on brightness={60} colorTemp={40} onToggle={onToggle} />);
    expect(inlineStyles(container)).not.toMatch(COLOR_HEX);
    fireEvent.click(getByLabelText('Toggle Ceiling'));
    expect(onToggle).toHaveBeenCalledWith(false);
  });
  it('V3 renders a compact row', () => {
    const { getByText, container } = render(<LightControlV3 name="Desk" on brightness={30} />);
    expect(getByText('Desk')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(COLOR_HEX);
  });
});

describe('SceneCard alternates (web)', () => {
  it('V2 activates the scene', () => {
    const onActivate = jest.fn();
    const { getByText, container } = render(<SceneCardV2 name="Movie Night" description="Dim lights" deviceCount={4} onActivate={onActivate} />);
    expect(getByText('Movie Night')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(COLOR_HEX);
    fireEvent.click(getByText('Movie Night'));
    expect(onActivate).toHaveBeenCalledTimes(1);
  });
  it('V3 shows the active state', () => {
    const { getByText, container } = render(<SceneCardV3 name="Good Morning" active deviceCount={3} />);
    expect(getByText('Active')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(COLOR_HEX);
  });
});

describe('ThermostatDial alternates (web)', () => {
  it('V2 raises the target', () => {
    const onTargetChange = jest.fn();
    const { getByLabelText, container } = render(<ThermostatDialV2 target={21} ambient={20} mode="heat" onTargetChange={onTargetChange} />);
    expect(inlineStyles(container)).not.toMatch(COLOR_HEX);
    fireEvent.click(getByLabelText('Raise target temperature'));
    expect(onTargetChange).toHaveBeenCalledWith(21.5);
  });
  it('V3 lowers the target', () => {
    const onTargetChange = jest.fn();
    const { getByLabelText, container } = render(<ThermostatDialV3 target={21} mode="cool" onTargetChange={onTargetChange} />);
    expect(inlineStyles(container)).not.toMatch(COLOR_HEX);
    fireEvent.click(getByLabelText('Lower target temperature'));
    expect(onTargetChange).toHaveBeenCalledWith(20.5);
  });
});

describe('smarthome V4 "ambient" line (web)', () => {
  it('mounts every V4 variant token-pure', () => {
    const { container } = render(
      <>
        <DeviceTileV4 name="Living Lamp" icon="💡" state="on" subtitle="72% brightness" />
        <DeviceTileV4 name="Hall Plug" state="unavailable" subtitle="Offline 2m ago" />
        <LightControlV4 name="Kitchen Ceiling" on brightness={72} colorTemp={40} />
        <ThermostatDialV4 target={21} ambient={20} mode="heat" min={10} max={30} step={0.5} />
        <SceneCardV4 name="Movie Night" icon="🎬" description="Dim lights" deviceCount={4} active />
        <DeviceToggleRowV4 label="Desk Fan" icon="🌀" subtitle="Idle" checked last />
        <LockControlV4 name="Front Door" state="locked" batteryPct={82} />
        <CameraTileV4 name="Driveway" online recording timestamp="Live" />
        <RoomGroupV4
          name="Living Room"
          icon="🛋️"
          devices={[
            { id: 'd1', label: 'Lamp', icon: '💡', on: true },
            { id: 'd2', label: 'TV', icon: '📺', on: false },
          ]}
        />
        <AutomationRuleV4 name="Lights off at sunset" trigger="When sunset" action="Turn off all lights" enabled />
        <ScheduleRowV4 label="Wake-up lights" time="06:30" days={['Mon', 'Tue', 'Wed']} enabled last />
        <SensorReadingV4 label="Temperature" value={21.4} unit="°C" icon="🌡️" status="normal" trend="↑ 2° since 1pm" />
        <EnergyUsageV4 data={[4, 6, 3, 8, 5, 7, 6]} labels={['M', 'T', 'W', 'T', 'F', 'S', 'S']} total="39.2" unit="kWh" />
      </>
    );
    expect(inlineStyles(container)).not.toMatch(COLOR_HEX);
  });

  it('DeviceTileV4 toggles from the on (glow) state without opening details', () => {
    const onToggle = jest.fn();
    const onClick = jest.fn();
    const { getByLabelText, container } = render(
      <DeviceTileV4 name="Lamp" state="on" subtitle="On" onToggle={onToggle} onClick={onClick} />
    );
    expect(inlineStyles(container)).not.toMatch(COLOR_HEX);
    fireEvent.click(getByLabelText('Lamp power'));
    expect(onToggle).toHaveBeenCalledWith(false);
    expect(onClick).not.toHaveBeenCalled();
  });

  it('SceneCardV4 activates the scene', () => {
    const onActivate = jest.fn();
    const { getByText } = render(
      <SceneCardV4 name="Good Morning" icon="🌅" description="Warm up" deviceCount={3} onActivate={onActivate} />
    );
    fireEvent.click(getByText('Good Morning'));
    expect(onActivate).toHaveBeenCalledTimes(1);
  });
});

describe('smarthome V4 new blocks (web)', () => {
  it('mounts every new block token-pure', () => {
    const { container } = render(
      <>
        <HomeHeader
          homeName="Willow House"
          greeting="Good evening"
          statusLabel="All secure"
          statusTone="success"
          weather={{ temp: '72°', glyph: '☀️', condition: 'Clear' }}
          metrics={[
            { label: 'Devices on', value: '4' },
            { label: 'Temperature', value: '71°' },
          ]}
          scenes={[{ id: 'movie', label: 'Movie', glyph: '🎬' }]}
        />
        <RoomHeader
          roomName="Living Room"
          glyph="🛋️"
          temperature="71°"
          humidity="44%"
          devicesOn={3}
          deviceCount={6}
          lightsOn
          onAllOff={() => {}}
        />
        <EnergyDashboard
          usageLabel="24.6 kWh"
          costLabel="$4.20 today"
          period="Today"
          deltaPct={12}
          solarLabel="6.1 kWh solar"
          breakdown={[
            { label: 'Heating', value: 12, tone: 'primary' },
            { label: 'Lighting', value: 5, tone: 'accent' },
            { label: 'Other', value: 8, tone: 'warn' },
          ]}
        />
        <ModeSelector value="home" />
        <FavoritesGrid
          devices={[
            { id: 'f1', name: 'Living Lamp', icon: '💡', state: 'on', subtitle: 'On' },
            { id: 'f2', name: 'Hall Plug', icon: '🔌', state: 'off', subtitle: 'Off' },
          ]}
        />
        <AlertCard severity="warning" title="Front door left open" message="Since 4:12pm" deviceName="Front Door" time="2m ago" />
      </>
    );
    expect(inlineStyles(container)).not.toMatch(COLOR_HEX);
  });

  it('ModeSelector fires onChange when a mode tile is picked', () => {
    const onChange = jest.fn();
    const { getByLabelText } = render(<ModeSelector value="home" onChange={onChange} />);
    fireEvent.click(getByLabelText('Away'));
    expect(onChange).toHaveBeenCalledWith('away');
  });

  it('AlertCard fires onDismiss', () => {
    const onDismiss = jest.fn();
    const { getByLabelText } = render(<AlertCard severity="critical" title="Smoke detected" onDismiss={onDismiss} />);
    fireEvent.click(getByLabelText('Dismiss alert'));
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  it('HomeHeader fires onScene from a quick-scene chip', () => {
    const onScene = jest.fn();
    const { getByLabelText } = render(
      <HomeHeader homeName="Willow House" scenes={[{ id: 'away', label: 'Away', glyph: '🌙' }]} onScene={onScene} />
    );
    fireEvent.click(getByLabelText('Away'));
    expect(onScene).toHaveBeenCalledWith('away');
  });
});
