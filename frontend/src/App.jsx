import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Education from './components/Education'
import Certifications from './components/Certifications'
import ContactForm from './components/ContactForm'
import Footer from './components/Footer'

function App() {
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

export default App
