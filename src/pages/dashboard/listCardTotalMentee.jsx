import CardTotalMentee from "./cardTotalMentee";

export default function ListCardTotalMentee() {
  const dataTotalMentee = [
    {
      title: "Peserta",
      amount: 133
    },
    {
      title: "Peserta Aktif",
      amount: 78
    }
  ];

  return (
    <section className="container w-full gap-8 pb-4">
      <div className="flex justify-between">
        {dataTotalMentee.map((value, index) => (
          <CardTotalMentee
            key={index}
            title={value.title}
            amount={value.amount}
          />
        ))}
      </div>
    </section>
  );
}
