import React from 'react';
import './FooterIcon.css';
const FooterIcone = ({Icon}) => {
    return (
        <div className='footerIcon_wrapper'>
          <Icon/>
          <div className="footerIcon__counter"> </div>
        </div>
    );
}

export default FooterIcone;
