import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Sidebar from '../../components/Sidebar/Sidebar';

export default function MainLayout() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      {/* Top Navbar */}
      <Navbar />

      {/* Layout: Sidebar on the left, main content on the right */}
      <div style={{ display: 'flex', flex: 1 }}>
        {/* Sidebar */}
        <div style={{ flexShrink: 0 }}>
          <Sidebar />
        </div>

        {/* Main Content */}
        <div
          style={{
            flex: 1,
            padding: '4rem',
            overflowY: 'auto',  // This will handle scrolling when the content overflows
          }}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
}
