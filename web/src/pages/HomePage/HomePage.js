import { useState } from 'react'

import { DownloadOutlined } from '@ant-design/icons'
import QRCode from 'qrcode.react'
import { Card, Col, Row, Statistic, Button, Divider } from 'antd'

import { useAuth } from '@redwoodjs/auth'
import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import { useQuery } from '@redwoodjs/web'

const HomePage = () => {

  const { currentUser, isAuthenticated } = useAuth()
  const [qrValue, setQrValue] = useState('QR-CODE')
  const downloadQRCode = () => {
    setQrValue(currentUser.id)
    // Generate download with use canvas and stream
    const canvas = document.getElementById('qr-gen')
    const pngUrl = canvas
      .toDataURL('image/png')
      .replace('image/png', 'image/octet-stream')

    let downloadLink = document.createElement('a')
    downloadLink.href = pngUrl
    downloadLink.download = `${qrValue}.png`
    document.body.appendChild(downloadLink)
    downloadLink.click()
    document.body.removeChild(downloadLink)
    console.log(pngUrl)
  }

  const QUERY = gql`
    query FindCountQuery {
      countUsers
      countParks
    }
  `

  const { data, loading } = useQuery(QUERY)
  if(loading)
  return (
    <div>Loading...</div>
  )

  // console.log(data.countUsers)
  // console.log(data.countParks)

  return (
    <>
      <MetaTags title="Home" description="Home page" />

      <header className="bg-slate-200">
        <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            HomePage
          </h1>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <Row gutter={16}>
            <Col span={12}>
              <Card>
                <Statistic
                  title="Active Users"
                  value= {data.countUsers}
                  valueStyle={{ color: '#3f8600' }}
                />
              </Card>
            </Col>
            <Col span={12}>
              <Card>
                <Statistic
                  title="Active Parks"
                  value={data.countParks}
                  valueStyle={{ color: '#3f8600' }}
                />
              </Card>
            </Col>
          </Row>
          <div className="px-4 py-6 sm:px-0">
            <div className="h-96 rounded-lg border-4 border-dashed border-gray-200">
              {isAuthenticated && (
                <>
                  <QRCode
                    id="qr-gen"
                    value={currentUser.id}
                    renderAs="png"
                    size={290}
                    level={'H'}
                    includeMargin={true}
                  />
                  <div className="text-center">
                    <Button
                      type="primary"
                      danger
                      icon={<DownloadOutlined />}
                      onClick={downloadQRCode}
                    >
                      Download QR Code
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default HomePage
