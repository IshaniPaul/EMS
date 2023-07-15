import React from 'react'
import './Home.css'

function Card({ Count, Role }) {
  return (
    <div className="cards fadeCard">
      <span style={{ color: "black", fontSize: "3rem", opacity: "0.8", width: "100%" }}>{Role}</span>
      <span style={{ opacity: "0.4", fontSize: "1.5rem" }}>Count</span>
      {Count !== 0 ? <span style={{ textAlign: "center", fontSize: "3rem" }}>{Count}</span> : <span style={{ textAlign: "center" }}>loading...</span>}
    </div>
  )
}

export default Card
