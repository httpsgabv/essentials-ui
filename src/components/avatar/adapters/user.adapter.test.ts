import { describe, expect, it } from 'vitest';
import { userToAvatar, type User } from './user.adapter';

describe('userToAvatar', () => {
  it('maps a User entity onto the Avatar contract', () => {
    const user: User = { fullName: 'Ada Lovelace', photoUrl: 'https://example.com/ada.png' };
    expect(userToAvatar(user)).toEqual({
      name: 'Ada Lovelace',
      imageUrl: 'https://example.com/ada.png',
    });
  });

  it('leaves imageUrl undefined when the source has no photo', () => {
    expect(userToAvatar({ fullName: 'Grace Hopper' })).toEqual({
      name: 'Grace Hopper',
      imageUrl: undefined,
    });
  });
});
