import { render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { Avatar } from './avatar';

/**
 * Base UI's `Avatar.Image` mounts the `<img>` only once it reports `loaded`,
 * which it detects by loading the URL through `new Image()`. jsdom never loads
 * images, so stub the global to resolve `onload` on the next microtask.
 */
class LoadingImage {
  onload: (() => void) | null = null;
  onerror: (() => void) | null = null;
  crossOrigin: string | null = null;
  referrerPolicy = '';
  complete = false;
  naturalWidth = 0;
  #src = '';
  set src(value: string) {
    this.#src = value;
    queueMicrotask(() => this.onload?.());
  }
  get src() {
    return this.#src;
  }
}

describe('Avatar', () => {
  beforeEach(() => {
    vi.stubGlobal('Image', LoadingImage);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('renders the image once it loads', async () => {
    render(<Avatar name="Ada Lovelace" imageUrl="https://example.com/ada.png" />);
    // `alt` is unique to the <img>; the fallback exposes its name via aria-label.
    const img = await screen.findByAltText('Ada Lovelace');
    expect(img).toHaveAttribute('src', 'https://example.com/ada.png');
  });

  it('derives initials from the name when no image is given', () => {
    render(<Avatar name="Ada Lovelace" />);
    expect(screen.getByLabelText('Ada Lovelace')).toHaveTextContent('AL');
  });

  it('prefers explicit initials over derived ones', () => {
    render(<Avatar name="Ada Lovelace" initials="ADA" />);
    expect(screen.getByLabelText('Ada Lovelace')).toHaveTextContent('ADA');
  });

  it('applies the size class to the root', () => {
    render(<Avatar name="Ada" size="lg" />);
    const root = screen.getByLabelText('Ada').closest('.eui-avatar');
    expect(root).toHaveClass('eui-avatar', 'eui-avatar--lg');
  });
});
