import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios"
import { format } from 'date-fns';
import Breadcrumb from "@/components/breadcrumb"
import Layout from "@/components/layout/Index"
import { Button } from "@/components/ui/button"

const DetailUser = () => {
    const { id } = useParams(); // Menggunakan useParams untuk mendapatkan id dari URL
    const [userData, setUserData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
        try {
            const response = await axios.get(
            `https://api.harsaedu.my.id/web/users/${id}`,
            {
                headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                'Content-Type': 'application/json',
                },
            }
            );
            setUserData(response.data.data);
        } catch (error) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
        };

        fetchUserData();
    }, [id]);

    if (isLoading) {
        return <p>Loading...</p>;
    }

  if (error) {
    return <p>Error: {error.message}</p>;
  }
  const formattedDate = format(new Date(userData.date_birth), 'dd/MM/yyyy');

    return (
        <Layout>
            <Breadcrumb />
            <div className="my-10 me-12 ms-14 p-8 rounded-lg border border-[#808080]">
                <div className="flex flex-row gap-8">
                    <img className="rounded-2xl h-64 w-64" src="/assets/user/dummy-user.png" alt="" />
                    <div className="space-y-8 w-full">
                        <div className="bg-[#092C4C] rounded-xl p-5 space-y-3">
                            <p className="font-poppins font-semibold text-[#fff] mb-2">Data Diri</p>
                            <p className="font-poppins text-[#fff] font-semibold flex flex-row gap-2">
                                <span className="font-normal flex justify-between w-40">Nama Depan <span>:</span></span>
                                {userData.first_name}
                            </p>
                            <p className="font-poppins text-[#fff] font-semibold flex flex-row gap-2"><span className="font-normal flex justify-between w-40">Nama Belakang <span>:</span></span> {userData.last_name}</p>
                            <p className="font-poppins text-[#fff] font-semibold flex flex-row gap-2"><span className="font-normal flex justify-between w-40">Tanggal Lahir <span>:</span></span> {formattedDate}</p>
                        </div>
                        <div className="bg-[#092C4C] rounded-xl p-5 space-y-3">
                            <p className="font-poppins font-semibold text-[#fff] mb-2">Data Lainnya</p>
                            <p className="font-poppins text-[#fff] font-semibold flex flex-row gap-2"><span className="font-normal flex justify-between w-40">Nomor Telepon <span>:</span></span>{userData.phone_number}</p>
                            <p className="font-poppins text-[#fff] font-semibold flex flex-row gap-2"><span className="font-normal flex justify-between w-40">Email <span>:</span></span> {userData.email}</p>
                            <p className="font-poppins text-[#fff] font-semibold flex flex-row gap-2"><span className="font-normal flex justify-between w-40">Role <span>:</span></span> {userData.role_name}</p>
                        </div>
                        <div className="bg-[#092C4C] rounded-xl p-5 space-y-3">
                            <p className="font-poppins font-semibold text-[#fff] mb-2">Kelas Yang Diikuti</p>
                            <div className="rounded-lg w-fit flex flex-row items-center gap-2 bg-[#fff] p-3">
                                <div className="rounded-full w-2 h-2 bg-[#092C4C]"></div>
                                <p className="text-[#092C4C] font-poppins font-semibold">Frontend Programming</p>
                            </div>
                            <div className="rounded-lg w-fit flex flex-row items-center gap-2 bg-[#fff] p-3">
                                <div className="rounded-full w-2 h-2 bg-[#092C4C]"></div>
                                <p className="text-[#092C4C] font-poppins font-semibold">UI/UX Designer</p>
                            </div>
                        </div>
                        <div>
                            <Link to="/user-management">
                                <Button className="bg-[#ED7878] text-[#fff] font-poppins py- font-semibold w-40 h-10 float-right">Kembali</Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default DetailUser