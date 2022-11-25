import React from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'
import './Map.css'
import { dataforcircle } from '../utlis.js'

function Map({ center, casetype, countries, zoom }) {
  return (
    <div className="Map">
      <MapContainer center={[51.505, -0.09]} zoom={13}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {dataforcircle(countries, casetype)}
      </MapContainer>
    </div>
  )
}

export default Map
