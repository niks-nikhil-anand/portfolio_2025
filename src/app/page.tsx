import BlogShowcase from '@/components/(Homepage)/BlogShowcase'
import HeroSections from '@/components/(Homepage)/HeroSections'
import Newsletter from '@/components/(Homepage)/Newsletter'
import ProjectsShowcase from '@/components/(Homepage)/ProjectsShowcase'
import TechMarquee from '@/components/(Homepage)/TechMarquee'
import React from 'react'

const page = () => {
  return (
    <div>
      <HeroSections/>
      <ProjectsShowcase/>
      <BlogShowcase/>
      <Newsletter/>
      <TechMarquee/>
    </div>
  )
}

export default page