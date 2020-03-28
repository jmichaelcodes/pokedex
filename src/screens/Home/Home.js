import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button'
import Checkbox from '@material-ui/core/Checkbox'
import Container from '@material-ui/core/Container'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import TextField from '@material-ui/core/TextField'

import './Home.css'
import ListItem from '../../components/ListItem/ListItem'

const masterTypes = ['Bug', 'Dark', 'Dragon', 'Electric', 'Fighting', 'Fire', 'Flying', 'Ghost', 'Grass', 'Ground', 'Ice', 'Normal', 'Poison', 'Psychic', 'Rock', 'Steel', 'Water']

function App() {
  const [list, setList] = useState([])
  const [filtered, setFiltered] = useState(list)
  const [search, setSearch] = useState('')
  const [type, setType] = useState([])
  const [weakness, setWeakness] = useState([])

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json', {
        method: 'GET',
      })
      const data = await response.json()

      setList(data.pokemon)
      setFiltered(data.pokemon)
    }

    fetchData()
  }, [])

  // FILTER
  function toggleType(checked, pokemonType) {
    if (checked) {
      setType(type.concat(pokemonType))
    } else {
      setType(type.filter(e => e !== pokemonType))
    }
  }

  // FILTER
  function toggleWeakness(checked, pokemonWeakness) {
    if (checked) {
      setWeakness(weakness.concat(pokemonWeakness))
    } else {
      setWeakness(weakness.filter(e => e !== pokemonWeakness))
    }
  }

  function filterList() {
    const byType = type.reduce((arr, item) => {
      return arr.filter(pokemon => pokemon.type.includes(item))
    }, list)

    const byTypeAndWeakness = weakness.reduce((arr, item) => {
      return arr.filter(pokemon => pokemon.weaknesses.includes(item))
    }, byType)

    const filteredList = byTypeAndWeakness.filter((pokemon) => {
      const lowerCaseName = pokemon.name.toLowerCase()
      return lowerCaseName.indexOf(
        search.toLowerCase()) !== -1
    })

    setFiltered(filteredList)
  }

  return (
      <div className='container'>
        <Container maxWidth='md' style={{ paddingTop: 25 }}>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div>
              <h2 className='section-title'>Pokemon</h2>
              {filtered.length === 0 ? (
                <h2>No results</h2>
              ) : (
              <div style={{ flex: 2 }}>{filtered.map((item) => {
                return (
                  <ListItem data={item} />
                )
              })}
              </div>
              )}
            </div>
            <div style={{ flex: 1 }} />
            <div style={{ flex: 4 }}>
              <h2 className='section-title'>Search & Filter</h2>
              <div className='search-container'>
                <TextField
                  className='textfield'
                  placeholder='Enter name'
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <div>
                <h5>Type</h5>
                {masterTypes.map((type) => {
                  return (
                    <FormControlLabel control={<Checkbox value={type} onChange={(e) => toggleType(e.target.checked, type)} />} label={type} />
                  )
                })}
              </div>
              <div>
                <h5>Weakness</h5>
                {masterTypes.map((type) => {
                  return (
                    <FormControlLabel control={<Checkbox value={weakness} onChange={(e) => toggleWeakness(e.target.checked, type)} />} label={type} />
                  )
                })}
              </div>
              <Button className='search-button' onClick={() => filterList()}>Get Results</Button>
            </div>
          </div>
        </Container>
      </div>
  );
}

export default App;
