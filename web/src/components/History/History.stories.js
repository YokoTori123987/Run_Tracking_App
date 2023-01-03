// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```jsx
// export const generated = (args) => {
//   return <History {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import History from './History'

export const generated = () => {
  return <History />
}

export default {
  title: 'Components/History',
  component: History,
}
