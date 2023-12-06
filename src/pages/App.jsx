import Layout from "@/components/layout/Index.jsx";
import Form from "../pages/kelas/Formkelasadmin";

function App() {
  const userRole = "admin";

  return (
    <Layout>
      <Form />
    </Layout>
  );
}

export default App;
