import React from 'react';
import Banner from './Banner/Banner';
import FeatureSection from './FeatureSection/FeatureSection';
import FAQSection from './FAQSection/FAQSection';
import ExtraSection from './ExtraSection';

const Home = () => {
    return (
        <div>
            <Banner/>
            <FeatureSection/>
            <FAQSection/>
            <ExtraSection/>
        </div>
    );
};

export default Home;