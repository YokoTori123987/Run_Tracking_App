import { useState } from 'react'

import { Select } from 'antd'
// import { calcLength } from 'framer-motion'
import { QrReader } from 'react-qr-reader'

// import { MetaTags } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { useQuery } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

// import CheckPath from 'src/components/CheckPoint/CheckPath/CheckPath'
const CheckPathPage = () => {
  const QUERY = gql`
    query FindParks {
      parks {
        id
        name
        Checkpoint {
          id
          name
        }
      }
    }
  `
  const CHECK_RUNING_PATH = gql`
    mutation createCheckpointMutation(
      $userId: String!
      $checkpointId: String!
    ) {
      checkRunningPath(userId: $userId, checkpointId: $checkpointId)
    }
  `
  // const [userId, setWebcamResult] = useState('')
  let userId
  const [parkId, setPark] = useState()
  const [checkpointId, setcheckpointId] = useState()
  const [checkRunningPath] = useMutation(CHECK_RUNING_PATH, {
    onCompleted: () => {
      toast.success('Create Checkpoint Succeed')
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })
  const { loading, data } = useQuery(QUERY)
  if (loading)
    return (
      <div className=".s.. bg-indigo-500" disabled>
        <svg
          className="... mr-3 h-5 w-5 animate-spin"
          viewBox="0 0 24 24"
        ></svg>
        Processing...
      </div>
    )

  const parkOption = data.parks.map((data) => ({
    value: data.id,
    label: data.name,
  }))
  // const checkId = (mo) => {
  //   return mo === { id: 'A', cp: ['2', '2'] }
  // }
  // var num = [1, 2, 6, 8, 9, 10, 25, 53]
  // console.log(mo)
  // const text = mo.find((p) => p.id === 'A')
  // console.log(text)
  // const checkpointOption = data.parks.map((data) =>
  //   data.Checkpoint.map((data) => ({
  //     value: data.id,
  //     label: data.name,
  //   }))
  // )
  // console.log(parkOption)
  // console.log(data.parks[1].Checkpoint)
  // const onSubmit = (data) => {
  // ...data เป็นการแตกไฟล์จาก Form
  // const record = { ...data, parkId: parkId }
  // props.onSave(record, props?.checkpoint?.id)
  // }

  // const flyToCheckpoint = (userId) => {
  //   console.log(userId + ' ++ ' + checkpointId)
  //   checkRunningPath({ variables: { userId, checkpointId } })
  // }

  const handleChangePark = async (e) => {
    setPark(e)
  }

  // const text = () => {
  // const test = data.find((scanId) => scanId.id === parkId)
  // console.log(test)
  // return test
  // }
  const text = data.parks.find((scanId) => scanId.id === parkId)
  let checkpointOption
  if (text) {
    checkpointOption = text.Checkpoint.map((data) => ({
      value: data.id,
      label: data.name,
    }))
  }
  const handleCheckpoint = (e) => {
    console.log(e)
    setcheckpointId(e)
  }
  // const webcamError = (error) => {
  //   if (error) {
  //     // console.log(error)
  //   }
  // }
  // const webcamScan = (result) => {
  //   console.log(result)
  //   if (result) {
  //     setWebcamResult(result)
  //   }
  // }
  return (
    <>
      <div className="rw-form-wrapper container mx-auto mt-2">
        <h5
          name="parkId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Park Name
        </h5>
        <Select
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          options={parkOption}
          onChange={handleChangePark}
        />

        {parkId && (
          <>
            <h5
              name="parkId"
              className="rw-label"
              errorClassName="rw-label rw-label-error"
            >
              Checkpoint Name
            </h5>
            <Select
              className="rw-input"
              errorClassName="rw-input rw-input-error"
              options={checkpointOption}
              onChange={handleCheckpoint}
            />
          </>
        )}
        {/* <CheckPath checkpointId={checkpointId} /> */}

        {checkpointId && (
          <>
            <div className="card col-sm-4">
              <div className="card-header m-1 rounded text-center">
                <h3>Webcam Image</h3>
              </div>
              <div
                className="card-body text-center"
                style={{
                  margin: 'auto',
                  width: '25%',
                  height: '25%',
                  border: '3px solid black',
                }}
              >
                <QrReader
                  key={checkpointId}
                  // ref={qrRef}
                  // scanDelay={5000}
                  // onError={webcamError}
                  // onScan={webcamScan}
                  legacyMode={false}
                  facingMode={'environment'}
                  onResult={(result) => {
                    console.log(checkpointId)
                    if (result) {
                      // setWebcamResult(result?.text)
                      // console.log(result)
                      const userId = result.text
                      // flyToCheckpoint(userId)
                      // console.log(checkpointId + ' +++ ' + userId)
                      checkRunningPath({
                        variables: { userId, checkpointId },
                      })
                    }

                    // if (error) {
                    //   console.info(error)
                    // }
                  }}
                />
              </div>
              <div className="card-footer mb-1 rounded text-center  ">
                {/* <h6>WebCam Result: {userId}</h6> */}
                <h6>{checkpointId + ' / ' + userId}</h6>
              </div>
            </div>
          </>
        )}
        {/* </Form> */}
      </div>
    </>
  )
}

export default CheckPathPage