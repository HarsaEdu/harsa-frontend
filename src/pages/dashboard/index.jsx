// Dashboard.js
import React from 'react';
import CardModule from './cardModule';

const modules = [
    { id: 1, title: 'Module 1', logo: '/assets/module1.svg' },
    { id: 2, title: 'Module 2', logo: '/assets/module1.svg' },
  // Tambahkan modul-modul lainnya sesuai kebutuhan
];

const Dashboard = () => {
  const handleModuleClick = (moduleId) => {
    // Logika untuk menangani klik pada modul, misalnya navigasi ke halaman ulasan user
    console.log(`Module ${moduleId} clicked!`);
  };

  return (
    <div className="flex flex-wrap justify-center gap-8">
      {modules.map((module) => (
        <CardModule
          key={module.id}
          logo={module.logo}
          title={module.title}
          onClick={() => handleModuleClick(module.id)}
        />
      ))}
    </div>
  );
};

export default Dashboard;
