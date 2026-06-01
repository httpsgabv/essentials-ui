import { describe, expect, it } from 'vitest';
import { avatarVariants } from './avatar.variants';

describe('avatarVariants', () => {
  it('applies the default size', () => {
    const classes = avatarVariants();
    expect(classes).toContain('eui-avatar');
    expect(classes).toContain('eui-avatar--md');
  });

  it('maps an explicit size to its class', () => {
    const classes = avatarVariants({ size: 'sm' });
    expect(classes).toContain('eui-avatar--sm');
    expect(classes).not.toContain('eui-avatar--md');
  });
});
