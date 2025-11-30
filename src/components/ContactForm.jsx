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
      // Using EmailJS service (you need to sign up at https://www.emailjs.com/)
      const emailData = {
        service_id: 'service_w6xm9lo', // Replace with your EmailJS service ID
        template_id: 'template_xwqim3q', // Replace with your EmailJS template ID
        user_id: '9VILhF0KdA6XIVZjC', // Replace with your EmailJS public key
        template_params: {
          from_name: sanitized.name,
          from_email: sanitized.email,
          message: sanitized.message,
          to_email: 'dahalsoumya@gmail.com'
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
        setStatus({ type: 'success', message: 'Message sent successfully!' })
        setFormData({ name: '', email: '', message: '' })
      } else {
        throw new Error('Failed to send email')
      }
    } catch (err) {
      setStatus({ type: 'error', message: 'Failed to send message. Please try again later.' })
    } finally {
      setLoading(false)
    }
  }

  // ... rest of your JSX remains the same ...
}
