import { HeroSection } from "@/components/HeroSection"
import { StatsCounter } from "@/components/StatsCounter"
import { AboutSection } from "@/components/AboutSection"
import { SkillsSection } from "@/components/SkillsSection"
import { ProjectsSection } from "@/components/ProjectsSection"
import { ExperienceSection } from "@/components/ExperienceSection"
import { TestimonialsSection } from "@/components/TestimonialsSection"
import { ContactSection } from "@/components/ContactSection"
import { SectionDivider } from "@/components/SectionDivider"

export default function Home() {
  return (
    <>
      <HeroSection />
      <StatsCounter />
      <AboutSection />
      <SectionDivider />
      <SkillsSection />
      <SectionDivider />
      <ProjectsSection />
      <SectionDivider />
      <ExperienceSection />
      <SectionDivider />
      <TestimonialsSection />
      <ContactSection />
    </>
  )
}
