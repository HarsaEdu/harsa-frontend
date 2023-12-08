import { React, useMemo } from "react";
import Layout from "@/components/layout/Index"
import Breadcrumb from "@/components/breadcrumb"
import Table from "@/components/table/tables"
import subscriptionData from "./subscriptionData";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import ActionIcon from '../../../assets/Action.svg'
const AddSubscription = () => {
    const handleActClick = (id) => {
        Swal.fire({
          title: 'Yakin kamu mau  Hapus  data ini?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Ya, hapus!',
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire({
                icon: 'success',
                title: 'Sukses Hapus  Data Paket',
                showCloseButton: true,
                closeButtonHtml: '<i class="fas fa-times"></i>',
                showConfirmButton: false,
                customClass: {
                    title: 'text-[#333333] font-bold text-2xl mb-4',
                    closeButton: 'bg-[#E5E5E5] text-[#4F4F4F] text-2xl rounded-full p-2 m-2',
                },
            });
          }
        });
      };


    const columns = useMemo(() => [
        {
            header: "No",
            cell: (info) => <div className="text-center">{info.row.index + 1}</div>,
        },
        {
            header: "Nama",
            accessorKey: "name",
            cell: (info) => (
            <div className="text-center">
                <Link to={`/langganan/edit-paket/${info.row.original.id}`}>
                {info.getValue()}
                </Link>
            </div>
          ),
        },
        {
            header: "Durasi",
            accessorKey: "durasi",
            cell: (info) => (
            <div className="text-center">
                <Link to={`/langganan/edit-paket/${info.row.original.id}`}>
                {info.getValue()}
                </Link>
            </div>
            ),
        },
        {
            header: "Harga",
            accessorKey: "Harga",
            cell: (info) => (
            <div className="text-center">
                <Link to={`/langganan/edit-paket/${info.row.original.id}`}>
                {info.getValue()}
                </Link>
            </div>
            ),
        },
        {
            header: "Act",
            accessorKey: "act",
            cell: (info) => (
                <div className={`flex justify-center items-center`} style={info.row.original.actStyle}>
                <Link to="#" onClick={() => handleActClick(info.row.original.id)}>
                  <img src={ActionIcon} alt={`Action Icon ${info.row.original.id}`} /> {/* Add ActionIcon */}
                </Link>
              </div>
            ),
        },
        ], []);

    return(
        <Layout userRole="admin">
            <Breadcrumb />
            <div className="border border-[#F2994A] py-[45px] px-[38px] rounded-[12px] mt-10 mb-10 font-poppins">
                <h1 className="font-semibold text-2xl">Kelola Paket Langganan</h1>
                <div className="mt-5">
                    <Table
                        datas={subscriptionData}
                        columns={columns}
                        classNameHeader="bg-[#A2D2FF] text-black"
                        isVisible={true}
                        rowVisible={true}
                        searchComponent={
                        <div className="flex w-1/2 items-center justify-end space-x-3">
                        <p className="text-xl">Search</p>{" "}
                        <Input
                            id="search"
                            className="w-2/4 rounded border-[#092C4C]"
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