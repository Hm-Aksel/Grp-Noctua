    import React from 'react';
    import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
    import FavoriteIcon from '@material-ui/icons/Favorite'
    import './FooterIcon.css';
    const Like = () => {
        return (
            <div className="footerIcon_wrapper">
                <FavoriteBorderIcon/>
            
            <div className="footerIcon__counter"> </div>
           </div>
        );
    }
    
    export default Like;
    