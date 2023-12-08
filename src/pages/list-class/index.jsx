import Layout from "@/components/layout/Index";
import CardListClass from "@/pages/list-class/CardListClass";
import { Button } from "@/components/ui/button";

import Filter from "@/assets/filter.svg";

import PemrogramanFrontend from "@/assets/pemrograman-frontend.svg";
import PemrogramanBackend from "@/assets/pemrograman-backend.svg";
import PemrogramanMobile from "@/assets/pemrograman-mobile.svg";
import PemrogramanJava from "@/assets/pemrograman-java.svg";
import Breadcrumb from "@/components/breadcrumb";

const ListClass = () => {
  return (
    <Layout>
      <div className="container mb-10">
        <Breadcrumb />
        <div className="mt-2 flex cursor-pointer justify-between">
          <div className="flex">
            <Button className="rounded-none border border-[#092C4C] bg-white p-[10px] text-[#092C4C]">
              <p className="font-poppins text-[16px] font-normal">Kategory</p>
            </Button>
            <Button className="rounded-none border border-[#092C4C] bg-white p-[10px] text-[#092C4C]">
              <p className="font-poppins text-[16px] font-normal">Filter</p>
              <img src={Filter} alt="" className="ml-2" />
            </Button>
          </div>
          <Button className="w-[168px] items-center justify-center rounded-lg bg-[#092C4C] px-[10px] py-[15px]">
            <p className="font-poppins text-[16px] font-semibold text-white">
              Tambah Kelas
            </p>
          </Button>
        </div>
        <div className="mt-5 flex items-center justify-end gap-2">
          <p className="font-poppins text-[16px]">Search</p>
          <input
            type="text"
            className="h-[44px] w-[240px] rounded border border-black p-[10px]"
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
  );
};

export default ListClass;
