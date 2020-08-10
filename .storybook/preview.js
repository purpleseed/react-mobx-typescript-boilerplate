import '@openfonts/noto-sans-kr_korean'
import '@openfonts/noto-sans-kr_latin'
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport'
import { addParameters, configure } from '@storybook/react'

const customViewports = {
  iPadLandscape: {
    name: 'iPad Series (Landscape)',
    styles: {
      width: '1024px',
      height: '768px',
    },
    type: 'tablet',
  },
  iPadProLandscape: {
    name: 'iPad Pro Series (Landscape)',
    styles: {
      width: '1366px',
      height: '1024px',
    },
    type: 'tablet',
  },
}

addParameters({
  viewport: {
    viewports: {
      ...INITIAL_VIEWPORTS,
      ...customViewports,
    },
  },
})

configure(require.context('../src/app', true, /\.stories\.tsx?$/), module)
