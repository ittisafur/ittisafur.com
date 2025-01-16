import React from 'react'
import SocialButtons from '../Socials'

const Landing = () => {
  return (
    <section className="min-h-screen flex flex-col pt-0.5 md:pt-4 md:justify-center">
      <div className="flex flex-col font-inter gap-y-6">
        <p>
          Hey, I'm
        </p>
        <h1 className="text-gradient text-4xl md:text-5xl lg:text-6xl font-figtree font-semibold tracking-wide">
          Ittisafur Rahman
        </h1>
        <p>I'm a seasoned Full Stack Developer with over six years of experience, starting my tech journey in 2013 with HTML/CSS out of curiosity. From 2017 I've worked as a freelancer. Since 2019 I've been working as a Professional Web Developer. I've sharpened my skills across various tech stacks and frameworks through freelancing and contract work, always aiming to push technical boundaries and foster community growth. I'm keen on exploring new opportunities and collaborations—let's connect and see how I can help propel your business forward!</p>
      </div>
      <div className="mt-8 md:mt-24 lg:mt-52">
        <SocialButtons />
      </div>
    </section>
  )
}

export default Landing;
