import { MetaTags } from '@redwoodjs/web'
import { useAuth } from '@redwoodjs/auth'
import EditProfileCell from "src/components/EditProfileCell/EditProfileCell"

const EditProfilePage = () => {

  const { currentUser } = useAuth()

  return (
    <>
      <MetaTags title="profile" description="EditProfile page" />

      <header className="bg-slate-200">
        <div className="px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <h1 className="text-3xl font-mono font-bold tracking-tight text-gray-900">
            EditProfile
          </h1>
        </div>
      </header>

      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <EditProfileCell profile={currentUser} />
          </div>
        </div>
      </main>
    </>
  )
}

export default EditProfilePage