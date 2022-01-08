import React,{useState,useEffect} from 'react';
import {Link} from 'react-router-dom'
import {useParams} from 'react-router';



import Modal from '../../Elements/Modal/Modal'
import ModalImage from '../../Elements/Modal/ModalImage'
import Spinner from '../../Elements/Spinner/Spinner'
import EditProfile from  '../EditProfile/EditProfile'
import postToCloudinary from '../../helpers/postToCloudinary'

import {db} from "../../firebase/firebase";
import { doc, updateDoc} from 'firebase/firestore';

import './ProfileTheme.css';

import CloseIcon from '@material-ui/icons/Close'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import InsertLinkIcon from '@material-ui/icons/InsertLink'
import PlaceIcon from '@material-ui/icons/Place'
import DateRangeIcon from '@material-ui/icons/DateRange'
import MailOutlineIcon from '@material-ui/icons/MailOutline'

const Profiletheme = ({posts}) => {
    const {username} =useParams()

    const [profile, setProfile] = useState({bio:'', displayName:'', followers:[], following:[], location:'', photoURL:'', website:''}) 
    
 
    const [updatedProfileState, setUpdatedProfileState] = useState({})
    const [finalPhoto, setFinalPhoto] = useState(null)
    const [finalWallpaper, setFinalWallpaper] = useState(null)
    const [isPhotoReady, setIsPhotoReady] = useState(false)
    const [isWallpaperReady, setIsWallpaperReady] = useState(false)
    const [isUpdating, setIsUpdating] = useState(false)


    const [isOpenModal, setIsOpenModal] = useState(false)
  

    const [openImage, setOpenImage] = useState(false)
    const [imgsrc, setImgsrc]=useState('')
    const onClickImage = (img) =>  {
        setImgsrc(img)
        setOpenImage(true)

    }
       
    const handleCloseImage = () => setOpenImage(false)


    const callbackforModal = () => {
        const {photoToSend, wallpaperToSend} = updatedProfileState.pictureToSend
        setIsUpdating(true)
        if(photoToSend === profile.photoURL){
                setFinalPhoto(profile.photoURL)
                setIsPhotoReady(true)
        }

        if (photoToSend !== profile.photoURL){
            const doFetch = () => postToCloudinary(photoToSend).then(res=> {
                setFinalPhoto(res)
                setIsPhotoReady(true)
            })
            .catch(error=>{ doFetch() } ) 

            doFetch()           
        }

        if (wallpaperToSend === profile.wallpaper){
                setFinalWallpaper(profile.wallpaper)
                setIsWallpaperReady(true)
        }

        if (wallpaperToSend !== profile.wallpaper){
            if (wallpaperToSend === null){
                setFinalWallpaper('')
                setIsWallpaperReady(true)            
            } else {
                const doFetch = () => {
                    postToCloudinary(wallpaperToSend).then(res=> {
                        setFinalWallpaper(res)
                        setIsWallpaperReady(true)
                    })
                    .catch(error=>{ doFetch() } )                      
                }
                doFetch()
            }
        }
    
    }
     useEffect(() =>  {
        if(isPhotoReady && isWallpaperReady){
            const {displayName, bio, location, website} = updatedProfileState.profileState
            const doUpdate =  () => {
           updateDoc(doc(db,'users' , 'id'),{
               displayName,
               bio,
               location,
               website,
               photoURL:finalPhoto,
               wallpaper:finalWallpaper
           }).then(res => {
               setIsUpdating(false)
           })
            .catch(err => {console.log(err.messag)})


        }
        doUpdate()

     }

     },[isPhotoReady,isWallpaperReady])
    return (
        <>
            <Modal
                open={isOpenModal} 
                onClose={()=>setIsOpenModal(false)}
                title="Edit Profile"
                callback = {callbackforModal}
                Icon = {CloseIcon}
                ButtonText='Save'
                >
                 <EditProfile  profile={profile} setUpdatedProfileState={setUpdatedProfileState}/>
 
              </Modal> 

              <ModalImage open={openImage}
                onClose={handleCloseImage}
                imgsrc={imgsrc}
            />  



        <div className="userProfile">
        <div className="userProfile__theme">
            <div className="photoWrapper">
                <img src={profile.photoURL} alt={`${profile.displayName}`} onClick={()=>onClickImage(profile.photoURL)} />
            </div>

        </div>
         <div className="infoWrapper">
             <div className="userProfile__action">
                 <div className="moreWrapper">
                  <MoreHorizIcon /> 
                 </div>
                 <div className="mailWrapper">
                   <MailOutlineIcon />
                 </div>
                 <div className="followWrapper" onClick={()=>setIsOpenModal(true)}>
                     Edite Profile
                 </div>
                 {/* <div className="followrapper">
                 Followed
                 </div> */}
                </div>
              {/* <div className="folloWrapper">
                  Follow
              </div> */}
         </div>

            <h2>Hm-Aksel</h2>
             <span>{`@${username}`}</span>
             <p>bio</p>
 

              <div className="bioInfo">
                       <div> <PlaceIcon /> <span>location</span></div>
                       <div className='blued'> <InsertLinkIcon /> <span>website</span></div>
                        <div><DateRangeIcon /> <span>Joined August 2021</span></div>
                    </div>
               
                    <div className="countInfo">
                        <Link to={`/profile/${username}/followinfo`}>
                            <span> <p>Following</p></span>
                        </Link>
                        <Link to={`/profile/${username}/followinfo`}>
                            <span> <p>Followers</p></span>
                        </Link>

                         <div className='themeSpinner'> <Spinner /> </div> 
                     </div>


        </div>

        </>
    );
}

export default Profiletheme;

