import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'

import 'mapbox-gl/dist/mapbox-gl.css'
import classes from './Navigate.module.css'
import mapboxgl from 'mapbox-gl'
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions'
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css'
import Meta from '../../components/Meta/Meta'

// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default

const getCoordinates = () => {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject)
  })
}

const Navigate = (props) => {
  const { personAddress } = useParams()
  const { user } = useSelector((state) => state)

  useEffect(() => {
    let map
    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;
    
    (async function () {
      try {
        const { coords } = await getCoordinates()

        map = new mapboxgl.Map({
          container: 'container',
          style: 'mapbox://styles/mapbox/streets-v11',
          center: [coords.longitude, coords.latitude],
          zoom: 11,
        })
        const directions = new MapboxDirections({
          accessToken: mapboxgl.accessToken,
        })

        map.addControl(directions, 'top-left')

        map.on('load', function () {
          directions.setOrigin([coords.longitude, coords.latitude]) // can be address in form setOrigin("12, Elm Street, NY")
          directions.setDestination(personAddress) // can be address
        })
      } catch (error) {
        console.log(error)
      }
    })()

    return () => {
      if (map) {
        map.remove()
      }
    }
  }, [personAddress, user.address])

  return (
    <>
      <Meta title='Mollify | Navigation'/>
      <div id='container' className={classes.container}></div>
    </>
  )
}

export default Navigate
