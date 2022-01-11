import React, {useState} from 'react'
import './BarMiddle.css';
  import NoctuaBox from '../noctuaBox/NoctuaBox';
  import Post from '../Post/Post'
//  import Profile from '../Profile/Profile';
function BarMiddle() {

const [posts, setPosts] = useState([]);
    return (
        <div className='barMiddle'>
        <div className='barMiddle__header'>
        <div className='barMiddle__header-ava'>
        
        </div>
         <h2>Home</h2>
        </div>

        
         <NoctuaBox/>
          <Post /> 
         {/* <Profile /> */}

        </div>
    );
}

export default BarMiddle
