// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```jsx
// export const generated = (args) => {
//   return <UpdateUserQr {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import UpdateUserQr from './UpdateUserQr'

export const generated = () => {
  return <UpdateUserQr />
}

export default {
  title: 'Components/UpdateUserQr',
  component: UpdateUserQr,
}
