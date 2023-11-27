import React from "react";
import Layout from "@/components/layout/Index";
import Breadcrumb from "@/components/breadcrumb";

function App() {
  const userRole = 'admin'

  return (
    <Layout userRole={userRole}>
      <Breadcrumb />
    </Layout>
  );
}

export default App;
