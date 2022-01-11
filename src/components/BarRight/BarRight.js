import React,{useState} from 'react';
import SearchBarRight from '../../Elements/SearchBarRight/SearchBarRight'
import './BarRight.css'
const BarRight = () => {

    const [text, setText] = useState('')
    
    return (
        <div className='barRight'>
          
        <SearchBarRight
         value={text}
         onChange={(e) => setText(e.target.value)}
         onClick={() => setText ('')}
         placeholder='Search Noctua'
        />
        


        </div>
    );
}

export default BarRight;
