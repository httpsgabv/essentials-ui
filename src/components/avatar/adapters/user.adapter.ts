import type { Adapter } from '@/core';
import type { AvatarContract } from '../avatar.contract';

/**
 * Example source shape: a domain `User` entity. Real projects import their own
 * type here — the point of the adapter is that this shape can change freely
 * without the Avatar component ever knowing.
 */
export interface User {
  fullName: string;
  photoUrl?: string;
}

/** Map a {@link User} domain entity into the Avatar contract. */
export const userToAvatar: Adapter<User, AvatarContract> = (user) => ({
  name: user.fullName,
  imageUrl: user.photoUrl,
});
