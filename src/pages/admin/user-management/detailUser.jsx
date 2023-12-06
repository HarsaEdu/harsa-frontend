import Breadcrumb from "@/components/breadcrumb"
import Layout from "@/components/layout/Index"
import { Button } from "@/components/ui/button"

const DetailUser = () => {
    return (
        <Layout userRole="admin">
            <Breadcrumb />
            <div className="my-10 me-12 ms-14 p-8 rounded-lg border border-[#808080]">
                <div className="flex flex-row gap-8">
                    <img className="rounded-2xl h-64 w-64" src="/assets/user/dummy-user.png" alt="" />
                    <div className="space-y-8 w-full">
                        <div className="bg-[#092C4C] rounded-xl p-5 space-y-3">
                            <p className="font-poppins font-semibold text-[#fff] mb-2">Data Diri</p>
                            <p className="font-poppins text-[#fff] font-semibold flex flex-row gap-2"><span className="font-normal flex justify-between w-40">Nama Depan <span>:</span></span>John</p>
                            <p className="font-poppins text-[#fff] font-semibold flex flex-row gap-2"><span className="font-normal flex justify-between w-40">Nama Belakang <span>:</span></span> Doe</p>
                            <p className="font-poppins text-[#fff] font-semibold flex flex-row gap-2"><span className="font-normal flex justify-between w-40">Tanggal Lahir <span>:</span></span> 12/02/2002</p>
                        </div>
                        <div className="bg-[#092C4C] rounded-xl p-5 space-y-3">
                            <p className="font-poppins font-semibold text-[#fff] mb-2">Data Lainnya</p>
                            <p className="font-poppins text-[#fff] font-semibold flex flex-row gap-2"><span className="font-normal flex justify-between w-40">Nomor Telepon <span>:</span></span>0812-3456-7565</p>
                            <p className="font-poppins text-[#fff] font-semibold flex flex-row gap-2"><span className="font-normal flex justify-between w-40">Email <span>:</span></span> johndoe@mail.com</p>
                            <p className="font-poppins text-[#fff] font-semibold flex flex-row gap-2"><span className="font-normal flex justify-between w-40">Role <span>:</span></span> Customer</p>
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
                        <Button className="bg-[#ED7878] text-[#fff] font-poppins font-semibold w-40 h-10 float-right">Kembali</Button>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default DetailUser