import googlePlay from '@/assets/google-play.svg'
import appStore from '@/assets/app-store.svg'
import phone from '@/assets/vectary-texture.svg'

const GetApps = () => {
    return (
        <div className="w-full flex items-center px-20 h-[600px]">
            <div className="w-3/4 me-auto">
                <p className="text-5xl font-bold leading-tight text-[#092C4C]">
                    Dapatkan Aplikasi Harsa.edu Sekarang
                </p>
                <div className='my-12'>
                    <a href="">
                        <img className='inline-block me-3' src={googlePlay} alt="" />
                    </a>
                    <a href="">
                        <img className='inline-block' src={appStore} alt="" />
                    </a>
                </div>
            </div>
            <img className='w-1/4 h-full pe-20 ms-auto' src={phone} alt="" />
        </div>
    )
}

export default GetApps