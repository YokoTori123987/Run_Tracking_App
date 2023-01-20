import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  Submit,
  SelectField,
} from '@redwoodjs/forms'

const UpdateUserQr = (props) => {
  const onSubmit = (data) => {
    props.onSave(data, props?.user?.id)
  }

  return (
    <div className="container mx-auto">
      <div className="mt-12 mx-12 md:mx-72">
        <div className="rw-form-wrapper">
          <Form onSubmit={onSubmit} error={props.error}>
            <FormError
              error={props.error}
              wrapperClassName="rw-form-error-wrapper"
              titleClassName="rw-form-error-title"
              listClassName="rw-form-error-list"
            />
            <Label
              name="email"
              className="rw-label"
              errorClassName="rw-label rw-label-error"
            >
              Email
            </Label>

            <TextField
              name="email"
              defaultValue={props.user?.email}
              className="rw-input"
              errorClassName="rw-input rw-input-error"
              validation={{ required: true }}
            />

            <FieldError name="email" className="rw-field-error" />

            <Label
              name="firstName"
              className="rw-label"
              errorClassName="rw-label rw-label-error"
            >
              First name
            </Label>

            <TextField
              name="firstName"
              defaultValue={props.user?.firstName}
              className="rw-input"
              errorClassName="rw-input rw-input-error"
            />

            <FieldError name="firstName" className="rw-field-error" />

            <Label
              name="lastName"
              className="rw-label"
              errorClassName="rw-label rw-label-error"
            >
              Last name
            </Label>

            <TextField
              name="lastName"
              defaultValue={props.user?.lastName}
              className="rw-input"
              errorClassName="rw-input rw-input-error"
            />

            <FieldError name="lastName" className="rw-field-error" />

            <Label
              name="lastName"
              className="rw-label"
              errorClassName="rw-label rw-label-error"
            >
              Gender
            </Label>

            <SelectField name='gender' className='w-full rw-input' defaultValue={props.user?.gender}>
              <option>Male</option>
              <option>Female</option>
            </SelectField>

            <div className="rw-button-group">
              <Submit disabled={props.loading} className="rw-button rw-button-blue">
                Save
              </Submit>
            </div>
          </Form>
        </div>
      </div>
    </div>
  )
}


export default UpdateUserQr
