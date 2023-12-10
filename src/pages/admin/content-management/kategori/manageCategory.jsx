import { React, useEffect, useMemo, useState } from "react";
import Layout from "@/components/layout/Index"
import Breadcrumb from "@/components/breadcrumb"
import Table from "@/components/table/tables"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Link, useNavigate } from "react-router-dom"
import DropdownAction from "@/components/table/DropdownAction";
import { dataCategory } from "@/utils/dummyData";
import { getCategory, deleteCategory } from "@/utils/apis/manage-category";
import Swal from "sweetalert2";

const ManageCategory = () => {
    const navigate = useNavigate()
    const [category, setCategory] = useState([])

    useEffect(() => {
      fetchData()
    }, [])

    async function fetchData() {
      try {
        const result = await getCategory()
        setCategory(result.data)
      } catch (error) {
        console.log("Error", error)
      }
    }

    console.log(category)

    function handleEdit(id) {
      navigate(`/category-management/edit-category/${id}`)
    }

    async function handleDelete(id){
      Swal.fire({
        title: "Yakin kamu mau menghapus FAQ ini?",
        icon: "question",
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonColor: "#d33",
        confirmButtonText: "Ya, Hapus",
        cancelButtonText: "Batal",
        cancelButtonColor: "#6c757d",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const result = await deleteCategory(id)
            if (result.data.code === 200) {
              Swal.fire({
                title: "Sukses Menghapus FAQ",
                icon: "success",
                showConfirmButton: false,
                showCloseButton: true,
                timer: 2000,
              });
            }
          } catch (error) {
            console.log("Error", error)
          } finally {
            fetchData()
          }
        }
      })

    }

    const columns = useMemo(() => [
        {
          header: "No",
          cell: (info) => <div className="text-center">{info.row.index + 1}</div>,
        },
        ,
        {
          header: "Kategori",
          accessorKey: "name",
          cell: (info) => <div className="text-center">{info.getValue()}</div>,
          rowSpan: true,
        },
        {
          header: "Deskripsi",
          accessorKey: "description",
          cell: (info) => <div className="text-center">{info.getValue()}</div>,
        },
        {
          header: "ACT",
          rowSpan: true,
          cell: (info) => (
            <div className="text-center">
              <DropdownAction>
                <div className="flex flex-col">
                    <Button
                      className="bg-white px-8 text-black hover:text-white"
                      onClick={() => handleEdit(info.row.original.id)}
                    >
                      Edit
                    </Button>
                  <Button
                    className="bg-white px-8 text-black hover:text-white"
                    onClick={() => handleDelete(info.row.original.id)}
                  >
                    Delete
                  </Button>
                </div>
              </DropdownAction>
            </div>
          ),
        },
      ]);


    return(
        <Layout>
        <div className="container mb-10">
          <Breadcrumb />
          <div className="mt-10 rounded-lg border border-[#f2994a] p-11 font-poppins">
            <h2 className="text-3xl font-semibold">Kelola Kategori</h2>

            <div>
              <Table
                datas={category}
                columns={columns}
                rowVisible={true}
                isVisible={true}

                searchComponent={
                  <div className="flex w-1/2 items-center justify-end space-x-3">
                  <p className="text-xl font-semibold">Search</p>{" "}
                  <Input
                      id="search"
                      className="w-40 rounded border-[#092C4C]"
                  />
                  <Link to="/category-management/tambah-category">
                    <Button>Tambah Kategori</Button>
                  </Link>
                  </div>
              }
                classNameHeader="bg-[#a2d2ff]"
              />
            </div>
          </div>
        </div>
      </Layout>
    )
}

export default ManageCategory