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
import TableQuiz from "@/components/tables";
import Layout from "@/components/layout/Index";
import { Check, X } from "lucide-react";

import { createColumnHelper } from "@tanstack/react-table";

function App() {
  const [count, setCount] = useState(0);

  const realData = [
    {
      id: 1,
      user_id: "Emmey Sowte",
      score: 89,
      finish_at: 'error: invalid date "2023-11-03T00:32:11.206+07:00"',
      answers: [
        {
          id: 1,
          qestion_id: 1,
          option_id: 1,
          is_right: false,
        },
        {
          id: 2,
          qestion_id: 2,
          option_id: 2,
          is_right: false,
        },
        {
          id: 3,
          qestion_id: 3,
          option_id: 3,
          is_right: false,
        },
        {
          id: 4,
          qestion_id: 4,
          option_id: 4,
          is_right: true,
        },
        {
          id: 5,
          qestion_id: 5,
          option_id: 5,
          is_right: true,
        },
        {
          id: 6,
          qestion_id: 6,
          option_id: 6,
          is_right: true,
        },
        {
          id: 7,
          qestion_id: 7,
          option_id: 7,
          is_right: false,
        },
        {
          id: 8,
          qestion_id: 8,
          option_id: 8,
          is_right: false,
        },
        {
          id: 9,
          qestion_id: 9,
          option_id: 9,
          is_right: true,
        },
        {
          id: 10,
          qestion_id: 10,
          option_id: 10,
          is_right: true,
        },
      ],
    },
    {
      id: 2,
      user_id: "Cherey Damp",
      score: 80,
      finish_at: 'error: invalid date "2023-11-03T00:32:11.206+07:00"',
      answers: [
        {
          id: 1,
          qestion_id: 1,
          option_id: 1,
          is_right: false,
        },
        {
          id: 2,
          qestion_id: 2,
          option_id: 2,
          is_right: true,
        },
        {
          id: 3,
          qestion_id: 3,
          option_id: 3,
          is_right: true,
        },
        {
          id: 4,
          qestion_id: 4,
          option_id: 4,
          is_right: true,
        },
        {
          id: 5,
          qestion_id: 5,
          option_id: 5,
          is_right: true,
        },
        {
          id: 6,
          qestion_id: 6,
          option_id: 6,
          is_right: true,
        },
        {
          id: 7,
          qestion_id: 7,
          option_id: 7,
          is_right: false,
        },
        {
          id: 8,
          qestion_id: 8,
          option_id: 8,
          is_right: true,
        },
        {
          id: 9,
          qestion_id: 9,
          option_id: 9,
          is_right: false,
        },
        {
          id: 10,
          qestion_id: 10,
          option_id: 10,
          is_right: false,
        },
      ],
    },
    {
      id: 3,
      user_id: "Carola Benettelli",
      score: 43,
      finish_at: 'error: invalid date "2023-11-03T00:32:11.206+07:00"',
      answers: [
        {
          id: 1,
          qestion_id: 1,
          option_id: 1,
          is_right: false,
        },
        {
          id: 2,
          qestion_id: 2,
          option_id: 2,
          is_right: true,
        },
        {
          id: 3,
          qestion_id: 3,
          option_id: 3,
          is_right: true,
        },
        {
          id: 4,
          qestion_id: 4,
          option_id: 4,
          is_right: false,
        },
        {
          id: 5,
          qestion_id: 5,
          option_id: 5,
          is_right: true,
        },
        {
          id: 6,
          qestion_id: 6,
          option_id: 6,
          is_right: true,
        },
        {
          id: 7,
          qestion_id: 7,
          option_id: 7,
          is_right: false,
        },
        {
          id: 8,
          qestion_id: 8,
          option_id: 8,
          is_right: true,
        },
        {
          id: 9,
          qestion_id: 9,
          option_id: 9,
          is_right: false,
        },
        {
          id: 10,
          qestion_id: 10,
          option_id: 10,
          is_right: true,
        },
      ],
    },
    {
      id: 4,
      user_id: "Nikolaus Fishpool",
      score: 13,
      finish_at: 'error: invalid date "2023-11-03T00:32:11.206+07:00"',
      answers: [
        {
          id: 1,
          qestion_id: 1,
          option_id: 1,
          is_right: true,
        },
        {
          id: 2,
          qestion_id: 2,
          option_id: 2,
          is_right: false,
        },
        {
          id: 3,
          qestion_id: 3,
          option_id: 3,
          is_right: true,
        },
        {
          id: 4,
          qestion_id: 4,
          option_id: 4,
          is_right: true,
        },
        {
          id: 5,
          qestion_id: 5,
          option_id: 5,
          is_right: true,
        },
        {
          id: 6,
          qestion_id: 6,
          option_id: 6,
          is_right: false,
        },
        {
          id: 7,
          qestion_id: 7,
          option_id: 7,
          is_right: true,
        },
        {
          id: 8,
          qestion_id: 8,
          option_id: 8,
          is_right: false,
        },
        {
          id: 9,
          qestion_id: 9,
          option_id: 9,
          is_right: true,
        },
        {
          id: 10,
          qestion_id: 10,
          option_id: 10,
          is_right: false,
        },
      ],
    },
    {
      id: 5,
      user_id: "Zsa zsa Boydon",
      score: 94,
      finish_at: 'error: invalid date "2023-11-03T00:32:11.206+07:00"',
      answers: [
        {
          id: 1,
          qestion_id: 1,
          option_id: 1,
          is_right: true,
        },
        {
          id: 2,
          qestion_id: 2,
          option_id: 2,
          is_right: true,
        },
        {
          id: 3,
          qestion_id: 3,
          option_id: 3,
          is_right: true,
        },
        {
          id: 4,
          qestion_id: 4,
          option_id: 4,
          is_right: true,
        },
        {
          id: 5,
          qestion_id: 5,
          option_id: 5,
          is_right: true,
        },
        {
          id: 6,
          qestion_id: 6,
          option_id: 6,
          is_right: true,
        },
        {
          id: 7,
          qestion_id: 7,
          option_id: 7,
          is_right: true,
        },
        {
          id: 8,
          qestion_id: 8,
          option_id: 8,
          is_right: true,
        },
        {
          id: 9,
          qestion_id: 9,
          option_id: 9,
          is_right: true,
        },
        {
          id: 10,
          qestion_id: 10,
          option_id: 10,
          is_right: false,
        },
      ],
    },
    {
      id: 6,
      user_id: "Cherey Dampling",
      score: 80,
      finish_at: 'error: invalid date "2023-11-03T00:32:11.206+07:00"',
      answers: [
        {
          id: 1,
          qestion_id: 1,
          option_id: 1,
          is_right: false,
        },
        {
          id: 2,
          qestion_id: 2,
          option_id: 2,
          is_right: true,
        },
        {
          id: 3,
          qestion_id: 3,
          option_id: 3,
          is_right: true,
        },
        {
          id: 4,
          qestion_id: 4,
          option_id: 4,
          is_right: true,
        },
        {
          id: 5,
          qestion_id: 5,
          option_id: 5,
          is_right: true,
        },
        {
          id: 6,
          qestion_id: 6,
          option_id: 6,
          is_right: true,
        },
        {
          id: 7,
          qestion_id: 7,
          option_id: 7,
          is_right: false,
        },
        {
          id: 8,
          qestion_id: 8,
          option_id: 8,
          is_right: true,
        },
        {
          id: 9,
          qestion_id: 9,
          option_id: 9,
          is_right: false,
        },
        {
          id: 10,
          qestion_id: 10,
          option_id: 10,
          is_right: false,
        },
      ],
    },
  ];

  const jawabanColumns = realData.map((_, index) => ({
    id: `jawaban-${index + 1}`,
    header: () => <span>{index + 1}</span>,
    accessor: (data) => data.answers[index],
    cell: (info) =>
      info.row.original.answers[index].is_right ? <Check /> : <X />,
  }));

  const columns = useMemo(() => [
    { header: "No", cell: (info) => info.row.index + 1 },
    {
      header: "Nama",
      accessorKey: "user_id",
      cell: (info) => info.getValue(),
    },
    {
      header: "Jawaban",
      columns: jawabanColumns,
    },
    {
      header: "Skor",
      accessorKey: "score",
    },
  ]);

  return (
    <div>
      <Hero />
      <GetApps />
      <Layout>
        <div className="flex w-full overflow-x-auto">
          <TableQuiz columns={columns} datas={realData} />
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
