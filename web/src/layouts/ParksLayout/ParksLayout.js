import { Link, routes } from '@redwoodjs/router'
import { Toaster } from '@redwoodjs/web/toast'

const ParksLayout = ({ children }) => {
  return (
    <div className="rw-scaffold">
      <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
      <header className="rw-header">
        <h1 className="rw-heading rw-heading-primary">
          <Link to={routes.parks()} className="rw-link">
            Parks
          </Link>
        </h1>
        <Link to={routes.newPark()} className="rw-button rw-button-green">
          <div className="rw-button-icon">+</div> New Park
        </Link>
      </header>
      <main className="rw-main">{children}</main>
    </div>
  )
}

export default ParksLayout
