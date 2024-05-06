// LandingPage.js
import React from 'react';
import Header from '../../components/Header/Header';
import HeroSection from '../../components/HeroSection/HeroSection';
import FeaturesSection from '../../components/FeaturesSection/FeaturesSection';
import ServicesSection from '../../components/ServicesSection/ServicesSection';
import Footer from '../../components/Footer/Footer';



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
