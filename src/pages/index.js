import React, {useState} from 'react'
import AlreadyListed from '../components/Already_Listed/AlreadyListed'
import HeroSection from '../components/HeroSection'
import HowItWorks from '../components/How_it_Works/How_it_works'
import OurProducts from '../components/Our_Products_Section/Our_Products'
import Partner from '../components/Partner/Partner'
import { Home as Homes } from '../components/HomeTest'
import LoginSection from '../components/LoginSection'
import { loginObjOne } from '../components/LoginSection/Data'


const Home = () => {

    return (
        <>
            <LoginSection {...loginObjOne}/>
        </>
    )
}

export default Home;