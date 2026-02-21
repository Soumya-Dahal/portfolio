import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { supabase, isSupabaseConfigured } from '../lib/supabase'

const BUCKET_NAME = 'pdfs'
const SIGNED_URL_EXPIRY = 60

function DownloadsPage() {
  const { user, loading: authLoading } = useAuth()
  const navigate = useNavigate()
  const [files, setFiles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!user && !authLoading) {
      navigate('/login', { replace: true })
      return
    }
    if (!user) return
    if (!isSupabaseConfigured || !supabase) {
      queueMicrotask(() => {
        setError('Supabase is not configured.')
        setLoading(false)
      })
      return
    }

    let cancelled = false

    async function load() {
      const { data: list, error: listError } = await supabase.storage
        .from(BUCKET_NAME)
        .list('', { limit: 100 })

      if (cancelled) return
      if (listError) {
        setError(listError.message || 'Failed to list files')
        setLoading(false)
        return
      }

      const pdfs = (list || []).filter(
        (f) => f.name.toLowerCase().endsWith('.pdf') && !f.name.startsWith('.')
      )

      const withUrls = await Promise.all(
        pdfs.map(async (f) => {
          const { data: signed } = await supabase.storage
            .from(BUCKET_NAME)
            .createSignedUrl(f.name, SIGNED_URL_EXPIRY)
          return { name: f.name, url: signed?.signedUrl ?? null }
        })
      )

      if (cancelled) return
      setFiles(withUrls)
      setLoading(false)
    }

    load()
    return () => { cancelled = true }
  }, [user, authLoading, navigate])

  if (authLoading || (!user && !authLoading)) {
    return null
  }

  return (
    <div className="min-h-screen pt-24 px-4 pb-12">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Downloads</h1>
        <p className="text-gray-600 mb-6">
          Logged in as {user.email}. Download PDFs below.
        </p>

        {error && (
          <div className="mb-4 p-3 bg-amber-50 text-amber-800 text-sm rounded">
            {error}
            <p className="mt-2 text-xs">
              Make sure the Supabase project has a private storage bucket named &quot;pdfs&quot; and
              policies allow authenticated read. Upload PDFs from Supabase Dashboard → Storage.
            </p>
          </div>
        )}

        {loading && (
          <p className="text-gray-500">Loading…</p>
        )}

        {!loading && files.length === 0 && !error && (
          <p className="text-gray-500">No PDFs available yet. Check back later.</p>
        )}

        {!loading && files.length > 0 && (
          <ul className="space-y-2">
            {files.map(({ name, url }) => (
              <li
                key={name}
                className="flex items-center justify-between gap-4 py-3 px-4 border border-gray-200 rounded hover:bg-gray-50 hover:border-gray-300"
              >
                <span className="text-gray-900 font-medium truncate flex-1 min-w-0">
                  {name}
                </span>
                <a
                  href={url || '#'}
                  download={name}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 px-4 py-2 bg-gray-900 text-white text-sm font-medium hover:bg-gray-700 transition-colors"
                >
                  Download
                </a>
              </li>
            ))}
          </ul>
        )}

        <p className="mt-8">
          <Link to="/" className="text-gray-600 hover:text-gray-900 text-sm">
            ← Back to home
          </Link>
        </p>
      </div>
    </div>
  )
}

export default DownloadsPage
