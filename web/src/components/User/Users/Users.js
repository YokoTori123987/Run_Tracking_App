import { Select as AntSelect } from 'antd'
import { Tag } from 'antd'
import humanize from 'humanize-string'
import { DateTime } from 'luxon'

import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/User/UsersCell'

import Swal from 'sweetalert2'
import { Input, Table } from 'antd'
import { useState } from 'react'
import { set } from 'lodash'

const DELETE_USER_MUTATION = gql`
  mutation DeleteUserMutation($id: String!) {
    deleteUser(id: $id) {
      id
    }
  }
`
const UPDATE_ROLE_USER_MUTATION = gql`
  mutation UpdateRoleUserMutation($id: String!, $role: String!) {
    updateRoleUser(id: $id, role: $role) {
      id
      roles
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
export const Loading = () => <div>Loading...</div>

const setroles = ['admin', 'user', 'governor', 'owner']

const UsersList = ({ users }) => {
  const [deleteUser] = useMutation(DELETE_USER_MUTATION, {
    onCompleted: () => {
      toast.success('User deleted')
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
  const [updateRoleUser, { loading, error }] = useMutation(
    UPDATE_ROLE_USER_MUTATION,
    {
      onError: (error) => {
        toast.error(error.message)
      },
      // This refetches the query on the list page. Read more about other ways to
      // update the cache over here:
      // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
      refetchQueries: [{ query: QUERY }],
      awaitRefetchQueries: true,
    }
  )

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete user ' + id + '?')) {
      deleteUser({ variables: { id } })
    }
  }

  const handleChangePosition = async (role, id, firstName, lastName) => {
    Swal.fire({
      title: 'คุณแน่ใจไหม?',
      text: "คุณต้องการเปลี่ยนตำแหน่งใช่หรือไม่!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ยืนยัน',
      cancelButtonText: 'ยกเลิก'
    }).then((result) => {
      if (result.isConfirmed) {
        updateRoleUser({ variables: { id, role }})
        Swal.fire(
          'เปลี่ยนเรียบร้อย',
          'คุณเปลี่ยน role ของ '+ firstName + ' ' + lastName + ' เป็น ' + role + ' เรียบร้อย' ,
          'success'
        )
      }
    })
  }

  const [ search, setSearch ] = useState("")

  const columns = [
    {
      title: 'ชื่อจริง',
      dataIndex: 'firstName',
      filteredValue: [search],
      onFilter: (value, record) => {
        return String(record.firstName)
          .toLocaleLowerCase()
          .includes(value.toLocaleLowerCase()) ||
          String(record.lastName)
          .toLocaleLowerCase()
          .includes(value.toLocaleLowerCase()) ||
          String(record.gender)
          .toLocaleLowerCase()
          .includes(value.toLocaleLowerCase()) ||
          String(record.email)
          .toLocaleLowerCase()
          .includes(value.toLocaleLowerCase()) ||
          String(record.roles)
          .toLocaleLowerCase()
          .includes(value.toLocaleLowerCase());
      },
    },
    {
      title: 'นามสกุล',
      dataIndex: 'lastName'
    },
    {
      title: 'เพศ',
      dataIndex: 'gender'
    },
    {
      title: 'อีเมล์',
      dataIndex: 'email'
    },
    {
      title: 'ตำแหน่ง',
      dataIndex: 'roles',
      render: (record, user) => (
        <>
          <AntSelect
            style={{ width: '100px' }}
            value={record}
            onChange={(e) => handleChangePosition(e, user.id, user.firstName, user.lastName)}
            loading={loading}
            error={error}
          >
            {setroles.map((roles) => (
              <>
                <AntSelect.Option value={roles}>
                  <span>{roles}</span>
                </AntSelect.Option>
              </>
            ))}
          </AntSelect>
        </>
      ),
    },
    {
      title: 'วันเกิด',
      dataIndex: 'dateOfBirth',
    },
    {
      title: 'รูปภาพ',
      dataIndex: 'imageUrl'
    },
    {
      title: 'ช็อคพ้อยท์ปัจจุบัน',
      dataIndex: 'currentCheckpoint'
    },
    {
      title: 'สร้างเมื่อ',
      dataIndex: 'createdAt'
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
        <Table columns={columns} dataSource={users} />
      </div>
    </>
  )
}

export default UsersList
