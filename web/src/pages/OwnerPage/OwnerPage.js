import { Link, routes } from '@redwoodjs/router'

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

import { MetaTags } from '@redwoodjs/web'

import BlogOwnerParksCell from '../../components/BlogOwnerParkCell/BlogOwnerParkCell'
const OwnerPage = () => {
  return (
    <>
      <MetaTags title="Owner" description="Owner page" />

      <header className="bg-slate-200">
        <div className="px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <h1 className="text-3xl font-mono font-bold tracking-tight text-gray-900">
          Owner Parks
          </h1>
        </div>
      </header>
      <main>
        <div className="py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <BlogOwnerParksCell />
          </div>
        </div>
      </main>
    </>
  )
}

export default OwnerPage