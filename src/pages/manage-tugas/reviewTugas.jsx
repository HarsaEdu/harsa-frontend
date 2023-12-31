import { useEffect, useState } from "react";

import Breadcrumb from "@/components/breadcrumb"
import Layout from "@/components/layout/Index"
import { Button } from "@/components/ui/button"
import check from "@/assets/icons/check.svg";
import close from "@/assets/icons/close.svg";
import { Dialog, DialogClose, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import alertIcon from "@/assets/frame-alert.svg";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import Swal from "sweetalert2";
import brokenImg from "@/assets/broken-image.svg";
import checkGrey from "@/assets/icons/check-grey.svg";
import closeGrey from "@/assets/icons/close-grey.svg";
import { getSubmissionAnswerById, updateStatusSubmission } from "@/utils/apis/submissionAnswer";
import { useNavigate, useParams } from "react-router-dom";

const ReviewTugas = () => {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [status, setStatus] = useState("not submit");
    const [reason, setReason] = useState("");
    const [dataAnswer, setDataAnswer] = useState({});

    const navigate = useNavigate();
    const params = useParams();
    const form = useForm({
        defaultValues: {
            reason: "",
        },
    });

    const fetchData = async () => {
        try {
            const result = await getSubmissionAnswerById(params.idSubmission, params.idSubmissionAns)
            setDataAnswer(result.data);
            setStatus(result.data.status);
            setReason(result.data.feedback);
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);


    const handleRejected = (data, e) => {
        e.preventDefault();
        const newData = {
            "status": "rejected",
            "feedback": data.reason,
        }
        setDialogOpen(false);
        Swal.fire({
            title: "Yakin ingin menolak tugas ini?",
            text: "Proses ini akan secara permanen",
            icon: "question",
            showCancelButton: true,
            showConfirmButton: true,
            confirmButtonColor: "#092C4C",
            confirmButtonText: "Ya, Tolak",
            cancelButtonText: "Batal",
            cancelButtonColor: "#F2994A",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    console.log(data);
                    setStatus("rejected");
                    setReason(data.reason);
                    await updateStatusSubmission(params.idSubmission, params.idSubmissionAns, newData)
                    Swal.fire({
                        title: "Tugas ditolak!",
                        text: "Informasi terbaru telah tersimpan",
                        icon: "success",
                        showConfirmButton: false,
                        showCloseButton: true,
                    }).then(() => {
                        form.reset();
                        navigate(-1);
                    });
                } catch (error) {
                    Swal.fire({
                        title: "Gagal menolak tugas!",
                        text: error.message,
                        icon: "error",
                        showConfirmButton: false,
                        showCloseButton: true,
                    });
                }

            }
        });
    };

    const handleAccepted = () => {
        const newData = {
            "status": "accepted",
            "feedback": "feedback...",
        }

        Swal.fire({
            title: "Yakin ingin menerima tugas ini?",
            text: "Proses ini akan secara permanen",
            icon: "question",
            showCancelButton: true,
            showConfirmButton: true,
            confirmButtonColor: "#092C4C",
            confirmButtonText: "Ya, Terima",
            cancelButtonText: "Batal",
            cancelButtonColor: "#F2994A",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    setStatus("accepted");
                    await updateStatusSubmission(params.idSubmission, params.idSubmissionAns, newData)
                    Swal.fire({
                        title: "Tugas diterima!",
                        text: "Informasi terbaru telah tersimpan",
                        icon: "success",
                        showConfirmButton: false,
                        showCloseButton: true,
                    }).then(() => {
                        navigate(-1);
                    });
                } catch (error) {
                    Swal.fire({
                        title: "Gagal menerima tugas!",
                        text: error.message,
                        icon: "error",
                        showConfirmButton: false,
                        showCloseButton: true,
                    });
                }
            }
        });
    }

    return (
        <Layout>
            <Breadcrumb />
            <div className="my-5 rounded-lg border border-[#F2994A] p-5">
                <div className="mb-8">
                    <p className="text-xl font-bold font-poppins mb-3">Tugas</p>
                    <p>Oleh : <span className="font-bold">{dataAnswer.student_name}</span></p>
                    <p>Status : <span className="font-bold">{status}</span></p>
                </div>

                <div className="mb-8">
                    <p className="text-lg font-semibold font-poppins mb-3">Deskripsi</p>
                    <div>
                        <span>
                            {dataAnswer.description}
                        </span>
                    </div>
                </div>

                <div className="">
                    <p className="text-lg font-semibold font-poppins mb-8">Jawaban</p>

                    {status === "not submit" && (
                        <div className="flex flex-col items-center border border-[#092C4C] py-6 w-full mb-8">
                            <img className="mb-6 w-fit" src={brokenImg} alt="" />
                            <p className="text-[#6F6C6C]">Tugas ini belum di submit</p>
                        </div>
                    )}
                    {status !== "not submit" && (
                        <iframe className="mb-8" src={dataAnswer.submitted_url} width="100%" height="640" allow="autoplay"></iframe>
                    )}

                    {status === "rejected" && (
                        <div className="mb-8">
                            <p className="text-sm font-semibold mb-2">catatan</p>
                            <div className="bg-[#A2D2FF] rounded py-3 px-2">
                                {reason}
                            </div>
                        </div>
                    )}

                    {status !== "accepted" && (
                        <div className="flex gap-2">

                            {status === "not submit" && (
                                <>
                                    <Button variant="outline" className="text-[#999999] border-[#999999] font-semibold font-poppins" ><img className="me-2" src={checkGrey} alt="" />Terima</Button>
                                    <Button variant="outline" className="text-[#999999] border-[#999999] font-semibold font-poppins"><img className="me-2" src={closeGrey} alt="" />Tolak</Button>
                                </>
                            )}

                            {status !== "not submit" && (
                                <>
                                    <Button variant="outline" className="text-[#092C4C] border-[#092C4C] font-semibold font-poppins" onClick={() => { handleAccepted() }}><img className="me-2" src={check} alt="" />Terima</Button>
                                    <Dialog open={dialogOpen} onOpenChange={(open) => setDialogOpen(open)}>
                                        <DialogTrigger asChild>
                                            <Button variant="outline" className="text-[#092C4C] border-[#092C4C] font-semibold font-poppins"><img className="me-2" src={close} alt="" />Tolak</Button>
                                        </DialogTrigger>
                                        <DialogContent className="flex bg-white">
                                            <div className="h-full w-1/4">
                                                <img className="h-20" src={alertIcon} alt="" />
                                            </div>
                                            <div className="h-full w-3/4">
                                                <Form {...form}>
                                                    <form onSubmit={form.handleSubmit(handleRejected)}>
                                                        <FormField
                                                            control={form.control}
                                                            name="reason"
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <FormLabel className="font-poppins font-semibold text-[#092C4C]">Tolak Tugas</FormLabel>
                                                                    <FormControl>
                                                                        <Textarea className="border-[#F2994A] h-32" placeholder="Alasan" {...field} />
                                                                    </FormControl>
                                                                    <FormMessage className="text-red-500" />
                                                                </FormItem>
                                                            )}
                                                        />
                                                        <div className="flex justify-center mt-3">
                                                            <Button
                                                                type="submit"
                                                                className="bg-[#092C4C] text-white font-semibold font-poppins"
                                                            >
                                                                Tolak
                                                            </Button>
                                                        </div>
                                                    </form>
                                                </Form>
                                            </div>
                                        </DialogContent>
                                    </Dialog>
                                </>
                            )}
                        </div>
                    )}
                </div>

            </div>
        </Layout>
    )
}

export default ReviewTugas