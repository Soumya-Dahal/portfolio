function Projects() {
  const projects = [
    {
      title: 'Image Captioning (Go + React)',
      description: 'Image captioning model using a pre-trained VIT encoder and GPT-2 decoder. React frontend with Go backend for efficient, lightweight inference.',
      tech: 'Go, JavaScript, React, Machine Learning',
      github: 'https://github.com/Soumya-Dahal/Image-Captioning-GO'
    },
    {
      title: 'Custom Image Captioning Model',
      description: 'Image captioning system built with a custom model architecture, trained and deployed for generating captions from images.',
      tech: 'Python, Machine Learning',
      github: 'https://github.com/Soumya-Dahal/custom_captioning_model'
    },
    {
      title: 'Home Automation',
      description: 'Home automation project for controlling and monitoring devices, built with Python.',
      tech: 'Python',
      github: 'https://github.com/Soumya-Dahal/home-automation'
    },
    {
      title: 'Image Classification',
      description: 'Image classification experiments and models developed in Jupyter Notebooks.',
      tech: 'Python, Jupyter Notebook, Machine Learning',
      github: 'https://github.com/Soumya-Dahal/ImageClassification'
    },
        {
      title: 'DSA in C',
      description: 'Implementation of basic DSA in C',
      tech: 'C programming language and DSA concepts',
      github: 'https://github.com/Soumya-Dahal/DSA-in-C'
    }
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
