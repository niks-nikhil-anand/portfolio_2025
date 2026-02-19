import HeroSections from '@/components/(Homepage)/HeroSections'
import Newsletter from '@/components/(Homepage)/Newsletter'
import ProjectsShowcase from '@/components/(Homepage)/ProjectsShowcase'
import SkillsAndContact from '@/components/(Homepage)/SkillsAndContact'
import TechMarquee from '@/components/(Homepage)/TechMarquee'
import React from 'react'

const page = () => {
  return (
    <div>
      <HeroSections/>
      <SkillsAndContact/>
      <ProjectsShowcase/>
      <Newsletter/>
      <TechMarquee/>
    </div>
  )
}

export default page