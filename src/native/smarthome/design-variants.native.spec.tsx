/**
 * Alternate-design (V2 / V3) smart-home components — separate drop-in blocks
 * that share the original prop contracts. This spec proves each variant mounts,
 * stays token-pure under both seeds, and honors one interaction (toggle a device
 * / step a thermostat).
 */
import * as React from 'react';
import { fireEvent } from '@testing-library/react-native';
import {
  SEED_LIGHT,
  SEED_DARK,
  renderThemed,
  renderedStyleHexes,
  tokenHexSet,
} from '../spec-support/render-native';
import { DeviceTileV2 } from './DeviceTileV2';
import { DeviceTileV3 } from './DeviceTileV3';
import { ThermostatDialV2 } from './ThermostatDialV2';
import { ThermostatDialV3 } from './ThermostatDialV3';
import { SceneCardV2 } from './SceneCardV2';
import { SceneCardV3 } from './SceneCardV3';
import { LightControlV2 } from './LightControlV2';
import { LightControlV3 } from './LightControlV3';
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

describe('DeviceTile alternate designs (native)', () => {
  it('V2 renders and toggles the device on', () => {
    const onToggle = jest.fn();
    const { getByText, getByLabelText } = renderThemed(
      <DeviceTileV2 name="Living Lamp" icon="💡" state="off" subtitle="Dimmable" onToggle={onToggle} />,
      SEED_LIGHT
    );
    expect(getByText('Living Lamp')).toBeTruthy();
    expect(getByText('Off')).toBeTruthy();
    fireEvent.press(getByLabelText('Living Lamp power'));
    expect(onToggle).toHaveBeenCalledWith(true);
  });

  it('V2 renders a loading placeholder', () => {
    expect(renderThemed(<DeviceTileV2 name="X" loading />, SEED_LIGHT).toJSON()).toBeTruthy();
  });

  it('V3 renders a compact row and blocks the toggle when unavailable', () => {
    const onToggle = jest.fn();
    const { getByText, getByLabelText } = renderThemed(
      <DeviceTileV3 name="Hall Plug" state="unavailable" onToggle={onToggle} />,
      SEED_DARK
    );
    expect(getByText('Offline')).toBeTruthy();
    fireEvent.press(getByLabelText('Hall Plug power'));
    expect(onToggle).not.toHaveBeenCalled();
  });
});

describe('ThermostatDial alternate designs (native)', () => {
  it('V2 mounts a gradient dial and raises the setpoint by one step', () => {
    const onChange = jest.fn();
    const { getByText, getByLabelText } = renderThemed(
      <ThermostatDialV2 target={21} ambient={19} mode="heat" min={10} max={30} step={0.5} onTargetChange={onChange} />,
      SEED_LIGHT
    );
    expect(getByText('21°')).toBeTruthy();
    expect(getByText('Heating')).toBeTruthy();
    fireEvent.press(getByLabelText('Raise target temperature'));
    expect(onChange).toHaveBeenCalledWith(21.5);
  });

  it('V3 stepper lowers the setpoint and blocks changes when offline', () => {
    const onChange = jest.fn();
    const { getByText, getByLabelText } = renderThemed(
      <ThermostatDialV3 target={21} ambient={19} mode="cool" min={10} max={30} step={0.5} onTargetChange={onChange} />,
      SEED_LIGHT
    );
    expect(getByText('21°')).toBeTruthy();
    fireEvent.press(getByLabelText('Lower target temperature'));
    expect(onChange).toHaveBeenCalledWith(20.5);

    const onChange2 = jest.fn();
    const offline = renderThemed(
      <ThermostatDialV3 target={21} mode="cool" offline onTargetChange={onChange2} />,
      SEED_DARK
    );
    fireEvent.press(offline.getByLabelText('Raise target temperature'));
    expect(onChange2).not.toHaveBeenCalled();
  });
});

describe('SceneCard alternate designs (native)', () => {
  it('V2 full-bleed card activates on press and marks the active scene', () => {
    const onActivate = jest.fn();
    const { getByText } = renderThemed(
      <SceneCardV2 name="Movie Night" icon="🎬" description="Dim lights" deviceCount={4} active onActivate={onActivate} />,
      SEED_LIGHT
    );
    expect(getByText('Movie Night')).toBeTruthy();
    expect(getByText('Active')).toBeTruthy();
    expect(getByText('4 devices')).toBeTruthy();
    fireEvent.press(getByText('Movie Night'));
    expect(onActivate).toHaveBeenCalledTimes(1);
  });

  it('V3 chip renders and activates on press', () => {
    const onActivate = jest.fn();
    const { getByText } = renderThemed(
      <SceneCardV3 name="Away" icon="🌙" deviceCount={6} active onActivate={onActivate} />,
      SEED_DARK
    );
    expect(getByText('Away')).toBeTruthy();
    expect(getByText('✓ Active')).toBeTruthy();
    fireEvent.press(getByText('Away'));
    expect(onActivate).toHaveBeenCalledTimes(1);
  });
});

describe('LightControl alternate designs (native)', () => {
  it('V2 brightness-ring card shows % and toggles power', () => {
    const onToggle = jest.fn();
    const { getByText, getByLabelText } = renderThemed(
      <LightControlV2 name="Kitchen" on brightness={72} colorTemp={40} onToggle={onToggle} />,
      SEED_LIGHT
    );
    expect(getByText('72%')).toBeTruthy();
    expect(getByText('Warm')).toBeTruthy();
    fireEvent.press(getByLabelText('Kitchen power'));
    expect(onToggle).toHaveBeenCalledWith(false);
  });

  it('V3 compact row shows brightness and toggles power', () => {
    const onToggle = jest.fn();
    const { getByText, getByLabelText } = renderThemed(
      <LightControlV3 name="Hallway" on brightness={35} onToggle={onToggle} />,
      SEED_DARK
    );
    expect(getByText('35%')).toBeTruthy();
    fireEvent.press(getByLabelText('Hallway power'));
    expect(onToggle).toHaveBeenCalledWith(false);
  });
});

describe('token purity — alternate designs (both seeds)', () => {
  it('every rendered style hex traces to a compiled token', () => {
    [SEED_LIGHT, SEED_DARK].forEach((seed) => {
      const { root } = renderThemed(
        <>
          <DeviceTileV2 name="Lamp" icon="💡" state="on" subtitle="On" onPress={() => {}} />
          <DeviceTileV2 name="Plug" state="unavailable" />
          <DeviceTileV3 name="Fan" icon="🌀" state="off" subtitle="Idle" />
          <ThermostatDialV2 target={22} ambient={20} mode="heat" />
          <ThermostatDialV2 target={18} mode="cool" offline />
          <ThermostatDialV3 target={24} ambient={23} mode="auto" />
          <SceneCardV2 name="Away" icon="🌙" description="All off" deviceCount={6} active />
          <SceneCardV2 name="Home" icon="🏠" description="Warm up" deviceCount={3} />
          <SceneCardV3 name="Night" icon="🌒" deviceCount={2} active />
          <SceneCardV3 name="Day" icon="☀️" deviceCount={5} />
          <LightControlV2 name="Kitchen" on brightness={60} colorTemp={50} />
          <LightControlV2 name="Porch" on={false} brightness={0} offline />
          <LightControlV3 name="Hall" on brightness={80} />
          <LightControlV3 name="Attic" on={false} brightness={0} />
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

describe('smarthome V4 "ambient" line (native)', () => {
  it('DeviceTileV4 renders the on (glow) state and toggles off', () => {
    const onToggle = jest.fn();
    const { getByText, getByLabelText } = renderThemed(
      <DeviceTileV4 name="Living Lamp" icon="💡" state="on" subtitle="72% brightness" onToggle={onToggle} />,
      SEED_LIGHT
    );
    expect(getByText('Living Lamp')).toBeTruthy();
    expect(getByText('On')).toBeTruthy();
    fireEvent.press(getByLabelText('Living Lamp power'));
    expect(onToggle).toHaveBeenCalledWith(false);
  });

  it('SceneCardV4 activates on press', () => {
    const onActivate = jest.fn();
    const { getByText } = renderThemed(
      <SceneCardV4 name="Movie Night" icon="🎬" description="Dim lights" deviceCount={4} active onActivate={onActivate} />,
      SEED_DARK
    );
    expect(getByText('Movie Night')).toBeTruthy();
    expect(getByText('Active')).toBeTruthy();
    fireEvent.press(getByText('Movie Night'));
    expect(onActivate).toHaveBeenCalledTimes(1);
  });

  it('every V4 variant mounts under both seeds', () => {
    [SEED_LIGHT, SEED_DARK].forEach((seed) => {
      expect(
        renderThemed(
          <>
            <DeviceTileV4 name="Lamp" icon="💡" state="on" subtitle="On" />
            <LightControlV4 name="Kitchen" on brightness={72} colorTemp={40} />
            <ThermostatDialV4 target={21} ambient={20} mode="heat" min={10} max={30} step={0.5} />
            <SceneCardV4 name="Away" icon="🌙" description="All off" deviceCount={6} active />
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
            <ScheduleRowV4 label="Wake-up lights" time="06:30" days={['Mon', 'Tue']} enabled last />
            <SensorReadingV4 label="Temperature" value={21.4} unit="°C" icon="🌡️" status="normal" trend="↑ 2°" />
            <EnergyUsageV4 data={[4, 6, 3, 8, 5, 7, 6]} labels={['M', 'T', 'W', 'T', 'F', 'S', 'S']} total="39.2" unit="kWh" />
          </>,
          seed
        ).toJSON()
      ).toBeTruthy();
    });
  });
});

describe('smarthome V4 new blocks (native)', () => {
  it('ModeSelector fires onChange when a mode tile is picked', () => {
    const onChange = jest.fn();
    const { getByLabelText } = renderThemed(<ModeSelector value="home" onChange={onChange} />, SEED_LIGHT);
    fireEvent.press(getByLabelText('Away'));
    expect(onChange).toHaveBeenCalledWith('away');
  });

  it('AlertCard fires onDismiss', () => {
    const onDismiss = jest.fn();
    const { getByLabelText } = renderThemed(
      <AlertCard severity="critical" title="Smoke detected" message="Kitchen sensor" onDismiss={onDismiss} />,
      SEED_DARK
    );
    fireEvent.press(getByLabelText('Dismiss alert'));
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  it('HomeHeader fires onScene from a quick-scene chip', () => {
    const onScene = jest.fn();
    const { getByLabelText } = renderThemed(
      <HomeHeader homeName="Willow House" scenes={[{ id: 'away', label: 'Away', glyph: '🌙' }]} onScene={onScene} />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText('Away'));
    expect(onScene).toHaveBeenCalledWith('away');
  });

  it('FavoritesGrid renders its favorite tiles', () => {
    const { getByText } = renderThemed(
      <FavoritesGrid
        devices={[
          { id: 'f1', name: 'Living Lamp', icon: '💡', state: 'on', subtitle: 'On' },
          { id: 'f2', name: 'Hall Plug', icon: '🔌', state: 'off', subtitle: 'Off' },
        ]}
      />,
      SEED_DARK
    );
    expect(getByText('Living Lamp')).toBeTruthy();
    expect(getByText('Hall Plug')).toBeTruthy();
  });
});

describe('token purity — V4 ambient line + new blocks (both seeds)', () => {
  it('every rendered style hex traces to a compiled token', () => {
    [SEED_LIGHT, SEED_DARK].forEach((seed) => {
      const { root } = renderThemed(
        <>
          {/* V4 drop-in variants. */}
          <DeviceTileV4 name="Lamp" icon="💡" state="on" subtitle="On" onPress={() => {}} />
          <DeviceTileV4 name="Plug" state="unavailable" />
          <LightControlV4 name="Kitchen" on brightness={60} colorTemp={50} />
          <LightControlV4 name="Porch" on={false} brightness={0} offline />
          <ThermostatDialV4 target={22} ambient={20} mode="heat" />
          <ThermostatDialV4 target={18} mode="cool" offline />
          <SceneCardV4 name="Night" icon="🌒" description="Wind down" deviceCount={2} active />
          <SceneCardV4 name="Day" icon="☀️" deviceCount={5} />
          <DeviceToggleRowV4 label="Fan" icon="🌀" checked />
          <DeviceToggleRowV4 label="Heater" icon="🔥" offline last />
          <LockControlV4 name="Front Door" state="locked" batteryPct={82} />
          <LockControlV4 name="Back Door" state="unlocked" batteryPct={12} />
          <CameraTileV4 name="Driveway" online recording timestamp="Live" />
          <CameraTileV4 name="Garage" online={false} timestamp="Offline" />
          <RoomGroupV4
            name="Living Room"
            icon="🛋️"
            devices={[
              { id: 'd1', label: 'Lamp', icon: '💡', on: true },
              { id: 'd2', label: 'TV', icon: '📺', on: false, offline: true },
            ]}
          />
          <AutomationRuleV4 name="Sunset lights" trigger="When sunset" action="Turn off lights" enabled />
          <AutomationRuleV4 name="Away alarm" trigger="When away" action="Arm alarm" offline />
          <ScheduleRowV4 label="Wake-up lights" time="06:30" days={['Mon', 'Tue']} enabled last />
          <SensorReadingV4 label="CO₂" value={640} unit="ppm" icon="🌫️" status="warn" trend="↑ 40 since 1pm" />
          <SensorReadingV4 label="Humidity" icon="💧" status="offline" />
          <EnergyUsageV4 data={[4, 6, 3, 8, 5, 7, 6]} labels={['M', 'T', 'W', 'T', 'F', 'S', 'S']} total="39.2" unit="kWh" />
          {/* New blocks — the gradient heroes must be in the aggregate. */}
          <HomeHeader
            homeName="Willow House"
            greeting="Good evening"
            statusLabel="All secure"
            statusTone="success"
            weather={{ temp: '72°', glyph: '☀️', condition: 'Clear' }}
            metrics={[{ label: 'Devices on', value: '4' }]}
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
          <AlertCard severity="warning" title="Front door left open" message="Since 4:12pm" deviceName="Front Door" time="2m ago" onDismiss={() => {}} onView={() => {}} />
          <AlertCard severity="critical" title="Smoke detected" deviceName="Kitchen" />
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
