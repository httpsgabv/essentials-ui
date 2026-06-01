/**
 * Avatar data contract (inbound port).
 *
 * The Avatar never knows where its data came from — a `User` entity, an API DTO,
 * a session token. Each source is mapped into this shape by an adapter under
 * `./adapters`, so the component stays decoupled from any single data origin.
 */
export interface AvatarContract {
  /** Full name. Used for the accessible label and as the initials fallback. */
  name: string;
  /** Optional image URL. When absent, initials are shown instead. */
  imageUrl?: string;
  /** Optional explicit initials. When absent they are derived from `name`. */
  initials?: string;
}
