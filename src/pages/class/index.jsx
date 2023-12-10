import { React, useState } from "react";
import Layout from "@/components/layout/Index";
import Breadcrumb from "@/components/breadcrumb";
import FormKelasAdmin from "@/pages/module/formKelasAdmin";
import FormKelasInstructor from "@/pages/module/formKelasInstructor";

function AddClass() {
  const roleName = localStorage.getItem("role_name");

  return (
    <Layout>
      <div className="container font-poppins">
        <Breadcrumb />
        {roleName === "admin" ? <FormKelasAdmin /> : <FormKelasInstructor />}
      </div>
    </Layout>
  );
}

export default AddClass;
