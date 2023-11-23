import { Card } from "@/components/landing-page/card";
import Breadcrumb from "@/components/breadcrumb";

export default function LandingPage() {
  const dataFeature = [
    {
      title: "Notifikasi",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
    },
    {
      title: "Kelas",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
    },
    {
      title: "Quiz",
      desc: "Fitur Quiz tersedia untuk menghadirkan tantangan belajar yang menyenangkan. Lebih dari sekadar tes, fitur ini adalah kesempatan untuk mengevaluasi pengetahuan dan berpikir anda.",
    },
    {
      title: "Chatbot AI",
      desc: "Dilengkapi dengan Chatbot AI yang dapat berinteraksi dengan Anda seperti manusia, memahami pertanyaan-pertanyaan Anda, memberikan jawaban cepat.",
    },
  ];
  return (
    <section className="container mx-auto space-y-5 px-5">
      <Breadcrumb></Breadcrumb>
      <h2 className="text-center text-2xl font-bold">Our Feature</h2>
      <div className="grid grid-cols-2 gap-5 sm:grid-cols-4">
        {dataFeature.map((value, index) => (
          <Card
            image={
              <img
                src={`/assets/illustrations/feature${index + 1}.svg`}
                alt={`Feature${index + 1}`}
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
