import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  DatetimeLocalField,
  Submit,
} from '@redwoodjs/forms'

const formatDatetime = (value) => {
  if (value) {
    return value.replace(/:\d{2}\.\d{3}\w/, '')
  }
}

const LogForm = (props) => {
  const onSubmit = (data) => {
    props.onSave(data, props?.log?.id)
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
          name="userId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          User id
        </Label>

        <TextField
          name="userId"
          defaultValue={props.log?.userId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="userId" className="rw-field-error" />

        <Label
          name="timeStamp"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Time stamp
        </Label>

        <DatetimeLocalField
          name="timeStamp"
          defaultValue={formatDatetime(props.log?.timeStamp)}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="timeStamp" className="rw-field-error" />

        <Label
          name="checkpointId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Checkpoint id
        </Label>

        <TextField
          name="checkpointId"
          defaultValue={props.log?.checkpointId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="checkpointId" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default LogForm
