import React,{useState, useEffect} from 'react'
import {useHistory, useParams} from 'react-router-dom'


import ArrowBackOutlinedIcon from '@material-ui/icons/ArrowBackOutlined';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import Loading from '../../Elements/Loading/Loading'
import TabbarMenu from '../../Elements/TabbarMenu/TabbarMenu'
import ProfileTheme from '../ProfileTheme/ProfileTheme'

import '../BarMiddle/BarMiddle.css';


import { db, storage } from "../../firebase/firebase";
import {
    addDoc,
    getDocs,
    collection,
    doc,
    serverTimestamp,
    updateDoc,
  } from "@firebase/firestore";
  


const Profile =() =>  {


const history = useHistory() 
// const [Posts, setPosts] = useState([]);
const [loading, setLoading] = useState(false)

const initProfile = {
    bio:'',
    displayName:'',
    followers:[],
    following:[],
    id:'',
    location:'',
    photoURL:'',
    wallpaper: '', 
    website: ''  
}
const [profile, setProfile] = useState(initProfile);




const items = [
    {
        id: 0,
        title:'Noctua',
        item: <>
                { loading && <div className="bar__loader"><Loading/></div> } 
               
              </>
    },
    {
        id: 1,
        title: 'Noctua & replies',
        item: <>  { loading && <div className="bar__loader"><Loading/></div> } </>
    },
    {
        id: 2,
        title: 'Media',
        item: <>
                { loading && <div className="bar__loader"><Loading/></div> } 
                
              </>
    },        
    {
        id: 3,
        title: 'Likes',
        item: <> { loading && <div className="bar__loader"><Loading/></div> } </>
    }
]


    return (
        <div className="barMiddle">
         <div className="profile__header">
             <div className="profile__backArrow" onClick={() => history.goback()}> 
              <ArrowBackOutlinedIcon /> 
             </div>
        
             <div className="profile__title">
                 <div className="profile__title_title"> <h2>Hm-Aksel </h2><CheckCircleIcon/></div>
                  <span>noctua</span> 
             </div>
         </div>
              <ProfileTheme profile={profile} />
               <TabbarMenu items={items}/>
        </div>
    )
}

export default  Profile;



