import React from 'react';
import BarLeft from '../../components/BareLfet/BarLeft';
import BarMiddle from '../../components/BarMiddle/BarMiddle';
import BarRight from '../../components/BarRight/BarRight';
import './Home.css';
const Home = () => {
    return (

        <>
            <div className="Home_container">
                <BarLeft />
                <BarMiddle />
                <BarRight />
            </div>
        </>
    );
}

export default Home;
