import { useState, useMemo } from "react";
import reactLogo from "../assets/react.svg";
import viteLogo from "../assets/vite.svg";
// import '../styles/App.css'
import { Button } from "@/components/ui/button";
import LandingPages from "./landingPage/Faq";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "lucide-react";
import Navbar from "@/components/ui/navbar";
import Hero from "@/components/landing-page/hero";
import GetApps from "@/components/landing-page/get-apps";
import { Input } from "@/components/ui/input";
import Table from "@/components/tables";
import Layout from "@/components/layout/Index";
import { Check, X } from "lucide-react";
import { realData2, realData } from "@/utils/dummyData";

import { createColumnHelper } from "@tanstack/react-table";

function App() {
  const [count, setCount] = useState(0);

  const columns = useMemo(() => [
    { header: "No", cell: (info) => info.row.index + 1 },
    {
      header: "Nama",
      accessorKey: "user_id",
      cell: (info) => info.getValue(),
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: (info) => (
        <div className="flex justify-center">
          {info.row.original.status === "accepted" && (
            <div className="w-fit rounded-full bg-[#159C1B] px-5 py-1 text-center text-white">
              Accepted
            </div>
          )}
          {info.row.original.status === "pending" && (
            <div className="w-fit rounded-full  bg-[#D8D118] px-5 py-1 text-center text-black">
              Pending
            </div>
          )}
          {info.row.original.status === "rejected" && (
            <div className="w-fit rounded-full  bg-[#DC1D1D] px-5 py-1 text-center text-white">
              Rejected
            </div>
          )}
          {info.row.original.status === "not submit" && (
            <div className="w-fit rounded-full  bg-[#F6F6F6] px-5 py-1 text-center text-black">
              Not Submit
            </div>
          )}
        </div>
      ),
    },
    {
      header: "Action",
      cell: (info) => (
        <div className="text-center">
          <Button
            className="bg-[#092C4C] px-8 text-white"
            onClick={() => console.log(info.row.original.user_id)}
          >
            Review
          </Button>
        </div>
      ),
    },
  ]);

  const allQuestions = realData2.flatMap((user) =>
    user.answers.map((answer) => answer.qestion_id),
  );
  const uniqueQuestions = [...new Set(allQuestions)]; // Get unique question IDs

  const jawabanColumns = uniqueQuestions.map((questionId, index) => ({
    id: `jawaban-${index + 1}`,
    header: () => <span>{index + 1}</span>,
    accessor: (data) => {
      const userAnswer = data.answers.find(
        (answer) => answer.qestion_id === questionId,
      );
      return userAnswer || {};
    },
    cell: (info) =>
      info.row.original.answers.find(
        (answer) => answer.qestion_id === questionId,
      )?.is_right ? (
        <div className="flex justify-center">
          <Check />
        </div>
      ) : (
        <div className="flex justify-center">
          <X />
        </div>
      ),
  }));

  const columns2 = useMemo(() => [
    { header: "No", cell: (info) => info.row.index + 1, rowSpan: true },
    ,
    {
      header: "Nama",
      accessorKey: "user_id",
      cell: (info) => info.getValue(),
      rowSpan: true,
    },
    {
      header: "Jawaban",
      columns: [...jawabanColumns],
    },
    {
      header: "Skor",
      accessorKey: "score",
      rowSpan: false,
    },
  ]);

  return (
    <div>
      <Hero />
      <GetApps />
      <Layout>
        <h2 className="mb-2 text-center text-xl font-semibold">
          Manage Tugas Table
        </h2>
        <div className="mb-4 flex w-full overflow-x-auto">
          <Table columns={columns} datas={realData} />
        </div>
        <h2 className="mb-2 text-center text-xl font-semibold">
          Jawaban Quiz Table
        </h2>
        <div className="flex w-full overflow-x-auto">
          <Table columns={columns2} datas={realData2} />
        </div>
      </Layout>
      <div className="flex justify-center"></div>
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <Button
          className="mx-3 bg-slate-600"
          onClick={() => setCount((count) => count + 1)}
          disabled
        >
          count is {count}
        </Button>
        <Button
          className="mx-3 bg-slate-600"
          onClick={() => setCount((count) => count + 1)}
        >
          count is {count}
        </Button>
        <Button variant="outline">Button outline</Button>
        <Button variant="link">
          <a href="/aaa">Link Btn</a>
        </Button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <LandingPages />
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
}

export default App;
