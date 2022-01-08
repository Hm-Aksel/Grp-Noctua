import React,{useState, useEffect} from 'react'
import {Avatar, Button } from '@material-ui/core'
import './NoctuaBox.css';


import Popover from '@material-ui/core/Popover'
import Picker from 'emoji-picker-react'

import TabbarMenu from '../../Elements/TabbarMenu/TabbarMenu'
import Modal from '../../Elements/Modal/Modal'
import StatusInput from '../StatusInput/StatusInput'  
import {getInfo} from '../../helpers/getImageDimension'
import {generateAltText} from '../../helpers/generateAltText'

import CropPhoto from '../EditPhoto/CropPhotoB'
import AddALT from '../EditPhoto/AddALT'



import CancelIcon from '@material-ui/icons/Cancel'
import SentimentSatisfiedOutlinedIcon from '@material-ui/icons/SentimentSatisfiedOutlined'
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined'
import EqualizerOutlinedIcon from '@material-ui/icons/EqualizerOutlined'
import EventNoteSharpIcon from '@material-ui/icons/EventNoteSharp'
import ArrowBackOutlinedIcon from '@material-ui/icons/ArrowBackOutlined'
import CropIcon from '@material-ui/icons/Crop'


 const NoctuaBox = ()  => {
 

 const [noctuaMessage, setNoctuaMessage] = useState("");
 const [imageToSend, setImageToSend] = useState(null)
 const [src, setSrc] = useState(null)
 const [initialImageSize, setinitialImageSize] = useState({width: 0, height: 0})
 const [initialAspectRatio, setinitialAspectRatio] = useState(null)
 const [croppedImageResult, setCroppedImageResult ] = useState(null)
 const [isOpenModal, setIsOpenModal] = useState(false)
 const [anchorEl, setAnchorEl] = useState(null)
 const [altText, setAltText] = useState(generateAltText())

 
       
const onSelectFile = e => {
  const fileReader = new FileReader()
  fileReader.onloadend = () => {
      setSrc(fileReader.result)
      setImageToSend(fileReader.result)
  }   
  fileReader.readAsDataURL(e.target.files[0])

  getInfo(e).then(res=> {
      setinitialImageSize({width: res.width, height: res.height})
  })
}

useEffect(() => {
  setinitialAspectRatio(initialImageSize.width/initialImageSize.height)
}, [initialImageSize])

const changeSrc = () => {
  setSrc(URL.createObjectURL(croppedImageResult))
  setImageToSend(croppedImageResult)
}

const callbackforModal = () =>{
  changeSrc()
  if (altText.length === 0){
      setAltText(generateAltText())
  }
}

const items = [
  {
      id: 0,
      title:'',
      icon: <CropIcon />,
      item: <CropPhoto 
              image={src} 
              setCroppedImageResult ={setCroppedImageResult} 
              initialAspectRatio    = {initialAspectRatio}
      />
  },
  {
      id: 1,
      title: 'ALT',
      icon: '',
      item: <AddALT image={croppedImageResult} altText={altText} setAltText={setAltText}/>
  }
]

const open = Boolean(anchorEl)
const id = open ? 'post-popover' : undefined
const onClickEmoticon = (event) => setAnchorEl(event.currentTarget)
const handleClose = () => setAnchorEl(null)

const onEmojiClick = (event, emojiObject) => {
  let newMessage = noctuaMessage + emojiObject.emoji
  setNoctuaMessage(newMessage)
}
     
    return (
            <>

                 <Modal  open={isOpenModal} 
                    onClose={()=>setIsOpenModal(false)}
                    title="Edit Photo"
                    callback = {callbackforModal}
                   Icon = {ArrowBackOutlinedIcon}
                   ButtonText='Save'
                      >
                   <TabbarMenu items={items}/>
                </Modal>

       <div className='noctuaBox'>
              <form >
               <div className='noctuaBox__wrapperInput' >
                <div className="noctuaBox__ava">
                <Avatar src="" />   
            </div>

            <div className='noctuaBox__input'>

                <textarea rows='1' 
                          placeholder="What's happening"
                          type        = 'text' 
                          value       = {noctuaMessage}
                          onChange    = {e=> setNoctuaMessage(e.target.value)}                            
                >
                </textarea>

                {
                    src &&
                        <div className='noctuaBox__input-image'>
                            <CancelIcon className='cancelIcon' onClick={()=>setSrc(null)}/>
                            <img src={src} alt="new test"/>               
                            <Button className='editImage' onClick={()=>setIsOpenModal(true)}>Edit</Button>
                        </div>                        
                }

                <div className='noctuaBox__input-actions'>
                    <div className='noctuaBox__input-icons'>
                       <StatusInput Icon={ImageOutlinedIcon}
                                    type="file"
                                    accept="image/*"
                                    name="image-upload"
                                    id="input-image"
                                    onChange={onSelectFile}
                        />
                  
                       <StatusInput Icon={EqualizerOutlinedIcon} />
                       <StatusInput Icon={SentimentSatisfiedOutlinedIcon} 
                                    aria-describedby={id} type="button" onClick={onClickEmoticon} 
                       />

                        <Popover 
                            id={id}
                            open={open}
                            anchorEl={anchorEl}
                            onClose={handleClose}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'center',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'center',
                            }}

                        style={{borderRadius: '2rem'}}
                        >
                            <Picker onEmojiClick={onEmojiClick} />
                        </Popover>

                       <StatusInput Icon={EventNoteSharpIcon} />
                    </div>
        
                 
                        <Button type='submit'className='noctuaBox__noctuaButton'>Noctua</Button>
                    

                </div>
            </div>    
        </div>
    </form>
</div>
</>
    )
}

export default NoctuaBox



