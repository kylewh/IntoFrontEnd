import React from 'react'
import { HashRouter, Match } from 'react-router'
import { render } from 'react-dom'
import Landing from './Landing'
import Search from './Search'
import '../public/normalize.css'
import '../public/style.css'

const App = React.createClass({
  render: function () {
    return (
      <HashRouter>
        <div className='app'>
          {/* this is a comment */}
          <Match exactly pattern='/' component={Landing} />
          <Match exactly pattern='/' component={Search} />
        </div>
      </HashRouter>
    )
  }
})

// const App = React.createClass({
//   render: function () {
//     return (
//       <div className='app'>
//         <div className='landing'>
//           <h1>svideo</h1>
//           <input type='text' placeholder='Search' />
//           <a>or Browse All</a>
//         </div>
//       </div>
//     )
//   }
// })

render(<App />, document.getElementById('app'))
// <App /> will be transplied to 'React.createElement(App)
