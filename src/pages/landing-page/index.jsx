import { Card } from "@/pages/landing-page/card/cardFeature";
import Navbar from "@/pages/landing-page/navbar";
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
      <div id="aboutUs">
        <AboutUs />
      </div>
      <section className="mb-16 mt-16 space-y-5 px-32" id="ourFeature">
        <h2 className="text-center text-2xl font-bold">Our Feature</h2>
        <div className="grid h-[550px] grid-cols-2 gap-8 sm:grid-cols-4">
          {dataFeature.map((value, index) => (
            <Card
              key={value.title}
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
      <div className="mb-24" id="testimoniCard">
        <TestimoniCard />
      </div>
      <div id="faq">
        <Faq />
      </div>
      <div className="mb-16 mt-16" id="getApps">
        <GetApps />
      </div>
      <div id="footer">
        <Footer />
      </div>
    </>
  );
}
