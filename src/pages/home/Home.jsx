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

            <div className='w-11/12 mx-auto text-center'>
            <BestWorkers></BestWorkers>
            <TestimonialSection></TestimonialSection>
             <TaskIntro></TaskIntro>
            <ExtraSections></ExtraSections>
            <HowItWorks></HowItWorks>
            </div>
           
        </div>
    );
};

export default Home;