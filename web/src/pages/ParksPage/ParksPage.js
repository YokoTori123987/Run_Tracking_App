// import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import BlogParksCell from 'src/components/BlogParksCell'

const ParksPage = () => {
  return (
    <>
      <MetaTags title="Parks" description="Parks page" />

      <header className="bg-slate-200">
        <div className="px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <h1 className="text-3xl font-mono font-bold tracking-tight text-gray-900">
            Parks
          </h1>
        </div>
      </header>
      <main>
        <div className="py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <BlogParksCell />
          </div>
        </div>
      </main>
    </>
  )
}

export default ParksPage
