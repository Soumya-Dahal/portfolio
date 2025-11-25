function Hero() {
  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="max-w-3xl text-center space-y-6">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
          Soumya Dahal
        </h1>
        <h2 className="text-2xl md:text-3xl text-gray-600">
          Systems & Embedded Developer
        </h2>
        <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
          I build low-level systems, break them for fun, and fix them eventually.<br />
          Minimal code. Maximum impact.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
          <button
            onClick={() => scrollToSection('projects')}
            className="px-8 py-3 bg-gray-900 text-white hover:bg-gray-700 transition-colors"
            aria-label="View Projects"
          >
            View Projects
          </button>
          <button
            onClick={() => scrollToSection('contact')}
            className="px-8 py-3 border-2 border-gray-900 hover:bg-gray-100 transition-colors"
            aria-label="Contact Me"
          >
            Contact Me
          </button>
        </div>
      </div>
    </section>
  )
}

export default Hero
