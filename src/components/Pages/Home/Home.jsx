import React from 'react';
import Banner from './Banner/Banner';
import FeatureSection from './FeatureSection/FeatureSection';
import FAQSection from './FAQSection/FAQSection';
import ExtraSection from './ExtraSection';
import ActionableData from './ActionableData';
import ContentTreatment from './ContentTreatment';
import FAQ from './FAQ';

const Home = () => {
    return (
        <div>
            <Banner/>
            <FeatureSection/>
            <FAQSection/>
            <ActionableData/>
            <ContentTreatment/>
            <ExtraSection/>
            <FAQ/>
        </div>
    );
};

export default Home;