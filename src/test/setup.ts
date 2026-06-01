import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach, vi } from 'vitest';

// Unmount React trees and reset the DOM between tests so they stay isolated.
afterEach(() => {
  cleanup();
});

// jsdom lacks a few browser APIs that Base UI's floating/popup primitives (e.g.
// Combobox) rely on. Provide minimal no-op shims so those components can mount.
if (!('ResizeObserver' in globalThis)) {
  globalThis.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
}

Element.prototype.scrollIntoView ??= function scrollIntoView() {};
Element.prototype.hasPointerCapture ??= () => false;
Element.prototype.setPointerCapture ??= () => {};
Element.prototype.releasePointerCapture ??= () => {};

if (!('PointerEvent' in globalThis)) {
  globalThis.PointerEvent =
    class PointerEvent extends MouseEvent {} as typeof globalThis.PointerEvent;
}

vi.stubGlobal(
  'matchMedia',
  vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
    dispatchEvent: () => false,
  })),
);
