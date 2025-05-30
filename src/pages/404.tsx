import Link from 'next/link'

export default function Custom404() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="mt-2 text-lg">Page not found</p>
      <Link 
        href="/" 
        className="mt-6 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 transition-colors"
      >
        Go back home
      </Link>
    </div>
  )
} 