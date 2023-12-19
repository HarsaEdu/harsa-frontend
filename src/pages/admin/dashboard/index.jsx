import { useState, useEffect } from "react";
import Layout from "@/components/layout/Index";
import CardTotal from "./card/cardTotal";
import LineChart from "./chart/lineChart";
import PieChart from "./chart/pieChart";
import StudentTable from "./tabel/studentTable";
import InstructorTable from "./tabel/instructorTable";
import { getAllCountData, getLastYearProfit } from "@/utils/apis/dashboard";

const DashboardAdmin = () => {
  const username = localStorage.getItem("username");
  const [monthProfit, setMonthProfit] = useState([]);
  const [yearProfit, setYearProfit] = useState([]);
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
  // Modifikasi state pada DashboardAdmin
const [lastYearPayment, setLastYearPayment] = useState({
  labels: [],
  datasets: [
    {
      data: [],
      backgroundColor: [],
      hoverBackgroundColor: [],
      borderWidth: 0,
    }
  ],
});

// Modifikasi useEffect untuk mendapatkan data pendapatan
useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await getLastYearProfit();
      const interestData = response.data.months || [];
      const labels = interestData.map((item) => item.month);
      const data = interestData.map((item) => item.total);

      setLastYearPayment({
        labels,
        datasets: [
          {
            data,
            borderColor: "#092C4C",
            backgroundColor: "rgba(53, 162, 235, 0.2)",
            pointRadius: 4,
            pointHoverRadius: 10,
            pointHoverBorderWidth: 2,
            pointHitRadius: 10,
            tension: 0.3,
          },
        ],
      });
    } catch (error) {
      console.error("Error fetching total profit data", error);
    }
  };

  fetchData();
}, []);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllCountData();
        setCountData(response.data);

        // Mapping count_interest data for PieChart
        const interestData = response.data.count_interest || [];
        const labels = interestData.map((item) => item.name);
        const data = interestData.map((item) => item.count);
        const backgroundColor = ["#FF6384", "#36A2EB", "#FFCE56", "#FF"].slice(
          0,
          interestData.length,
        );

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
      x: {},
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
        position: "bottom",
        labels: {
          fontColor: "#333",
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getLastYearProfit();
        setMonthProfit(result.data.total);
        // setYearProfit(result.data.months.total);
        console.log(result.data);
        if (result && result.data && result.data.months) {
          const yearProfitData = result.data.months.map((month) => month.total);
          setYearProfit(yearProfitData);
        }
      } catch (error) {
        console.error("Error fetching total profit data", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Layout>
      <div className="container mb-10 font-poppins">
        <div className="pb-10">
          <h1 className="text-5xl font-bold">Hello {username},</h1>
          <h3 className="text-2xl">udah siap ngajar lagi?</h3>
        </div>
        <div className="flex space-x-8">
          <div className="flex flex-col w-3/4">
            <div className="container w-full h-40 p-10 space-y-4 text-2xl font-bold shadow">
              <h4>Pendapatan Perbulan</h4>
              <h4>{monthProfit}</h4>
            </div>
            <div className="container w-full p-10 mb-10 space-y-4 text-2xl font-bold shadow">
              <LineChart data={lastYearPayment} options={{
                ...chartOptions,
                maintainAspectRatio: false, // Izinkan perubahan aspek rasio
                responsive: true,}} />
            </div>
            <InstructorTable />
            <StudentTable />
          </div>
          <div className="flex flex-col w-1/4 h-screen space-y-10">
            {yearProfit.length > 0 ? (
              <div>
                {yearProfit.map((index) => (
                  <CardTotal
                    key={index}
                    judul="Pendapatan"
                    nominal={yearProfit}
                  />
                ))}
              </div>
            ) : (
              <p className="text-xl text-[#A2D2FF]">...</p>
            )}
            <CardTotal judul="Course" nominal={countData?.count_course || 0} />
            <CardTotal
              judul="Instructor"
              nominal={countData?.count_intructure || 0}
            />
            <CardTotal
              judul="Student"
              nominal={countData?.count_student || 0}
            />
            <div className="h-84 container mb-10 w-full rounded-lg border-2 border-[#092C4C] p-4 text-2xl font-bold">
              <h1 className="text-xl">Persentase Siswa</h1>
              <h1 className="mb-8 text-xs font-normal">
                Berdasarkan topic peminatan
              </h1>
              <PieChart data={pieChartData} options={pieOptions} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DashboardAdmin;
