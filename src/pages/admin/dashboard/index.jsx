import { React, useMemo } from "react";
import Layout from '@/components/layout/Index';
import Table from '@/components/table/tables';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import instructorData from "@/utils/user-data/instructorData";
import dummyStudents from "@/utils/user-data/studentData";
import CardTotal from "./card/cardTotal";
import LineChart from './chart/lineChart';
import PieChart from "./chart/pieChart";

const DashboardAdmin = () => {
    const userRole = 'admin';

    const columns = useMemo(() => [
        {
          header: "No",
          cell: (info) => <div className="text-center">{info.row.index + 1}</div>,
        },
        {
          header: "Nama",
          accessorKey: "name", // Menggunakan properti "username" sebagai nama
          cell: (info) => <div className="text-center">{info.getValue()}</div>,
        },
        {
          header: "Email",
          accessorKey: "email",
          cell: (info) => <div className="text-center">{info.getValue()}</div>,
        },
        {
          header: "Kelas",
          accessorKey: "class",
          cell: (info) => <div className="text-center">{info.getValue()}</div>,
        },
    ], []);
      

    const selectItem = [10, 25, 50];

    // Contoh data dan opsi untuk chart
    const chartData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                fill: true,
                data: [500000, 1000000, 4500000, 800000, 400000, 800000, 200000], // Ganti ini dengan data sesuai kebutuhan
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
                pointRadius: 4,
                pointHoverRadius: 10,
                pointHoverBorderWidth: 2,
                pointHitRadius: 10,
                tension: 0.3,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                display: false, // Menyembunyikan legend
            },
            title: {
                display: false, // Menyembunyikan title
            },
        },
        scales: {
            x: {
                
            },
            y: {
                ticks: {
                    display: true, // Menyembunyikan keterangan nominal di sebelah kiri chart
                },
            },
        },
    };

    const data = {
        labels: ['Label 1', 'Label 2', 'Label 3'],
        datasets: [
          {
            data: [30, 40, 30],
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'], // Warna untuk setiap label
            hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
          },
        ],
      };

    const options = {
        legend: {
            display: true,
            position: 'bottom', // Letakkan legenda di bawah chart
        },
        tooltips: {
            callbacks: {
                label: (tooltipItem, data) => {
                    const dataset = data.datasets[tooltipItem.datasetIndex];
                    const total = dataset.data.reduce((acc, value) => acc + value, 0);
                    const currentValue = dataset.data[tooltipItem.index];
                    const percentage = ((currentValue / total) * 100).toFixed(2);
                    return `${data.labels[tooltipItem.index]}: ${percentage}%`;
                },
            },
        },
    };

    return (
        <Layout userRole={userRole}>
            <div className='container mb-10 font-poppins'>
                <div className='pb-10'>
                    <h1 className='text-6xl font-bold'>Hello Joko,</h1>
                    <h3 className='text-3xl'>udah siap ngajar lagi?</h3>
                </div>
                <div className="flex space-x-8">
                    <div className="flex flex-col w-3/4">
                        <div className='container shadow h-40 w-full font-bold text-2xl p-10 space-y-4'>
                            <h4>Pendapatan Perbulan</h4>
                            <h4>8.000.000</h4>
                        </div>
                        <div className='container shadow w-full font-bold text-2xl p-10 space-y-4 mb-10'>
                            <LineChart data={chartData} options={chartOptions} />
                        </div>
                        <div className='container border-2 border-[#092C4C] rounded-lg w-full p-10 space-y-4 mb-10'>
                            <h1 className="text-2xl text-[#092C4C]">Instructor Data</h1>
                            <Table
                                datas={instructorData}
                                columns={columns}
                                classNameHeader="bg-[#092C4C] text-white"
                                isVisible={true}
                                rowVisible={true}
                                searchComponent={
                                    <div className="flex w-1/2 items-center justify-end space-x-3">
                                    <p className="text-xl">Search</p>{" "}
                                    <Input
                                        id="search"
                                        className=" w-4/12 rounded border-[#092C4C]"
                                    />
                                    </div>
                                }
                            />
                        </div>
                        <div className='container border-2 border-[#092C4C] rounded-lg w-full p-10 space-y-4'>
                            <h1 className="text-2xl text-[#092C4C]">Student Data</h1>
                            <Table
                                datas={instructorData}
                                columns={columns}
                                classNameHeader="bg-[#092C4C] text-white"
                                isVisible={true}
                                rowVisible={true}
                                searchComponent={
                                    <div className="flex w-1/2 items-center justify-end space-x-3">
                                    <p className="text-xl">Search</p>{" "}
                                    <Input
                                        id="search"
                                        className=" w-4/12 rounded border-[#092C4C]"
                                    />
                                    </div>
                                }
                            />
                        </div>
                    </div>
                    <div className="flex flex-col w-1/4 h-screen space-y-10">
                        <CardTotal judul="Pendapatan" nominal="Rp 5.000.000" />
                        <CardTotal judul="Course" nominal="63" />
                        <CardTotal judul="Instructor" nominal="30" />
                        <CardTotal judul="Student" nominal="765" />
                        <div className="container h-80 border-2 border-[#092C4C] rounded-lg w-full font-bold text-2xl p-4 mb-10">
                            <h1 className="text-xl">Persentase Siswa</h1>
                            <h1 className="text-xs font-normal">Berdasarkan topic peminatan</h1>
                            <PieChart data={data} options={options}/>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default DashboardAdmin;
