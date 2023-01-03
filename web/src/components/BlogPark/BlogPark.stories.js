// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```jsx
// export const generated = (args) => {
//   return <BlogPark {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import BlogPark from './BlogPark'

export const generated = () => {
  return <BlogPark />
}

export default {
  title: 'Components/BlogPark',
  component: BlogPark,
}
