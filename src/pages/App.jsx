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

import { createColumnHelper } from "@tanstack/react-table";

function App() {
  const [count, setCount] = useState(0);

  const realData = [
    {
      id: 1,
      module_id: 1,
      user_id: 1,
      submitted_at: "158150301",
      submitted_url:
        "http://scientificamerican.com/quisque/id/justo/sit/amet/sapien.jsp?est=imperdiet&quam=sapien&pharetra=urna&magna=pretium&ac=nisl&consequat=ut&metus=volutpat&sapien=sapien&ut=arcu&nunc=sed&vestibulum=augue&ante=aliquam&ipsum=erat&primis=volutpat&in=in&faucibus=congue&orci=etiam&luctus=justo&et=etiam&ultrices=pretium&posuere=iaculis&cubilia=justo&curae=in&mauris=hac&viverra=habitasse&diam=platea",
      status: "accepted",
    },
    {
      id: 2,
      module_id: 2,
      user_id: 2,
      submitted_at: "494140139",
      submitted_url:
        "https://networksolutions.com/in/lacus/curabitur/at/ipsum.xml?mauris=morbi&sit=vestibulum&amet=velit&eros=id&suspendisse=pretium&accumsan=iaculis&tortor=diam&quis=erat&turpis=fermentum&sed=justo&ante=nec&vivamus=condimentum&tortor=neque&duis=sapien&mattis=placerat&egestas=ante&metus=nulla&aenean=justo&fermentum=aliquam&donec=quis&ut=turpis&mauris=eget&eget=elit&massa=sodales&tempor=scelerisque&convallis=mauris&nulla=sit&neque=amet&libero=eros&convallis=suspendisse&eget=accumsan&eleifend=tortor&luctus=quis&ultricies=turpis&eu=sed&nibh=ante&quisque=vivamus&id=tortor&justo=duis&sit=mattis&amet=egestas&sapien=metus&dignissim=aenean&vestibulum=fermentum&vestibulum=donec&ante=ut&ipsum=mauris&primis=eget&in=massa&faucibus=tempor&orci=convallis&luctus=nulla&et=neque&ultrices=libero&posuere=convallis&cubilia=eget&curae=eleifend&nulla=luctus&dapibus=ultricies&dolor=eu&vel=nibh&est=quisque&donec=id&odio=justo&justo=sit&sollicitudin=amet&ut=sapien&suscipit=dignissim&a=vestibulum&feugiat=vestibulum&et=ante&eros=ipsum&vestibulum=primis&ac=in&est=faucibus&lacinia=orci&nisi=luctus&venenatis=et&tristique=ultrices&fusce=posuere&congue=cubilia&diam=curae&id=nulla&ornare=dapibus&imperdiet=dolor&sapien=vel&urna=est&pretium=donec&nisl=odio&ut=justo&volutpat=sollicitudin&sapien=ut&arcu=suscipit&sed=a&augue=feugiat&aliquam=et&erat=eros&volutpat=vestibulum",
      status: "rejected",
    },
    {
      id: 3,
      module_id: 3,
      user_id: 3,
      submitted_at: "335441549",
      submitted_url:
        "http://thetimes.co.uk/quam/sapien/varius/ut/blandit/non/interdum.xml?vel=etiam&accumsan=vel&tellus=augue&nisi=vestibulum&eu=rutrum&orci=rutrum&mauris=neque&lacinia=aenean&sapien=auctor&quis=gravida&libero=sem&nullam=praesent&sit=id&amet=massa&turpis=id&elementum=nisl&ligula=venenatis&vehicula=lacinia&consequat=aenean&morbi=sit&a=amet&ipsum=justo&integer=morbi&a=ut&nibh=odio&in=cras&quis=mi&justo=pede&maecenas=malesuada&rhoncus=in&aliquam=imperdiet&lacus=et&morbi=commodo&quis=vulputate&tortor=justo&id=in&nulla=blandit&ultrices=ultrices&aliquet=enim&maecenas=lorem&leo=ipsum&odio=dolor&condimentum=sit&id=amet&luctus=consectetuer&nec=adipiscing&molestie=elit&sed=proin&justo=interdum&pellentesque=mauris&viverra=non&pede=ligula&ac=pellentesque&diam=ultrices&cras=phasellus&pellentesque=id&volutpat=sapien&dui=in&maecenas=sapien&tristique=iaculis&est=congue&et=vivamus&tempus=metus&semper=arcu&est=adipiscing&quam=molestie&pharetra=hendrerit&magna=at",
      status: "not submit",
    },
    {
      id: 4,
      module_id: 4,
      user_id: 4,
      submitted_at: "1618653582",
      submitted_url:
        "https://mac.com/nisi/vulputate/nonummy/maecenas.jpg?nulla=lectus&suspendisse=in&potenti=est&cras=risus&in=auctor&purus=sed&eu=tristique&magna=in&vulputate=tempus&luctus=sit&cum=amet&sociis=sem&natoque=fusce&penatibus=consequat&et=nulla&magnis=nisl&dis=nunc&parturient=nisl&montes=duis",
      status: "pending",
    },
    {
      id: 5,
      module_id: 5,
      user_id: 5,
      submitted_at: "70301091",
      submitted_url:
        "http://google.co.uk/non.js?at=diam&lorem=in&integer=magna&tincidunt=bibendum&ante=imperdiet&vel=nullam&ipsum=orci&praesent=pede&blandit=venenatis&lacinia=non&erat=sodales&vestibulum=sed&sed=tincidunt&magna=eu&at=felis&nunc=fusce&commodo=posuere&placerat=felis&praesent=sed&blandit=lacus&nam=morbi&nulla=sem&integer=mauris&pede=laoreet&justo=ut&lacinia=rhoncus&eget=aliquet&tincidunt=pulvinar&eget=sed&tempus=nisl&vel=nunc&pede=rhoncus&morbi=dui&porttitor=vel&lorem=sem&id=sed&ligula=sagittis&suspendisse=nam&ornare=congue&consequat=risus&lectus=semper&in=porta&est=volutpat&risus=quam&auctor=pede&sed=lobortis&tristique=ligula&in=sit&tempus=amet&sit=eleifend&amet=pede&sem=libero&fusce=quis&consequat=orci&nulla=nullam&nisl=molestie&nunc=nibh&nisl=in&duis=lectus&bibendum=pellentesque&felis=at&sed=nulla&interdum=suspendisse&venenatis=potenti&turpis=cras&enim=in&blandit=purus&mi=eu&in=magna&porttitor=vulputate&pede=luctus&justo=cum&eu=sociis&massa=natoque&donec=penatibus&dapibus=et&duis=magnis&at=dis&velit=parturient&eu=montes&est=nascetur&congue=ridiculus&elementum=mus&in=vivamus&hac=vestibulum&habitasse=sagittis&platea=sapien&dictumst=cum&morbi=sociis&vestibulum=natoque&velit=penatibus&id=et&pretium=magnis&iaculis=dis",
      status: "accepted",
    },
  ];

  const realData2 = [
    {
      id: 22,
      user_id: 5,
      score: 60,
      finish_at: "2023-11-03T00:32:11.206+07:00",
      answers: [
        {
          id: 41,
          qestion_id: 16,
          option_id: 56,
          is_right: true,
        },
        {
          id: 42,
          qestion_id: 17,
          option_id: 62,
          is_right: true,
        },
        {
          id: 43,
          qestion_id: 18,
          option_id: 64,
          is_right: true,
        },
        {
          id: 44,
          qestion_id: 19,
          option_id: 69,
          is_right: false,
        },
        {
          id: 45,
          qestion_id: 20,
          option_id: 73,
          is_right: false,
        },
        {
          id: 47,
          qestion_id: 21,
          option_id: 73,
          is_right: false,
        },
        {
          id: 48,
          qestion_id: 22,
          option_id: 73,
          is_right: true,
        },
        {
          id: 49,
          qestion_id: 23,
          option_id: 73,
          is_right: false,
        },
        {
          id: 50,
          qestion_id: 24,
          option_id: 73,
          is_right: true,
        },
        {
          id: 51,
          qestion_id: 25,
          option_id: 73,
          is_right: false,
        },
      ],
    },
    {
      id: 25,
      user_id: 5,
      score: 85,
      finish_at: "2023-11-03T00:32:11.206+07:00",
      answers: [
        {
          id: 41,
          qestion_id: 16,
          option_id: 56,
          is_right: false,
        },
        {
          id: 42,
          qestion_id: 17,
          option_id: 62,
          is_right: true,
        },
        {
          id: 43,
          qestion_id: 18,
          option_id: 64,
          is_right: false,
        },
        {
          id: 44,
          qestion_id: 19,
          option_id: 69,
          is_right: false,
        },
        {
          id: 45,
          qestion_id: 20,
          option_id: 73,
          is_right: true,
        },
        {
          id: 47,
          qestion_id: 21,
          option_id: 73,
          is_right: false,
        },
        {
          id: 48,
          qestion_id: 22,
          option_id: 73,
          is_right: false,
        },
        {
          id: 49,
          qestion_id: 23,
          option_id: 73,
          is_right: false,
        },
        {
          id: 50,
          qestion_id: 24,
          option_id: 73,
          is_right: true,
        },
        {
          id: 51,
          qestion_id: 25,
          option_id: 73,
          is_right: true,
        },
      ],
    },
  ];

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
        <div>
          {info.row.original.status === "accepted" && (
            <div className="rounded-full bg-[#159C1B] px-5 py-1 text-center text-white">
              Accepted
            </div>
          )}
          {info.row.original.status === "pending" && (
            <div className="rounded-full bg-[#D8D118] px-5 py-1 text-center text-black">
              Pending
            </div>
          )}
          {info.row.original.status === "rejected" && (
            <div className="rounded-full bg-[#DC1D1D] px-5 py-1 text-center text-white">
              Rejected
            </div>
          )}
          {info.row.original.status === "not submit" && (
            <div className="rounded-full bg-[#F6F6F6] px-5 py-1 text-center text-black">
              Not Submit
            </div>
          )}
        </div>
      ),
    },
    {
      header: "Action",
      cell: (info) => (
        <div>
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
        <Check />
      ) : (
        <X />
      ),
  }));

  const columns2 = useMemo(() => [
    { header: "No", cell: (info) => info.row.index + 1 },
    {
      header: "Nama",
      accessorKey: "user_id",
      cell: (info) => info.getValue(),
    },
    {
      header: "Jawaban",
      columns: [...jawabanColumns],
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
