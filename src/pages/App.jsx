import { Card } from "../components";

function App() {
  return (
    <main className="container mx-auto space-y-5 p-5">
      <div className="flex items-center justify-center gap-5">
        {Array.from({ length: 4 }, (_, index) => (
          <Card
            key={index}
            title={"Chatbot AI"}
            desc={
              "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. Lorem ipsum, or lipsum as it is sometimes known, is dummy."
            }
            onClick={() => {}}
          />
        ))}
      </div>
    </main>
  );
}

export default App;
