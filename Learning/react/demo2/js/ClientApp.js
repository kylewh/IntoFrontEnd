import React from 'react'
import { BrowserRouter, Match } from 'react-router'
import { Provider } from 'react-redux'
import store from './store'
import { render } from 'react-dom'
import Landing from './Landing'
import Search from './Search'
import Details from './Details'
import preload from '../public/data.json'
import '../public/normalize.css'
import '../public/style.css'

const App = React.createClass({
  render: function () {
    return (
      <BrowserRouter>
        <Provider store={store}>
          <div className='app'>
            {/* this is a comment */}
            <Match exactly pattern='/' component={Landing} />
            <Match
              pattern='/search'
              component={(props) => <Search shows={preload.shows} {...props} />}
            />
            <Match
              pattern='/details/:id'
              component={(props) => {
                const shows = preload.shows.filter((show) =>
                  props.params.id === show.imdbID)
                return <Details show={shows[0]} {...props} />
              }}
            />
          </div>
        </Provider>
      </BrowserRouter>
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
