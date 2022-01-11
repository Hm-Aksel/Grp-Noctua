import React,{useState,forwardRef} from 'react';

import {Avatar} from '@material-ui/core'


import FooterIcon from './FooterIcone';
import Like from './Like'




import VerifiedUserIcon from '@material-ui/icons/VerifiedUser'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline'
import RepeatIcon from '@material-ui/icons/Repeat'
import PublishIcon from '@material-ui/icons/Publish'
import './Post.css';


const Post = forwardRef(({
        altText,
        text,
        image,
        timestamp,
        senderId,
        postId,
        likes
        }, ref) => {

const [profile, setProfile] = useState({id:'',displayName:'', photoURL: '', verified: true, username: '', followers:[], following:[]})
const {displayName, username, verified} = profile


    return (
        <div className="post" ref={ref}>
        <div className="post__avatar">
            <Avatar src=''  />

        </div>   
          <div className="__body">
              <div className="post__header">
                  <div className="post__HeaderText">
                      <h3>{displayName}{' '}
                          <span className='post__headerSpacial'>
                          {verified && <VerifiedUserIcon className='post__badge'/>} 
                              @{`${username}`}
                          </span>
                      </h3>
                      <div className="post__headerExpandIcon">
                        <ExpandMoreIcon /> 
                      </div>

                  </div>
                  <div className="post__headerDescription">
                      <p>{text}</p>
                  </div>
                 </div>
                 <img src={image} alt={altText} onClick={postId} />
                 <div className="post__footer">
                     <FooterIcon  Icon={ChatBubbleOutlineIcon} />
                     <FooterIcon  Icon={RepeatIcon} />
                     <Like 
                     />
                     <FooterIcon  Icon={PublishIcon}/>
                 </div>
          </div>
        </div>
    );
}
)
export default Post;
