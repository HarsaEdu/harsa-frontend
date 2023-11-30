import React from "react"
import aboutImage from '../../assets/about.svg'
const AboutUs = () => {
    return(
        <div className="aboutUs mx-auto mt-5">
            <div className="grid grid-cols-1 md:grid-cols-2 justify-center items-center px-28">
                <div className="">
                    <img src={aboutImage} alt="image" style={{width: "700px", height: "400px"}} />
                </div>
                <div className="w-[400px] md:w-[600px] text-3xl">
                    <h2 className="text-left font-inter font-semibold text-[20px] md:text-[30px] mb-2">About Us</h2>
                    <p className=" text-justify font-poppins text-[10px] md:text-[16px]">Harsa.Edu adalah aplikasi inovatif yang dirancang untuk memberikan pengalaman pembelajaran IT yang komprehensif dan terintegrasi. Platform ini tidak hanya menyediakan kurikulum pembelajaran yang lengkap, tetapi juga menyertakan fitur-fitur canggih yang mempermudah pengelolaan tugas, ujian, dan membantu Anda menjawab pertanyaan melalui integrasi dengan Chat AI.</p>
                </div>
            </div>
        </div>
    )
}

export default AboutUs