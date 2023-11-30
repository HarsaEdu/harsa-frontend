import Layout from "@/components/layout/Index"
import CardListClass from "@/pages/list-class/CardListClass"
import { Button } from "@/components/ui/button"

import Bell from "../../assets/bell.svg"
import Filter from "../../assets/filter.svg"

import PemrogramanFrontend from "../../assets/pemrograman-frontend.svg"
import PemrogramanBackend from "../../assets/pemrograman-backend.svg"
import PemrogramanMobile from "../../assets/pemrograman-mobile.svg"
import PemrogramanJava from "../../assets/pemrograman-java.svg"
import Breadcrumb from "@/components/breadcrumb"

const ListClass = () => {
    return(
        <Layout>
            <div className="container mb-10">
                <div className="flex justify-end mt-1">
                    <img src={Bell} alt="" className="w-[58px] cursor-pointer" />
                </div>
                <Breadcrumb />
                <div className="flex justify-between mt-2 cursor-pointer">
                    <div className="flex">
                        <Button
                        className="border bg-white border-[#092C4C] p-[10px] text-[#092C4C] rounded-none"
                        >
                            <p className="font-poppins font-normal text-[16px]">Kategory</p>
                        </Button>
                        <Button
                        className="border bg-white border-[#092C4C] p-[10px] text-[#092C4C] rounded-none"
                        >
                            <p className="font-poppins font-normal text-[16px]">Filter</p>
                            <img src={Filter} alt="" className="ml-2" />
                        </Button>
                    </div>
                    <Button
                    className="bg-[#092C4C] w-[168px] justify-center items-center px-[10px] py-[15px] rounded-lg"
                    >
                        <p className="text-white font-poppins font-semibold text-[16px]">Manage Kelas</p>
                    </Button>
                </div>
                <div className="flex justify-end gap-2 mt-5 items-center">
                    <p className="font-poppins text-[16px]">Search</p>
                    <input type="text" 
                    className="w-[240px] h-[44px] p-[10px] border border-black rounded"
                    id="search"
                    />
                </div>
            </div>

            <div>
                <CardListClass
                    img={PemrogramanFrontend}
                    judul="Pemrograman Frontend"
                    category="Pemrograman"
                    instructor="Ir. Wahyu Nugroho"
                    description="Pemrograman frontend merupakan suatu proses pengembangan dan implementasi elemen-elemen antarmuka pengguna (UI) dalam sebuah aplikasi atau situs web. Fokus utama dari pemrograman frontend adalah membuat tampilan yang menarik dan berfungsi dengan baik untuk pengguna akhir. Ini melibatkan pengkodean aspek visual dan interaktif dari suatu aplikasi, yang dapat dilihat dan diakses langsung oleh pengguna."
                />
                <CardListClass
                    img={PemrogramanBackend}
                    judul="Pemrograman Backend"
                    category="Pemrograman"
                    instructor="Danang G."
                    description="Pemrograman backend adalah suatu pemrograman yang berfokus pada pengembangan dan pengelolaan komponen teknologi yang berada di 'belakang layar' atau di server suatu aplikasi. Ini mencakup pengembangan logika, database, dan fungsi server yang mendukung operasional aplikasi web atau perangkat lunak. Pemrograman backend bertanggung jawab untuk mengatur data, menjalankan logika bisnis, dan menyediakan antarmuka untuk interaksi dengan frontend atau antarmuka pengguna"
                />
                <CardListClass
                    img={PemrogramanMobile}
                    judul="Pemrograman Mobile"
                    category="Pemrograman"
                    instructor="Joko joestar"
                    description="Pemrograman mobile mencakup pengembangan aplikasi yang dirancang khusus untuk perangkat seluler, seperti ponsel pintar dan tablet. Ini mencakup dua platform utama: iOS untuk perangkat Apple seperti iPhone dan iPad, dan Android untuk sebagian besar perangkat seluler lainnya."
                />
                <CardListClass
                    img={PemrogramanJava}
                    judul="Pemrograman Java"
                    category="Pemrograman"
                    instructor="Suwahyono"
                    description="Pemrograman Java adalah paradigma pemrograman yang kuat dan populer yang dikembangkan oleh Sun Microsystems pada awal tahun 1990-an. Java dirancang untuk menjadi platform independen, artinya kode Java dapat dijalankan di berbagai platform tanpa modifikasi"
                />
            </div>
        </Layout>
    )
}

export default ListClass