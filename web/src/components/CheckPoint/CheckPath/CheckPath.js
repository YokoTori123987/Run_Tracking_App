import { QrReader } from 'react-qr-reader'

// import { useMutation } from '@redwoodjs/web'
// import { toast } from '@redwoodjs/web/dist/toast'
export default function CheckPath({ checkpointId }) {
  // const CHECK_RUNING_PATH = gql`
  //   mutation createCheckpointMutation(
  //     $userId: String!
  //     $checkpointId: String!
  //   ) {
  //     checkRunningPath(userId: $userId, checkpointId: $checkpointId)
  //   }
  // `
  // const [checkRunningPath] = useMutation(CHECK_RUNING_PATH, {
  //   onCompleted: () => {
  //     toast.success('Create Checkpoint Succeed')
  //   },
  //   onError: (error) => {
  //     toast.error(error.message)
  //   },
  // })
  let userId
  console.log({ checkpointId })
  return (
    <>
      <div className="card col-sm-4">
        <div className="card-header m-1 rounded text-center">
          <h3>Webcam Image</h3>
        </div>
        <div
          className="card-body text-center"
          style={{ width: '500px', height: '500px' }}
        >
          <QrReader
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
                // checkRunningPath({
                //   variables: { userId, checkpointId },
                // })
              }

              // if (error) {
              //   console.info(error)
              // }
            }}
          />
        </div>
        <div className="card-footer mb-1 rounded">
          {/* <h6>WebCam Result: {userId}</h6> */}
          <h6>{checkpointId + ' / ' + userId}</h6>
        </div>
      </div>
    </>
  )
}