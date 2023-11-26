import React, { useState } from 'react';
import CardModule from './cardModule';

const modules = [
  { id: 1, title: 'Pemrograman Frontend' },
  { id: 2, title: 'Pemrograman Backend' },
  { id: 3, title: 'Pemrograman Frontend' },
  { id: 4, title: 'Pemrograman Backend' },
  // Tambahkan modul-modul lainnya sesuai kebutuhan
];

const Dashboard = () => {
  const [activeModule, setActiveModule] = useState(modules[0].id);

  const handleModuleClick = (moduleId) => {
    setActiveModule(moduleId);
    // Logika untuk menangani klik pada modul, misalnya navigasi ke halaman ulasan user
    console.log(`Module ${moduleId} clicked!`);
  };

  return (
    <div className="overflow-x-auto p-8">
      <div className="flex gap-8">
        {modules.map((module) => (
          <CardModule
            key={module.id}
            id={module.id}
            logo={
              <img
                src={`/assets/module/module1.svg`}
                alt={`Feature${module.id}`}
              />
            }
            title={module.title}
            onClick={handleModuleClick}
            isActive={activeModule === module.id}
          />
        ))}
      </div>
    </div>

  );
};

export default Dashboard;