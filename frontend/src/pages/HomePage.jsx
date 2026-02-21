import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Hero from '../components/Hero'
import About from '../components/About'
import Skills from '../components/Skills'
import Projects from '../components/Projects'
import Education from '../components/Education'
import Certifications from '../components/Certifications'
import ContactForm from '../components/ContactForm'
import Footer from '../components/Footer'

function HomePage() {
  const location = useLocation()

  useEffect(() => {
    const id = location.state?.scrollTo
    if (id && typeof id === 'string') {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [location.state?.scrollTo])

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Education />
      <Certifications />
      <ContactForm />
      <Footer />
    </div>
  )
}

export default HomePage
