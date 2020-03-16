import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Container from '@material-ui/core/Container'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import './Detail.css'

function Detail({ }) {
  const [data, setData] = useState({})
  const number = useLocation().pathname.split('/').pop()
  useEffect(() => {
    fetch('https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json', {
      method: 'GET',
    }).then(response => response.json())
      .then(data => {
        setData(data.pokemon[number - 1])
        console.log(data.type)
      });
  })

  return (
    !data.type ? null : (
      <div className='container'>
        <Container maxWidth='md' style={{ paddingTop: 25 }}>
          <Link to={'/'}>
            <ArrowBackIcon />
          </Link>
          <h1>{data.name}</h1>
          <img src={data.img} />
          <p className='detail-header'>Number:</p>
          <p>{data.num}</p>
          <p className='detail-header'>Type</p>
          {data.type.map((type) => {
            return (
              <p>{type}</p>
            )
          })}
          <p className='detail-header'>Weaknesses</p>
          {data.weaknesses.map((weakness) => {
            return (
              <p>{weakness}</p>
            )
          })}
          <p className='detail-header'>Height:</p>
          <p>{data.height}</p>
          <p className='detail-header'>Weight:</p>
          <p>{data.weight}</p>
          {data.prev_evolution ? (
            <React.Fragment>
              <p className='detail-header'>Previous Evolution:</p>
              {data.prev_evolution.map((prev) => {
                return (
                  <Link to={`/detail/${prev.num}`}>
                    <p>{prev.name}</p>
                  </Link>
                )
              })}
            </React.Fragment>) : null}
          {data.next_evolution ? (
            <React.Fragment>
              <p className='detail-header'>Next Evolution:</p>
              {data.next_evolution.map((next) => {
                return (
                  <Link to={`/detail/${next.num}`}>
                    <p>{next.name}</p>
                  </Link>
                )
              })}
            </React.Fragment>) : null}
        </Container>
      </div>
    )
  )
}

export default Detail