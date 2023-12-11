import Layout from "@/components/layout/Index";

export default function DetailNotification() {
  return (
    <Layout>
      <main>
        <section className="space-y-5">
          <h1 className="text-4xl font-bold">Notifikasi</h1>
          <section className="rounded-lg border p-5">
            <h2 className="pb-5 text-2xl font-semibold">Inbox</h2>
            <section className="rounded-lg border p-5">
              <h3 className="text-xl font-semibold">
                Pengumuman Perubahan Tampilan UI LMS
              </h3>
              <p>
                27 Okt, 21:30 WIB
                <br />
                From : Sistem
              </p>
              <br />
              <p>
                Kami senang memberitahu Anda bahwa kami telah melakukan
                perubahan pada tampilan antarmuka (UI) sistem LMS kami! Dengan
                desain yang lebih modern dan intuitif, pengalaman belajar Anda
                akan semakin menyenangkan. Segera login dan temukan perubahan
                yang menarik!
                <br />
                <br />
                Terima kasih, Tim Pengembangan LMS
              </p>
              <section className="mt-10 space-x-3">
                <button
                  type="button"
                  className="rounded-md bg-[#092C4C] px-3 py-1 text-white"
                >
                  Kembali
                </button>
                <button
                  type="button"
                  className="rounded-md bg-red-500 px-3 py-1 text-white"
                >
                  Kembali
                </button>
              </section>
            </section>
          </section>
        </section>
      </main>
    </Layout>
  );
}
