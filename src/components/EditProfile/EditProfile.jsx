// import React, {useState, useEffect} from 'react';
// import {storage,db, auth} from "../../firebase/firebase";
// import {ref, getDownloadURL, uploadBytes} from 'firebase/storage'
// import {getDoc, doc, updateDoc} from 'firebase/firestore';
// import { TextField } from '@material-ui/core'
// import Modal from '../../Elements/Modal/Modal'
// import StatusInput from '../StatusInput/StatusInput'


// import ArrowBackOutlinedIcon from '@material-ui/icons/ArrowBackOutlined'
// import AddAPhotoOutlinedIcon from '@material-ui/icons/AddAPhotoOutlined'

// import './EditProfile.css'


// const Editprofile = ({profile, setUpdateProfileState}) => {

//     const {bio, displayName, location, website, avatar} = profile
//     const [isOpenModal, setIsOpenModal] = useState(false) 
//     const [profileState, setProfileState] = useState({
//         displayName,
//         bio     : bio?bio:'',
//         location: location?location:'',   
//         website : website?website:''   
//     });
//     const [img, setImg] = useState("");
//     const [user, setUser] = useState();

    
    
//     useEffect(() => {
//           getDoc(doc(db,'users', 'uid')).then((docSnap) => {
//             if(docSnap.exists) {
//              setUser(docSnap.data());
//             }
//         });

//         if(img){
//             const uploadImg = async () =>  {
//                 const imgRef = ref(storage, `avatar/${new Date().getTime()}- ${img.name}`
//                 );
//                 try {
//                     const snap = await uploadBytes(imgRef, img)
//                     // console.log(snap.ref.fullPath)
//                     const url = await getDownloadURL(ref(storage, snap.ref.fullPath))
     
//                     await updateDoc(doc(db,'users', 'uid'),{
//                     avatar :url,
//                     avatarPath:snap.ref.fullPath,
//                     });
//                     console.log(url);
//                     setImg("");

//                 } catch (err){
//                     console.log(err.messag)
//                 }
              
//             };
//             uploadImg()
//         }
//     }, [img]);
  

     



//  useEffect(() =>  {
//      setUpdateProfileState({profileState})

//  },[profileState])


//  const closeModal = () => {
//     setIsOpenModal(false)

// }
  
//     return (
//         <>
//         <Modal  open={isOpenModal} 
//                 onClose={closeModal}
//                 title="Edit Media"
//                 Icon = {ArrowBackOutlinedIcon}
//                 ButtonText='Apply'
//                 >
         
//         </Modal>     

//         <div className='editProfile'>
//             <div className="editProfile__theme">
//                 <div className="editProfile__theme-photoWrapper">
//               <img src={user.img} alt='avatar' />
//                 <div className="editProfile__btnWrapper">
//                 <StatusInput Icon={AddAPhotoOutlinedIcon}
//                     type='file'
//                     accept='image/*'
//                     name='image-upload'
//                     id="photo"
//                     onChange={(e) => setImg(e.target.files[0])}

//                  />
//                 </div>
//                 </div>
//                 <div  className='editProfile__theme-themeActions'>
//                 <div>
//                 <StatusInput Icon={AddAPhotoOutlinedIcon}
//                    type='file'
//                     accept='image/*'
//                     name='image-upload'
//                     id="photo"
//                     onChange={(e) => setImg(e.target.files[0])}
                
//                 />
//                 </div>

//                 </div>
//                 </div>
//                 <form noValidate autoComplete="off">
//                     <TextField id="displayName" label="Name" variant="filled" value={profileState.displayName} onChange={e=>setProfileState({...profileState, displayName:e.target.value})}/>

//                     <TextField id="bio" label="Bio" variant="filled" value={profileState.bio} onChange={e=>setProfileState({...profileState, bio:e.target.value})}/>

//                     <TextField id="location" label="Location" variant="filled" value={profileState.location} onChange={e=>setProfileState({...profileState, location:e.target.value})}/>

//                     <TextField id="website" label="Website" variant="filled" value={profileState.website} onChange={e=>setProfileState({...profileState, website:e.target.value})} className='lastbordered'/>
//                 </form>
//             </div>
        
//             </>
//     );
// }

// export default Editprofile;
import React, {useState, useEffect} from 'react'

import { TextField } from '@material-ui/core'
import Modal from '../../Elements/Modal/Modal'
import CropPhoto from '../EditPhoto/CropPhotoB'
import StatusInput from '../StatusInput/StatusInput'
import {getInfo} from '../../helpers/getImageDimension'
import TabbarMenu from '../../Elements/TabbarMenu/TabbarMenu'

import CloseIcon from '@material-ui/icons/Close'
import ArrowBackOutlinedIcon from '@material-ui/icons/ArrowBackOutlined'
import AddAPhotoOutlinedIcon from '@material-ui/icons/AddAPhotoOutlined'
import './EditProfile.css'

const EditProfile = ({profile, setUpdatedProfileState}) => {
    const {bio, displayName, location, wallpaper, photoURL, website} = profile
    const [profileState, setProfileState] = useState({
        displayName,
        bio     : bio?bio:'',
        location: location?location:'',   
        website : website?website:''    
    })
    const [src, setSrc] = useState({
        photoSrc: photoURL,
        wallpaperSrc: wallpaper
    })
    const [pictureToSend, setPictureToSend] = useState({
        photoToSend: photoURL,
        wallpaperToSend: wallpaper
    })
    const [croppedImageResult, setCroppedImageResult ] = useState(null)
    const [initialImageSize, setinitialImageSize] = useState({
        photo: {width:0, height:0},
        wallpaper: {width:0, height: 0}
    })
    const [initialAspectRatio, setinitialAspectRatio] = useState({
        photo: null,
        wallpaper: null
    })

    const [isOpenModal, setIsOpenModal] = useState(false)    
    const [activeModal, setActiveModal] = useState('')

    const onSelectFile = (e, kind)=> {
        const fileReader = new FileReader()
        fileReader.onloadend = () => {
            if(kind === 'photo'){
                setSrc({ ...src, photoSrc: fileReader.result})
                setPictureToSend({ ...pictureToSend, photoToSend: fileReader.result})
                setActiveModal('photo')
            }
            if(kind === 'wallpaper'){
                setSrc({...src, wallpaperSrc:fileReader.result})
                setPictureToSend({ ...pictureToSend, wallpaperToSend: fileReader.result})
                setActiveModal('wallpaper')
            }
            setIsOpenModal(true)
        }   
        fileReader.readAsDataURL(e.target.files[0])

        getInfo(e).then(res=> {
            if(kind === 'photo'){
                setinitialImageSize({...initialImageSize, photo:{width: res.width, height: res.height}})
            }
            if(kind === 'wallpaper'){
                setinitialImageSize({...initialImageSize, wallpaper:{width: res.width, height: res.height}})
            }            
        })
    }   

    useEffect(() => {
        setinitialAspectRatio({
            ...initialAspectRatio,
            photo: initialImageSize.photo.width/initialImageSize.photo.height,
            wallpaper: initialImageSize.wallpaper.width/initialImageSize.wallpaper.height,
        })
    }, [initialImageSize])

    const removeWallpaper = ()=> {
        setSrc({...src, wallpaperSrc:null})
        setinitialImageSize({...initialImageSize, walpaper:{width:0, height:0}})
        setinitialAspectRatio({...initialAspectRatio, wallpaper: null})
        setPictureToSend({...pictureToSend, wallpaperToSend:''})
    }

    const changeSrc = () => {
        if(activeModal === 'photo'){
            console.log('from photo',croppedImageResult)
            setSrc({
                ...src,
                photoSrc: URL.createObjectURL(croppedImageResult)
            })
            setPictureToSend({...pictureToSend, photoToSend: croppedImageResult})
            
        }
        if(activeModal === 'wallpaper'){
            console.log('from wallpaper',croppedImageResult)
            setSrc({
                ...src,
                wallpaperSrc: URL.createObjectURL(croppedImageResult)
            })
            setPictureToSend({...pictureToSend, wallpaperToSend: croppedImageResult})
        }
    }

    const callbackforModal = () =>{
        changeSrc()
    }

    const closeModal = () => {
        setIsOpenModal(false)
        setActiveModal('')
    }

    const items = [
        {
            id: 0,
            title:'',
            item:  <CropPhoto 
                    image = {activeModal==='wallpaper'?src.wallpaperSrc:src.photoSrc}
                    setCroppedImageResult ={setCroppedImageResult} 
                    initialAspectRatio    = {activeModal==='wallpaper'?initialAspectRatio.wallpaper:initialAspectRatio.photo}
                />
        }
    ]

    useEffect(() => {
        setUpdatedProfileState({profileState, pictureToSend})
    }, [profileState, pictureToSend])

    return (
        <>
            <Modal  open={isOpenModal} 
                    onClose={closeModal}
                    title="Edit Media"
                    callback = {callbackforModal}
                    Icon = {ArrowBackOutlinedIcon}
                    ButtonText='Apply'
                    >
                    <TabbarMenu items={items}/>
            </Modal>         

            <div className='editProfile'>
                <div className="editProfile__theme" style={{backgroundImage: `url(${src.wallpaperSrc &&  src.wallpaperSrc})`}}>
                    <div className="editProfile__theme-photoWrapper">
                        {src.photoSrc && <img src={src.photoSrc} alt={`${displayName}`} />}
                        <div className="editProfile__btnWrapper">
                            <StatusInput Icon={AddAPhotoOutlinedIcon}
                                        type="file"
                                        accept="image/*"
                                        name="image-upload"
                                        id="input-wallpaper"
                                        onChange={(e)=>{onSelectFile(e, 'photo')
                                                        setActiveModal('photo')
                                        }}
                            />
                        </div>
                    </div>
                    <div className='editProfile__theme-themeActions'>
                        <div>
                            <StatusInput Icon={AddAPhotoOutlinedIcon}
                                        type="file"
                                        accept="image/*"
                                        name="image-upload"
                                        id="input-photo"
                                        onChange={(e)=>{onSelectFile(e, 'wallpaper')
                                                        setActiveModal('wallpaper')
                                        }}
                            />                    
                        </div>
                        <div><CloseIcon onClick={removeWallpaper} /> </div>
                    </div>
                </div>  

                <form noValidate autoComplete="off">
                    <TextField id="displayName" label="Name" variant="filled" value={profileState.displayName} onChange={e=>setProfileState({...profileState, displayName:e.target.value})}/>
                    <TextField id="bio" label="Bio" variant="filled" value={profileState.bio} onChange={e=>setProfileState({...profileState, bio:e.target.value})}/>
                    <TextField id="location" label="Location" variant="filled" value={profileState.location} onChange={e=>setProfileState({...profileState, location:e.target.value})}/>
                    <TextField id="website" label="Website" variant="filled" value={profileState.website} onChange={e=>setProfileState({...profileState, website:e.target.value})} className='lastbordered'/>
                </form>

            </div>

        </>
    )
}

export default EditProfile
