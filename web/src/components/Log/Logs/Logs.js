import humanize from 'humanize-string'
import { DateTime } from 'luxon'

import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Log/LogsCell'

import { Input, Table } from 'antd'
import { useState } from 'react'

const DELETE_LOG_MUTATION = gql`
  mutation DeleteLogMutation($id: String!) {
    deleteLog(id: $id) {
      id
    }
  }
`

const MAX_STRING_LENGTH = 150

const formatEnum = (values) => {
  if (values) {
    if (Array.isArray(values)) {
      const humanizedValues = values.map((value) => humanize(value))
      return humanizedValues.join(', ')
    } else {
      return humanize(values)
    }
  }
}

const truncate = (value) => {
  const output = value?.toString()
  if (output?.length > MAX_STRING_LENGTH) {
    return output.substring(0, MAX_STRING_LENGTH) + '...'
  }
  return output ?? ''
}

const jsonTruncate = (obj) => {
  return truncate(JSON.stringify(obj, null, 2))
}

const timeTag = (datetime) => {
  return (
    datetime && (
      <time dateTime={datetime} title={datetime}>
        {new Date(datetime).toUTCString()}
      </time>
    )
  )
}

const checkboxInputTag = (checked) => {
  return <input type="checkbox" checked={checked} disabled />
}

const LogsList = ({ logs }) => {
  const [deleteLog] = useMutation(DELETE_LOG_MUTATION, {
    onCompleted: () => {
      toast.success('Log deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete log ' + id + '?')) {
      deleteLog({ variables: { id } })
    }
  }

  const [ search, setSearch ] = useState("")

  const columns = [
    {
      title: 'ผู้ใช้',
      dataIndex: 'user',
      width: '10%',
      render: (record) => `${record.firstName} ${record.lastName}`,
      filteredValue: [search],
      onFilter: (value, record) => {
        return String(record.user.firstName)
          .toLocaleLowerCase()
          .includes(value.toLocaleLowerCase()) ||
          String(record.user.lastName)
          .toLocaleLowerCase()
          .includes(value.toLocaleLowerCase());
      },
    },
    {
      title: 'timeStamp',
      dataIndex: 'timeStamp',
      width: '10%',
    },
    {
      title: 'Checkpoint',
      dataIndex: 'Checkpoint',
      width: '10%',
      render: (record) => record.name,
      sorter: (a, b) => a.Checkpoint.name.localeCompare(b.Checkpoint.name),
      filters: [
        {
          text: 'A',
          value: 'A'
        },
      ],
      onFilter: (value, record) => record.Checkpoint.indexOf(value) === 0,
    },
  ]

  return (
    <>
      <Input
        placeholder="ค้นหาข้อความ...."
        style={{ marginBottom: 12 , width: 500}}
        allowClear
        onSearch={(value) => {
          setSearch(value);
        }}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />

      <div className="rw-segment rw-table-wrapper-responsive">
        <Table columns={columns} dataSource={logs} />
      </div>
    </>
  )
}

export default LogsList
