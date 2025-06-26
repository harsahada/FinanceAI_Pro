import React from 'react';

const tabs = [
  { key: 'dashboard', label: 'Dashboard', icon: '📊', color: '#3b82f6' },
  { key: 'ai', label: 'AI Assistant', icon: '🤖', color: '#8b5cf6' },
  { key: 'alerts', label: 'Alerts', icon: '🚨', color: '#ef4444' },
  { key: 'profile', label: 'Profile', icon: '🧑‍💼', color: '#ff8800' },
];

const navBg = '#e8f1fd'; // light blue background for the nav bar

const DashboardNav = ({ active, onTabChange }) => (
  <div
    className="rounded-4 shadow-sm px-4 py-2 mb-4 d-flex align-items-center gap-4"
    style={{ border: '1px solid #eee', background: navBg }}
  >
    {tabs.map(tab => (
      <button
        key={tab.key}
        className={`d-flex align-items-center gap-2 border-0 bg-transparent px-3 py-2 ${active === tab.key ? 'active-tab' : ''}`}
        style={{
          background: active === tab.key ? tab.color : 'transparent',
          color: active === tab.key ? '#fff' : '#444',
          borderRadius: 12,
          fontWeight: 600,
          fontSize: 18,
          cursor: 'pointer',
          transition: 'background 0.2s, color 0.2s',
        }}
        onClick={() => onTabChange && onTabChange(tab.key)}
      >
        <span style={{ fontSize: 22 }}>{tab.icon}</span> {tab.label}
      </button>
    ))}
  </div>
);

export default DashboardNav; 