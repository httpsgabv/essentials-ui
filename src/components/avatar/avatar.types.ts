import type { AvatarContract } from './avatar.contract';
import type { AvatarVariantProps } from './avatar.variants';

/** Diameter preset of the avatar. Derived from the CVA variant definition. */
export type AvatarSize = NonNullable<AvatarVariantProps['size']>;

/**
 * Full prop set for the Avatar: its data contract plus presentation (CVA
 * variants). Spread contract data and add presentation:
 * `<Avatar {...contract} size="lg" />`.
 */
export interface AvatarProps extends AvatarContract, AvatarVariantProps {
  /** Escape hatch for additional class names from the consumer. */
  className?: string;
}
