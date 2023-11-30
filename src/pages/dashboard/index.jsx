import React, { useState } from 'react';
import CardModule from './card/cardModule';
import Layout from '@/components/layout/Index';
import { Button } from "@/components/ui/button"
import ListUlasan from './cardUlasanUser';
import ListCardTotalMentee from './listCardTotalMentee';

const modules = [
  { id: 1, title: 'Pemrograman Frontend' },
  { id: 2, title: 'Pemrograman Backend' },
  { id: 3, title: 'Pemrograman Frontend' },
  { id: 4, title: 'Pemrograman Backend' },
  // Tambahkan modul-modul lainnya sesuai kebutuhan
];

const Dashboard = () => {
  const userRole = 'admin'
  const [activeModule, setActiveModule] = useState(modules[0].id);

  const handleModuleClick = (moduleId) => {
    setActiveModule(moduleId);
    // Logika untuk menangani klik pada modul, misalnya navigasi ke halaman ulasan user
    console.log(`Module ${moduleId} clicked!`);
  };

  return (
    <Layout>
      <div className='container mb-10 font-poppins'>
        <div>
          <h1 className='text-[40px] font-bold'>Hello Joko,</h1>
          <h3 className='text-[24px]'>udah siap ngajar lagi?</h3>  
        </div>      
        <div className="overflow-x-auto  mt-4">
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
        <div className='grid my-6 justify-items-end'>
          <Button
          className="bg-[#092C4C] w-[168px] justify-center items-center px-[10px] py-[15px] rounded-lg"
          >
            <p className="text-white font-poppins font-semibold text-[16px]">Manage Kelas</p>
          </Button>
        </div>
        <ListCardTotalMentee />
        <ListUlasan />
      </div>
    </Layout>

  );
};

export default Dashboard;