import {
  Form,
  FormError,
  FieldError,
  Label,
  DatetimeLocalField,
  TextField,
  Submit,
} from '@redwoodjs/forms'

const formatDatetime = (value) => {
  if (value) {
    return value.replace(/:\d{2}\.\d{3}\w/, '')
  }
}

const RunForm = (props) => {
  const onSubmit = (data) => {
    props.onSave(data, props?.run?.id)
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
          name="startTime"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Start time
        </Label>

        <DatetimeLocalField
          name="startTime"
          defaultValue={formatDatetime(props.run?.startTime)}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="startTime" className="rw-field-error" />

        <Label
          name="stopTime"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Stop time
        </Label>

        <DatetimeLocalField
          name="stopTime"
          defaultValue={formatDatetime(props.run?.stopTime)}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="stopTime" className="rw-field-error" />

        <Label
          name="distance"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Distance
        </Label>

        <TextField
          name="distance"
          defaultValue={props.run?.distance}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ valueAsNumber: true }}
        />

        <FieldError name="distance" className="rw-field-error" />

        <Label
          name="pace"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Pace
        </Label>

        <TextField
          name="pace"
          defaultValue={props.run?.pace}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ valueAsNumber: true }}
        />

        <FieldError name="pace" className="rw-field-error" />

        <Label
          name="userId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          User id
        </Label>

        <TextField
          name="userId"
          defaultValue={props.run?.userId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="userId" className="rw-field-error" />

        <Label
          name="parkId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Park id
        </Label>

        <TextField
          name="parkId"
          defaultValue={props.run?.parkId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="parkId" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default RunForm
