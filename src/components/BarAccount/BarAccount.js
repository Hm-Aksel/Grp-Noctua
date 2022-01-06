import React, {useState} from 'react';
import {Avatar} from '@material-ui/core'
import Popover from '@material-ui/core/Popover'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import CheckIcon from '@material-ui/icons/Check'
import {useHistory} from 'react-router-dom';
import "./BarAccount.css"    

const BarAccount = () => {
 
     const history = useHistory();
    //  const [profile, setProfile] = useState()
  


    const [anchorEl, setAnchorEl] = useState(null)
    const onClickExpand= (event) => setAnchorEl(event.currentTarget)
    const handleClose = () => setAnchorEl(null)
    const open = Boolean(anchorEl)
    const id = open ? 'post-popover' : undefined



    const signout = () => {
        localStorage.clear()
        history.push('/')
        window.location.reload()
    }




    return (
        <>
        <Popover 
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}

            anchorOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}
            transformOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
            style={{
                transform:'translate(2rem, -1rem)'
            }}
        >
            <ul className="post__expandList">
    
                <div className="user__item nocursor" >
                    <Avatar src=""/>
                    <div className="user__details">
                    <h2>DisplayName</h2>
                    <span>@userName</span>
                    </div>
                    <CheckIcon />
                </div>                              
            
                <li onClick={signout} className='logoutBtn'>
                    <h3>Log out @username</h3>
                </li>
            </ul>
        </Popover>

        <div className='barAccount__wrapper' aria-describedby={id} variant="contained" onClick={onClickExpand }>
            <div className="barAccount__ava">
                <Avatar src="" />   
            </div>
            <div className='barAccount__userData' >
            <h2>DisplayName</h2>
            <h2>@userName</h2>
            </div>
            <div className='barAccount__expandIcon'>
                <ExpandMoreIcon />
            </div>
        </div>
    </>

    )
}

export default BarAccount;
