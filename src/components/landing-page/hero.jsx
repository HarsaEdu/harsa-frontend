import React from 'react'
import { Button } from '../ui/button'
import heroImage from '@/assets/hero-img.png'

export default function Hero() {
  return (
    <div
          className="flex flex-row py-24 items-center px-20 justify-between"
          id="beranda"
        >
          <div className="text-center md:text-start w-1/2">
            <p className="font-bold text-[#092C4C] text-5xl leading-tight">
            Transformasi Pembelajaran <br /> Melalui Platform LMS Unggulan
            </p>
            <div className="xl:px-16 w-full flex mt-12 xl:text-xl mb-6">
              <div>
                  <div className='font-semibold text-[#092C4C] list-item xl:xl:w-56 mb-3 mr-20'>Dipercaya oleh lebih dari +200 institusi</div>
                  <div className='font-semibold text-[#092C4C] list-item xl:w-56 mb-3 mr-20'>Kemudahan dalam akses pembelajaran</div>
              </div>
              <div>
                  <div className='font-semibold text-[#092C4C] list-item xl:w-60 mb-3 mr-20'>LMS pertama yang mengimplementasikan AI</div>
                  <div className='font-semibold text-[#092C4C] list-item xl:w-56 mb-3 mr-20'>Kemudahan dalam akses pembelajaran</div>
              </div>
            </div>
            <a href="#emailAction">
              <Button
                
                className="bg-[#092C4C] text-white font-semibold text-lg py-6 rounded-lg hover:bg-[#092C4C] w-72"
              >Unduh Sekarang</Button>
            </a>
          </div>
          <div className="hidden md:flex md:justify-center">
            <img src={heroImage} alt="" className='h-92'/>
          </div>
        </div>
  )
}
