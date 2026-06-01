import { Avatar as BaseAvatar } from '@base-ui/react/avatar';
import { cn } from '@/core';
import { avatarVariants } from './avatar.variants';
import type { AvatarProps } from './avatar.types';

/** Derive up-to-two-letter initials from a full name. */
function initialsFromName(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '?';
  const first = parts[0][0];
  const last = parts.length > 1 ? parts[parts.length - 1][0] : '';
  return (first + last).toUpperCase();
}

/**
 * Pluggable avatar. Pass props matching {@link AvatarContract}, or feed a
 * domain object through one of the adapters in `./adapters` and spread the
 * result: `<Avatar {...userToAvatar(user)} />`.
 *
 * Wraps the Base UI `Avatar` primitive (`@base-ui/react/avatar`). Base UI swaps
 * the image for the fallback automatically based on load status — so the
 * `<img>` and the initials are mutually exclusive, never both at once. Size
 * variants resolve via {@link avatarVariants} (CVA).
 */
export function Avatar({ name, imageUrl, initials, size, className }: AvatarProps) {
  return (
    <BaseAvatar.Root className={cn(avatarVariants({ size }), className)}>
      {imageUrl ? <BaseAvatar.Image src={imageUrl} alt={name} /> : null}
      <BaseAvatar.Fallback role="img" aria-label={name}>
        {initials ?? initialsFromName(name)}
      </BaseAvatar.Fallback>
    </BaseAvatar.Root>
  );
}
