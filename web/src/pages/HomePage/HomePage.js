import { useState } from 'react'

import { DownloadOutlined } from '@ant-design/icons'
import QRCode from 'qrcode.react'
import { Card, Col, Row, Statistic, Button, Divider } from 'antd'

import { useAuth } from '@redwoodjs/auth'
import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

// import { useQuery } from '@redwoodjs/web'

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

  // const QUERY = gql`
  //   query FindCountQuery {
  //     countUsers
  //     countParks
  //   }
  // `

  // const { data, loading } = useQuery(QUERY)
  // if(loading)
  // return (
  //   <div>Loading...</div>
  // )

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
          {/* <Row gutter={16}>
            <Col span={4}>
              <Card>
                <Statistic
                  title="Active Parks"
                  // value={data.countParks}
                  valueStyle={{ color: '#3f8600' }}
                  display="flex"
                  align-items="center"
                />
              </Card>
            </Col>
          </Row> */}
          <div className="px-4 py-6 sm:px-0">

            {isAuthenticated && (
              <>
              <h1 className="text-2xl mt-6 font-mono font-bold flex justify-center">ชื่อผู้ใช้ : {currentUser.firstName} {currentUser.lastName}</h1>
              <h1 className="mt-6 text-xl font-mono flex justify-center text-gray-400">กดปุ่ม Download QR Code ด้านล่างเพื่อนำ QR Code สเเกนในการวิ่ง</h1>


                <div className="text-center">
                  <QRCode
                    id="qr-gen"
                    value={currentUser.id}
                    renderAs="png"
                    size={290}
                    align-items="center"
                    level={'H'}
                    includeMargin={true}
                    style={{margin: 'auto'}}
                  />
                    <Button
                      type="primary"
                      danger
                      icon={<DownloadOutlined />}
                      onClick={downloadQRCode}
                    >
                      Download QR Code
                    </Button>
                  </div>
                  <br>
                  </br>
                </>
              )}
          </div>
        </div>
      </main>
    </>
  )
}

export default HomePage
