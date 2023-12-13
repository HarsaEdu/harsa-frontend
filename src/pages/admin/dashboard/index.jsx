import { React, useMemo, useState, useEffect } from "react";
import Layout from '@/components/layout/Index';
import CardTotal from "./card/cardTotal";
import LineChart from './chart/lineChart';
import PieChart from "./chart/pieChart";
import StudentTable from "./tabel/studentTable";
import InstructorTable from "./tabel/instructorTable";
import { getAllCountData } from "@/utils/apis/dashboard";

const DashboardAdmin = () => {
    const username = localStorage.getItem('username');
    const [countData, setCountData] = useState(null);
    const [pieChartData, setPieChartData] = useState({
        labels: [],
        datasets: [
            {
                data: [],
                backgroundColor: [],
                hoverBackgroundColor: [],
                borderWidth: 0,
            },
        ],
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getAllCountData();
                setCountData(response.data);

                // Mapping count_interest data for PieChart
                const interestData = response.data.count_interest || [];
                const labels = interestData.map((item) => item.name);
                const data = interestData.map((item) => item.count);
                const backgroundColor = ['#FF6384', '#36A2EB', '#FFCE56', '#FF'].slice(0, interestData.length);

                setPieChartData({
                    labels,
                    datasets: [
                        {
                            data,
                            backgroundColor,
                            hoverBackgroundColor: backgroundColor,
                            borderWidth: 0,
                        },
                    ],
                });
            } catch (error) {
                console.error("Error fetching count data:", error);
            }
        };

        fetchData();
    }, []);

    // Contoh data dan opsi untuk chart
    const chartData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September'],
        datasets: [
            {
                fill: true,
                data: [500000, 1000000, 4500000, 800000, 400000, 800000, 200000, 900000, 3000000], // Ganti ini dengan data sesuai kebutuhan
                borderColor: '#092C4C',
                backgroundColor: 'rgba(53, 162, 235, 0.2)',
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

    const pieOptions = {
        plugins: {
            legend: {
                display: true,
                position: 'bottom',
                labels: {
                    fontColor: '#333',
                },
            },
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
            body: (tooltipItem, data) => {
                const dataset = data.datasets[tooltipItem.datasetIndex];
                const total = dataset.data.reduce((acc, value) => acc + value, 0);
                const currentValue = dataset.data[tooltipItem.index];
                const percentage = ((currentValue / total) * 100).toFixed(2);
                return [`Jumlah: ${currentValue}`, `Persentase: ${percentage}%`];
            },
            },
        },
    };

    return (
        <Layout>
            <div className='container mb-10 font-poppins'>
                <div className='pb-10'>
                    <h1 className='text-6xl font-bold'>Hello {username},</h1>
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
                        <InstructorTable />
                        <StudentTable />
                    </div>
                    <div className="flex flex-col w-1/4 h-screen space-y-10">
                        <CardTotal judul="Pendapatan" nominal="Rp 5.000.000" />
                        <CardTotal judul="Course" nominal={countData?.count_course || 0} />
                        <CardTotal judul="Instructor" nominal={countData?.count_intructure || 0} />
                        <CardTotal judul="Student" nominal={countData?.count_student || 0} />
                        <div className="container h-84 border-2 border-[#092C4C] rounded-lg w-full font-bold text-2xl p-4 mb-10">
                            <h1 className="text-xl">Persentase Siswa</h1>
                            <h1 className="text-xs font-normal mb-8">Berdasarkan topic peminatan</h1>
                            <PieChart data={pieChartData} options={pieOptions} />
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default DashboardAdmin;
