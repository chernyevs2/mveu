import './Footer.css';
import React from 'react';

function Footer() {
  return (
    <div className="Footer">
       <p>
                © {new Date().getFullYear()} Все права защищены
        </p>    
    </div>
  );
}

export default Footer;
