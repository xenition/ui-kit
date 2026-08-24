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
