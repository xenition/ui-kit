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
