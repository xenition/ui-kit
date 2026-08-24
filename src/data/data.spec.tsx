/** @jest-environment jsdom */
import { act, render, renderHook, waitFor } from '@testing-library/react';
import * as React from 'react';
import { FRIENDLY_ERROR, Resource, useResource } from './index';

/** A promise plus its resolve/reject handles, to drive timing in tests. */
function deferred<T>() {
  let resolve!: (value: T) => void;
  let reject!: (reason?: unknown) => void;
  const promise = new Promise<T>((res, rej) => {
    resolve = res;
    reject = rej;
  });
  return { promise, resolve, reject };
}

describe('useResource', () => {
  it('starts in the loading state', () => {
    const { result } = renderHook(() => useResource(() => new Promise<number>(() => {}), []));
    expect(result.current).toEqual({ data: null, loading: true, error: null, refetch: expect.any(Function) });
  });

  it('resolves to data and clears loading', async () => {
    const { result } = renderHook(() => useResource(() => Promise.resolve('hi'), []));
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current).toEqual({ data: 'hi', loading: false, error: null, refetch: expect.any(Function) });
  });

  it('runs the fetcher once on mount', async () => {
    const fetcher = jest.fn().mockResolvedValue(1);
    renderHook(() => useResource(fetcher, []));
    await waitFor(() => expect(fetcher).toHaveBeenCalledTimes(1));
  });

  it('collapses any rejection to the friendly message', async () => {
    const { result } = renderHook(() =>
      useResource(() => Promise.reject(new Error('raw internal detail')), [])
    );
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.error).toBe(FRIENDLY_ERROR);
    expect(result.current.data).toBeNull();
    // The raw internal never leaks into the surfaced error.
    expect(result.current.error).not.toContain('raw internal detail');
  });

  it('re-fetches when deps change and shows loading again', async () => {
    const fetcher = jest.fn((n: number) => Promise.resolve(n));
    const { result, rerender } = renderHook(
      ({ id }: { id: number }) => useResource(() => fetcher(id), [id]),
      { initialProps: { id: 1 } }
    );
    await waitFor(() => expect(result.current.data).toBe(1));

    rerender({ id: 2 });
    // Immediately back to loading with data cleared…
    expect(result.current).toEqual({ data: null, loading: true, error: null, refetch: expect.any(Function) });
    await waitFor(() => expect(result.current.data).toBe(2));
    expect(fetcher).toHaveBeenCalledTimes(2);
  });

  it('does NOT re-fetch when deps are unchanged on re-render', async () => {
    const fetcher = jest.fn().mockResolvedValue(1);
    const { rerender } = renderHook(() => useResource(fetcher, [42]));
    await waitFor(() => expect(fetcher).toHaveBeenCalledTimes(1));
    rerender();
    rerender();
    expect(fetcher).toHaveBeenCalledTimes(1);
  });

  it('ignores a resolve that lands after unmount (no state update)', async () => {
    const d = deferred<string>();
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const { unmount } = renderHook(() => useResource(() => d.promise, []));
    unmount();
    await act(async () => {
      d.resolve('late');
    });
    // React would warn on a set-state-after-unmount; assert none occurred.
    expect(errorSpy).not.toHaveBeenCalled();
    errorSpy.mockRestore();
  });

  it('ignores a stale resolve after deps change (last write wins)', async () => {
    const first = deferred<string>();
    const second = deferred<string>();
    const seq = [first, second];
    let call = 0;
    const { result, rerender } = renderHook(
      ({ id }: { id: number }) => useResource(() => seq[call++]!.promise, [id]),
      { initialProps: { id: 1 } }
    );
    rerender({ id: 2 });
    // Resolve the SECOND (current) request, then the stale first.
    await act(async () => {
      second.resolve('second');
    });
    await act(async () => {
      first.resolve('first');
    });
    expect(result.current.data).toBe('second');
  });
});

describe('Resource', () => {
  const ready = <T,>(data: T) => ({ data, loading: false, error: null, refetch: () => {} });

  it('renders the loading branch while loading', () => {
    const { getByText } = render(
      <Resource state={{ data: null, loading: true, error: null, refetch: () => {} }} loading={<span>Loading…</span>}>
        {() => <span>never</span>}
      </Resource>
    );
    expect(getByText('Loading…')).toBeTruthy();
  });

  it('renders the error branch with the message', () => {
    const { getByText } = render(
      <Resource
        state={{ data: null, loading: false, error: 'boom', refetch: () => {} }}
        error={(m) => <span>err:{m}</span>}
      >
        {() => <span>never</span>}
      </Resource>
    );
    expect(getByText('err:boom')).toBeTruthy();
  });

  it('renders children with resolved data', () => {
    const { getByText } = render(
      <Resource state={ready('world')}>{(d) => <span>hello {d}</span>}</Resource>
    );
    expect(getByText('hello world')).toBeTruthy();
  });

  it('renders the empty branch for an empty array', () => {
    const { getByText } = render(
      <Resource state={ready<number[]>([])} empty={<span>nothing</span>}>
        {(rows) => <span>{rows.length} rows</span>}
      </Resource>
    );
    expect(getByText('nothing')).toBeTruthy();
  });

  it('renders children for a non-empty array', () => {
    const { getByText } = render(
      <Resource state={ready([1, 2])} empty={<span>nothing</span>}>
        {(rows) => <span>{rows.length} rows</span>}
      </Resource>
    );
    expect(getByText('2 rows')).toBeTruthy();
  });

  it('honors a custom isEmpty predicate', () => {
    const { getByText } = render(
      <Resource
        state={ready({ total: 0 })}
        isEmpty={(d) => d.total === 0}
        empty={<span>empty</span>}
      >
        {() => <span>full</span>}
      </Resource>
    );
    expect(getByText('empty')).toBeTruthy();
  });
});
