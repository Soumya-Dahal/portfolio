import { useState } from 'react'

function ContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState({ type: '', message: '' })
  const [loading, setLoading] = useState(false)

  const sanitize = (str) => str.trim().replace(/[<>]/g, '')

  const validate = () => {
    if (!formData.name || formData.name.length < 2) return 'Name must be at least 2 characters'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) return 'Invalid email address'
    if (!formData.message || formData.message.length < 10) return 'Message must be at least 10 characters'
    return null
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const error = validate()
    if (error) {
      setStatus({ type: 'error', message: error })
      return
    }

    setLoading(true)
    setStatus({ type: '', message: '' })

    const sanitized = {
      name: sanitize(formData.name),
      email: sanitize(formData.email),
      message: sanitize(formData.message)
    }

    try {
      const emailData = {
        service_id: import.meta.env.VITE_EMAILJS_SERVICE_ID,
        template_id: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        user_id: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
        template_params: {
          from_name: sanitized.name,
          from_email: sanitized.email,
          message: sanitized.message,
          to_email: 'dahalsoumya@gmail.com',
          reply_to: sanitized.email
        }
      };

      const res = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData)
      });

      if (res.ok) {
        setStatus({ type: 'success', message: 'Message sent successfully! I\'ll get back to you soon.' })
        setFormData({ name: '', email: '', message: '' })
      } else {
        throw new Error('Failed to send email');
      }
    } catch (err) {
      console.error('Email error:', err);
      setStatus({ type: 'error', message: 'Failed to send message. Please try again or email me directly at dahalsoumya@gmail.com' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" className="py-20 px-4">
      <div className="max-w-2xl mx-auto space-y-8">
        <h2 className="text-4xl md:text-5xl font-bold text-center">Contact</h2>
        <div className="space-y-4 text-center text-lg">
          <p>
            <span className="font-medium">Email:</span>{' '}
            <a href="mailto:dahalsoumya@gmail.com" className="hover:underline">
              dahalsoumya@gmail.com
            </a>
          </p>
          <p>
            <span className="font-medium">GitHub:</span>{' '}
            <a
              href="https://github.com/soumyadahal"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              github.com/soumyadahal
            </a>
          </p>
          <p>
            <span className="font-medium">LinkedIn:</span>{' '}
            <a
              href="https://www.linkedin.com/in/soumya-dahal-ab749b365"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              linkedin.com/in/soumya-dahal-ab749b365
            </a>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 mt-12" noValidate>
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-900"
              required
              aria-required="true"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-900"
              required
              aria-required="true"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-2">
              Message
            </label>
            <textarea
              id="message"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              rows="5"
              className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-900"
              required
              aria-required="true"
            />
          </div>
          {status.message && (
            <div
              className={`p-4 ${
                status.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
              }`}
              role="alert"
            >
              {status.message}
            </div>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full px-8 py-3 bg-gray-900 text-white hover:bg-gray-700 transition-colors disabled:opacity-50"
            aria-label="Send a hello or bug report"
          >
            {loading ? 'Sending...' : 'Send a hello (or bug report)'}
          </button>
        </form>
      </div>
    </section>
  )
}
export default ContactForm
