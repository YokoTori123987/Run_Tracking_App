import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { useAuth } from '@redwoodjs/auth'

import HistoryCell from 'src/components/HistoryCell/HistoryCell'

const HistoryPage = () => {

  const { currentUser } = useAuth()

  return (
    <>
      <MetaTags title="History" description="History page" />

      <header className="bg-slate-200">
        <div className="px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <h1 className="text-3xl font-mono font-bold tracking-tight text-gray-900">
            History
          </h1>
        </div>
      </header>
      <main>
        <div className="py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <HistoryCell findHistoryRun={currentUser}/>
          </div>
        </div>
      </main>
    </>
  )
}

export default HistoryPage
