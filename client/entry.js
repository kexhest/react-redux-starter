import './styles/main.scss'
import './scripts'

if (process.env.NODE_ENV === 'production') {
  require('offline-plugin/runtime').install()
}
