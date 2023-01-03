import { useAuth } from '@redwoodjs/auth'
import {
  Form,
  Label,
  FieldError,
  Submit,
  InputField,
  SelectField,
} from '@redwoodjs/forms'

const EditProfile = ({ error, loading, profile, onSave }) => {

  const { currentUser, isAuthenticated } = useAuth()

  return (
    <div className="container mx-auto">
        <>
          <div className="mt-12 mx-12 md:mx-72">
            <div className="flex justify-center">
            {isAuthenticated && (
              <>
               <img src={currentUser.imageUrl} className="rounded-full w-64 sm:w-60 md:w-60 lg:w-80" />
              </>
            )}
            </div>
            <div>
              <Form onSubmit={onSave} error={error}>

                <div className='mt-6'>
                  <Label
                    name="imageUrl"
                    className="block text-sm font-medium text-gray-700"
                    errorClassName="rw-label rw-label-error"
                    >
                    imageurl
                  </Label>
                  <InputField
                      name="imageUrl"
                      defaultValue={profile.imageUrl}
                      errorClassName="rw-input rw-input-error"
                      className="mt-1 rw-input"
                      validation={{ required: true }}
                    />

                    <FieldError name="imageUrl" className="rw-field-error" />
                </div>
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6 sm:col-span-3">

                    <Label
                      name="firstName"
                      className="block text-sm font-medium text-gray-700 rw-label"
                      errorClassName="rw-label rw-label-error"
                    >
                      Firstname
                    </Label>

                    <InputField
                      name="firstName"
                      defaultValue={profile.firstName}
                      errorClassName="rw-input rw-input-error"
                      className="mt-1 rw-input"
                      validation={{ required: true }}
                    />

                    <FieldError name="firstName" className="rw-field-error" />

                  </div>
                  <div className="col-span-6 sm:col-span-3">

                    <Label
                      name="lastName"
                      className="block text-sm font-medium text-gray-700 rw-label"
                      errorClassName="rw-label rw-label-error"
                    >
                      Lastname
                    </Label>

                    <InputField
                      name="lastName"
                      defaultValue={profile.lastName}
                      errorClassName="rw-input rw-input-error"
                      className="mt-1 rw-input"
                      validation={{ required: true }}
                    />

                    <FieldError name="lastName" className="error" />

                  </div>
                </div>
                <div className="mt-6">
                  <Label
                    name="gerder"
                    className="block text-sm font-medium text-gray-700"
                    errorClassName="rw-label rw-label-error"
                    >
                    Gender
                  </Label>
                  <SelectField name='gender' className='w-full rw-input' defaultValue={profile.gender}>
                    <option>Male</option>
                    <option>Female</option>
                  </SelectField>
                </div>
                <div className="mt-8 rw-button-group">
                  <Submit disabled={loading} className="rw-button rw-button-blue">
                    Update
                  </Submit>
                </div>
              </Form>
            </div>
          </div>
        </>
    </div>
  )
}

export { EditProfile }
