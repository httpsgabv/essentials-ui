import { Avatar, Button, actionToButton, userToAvatar, type User } from '@/index';

const ada: User = { fullName: 'Ada Lovelace' };

export function ButtonsPage() {
  return (
    <main style={{ padding: 24, display: 'grid', gap: 24 }}>
      <section style={{ display: 'grid', gap: 8 }}>
        <h2>Button — variants</h2>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <Button label="Primary" variant="primary" onClick={() => alert('clicked')} />
          <Button label="Secondary" variant="secondary" />
          <Button label="Ghost" variant="ghost" />
          <Button label="Disabled" disabled />
          <Button {...actionToButton({ text: 'From adapter', enabled: true })} variant="primary" />
        </div>
        <h2>Button — sizes</h2>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <Button label="Small" size="sm" />
          <Button label="Medium" size="md" />
          <Button label="Large" size="lg" />
        </div>
      </section>

      <section style={{ display: 'grid', gap: 8 }}>
        <h2>Avatar — sizes</h2>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <Avatar {...userToAvatar(ada)} size="sm" />
          <Avatar name="Grace Hopper" size="md" />
          <Avatar name="Alan Turing" imageUrl="https://i.pravatar.cc/96" size="lg" />
        </div>
      </section>
    </main>
  );
}
