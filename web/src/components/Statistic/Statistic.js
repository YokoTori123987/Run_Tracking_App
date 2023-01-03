import { useState } from 'react'
import { useAuth } from '@redwoodjs/auth'
import QRCode from 'qrcode.react'
import { DateTime } from 'luxon'
import { routes, Link } from '@redwoodjs/router'

const Statistic = ({ findCurrentRun, findTotalRun, findBestPace }) => {

  console.log(findTotalRun)

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

  const timeDiff = findCurrentRun.startTime
  console.log(timeDiff)

  return (
    <div className="container mx-auto">
      <div className="md:grid md:grid-cols-3 md:gap-6">
        <div className="md:col-span-1">
          <div className="px-4 sm:px-0">
            <p className="text-2xl font-bold leading-6 text-gray-900">Profile</p>
            <div className="flex justify-center mt-8">
              {isAuthenticated && (
                <>
                  <img src={currentUser.imageUrl} className="rounded-full w-64 sm:w-60 md:w-60 lg:w-80" />
                </>
              )}
            </div>
            <button className="btn btn-blue"></button>

            <div className="border-t border-gray-200 my-4"></div>

            {isAuthenticated && (
              <>
                <p className="mt-1 mx-4 text- text-gray-600">
                  Name : {currentUser.firstName} {currentUser.lastName}
                </p>
                <p className="mt-1 mx-4 text- text-gray-600">
                  Gender : {currentUser.gender}
                </p>
                <p className="mt-1 mx-4 text- text-gray-600">
                  Birthday : {DateTime.fromISO(currentUser.dateOfBirth).toFormat('dd/LL/yyyy')}
                </p>
                <p className="mt-1 mx-4 text- text-gray-600">
                  Role : {currentUser.roles}
                </p>
              </>
            )}

            <div className="border-t border-gray-200 my-8"></div>

            <div className="flex justify-center">
              {isAuthenticated && (
                  <>
                    <QRCode
                      id="qr-gen"
                      value={currentUser.id}
                      renderAs="png"
                      size={200}
                      level={'H'}
                      includeMargin={true}
                    />
                  </>
                )}
            </div>
            {/* </br> */}
            <div className='text-center'>
              <button type="button" onClick={downloadQRCode}>
                Download QR Code
              </button>
            </div>
          </div>
        </div>
        <div className="mt-5 md:col-span-2 md:mt-0">
          <div className="shadow-lg sm:overflow-hidden sm:rounded-md">
            <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
              <div className="grid grid-cols-3 gap-6">
                <div className="flex justify-between col-span-3 sm:col-span-3">
                  <label htmlFor="company-website" className="block text-xl sm:text-2xl font-bold text-gray-700">
                    Recent activity
                  </label>
                  <Link to ={routes.history()}>
                    <button className='bg-sky-400 rounded-full font-bold text-white py-2 px-4'>
                      History
                    </button>
                  </Link>
                </div>
              </div>
              <div className="border-t border-gray-200"></div>
                <div className='grid grid-cols-3 gap-3'>
                  <div className='text-center'>
                    <p>Avg.Pace</p>
                    <p>{findCurrentRun.pace}</p>
                  </div>
                  <div className='text-center'>
                    <p>Distace</p>
                    <p>{findCurrentRun.distance} km</p>
                  </div>
                  <div className='text-center'>
                    <p>Time</p>
                    <p>
                      {DateTime.fromISO(findCurrentRun.stopTime).diff(DateTime.fromISO(findCurrentRun.startTime), 'hours').toFormat(" hh ':' mm ':' ss ")}
                    </p>
                  </div>
                </div>
            </div>
          </div>
          <div className="shadow-lg sm:overflow-hidden sm:rounded-md my-2">
            <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
              <div className="grid grid-cols-3 gap-6">
                <div className="flex justify-between col-span-3 sm:col-span-3">
                  <label htmlFor="company-website" className="block text-xl sm:text-2xl font-bold text-gray-700">
                    My statistics
                  </label>
                </div>
              </div>
              <div className="relative flex items-center">
                <div className="flex-grow border-t border-gray-400"></div>
                <span className="flex-shrink mx-4 text-gray-400">All time</span>
                <div className="flex-grow border-t border-gray-400"></div>
              </div>
              <div className='grid grid-cols-3 gap-3'>
                <div className='text-center'>
                  <p>Best Pace</p>
                  <p>{findBestPace.pace}</p>
                </div>
                <div className='text-center'>
                  <p>Best Distace</p>
                  <p>{findTotalRun} km</p>
                </div>
                <div className='text-center'>
                  <p>Best Time</p>
                  <p>
                    {DateTime.fromISO(findCurrentRun.stopTime).diff(DateTime.fromISO(findCurrentRun.startTime), 'hours').toFormat(" hh ':' mm ':' ss ")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export { Statistic }