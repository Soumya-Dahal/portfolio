import myPhoto from "../assets/me.jpg";

function About() {
  return (
    <section id="about" className="py-20 px-4 bg-gray-50">
      <div className="max-w-4xl mx-auto space-y-12">
        <h2 className="text-4xl md:text-5xl font-bold text-center">About Me</h2>

        {/* Photo + Intro */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-10">
          {/* Photo */}
          <img 
            src={myPhoto}
            alt="Soumya Dahal"
            className="w-48 h-48 object-cover rounded-2xl shadow-lg"
          />

          {/* Text */}
          <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
            <p>
              Hi, I'm <span className="font-semibold">Soumya Dahal</span>, a Computer Engineering student
              passionate about systems programming, embedded systems, networking, and cybersecurity.
            </p>
            <p>
              I like writing clean, minimal code and understanding how things work under the hood.
            </p>
            <p>
              When I'm not coding, I'm usually laughing or making others laugh — debugging needs humor
              (you go insane without it).
            </p>
          </div>
        </div>

        {/* Currently Working On */}
        <div className="pt-4 space-y-6">
          <h3 className="text-2xl font-semibold mb-4">Currently Working On:</h3>
          <ul className="list-disc list-inside space-y-2 pl-4 text-lg">
            <li>Smart Home Automation System</li>
            <li>Custom Language Compiler</li>
            <li>Image Captioning Model (Go + JavaScript)</li>
          </ul>
        </div>

        <p className="pt-4 text-xl font-medium text-center">
          Passions: Systems • Embedded • Networking • Cybersecurity • Automation
        </p>
      </div>
    </section>
  );
}

export default About;

