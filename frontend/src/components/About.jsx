function About() {
  return (
    <section id="about" className="py-20 px-4 bg-gray-50">
      <div className="max-w-4xl mx-auto space-y-8">
        <h2 className="text-4xl md:text-5xl font-bold text-center">About Me</h2>
        <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
          <p>
            Hi, I'm Soumya Dahal, a Computer Engineering student passionate about systems programming, embedded systems, networking, and cybersecurity.
          </p>
          <p>
            I like writing clean, minimal code and understanding how things work under the hood.
          </p>
          <p>
            When I'm not coding, I'm usually laughing or making others laugh, debugging needs humor (you go insane without it).
          </p>
          <div className="pt-4">
            <h3 className="text-2xl font-semibold mb-4">Currently Working On:</h3>
            <ul className="list-disc list-inside space-y-2 pl-4">
              <li>Smart Home Automation System</li>
              <li>Custom Language Compiler</li>
              <li>Image Captioning Model (Go + JavaScript)</li>
            </ul>
          </div>
          <p className="pt-4 text-xl font-medium">
            Passions: Systems • Embedded • Networking • Cybersecurity • Automation
          </p>
        </div>
      </div>
    </section>
  )
}

export default About
