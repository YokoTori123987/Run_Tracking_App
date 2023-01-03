import { Link, routes } from '@redwoodjs/router'

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

import { MetaTags } from '@redwoodjs/web'

import BlogGovernorParksCell from '../../components/BlogGovernorParkCell/BlogGovernorParkCell'

const GovernorPage = () => {
  return (
    <>
      <MetaTags title="Governor" description="Governor page" />

      <header className="bg-slate-200">
        <div className="px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <h1 className="text-3xl font-mono font-bold tracking-tight text-gray-900">
          Governor Parks
          </h1>
        </div>
      </header>
      <main>
        <div className="py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <BlogGovernorParksCell />
          </div>
        </div>
      </main>
    </>
  )
}

export default GovernorPage