import React, {useEffect, useState} from 'react'
import Head from 'next/head'
import qs from 'query-string'
import axios from 'axios'
import LoadingPage from '../components/global/LoadingPage'

// probably not needed, will tie these into call back auth flow down the line.
const nonce = require('nonce')()
const state = nonce()


const Home = (props) => {

  // page context params
  useEffect(() => {
    if(typeof window !== 'undefined' && window.location) {
      const query = qs.parse(window.location.search)
      axios.post('/api/auth', {
        query: query,
        state: state
      })
        .then(response => {
          console.log(response)
          if(response.data.redirectTo) {
            console.log('Redirecting with scopes', response.data.redirectTo)
            window.location.href = response.data.redirectTo
          }
        })
        .catch(function (error) {
          // handle error
          console.error(error);
        })
    }
  }, [])


  return (<LoadingPage />)
}

export default Home