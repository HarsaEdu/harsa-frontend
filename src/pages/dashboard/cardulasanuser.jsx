import { CardUlasanUser } from "../../components/landing-page/card/cardulasanuser";

export default function Dashboard() {
  const dataUlasanUser = [
    {
      title: "Bagus Onsu",
      desc: "Pelajaran yang sangat mantap, penjelasan instructor sangat mudah dimengerti",
      time: "24h ago",
    },
    {
      title: "Bagus Nainggolan",
      desc: "Pelajaran yang sangat mantap, penjelasan instructor sangat mudah dimengerti",
      time: "24h ago",
    },
    {
      title: "Bagus Lilipaly",
      desc: "Pelajaran yang sangat mantap, penjelasan instructor sangat mudah dimengerti",
      time: "24h ago",
    },
  ];

  return (
    <section className="container mx-auto w-full space-y-5 px-2">
      <h2 className="text-start text-2xl font-bold">Ulasan User</h2>
      <div className="grid grid-cols-2 gap-8 sm:grid-cols-1">
        {dataUlasanUser.map((value, index) => (
          <CardUlasanUser
            key={index}
            image={
              <img
                src={`/assets/user/user${index + 1}.svg`}
                alt={`User${index + 1}`}
              />
            }
            title={value.title}
            desc={value.desc}
            time={value.time}
          />
        ))}
      </div>
    </section>
  );
}
