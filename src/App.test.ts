import ReactDOM from 'react-dom'
import { createRoot } from 'react-dom/client'
import MainApp from './App'

it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<MainApp/>, div)
    ReactDOM.unmountComponentAtNode(div)
})
