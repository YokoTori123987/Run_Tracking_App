import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  TextAreaField,
  Submit,
} from '@redwoodjs/forms'

const ParkForm = (props) => {
  const onSubmit = (data) => {
    props.onSave(data, props?.park?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="name"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Name
        </Label>

        <TextField
          name="name"
          defaultValue={props.park?.name}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="name" className="rw-field-error" />

        <Label
          name="imageUrl"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Image url
        </Label>

        <TextField
          name="imageUrl"
          defaultValue={props.park?.imageUrl}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="imageUrl" className="rw-field-error" />

        <Label
          name="description"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Description
        </Label>

        <TextField
          name="description"
          defaultValue={props.park?.description}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="description" className="rw-field-error" />

        <Label
          name="address"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Address
        </Label>

        <TextField
          name="address"
          defaultValue={props.park?.address}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="address" className="rw-field-error" />

        <Label
          name="workingHours"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Working hours
        </Label>

        <TextAreaField
          name="workingHours"
          defaultValue={JSON.stringify(props.park?.workingHours)}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ valueAsJSON: true }}
        />

        <FieldError name="workingHours" className="rw-field-error" />

        <Label
          name="ownerId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Owner id
        </Label>

        <TextField
          name="ownerId"
          defaultValue={props.park?.ownerId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="ownerId" className="rw-field-error" />

        <Label
          name="governorId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Governor id
        </Label>

        <TextField
          name="governorId"
          defaultValue={props.park?.governorId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="governorId" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default ParkForm
