import React from "react"
import aboutImage from '../../assets/image/about.png'
const AboutUs = () => {
    return(
        <>
        <div className="aboutUs container mx-auto flex">
            <div>
                <img src={aboutImage} alt="" />
            </div>
            <div>
                <h2 className="font-i">About Us</h2>
                <p>Harsa.Edu adalah aplikasi inovatif yang dirancang untuk memberikan pengalaman pembelajaran IT yang komprehensif dan terintegrasi. Platform ini tidak hanya menyediakan kurikulum pembelajaran yang lengkap, tetapi juga menyertakan fitur-fitur canggih yang mempermudah pengelolaan tugas, ujian, dan membantu Anda menjawab pertanyaan melalui integrasi dengan Chat AI.</p>
            </div>
        </div>
        </>
    )
}

export default AboutUs