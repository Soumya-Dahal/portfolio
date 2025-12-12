function Projects() {
  const projects = [
    {
      title: 'Smart Home Automation System',
      description: 'A modular and scalable system integrating sensors, microcontrollers, and networking to automate and monitor home appliances.',
      tech: 'C, Embedded Hardware, Networking',
      github: 'https://github.com/Soumya-Dahal/home-automation'
    },
    {
      title: 'Custom Language Compiler',
      description: 'A compiler built from scratch, including lexer, parser, and code generation. Focused on performance, memory handling, and clear architecture.',
      tech: 'C, Compiler Theory',
      github: '' // TODO: Add GitHub link
    },
    {
      title: 'Image Captioning Model (Go + JavaScript)',
      description: 'An AI-powered image captioning system using Go for backend computation and JavaScript for deployment. Designed for efficiency and lightweight inference.',
      tech: 'Go, JavaScript, Machine Learning',
      github: 'https://github.com/Soumya-Dahal/Image-Captioning-GO'
    },
        {
      title: 'Image Classification Model',
      description: 'Training a image classification model using CNN in intel image classification dataset.',
      tech: 'Python, tensorflow',
      github: 'https://github.com/Soumya-Dahal/ImageClassification'
    },
  ]

  return (
    <section id="projects" className="py-20 px-4 bg-gray-50">
      <div className="max-w-5xl mx-auto space-y-12">
        <h2 className="text-4xl md:text-5xl font-bold text-center">Projects</h2>
        <div className="grid gap-8">
          {projects.map((project, i) => (
            <article key={i} className="bg-white p-8 border border-gray-200 space-y-4">
              <h3 className="text-2xl font-semibold">{project.title}</h3>
              <p className="text-gray-700 leading-relaxed">{project.description}</p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Tech Used:</span> {project.tech}
              </p>
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-gray-900 hover:underline"
                  aria-label={`View ${project.title} on GitHub`}
                >
                  GitHub Link →
                </a>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
