import React, { useState } from 'react'

import { Select } from 'antd'

import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  Submit,
} from '@redwoodjs/forms'
import { useQuery } from '@redwoodjs/web'
const PathForm = (props) => {
  const QUERY = gql`
    query FieldParks {
      parks {
        id
        name
      }
    }
  `
  const { loading, data } = useQuery(QUERY)
  const [parkId, setParkId] = useState()
  if (loading)
    return (
      <div className="... bg-indigo-500" disabled>
        <svg
          className="... mr-3 h-5 w-5 animate-spin"
          viewBox="0 0 24 24"
        ></svg>
        Processing...
      </div>
    )
  const onSubmit = (data) => {
    const record = { ...data, parkId: parkId }
    props.onSave(record, props?.path?.id)
  }

  const parkOption = data.parks.map((data) => ({
    value: data.id,
    label: data.name,
  }))
  const handleChangePark = (e) => {
    setParkId(e)
  }
  const onSearch = (e) => {
    setParkId('search', e.value)
  }
  const validateMessages = {
    required: 'Not data',
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
          name="parkId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Park id
        </Label>

        <Select
          showSearch
          placeholder="Select a person"
          validateStatus="error"
          validateMessages={validateMessages}
          optionFilterProp="children"
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          options={parkOption}
          onChange={handleChangePark}
          name="parkId"
          onSearch={onSearch}
          filterOption={(input, option) =>
            (option?.label ?? null).toLowerCase().includes(input.toLowerCase())
          }
        />
        {/* <TextField
          name="parkId"
          defaultValue={props.path?.parkId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        /> */}

        <FieldError name="parkId" className="rw-field-error" />

        <Label
          name="name"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Name
        </Label>

        <TextField
          name="name"
          defaultValue={props.path?.name}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="name" className="rw-field-error" />

        <Label
          name="distance"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Distance
        </Label>

        <TextField
          name="distance"
          defaultValue={props.path?.distance}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ valueAsNumber: true, required: true }}
        />

        <FieldError name="distance" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default PathForm
