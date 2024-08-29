// LandingPage.js
import React from 'react';
import Header from '../../Components/LandingPage/Header/Header';

import HeroSection from '../../Components/LandingPage/HeroSection/HeroSection'
import FeaturesSection from '../../Components/LandingPage/FeaturesSection/FeaturesSection';
import ServicesSection from '../../Components/LandingPage/ServicesSection/ServicesSection';
import Footer from '../../Components/LandingPage/Footer/Footer';



const LandingPage = () => {
    return (
        <div className="landing-page">
            <Header/>
            <main className="main-content">
                <HeroSection/>
                <FeaturesSection/>
                <ServicesSection/>
            </main>
            <Footer/>
        </div>
    );
}

export default LandingPage;
