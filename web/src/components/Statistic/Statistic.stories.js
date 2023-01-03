// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```jsx
// export const generated = (args) => {
//   return <Statistic {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import Statistic from './Statistic'

export const generated = () => {
  return <Statistic />
}

export default {
  title: 'Components/Statistic',
  component: Statistic,
}
