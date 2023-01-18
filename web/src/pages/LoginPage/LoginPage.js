import { useRef } from 'react'
import { useEffect } from 'react'
import { useState } from 'react';

import { useAuth } from '@redwoodjs/auth'
import {
  Form,
  Label,
  TextField,
  PasswordField,
  Submit,
  FieldError,
} from '@redwoodjs/forms'
import { Link, navigate, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'
import { Button, Modal } from 'antd';
import { QrReader } from 'react-qr-reader'

import { useMutation } from '@redwoodjs/web'
import { useQuery } from '@redwoodjs/web'

const LoginPage = () => {

  const QUERY = gql`
    query FindIdQrCode($id: String!) {
      user(id: $id) {
        id
        email
        firstName
        lastName
    }
  }
  `

  // const UPDATE_USER_MUTATION = gql`
  //   mutation UpdateUserMutation($id: String!, $input: UpdateUserInput!) {
  //     updateUser(id: $id, input: $input) {
  //       id
  //       email
  //       firstName
  //       lastName
  //     }
  //   }
  // `

  const { isAuthenticated, logIn } = useAuth()
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState('');


  useEffect(() => {
    if (isAuthenticated) {
      navigate(routes.home())
    }
  }, [isAuthenticated])

  const usernameRef = useRef(null)
  useEffect(() => {
    usernameRef.current?.focus()
  }, [])

  const onSubmit = async (data) => {
    const response = await logIn({ ...data })

    if (response.message) {
      toast(response.message)
    } else if (response.error) {
      toast.error(response.error)
    } else {
      toast.success('Welcome back!')
    }
  }

  // const { loading, data } = useQuery(QUERY, {
  //   variables: { id },
  //   skip: true,
  // });

  // if (loading) return null;



  return (
    <>
      <MetaTags title="Login" />

      <main className="rw-main">
        <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
        <div className="rw-scaffold rw-login-container">
          <div className="rw-segment">
            <header className="rw-segment-header">
              <h2 className="rw-heading rw-heading-secondary">เข้าสู่ระบบ</h2>
            </header>

            <div className="rw-segment-main">
              <div className="rw-form-wrapper">
                <Form onSubmit={onSubmit} className="rw-form-wrapper">
                  <Label
                    name="username"
                    className="rw-label"
                    errorClassName="rw-label rw-label-error"
                  >
                    อีเมล์
                  </Label>
                  <TextField
                    name="username"
                    className="rw-input"
                    errorClassName="rw-input rw-input-error"
                    ref={usernameRef}
                    validation={{
                      required: {
                        value: true,
                        message: 'Username is required',
                      },
                    }}
                  />

                  <FieldError name="username" className="rw-field-error" />

                  <Label
                    name="password"
                    className="rw-label"
                    errorClassName="rw-label rw-label-error"
                  >
                    รหัสผ่าน
                  </Label>
                  <PasswordField
                    name="password"
                    className="rw-input"
                    errorClassName="rw-input rw-input-error"
                    autoComplete="current-password"
                    validation={{
                      required: {
                        value: true,
                        message: 'Password is required',
                      },
                    }}
                  />

                  <div className="rw-forgot-link">
                    <Link
                      to={routes.forgotPassword()}
                      className="rw-forgot-link"
                    >
                      ลืมรหัสผ่าน?
                    </Link>
                  </div>

                  <FieldError name="password" className="rw-field-error" />

                  <div className="rw-button-group">
                    <Submit className="rw-button rw-button-blue">
                      เข้าสู่ระบบ
                    </Submit>
                  </div>
                </Form>
              </div>
            </div>
          </div>
          <div className="rw-login-link">
            <span>ท่านไม่มีสมาชิก?</span>{' '}
            <Link to={routes.signup()} className="rw-link">
              สมัครสมาชิก!
            </Link>
          </div>
          <div className="rw-login-link">
            <span>สมัครสมาชิกผ่าน</span>{' '}

            <Button type="default" onClick={() => setOpen(true)}>
              QR Code!
            </Button>
            <Modal
              title="QR Code"
              centered
              open={open}
              onCancel={() => setOpen(false)}
              width={700}
            >
              <QrReader
                key={userId}
                delay={300}
                onResult={(result, error) => {
                  if (result) {
                    setUserId(result.text)
                  }
                  if (error) {
                    console.info(error);
                  }
                }}
                style={{ width: '100%' }}
              />
              <p>{userId}</p>
            </Modal>
          </div>
        </div>
      </main>
    </>
  )
}

export default LoginPage
