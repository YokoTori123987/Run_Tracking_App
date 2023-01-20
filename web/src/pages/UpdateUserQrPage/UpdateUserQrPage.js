import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import UpdateUserQrCell from 'src/components/UpdateUserQrCell/UpdateUserQrCell'

const UpdateUserQrPage = ({ id }) => {
  return  <UpdateUserQrCell id={id} />
}

export default UpdateUserQrPage
