import { useAuth } from '@redwoodjs/auth'
import { MetaTags } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { navigate, routes } from '@redwoodjs/router'

import { EditProfile } from "src/components/EditProfile/EditProfile"

export const beforeQuery = (props) => {
  return {
    variables: props,
    fetchPolicy: 'no-cache',
  }
}

export const QUERY = gql`
  query Profile {
    profile {
      id
      firstName
      lastName
      gender
      imageUrl
    }
  }
`

const UPDATE_PROFILE_MUTATION = gql`
  mutation UpdateProfileMutation($input: UpdateProfileInput!) {
    updateProfile(input: $input) {
      id
      firstName
      lastName
      gender
      imageUrl
    }
  }
`
export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ profile }) => {
  const { reauthenticate } = useAuth()
  const [updateProfile, { loading, error }] = useMutation(
    UPDATE_PROFILE_MUTATION,
    {
      onCompleted: () => {
        toast.success('Checkpoint updated')
        reauthenticate()
        navigate(routes.statistic())
      },
      onError: (error) => {
        toast.error(error.message)
      },
      refetchQueries: [{ query: QUERY }],
      awaitRefetchQueries: true,
    }
  )

  const onSave = (input) => {
    updateProfile({ variables: { input } })
  }

  return (
    <>
      <MetaTags
        title={`${
          profile.firstName || profile.lastName || profile.gender || profile.imageUrl
        } | EditProfile`}
      />
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">Edit Profile {profile?.id}</h2>
        </header>
        <div className="rw-segment-main">
          <EditProfile
            profile={profile}
            onSave={onSave}
            error={error}
            loading={loading}
          />
        </div>
      </div>
    </>
  )
}