import { NavLink, Route, Routes, Navigate } from 'react-router-dom';
import { ButtonsPage } from './pages/buttons';
import { ComboboxPage } from './pages/combobox';
import { DataTablePage } from './pages/data-table';
import { MapPage } from './pages/map';

const NAV_LINKS = [
  { to: '/buttons', label: 'Button & Avatar' },
  { to: '/combobox', label: 'Combobox' },
  { to: '/data-table', label: 'DataTable' },
  { to: '/map', label: 'Map' },
];

const navStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 4,
  padding: '0 16px',
  height: 48,
  background: '#0f172a',
  fontFamily: 'system-ui',
};

const brandStyle: React.CSSProperties = {
  color: '#f8fafc',
  fontWeight: 700,
  fontSize: 15,
  marginRight: 16,
  textDecoration: 'none',
  letterSpacing: '-0.01em',
};

const linkBase: React.CSSProperties = {
  padding: '6px 12px',
  borderRadius: 6,
  fontSize: 14,
  textDecoration: 'none',
  color: '#94a3b8',
  transition: 'background 0.15s, color 0.15s',
};

export function App() {
  return (
    <div style={{ fontFamily: 'system-ui', minHeight: '100vh', background: '#f8fafc' }}>
      <nav style={navStyle}>
        <span style={brandStyle}>essentials-ui</span>
        {NAV_LINKS.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            style={({ isActive }) => ({
              ...linkBase,
              background: isActive ? '#1e293b' : 'transparent',
              color: isActive ? '#f8fafc' : '#94a3b8',
            })}
          >
            {label}
          </NavLink>
        ))}
      </nav>

      <Routes>
        <Route path="/" element={<Navigate to="/buttons" replace />} />
        <Route path="/buttons" element={<ButtonsPage />} />
        <Route path="/combobox" element={<ComboboxPage />} />
        <Route path="/data-table" element={<DataTablePage />} />
        <Route path="/map" element={<MapPage />} />
      </Routes>
    </div>
  );
}
