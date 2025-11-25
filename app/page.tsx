
import React from 'react';
import Hero from '../components/home/Hero';
import Steps from '../components/home/Steps';
import DashboardPreview from '../components/home/DashboardPreview';
import Features from '../components/home/Features';
import BattlesGrid from '../components/home/BattlesGrid';
import Testimonials from '../components/home/Testimonials';
import CTA from '../components/home/CTA';

export default function Home() {
  return (
    <>
      <Hero />
      <Steps />
      <DashboardPreview />
      <Features />
      <BattlesGrid />
      <Testimonials />
      <CTA />
    </>
  );
}
