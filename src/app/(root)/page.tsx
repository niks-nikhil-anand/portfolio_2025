import HeroSections from '@/components/(Homepage)/HeroSections'
// import AboutMe from '@/components/(Homepage)/AboutMe'
import ContactSection from '@/components/(Homepage)/ContactSection'
import ProjectsShowcase from '@/components/(Homepage)/ProjectsShowcase'
import SkillsAndContact from '@/components/(Homepage)/SkillsAndContact'
import Experience from '@/components/(Homepage)/Experience'
import TechMarquee from '@/components/(Homepage)/TechMarquee'
import React from 'react'

const page = () => {
  return (
    <div>
      <HeroSections />
      {/* <AboutMe /> */}
      <Experience />
      <SkillsAndContact />
      <ProjectsShowcase />
      <ContactSection />
      <TechMarquee />
    </div>
  )
}

export default page