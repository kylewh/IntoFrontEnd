import React from 'react'
import Search from './Search'
// import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'
import { shallowToJson } from 'enzyme-to-json'
import ShowCard from './ShowCard'
import preload from '../public/data.json'

// test('Search snapshot test', () => {
//   const componnet = renderer.create(<Search />)
//   const tree = componnet.toJSON()
//   expect(tree).toMatchSnapshot()
// })


test('Search snapshot test', () => {
  const componnet = shallow(<Search />)
  const tree = shallowToJson(componnet)
  expect(tree).toMatchSnapshot()
})

test('Search should render a ShowCard for each show',() => {
  const componnet = shallow(<Search />)
  expect(preload.shows.length).toEqual(componnet.find(ShowCard).length)
})

test('Search should render correct amount of shows based on search', () => {
  const searchWord = 'house';
  const componnet = shallow(<Search />)
  componnet.find('input').simulate('change', {target: {value:searchWord}})
  const showCount = preload.shows.filter((show) => `${show.title} ${show.description}`.toUpperCase().indexOf(searchWord.toUpperCase()) >= 0).length
  expect(componnet.find(ShowCard).length).toEqual(showCount)
})