import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import BlogParkCell from 'src/components/BlogParkCell'

const BlogParkPage = ({ id }) => {
  return (
    <>
      <MetaTags title="BlogPark" description="BlogPark page" />

      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <BlogParkCell id={id} />
          </div>
        </div>
      </main>
    </>
  )
}

export default BlogParkPage
