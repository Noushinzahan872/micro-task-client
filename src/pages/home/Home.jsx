import React from 'react';
import BestWorkers from './BestWorkers';
import TestimonialSection from './TestimonialSection';
import ExtraSections from './ExtraSections';
import BannerSlider from './BannerSlider';
import HowItWorks from './HowItWorks';
import TaskIntro from './TaskIntro';

const Home = () => {
    return (
        <div>
           <BannerSlider></BannerSlider>
            <BestWorkers></BestWorkers>
            <TestimonialSection></TestimonialSection>
             <TaskIntro></TaskIntro>
            <ExtraSections></ExtraSections>
            <HowItWorks></HowItWorks>
           
        </div>
    );
};

export default Home;