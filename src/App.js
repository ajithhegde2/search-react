import SearchIcon from '@mui/icons-material/Search'
import './App.css'
import { useState, useEffect } from 'react'
import hash from './data.js'

function App() {
  const [allSeries, setAllSeries] = useState([])
  const [seriesList, setSeriesList] = useState([])
  const [postPerPage] = useState(4)
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    fetch(
      `https://gateway.marvel.com:443/v1/public/series?ts=1&apikey=a8704d261e7b93acfb1c9f2200a0c1ed&hash=${hash}`
    )
      .then((res) => res.json())
      .then((result) => {
        setAllSeries(
          result.data.results.map(({ id, title, thumbnail, urls }) => ({
            id,
            title,
            thumbnail,
            urls,
          }))
        )
        setSeriesList(
          result.data.results.map(({ id, title, thumbnail, urls }) => ({
            id,
            title,
            thumbnail,
            urls,
          }))
        )
      })
  }, [])

  const indexOfLastPost = currentPage * postPerPage
  const indexOfFirstPost = indexOfLastPost - postPerPage
  const currentPosts = seriesList.slice(indexOfFirstPost, indexOfLastPost)

  // for pagination
  var pageArr = []
  for (let i = 1; i <= Math.ceil(seriesList.length / postPerPage); i++)
    pageArr.push(i)

  // to change pages

  return (
    <>
      {/* Search Bar */}
      <div className='holder'>
        <div className='search-bar'>
          <input
            type='text'
            placeholder='Search ...'
            onChange={(e) => {
              setSeriesList(
                allSeries.filter((item) =>
                  item.title.toLowerCase().includes(e.target.value)
                )
              )
              setCurrentPage(1)
            }}
          />
          <SearchIcon />
        </div>
      </div>

      <div className='px-5'>
        {/* pagination item */}
        <ul className='pagination justify-content-center'>
          {pageArr.map((number) => {
            console.log(number)
            return (
              <li key={number} className='page-item'>
                <a
                  onClick={() => setCurrentPage(number)}
                  href='#!'
                  className='page-link'
                >
                  {number}
                </a>
              </li>
            )
          })}
        </ul>

        {/* item list */}
        <div className='items row  m-0'>
          {currentPosts.length ? (
            currentPosts.map((item) => {
              return (
                <div className='item col-lg-3 col-md-4 col-sm-6' key={item.id}>
                  <img
                    src={
                      item.thumbnail.path +
                      '/portrait_xlarge.' +
                      item.thumbnail.extension
                    }
                    alt=''
                    className='image'
                  />
                  <h3 className='title'>{item.title}</h3>
                  <p>
                    URL : <a href={item.urls[0].url}>details</a>
                  </p>
                </div>
              )
            })
          ) : (
            <h1>No item To display</h1>
          )}
        </div>
      </div>
    </>
  )
}

export default App
