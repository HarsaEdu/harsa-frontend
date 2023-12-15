import { React, useMemo, useState, useEffect } from "react";
import Layout from "@/components/layout/Index"
import Breadcrumb from "@/components/breadcrumb"
import Table from "@/components/table/tables"
import DropdownAction from "@/components/table/DropdownAction";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getSubs } from "@/utils/apis/subs-plan";
import { deleteSubs } from "@/utils/apis/subs-plan";

const AddSubscription = () => {
    const [subsData, setSubsData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
      const fetchSubsData = async () => {
        try {
          const response = await getSubs();
          console.log("Response from getSubs:", response);
          
          setSubsData(response.data);
        } catch (error) {
          console.error("Error fetching Subs data:", error);
        }
      };
  
      fetchSubsData();
    }, []);
  
    const handleEdit = (id) => {
      // Navigasi ke halaman edit user dengan ID yang sesuai
      navigate(`/langganan/edit-paket/${id}`);
    };
  
    const handleDelete = async (id) => {
      // Tampilkan konfirmasi sebelum menghapus
      Swal.fire({
        title: "Yakin kamu mau  Hapus  data ini?",
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
            const response = await deleteSubs(id);

            console.log('Response dari server:', response);
  
            if (response.data.code === 200) {
              // Notifikasi setelah berhasil menghapus
              Swal.fire({
                title: "Sukses Hapus Data Paket",
                icon: "success",
                showConfirmButton: false,
                showCloseButton: true,
                timer: 2000,
              });
  
              // Perbarui data Subs setelah penghapusan berhasil
              setSubsData((prevData) =>
                prevData.filter((subs) => subs.id !== id)
              );
              console.log('subsData setelah penghapusan:', subsData);
            } else {
              console.error("Gagal menghapus Subs:", response.data.message);
            }
          } catch (error) {
              // Tampilkan detail kesalahan Axios
              if (error.response) {
                // Kesalahan respons dari server (status code yang tidak berhasil)
                console.error("Error deleting Subs - Server Response:", error.response.data);
              } else if (error.request) {
                // Tidak ada respons dari server
                console.error("Error deleting Subs - No Response:", error.request);
              } else {
                // Kesalahan lainnya
                console.error("Error deleting Subs:", error.message);
              }
          }
        }
      });
    };

    useEffect(() => {
      // useEffect baru untuk mencetak log setelah subsData diperbarui
      console.log('subsData in render:', subsData);
    }, [subsData]); 

      const formatRupiah = (number) => {
        const formatter = new Intl.NumberFormat('id-ID', {
          style: 'currency',
          currency: 'IDR',
        });
      
        return formatter.format(number);
      };

      const columns = useMemo(() => [
        {
          header: "No",
          cell: (info) => <div className="text-center">{info.row.index + 1}</div>,
        },
        {
          header: "Nama",
          accessorKey: "title",
          cell: (info) => <div className="text-center">{info.row.original.title}</div>,
          rowSpan: true,
        },
        {
          header: "Durasi",
          accessorKey: "duration",
          cell: (info) => <div className="text-center">{info.row.original.duration}</div>,
        },
        {
            header: "Harga",
            accessorKey: "price",
            cell: (info) => (
                <div className="text-center">{formatRupiah(info.row.original.price)}</div>
            ),
        },
        {
          header: "Action",
      rowSpan: true,
      cell: (info) => (
        <div className={`flex justify-center items-center`} style={info.row.original.actStyle}>
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
  ], [subsData]);

      console.log('subsData in render:', subsData); 

    return(
        <Layout>
            <Breadcrumb />
            <div className="border border-[#F2994A] py-[45px] px-[38px] rounded-[12px] mt-10 mb-10 font-poppins">
                <h1 className="font-semibold text-2xl">Kelola Paket Langganan</h1>
                <div className="mt-5">
                    <Table
                        datas={subsData}
                        columns={columns}
                        classNameHeader="bg-[#A2D2FF] text-black"
                        isVisible={true}
                        rowVisible={true}
                        searchComponent={
                          <div className="flex w-1/2 items-center justify-end space-x-3">
                            <p className="text-xl font-semibold">Search</p>{" "}
                            <Input
                              id="search"
                              className="w-40 rounded border-[#092C4C]"
                            />
                        <Link to="/langganan/tambah-paket">
                            <Button
                            className="font-semibold"
                            >
                                Tambah  Paket
                            </Button>
                        </Link>
                        </div>
                        }
                    />
                </div>
            </div>
        </Layout>
    )
}

export default AddSubscription