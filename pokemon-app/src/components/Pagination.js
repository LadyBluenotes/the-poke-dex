import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './Pagination.css'

export default function Pagination({ gotoNextPage, gotoPrevPage }) {
  const url = 'https://pokeapi.co/api/v2/pokemon/';

  const [currentPageUrl, setCurrentPageUrl] = useState(url);
  const [nextPageUrl, setNextPageUrl] = useState(url);
  const [prevPageUrl, setPrevPageUrl] = useState(url);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true)
    let cancel
    axios.get(currentPageUrl, {
      cancelToken: new axios.CancelToken(c => cancel = c)
    })
      .then(res => {
        setLoading(false)
        setNextPageUrl(res.data.next)
        setPrevPageUrl(res.data.previous)
      })

    return () => cancel()
  }, [currentPageUrl])

  function gotoNextPage() {
    setCurrentPageUrl(nextPageUrl)
  }

  function gotoPrevPage() {
    setCurrentPageUrl(prevPageUrl)
  }

  return (
    <div className='pagination'>
        {gotoPrevPage && <button onClick={gotoPrevPage}>Previous</button>}
        {gotoNextPage && <button onClick={gotoNextPage}>Next</button>}
    </div>
  )
}
