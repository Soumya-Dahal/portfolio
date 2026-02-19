function Certifications() {
  const certs = [
    {
      title: 'Data Science with Python',
      issuer: 'Kantipur Engineering College',
      date: '',
      credentialId: ''
    },
    {
      title: 'Advanced Cybersecurity',
      issuer: 'Broadway Infosys',
      date: 'Sep 2025',
      credentialId: 'B62441000'
    }
  ]

  return (
    <section id="certifications" className="py-20 px-4 bg-gray-50">
      <div className="max-w-4xl mx-auto space-y-8">
        <h2 className="text-4xl md:text-5xl font-bold text-center">Certifications</h2>
        <div className="space-y-6">
          {certs.map((cert, i) => (
            <div key={i} className="bg-white p-6 border border-gray-200">
              <h3 className="text-xl font-semibold">{cert.title}</h3>
              <p className="text-gray-700 mt-1">{cert.issuer}</p>
              {cert.date && <p className="text-gray-600 text-sm mt-1">{cert.date}</p>}
              {cert.credentialId && (
                <p className="text-gray-600 text-sm mt-1">
                  Credential ID: {cert.credentialId}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Certifications
