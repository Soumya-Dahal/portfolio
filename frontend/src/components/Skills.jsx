function Skills() {
  const technical = [
    'Systems Programming (C, Python)',
    'Embedded Systems',
    'Networking',
    'Cybersecurity',
    'Go Development',
    'JavaScript (Frontend)',
    'AI/Deep Learning Model Development (TensorFlow, PyTorch)'
  ]

  const soft = [
    'Problem Solving',
    'Analytical Thinking',
    'Clean Code Discipline',
    'Curiosity',
    'Humor & Communication'
  ]

  return (
    <section id="skills" className="py-20 px-4">
      <div className="max-w-4xl mx-auto space-y-12">
        <h2 className="text-4xl md:text-5xl font-bold text-center">Skills</h2>
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-semibold mb-6">Technical Skills</h3>
            <ul className="space-y-3 text-lg text-gray-700">
              {technical.map((skill, i) => (
                <li key={i} className="flex items-start">
                  <span className="mr-3">•</span>
                  <span>{skill}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-2xl font-semibold mb-6">Soft Skills</h3>
            <ul className="space-y-3 text-lg text-gray-700">
              {soft.map((skill, i) => (
                <li key={i} className="flex items-start">
                  <span className="mr-3">•</span>
                  <span>{skill}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Skills
