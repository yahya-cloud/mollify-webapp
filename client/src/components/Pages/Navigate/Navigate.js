import React, {useEffect, useState} from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import classes from './Navigate.module.css';
import mapboxgl from 'mapbox-gl';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css'

const Navigate = () => {
    useEffect(() => {
        console.log('ran');
        let map;
        mapboxgl.accessToken = 'pk.eyJ1IjoieWFoeWExMjMiLCJhIjoiY2tuOG8ydmc2MDV3ZTJwbXJyOHp3d2EzaCJ9.1gLWywSZj208OsijDUCE6A';

      
        map = new mapboxgl.Map({
            container: 'container',
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [92, 45],
            zoom: 16
            });
        const directions = new MapboxDirections({
            accessToken: mapboxgl.accessToken
        });

        map.addControl(
           directions,
            'top-left' 
        );
        map.on('load',  function() {
            directions.setOrigin("149d j&k pocket Dilshad Garden Shahdara, Delhi, India"); // can be address in form setOrigin("12, Elm Street, NY")
                directions.setDestination("noida"); // can be address
            })
        

        return () => map.remove();
    }, [])


    return (
        <div id="container" className={classes.container}></div>
    )
}

export default Navigate
//pk.eyJ1IjoieWFoeWExMjMiLCJhIjoiY2tuOG8ydmc2MDV3ZTJwbXJyOHp3d2EzaCJ9.1gLWywSZj208OsijDUCE6A