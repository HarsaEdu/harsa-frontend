import React from 'react';
import footerLogo from '../../assets/footer-logo.svg'

const Footer = () => {
  return (
    <footer className="bg-[#213571] text-white p-8 h-80 flex items-center">
      <div className="container flex justify-between items-center">
        <div className="flex gap-x-14">
          <FooterLink title="Home" />
          <FooterLink title="About Us" />
          <FooterLink title="Our Features" />
          <FooterLink title="Testimonials" />
          <FooterLink title="FAQ" />
          <FooterLink title="Get App" />
        </div>
        <div>
          <img src={footerLogo} alt="Logo"/>
        </div>
      </div>
    </footer>
  );
};

const FooterLink = ({ title }) => {
  return (
    <a href="#" className="hover:text-gray-400 font-semibold text-white text-md">
      {title}
    </a>
  );
};

export default Footer;
