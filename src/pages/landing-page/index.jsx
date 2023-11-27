import { Card } from "@/components/landing-page/card";
import Navbar from "@/components/ui/navbar";
import Hero from "./hero";
import AboutUs from "./aboutUs";
import Footer from "./footer";
import GetApps from "./get-apps";
import Faq from "./Faq";
import TestimoniCard from "./cardtestimoni";

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
    <>
      <Navbar />
      <Hero />
      <AboutUs />
      <section className="mb-16 mt-16 space-y-5 px-32">
        <h2 className="text-center text-2xl font-bold">Our Feature</h2>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 h-[550px]">
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
      <div className="mb-24">
        <TestimoniCard />
      </div>
      <div>
        <Faq />
      </div>
      <div className="mb-16 mt-16">
        <GetApps />
      </div>
      <Footer />
    </>
  );
}
