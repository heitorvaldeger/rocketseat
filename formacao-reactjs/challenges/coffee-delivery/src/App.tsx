import { ThemeProvider } from 'styled-components'
import { ToastContainer } from 'react-toastify';
import { defaultTheme } from '@/assets/styles/themes/default'
import { GlobalStyles } from '@/assets/styles/global'
import { Router } from '@/Routes'

export const App = () => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Router />
      <GlobalStyles />
      <ToastContainer position='top-left' />
    </ThemeProvider>
  )
}