import React from 'react'
import './BarOption.css';
function BarOption({active, text,Icon}) {
    return (
      <div className='barOption'>
       <Icon/>
       <h2>{text}</h2>
      </div>    
         
    );
}

export default BarOption;
