import { Link, routes } from '@redwoodjs/router'

const BlogPark = ({ park }) => {
  const { name, imageUrl, description, address, workingHours } = park
  console.log(park)
  return (
    <article className="container mx-auto">
      <div className="flex w-full items-center justify-center px-0 py-0">
        <img
          className="object-cover rounded-sm sm:w-full md:w-full lg:w-full xl:w-8/12 xl:py-8 xk:h-full xl:shrink-0"
          src={imageUrl}
          alt=""
          width="1000"
          height="1000"
        />
      </div>

      <div className="px-8 py-4">
        <div className="font-bold text-2xl my-5">
          {name}
        </div>

        <div className="my-5">
          <span className="mb-6"> "Sunday - Wednesday" : </span>{' '}
          {workingHours['Sunday - Wednesday']}
        </div>

        <div className="my-5">
          <span className="mb-6"> "Thursday - Saturday" : </span>{' '}
          {workingHours['Thursday - Saturday']}
        </div>

        <div className="my-5">
          <p className="mb-5 font-bold">Address</p> {address}
        </div>

        <div className="my-5">
          <p className="mb-5 font-bold">Description</p> {description}
        </div>
      </div>

      {/* <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
        <div className="w-full overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-md tracking-wide text-left text-gray-900 bg-gray-100 border-b border-gray-600">
                <th className="py-3 text-center">No.</th>
                <th className="py-3 text-center">Username</th>
                <th className="py-3 text-center">Avg.pace</th>
              </tr>
            </thead>
            <tbody>
              {Run.slice(0, 3).map((el , index) => (
                <tr className="text-center text-md">
                <td>{index + 1}</td>
                <td className="py-8">
                  <a className="flex justify-center	items-center">
                  <img width="40" height="40" src={el.user.imageUrl} className="block rounded-full float-left" alt="" sizes="(max-width: 150px) 100vw, 150px" />
                  <span className="px-4">{el.user.firstName}</span>
                  </a>
                </td>
                <td>{el.pace}</td>
              </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div> */}

    </article>
  )
}

export default BlogPark
