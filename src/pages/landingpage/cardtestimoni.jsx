import { CardTestimoni } from "../../components/landingpage/card/cardtestimoni";

export default function LandingPage() {
  const dataTestimoni = [
    {
      title: "Joko",
      desc: "“LMS yang sangat membantu saya dalam mempelajari ilmu-ilmu baru”",
    },
    {
      title: "Gareng",
      desc: "“Bagus sekali LMS ini, sangat membantu pembelajaran untuk orang awam ”",
    },
    {
      title: "Samiasih",
      desc: "“Anak saya sangat terbantu dengan adanya LMS ini, yang mana dapat meningkatkan skill”",
    },
    {
      title: "Darmi",
      desc: "“Saya sangat menyukai fitur-fitur yang ada di LMS terutama pada fitur Penjadwalan”",
    },
  ];

  return (
    <section className="container mx-auto w-full space-y-5 px-2">
      <h2 className="text-center text-2xl font-bold">Testimoni</h2>
      <div className="grid grid-cols-2 gap-5 sm:grid-cols-4">
        {dataTestimoni.map((value, index) => (
          <CardTestimoni
            key={index}
            image={
              <img
                src={`/assets/testimoni/testimoni${index + 1}.svg`}
                alt={`Testi${index + 1}`}
              />
            }
            title={value.title}
            desc={value.desc}
          />
        ))}
      </div>
    </section>
  );
}
