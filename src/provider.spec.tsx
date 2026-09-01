/** @jest-environment jsdom */
import { render } from '@testing-library/react';
import { createPortal } from 'react-dom';
import { XenitionUIProvider } from './provider';
import type { ThemeSeed } from './theme/types';

const seed: ThemeSeed = {
  primary: '#4f46e5',
  neutral: 'cool',
  font: { heading: 'Inter', body: 'Inter' },
  shape: 'rounded',
  mode: 'both',
};

/**
 * The bug these exist for.
 *
 * `toCssVars` emits the dark overrides under `[data-theme="dark"]`, and the
 * provider stamped that attribute on a `display: contents` wrapper only. A
 * descendant selector cannot reach a portal, so every component that
 * `createPortal`s to `document.body` — `ModalV4`, `DrawerV4`, `BottomSheetV4`,
 * `ActionSheetV4`, the toast stack — resolved the LIGHT palette while the app
 * around it was dark. A dark app opened a white modal.
 *
 * Found by opening an overlay on a dark page in a browser. No spec could have
 * caught it, because no spec looked outside the tree it rendered.
 */
describe('XenitionUIProvider — the scheme reaches portals', () => {
  afterEach(() => {
    document.documentElement.removeAttribute('data-theme');
  });

  it('stamps the scheme on the document element, not only on its wrapper', () => {
    render(
      <XenitionUIProvider theme={seed} mode="dark">
        <p>app</p>
      </XenitionUIProvider>
    );
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });

  it('keeps the wrapper stamp too, so a nested provider can theme a subtree', () => {
    const { container } = render(
      <XenitionUIProvider theme={seed} mode="dark">
        <p>app</p>
      </XenitionUIProvider>
    );
    expect(container.querySelector('[data-theme="dark"]')).not.toBeNull();
  });

  it('puts a portalled child under the same scheme as the app', () => {
    render(
      <XenitionUIProvider theme={seed} mode="dark">
        {createPortal(<div data-testid="sheet">sheet</div>, document.body)}
      </XenitionUIProvider>
    );
    const sheet = document.body.querySelector('[data-testid="sheet"]');
    expect(sheet).not.toBeNull();
    // The portal is outside the wrapper by construction — the point is that the
    // scheme now reaches it anyway, through the root.
    expect(sheet?.closest('[data-theme]')).toBe(document.documentElement);
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });

  it('follows a scheme change', () => {
    const { rerender } = render(
      <XenitionUIProvider theme={seed} mode="light">
        <p>app</p>
      </XenitionUIProvider>
    );
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
    rerender(
      <XenitionUIProvider theme={seed} mode="dark">
        <p>app</p>
      </XenitionUIProvider>
    );
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });

  it('leaves a host page as it found it', () => {
    document.documentElement.setAttribute('data-theme', 'light');
    const { unmount } = render(
      <XenitionUIProvider theme={seed} mode="dark">
        <p>app</p>
      </XenitionUIProvider>
    );
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    unmount();
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
  });

  it('removes the attribute entirely when the page never had one', () => {
    const { unmount } = render(
      <XenitionUIProvider theme={seed} mode="dark">
        <p>app</p>
      </XenitionUIProvider>
    );
    unmount();
    expect(document.documentElement.hasAttribute('data-theme')).toBe(false);
  });
});
