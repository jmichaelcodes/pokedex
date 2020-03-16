import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button'
import Checkbox from '@material-ui/core/Checkbox'
import Container from '@material-ui/core/Container'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import TextField from '@material-ui/core/TextField'

import './Home.css'
import ListItem from '../../components/ListItem'

const masterTypes = ['Bug', 'Dragon', 'Electric', 'Fighting', 'Fire', 'Flying', 'Ghost', 'Grass', 'Ground', 'Ice', 'Normal', 'Poison', 'Psychic', 'Rock', 'Water']

function App() {
  const [list, setList] = useState([])
  const [filtered, setFiltered] = useState(list)
  const [search, setSearch] = useState('')
  const [type, setType] = useState([])
  const [weakness, setWeakness] = useState([])

  useEffect(() => {
    fetch('https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json', {
      method: 'GET',
    }).then(response => response.json())
      .then(data => {
        setList(data.pokemon)
        setFiltered(data.pokemon)
      });
  }, [])

  function filterPokemon(term) {
    let filteredList = list
    filteredList = filteredList.filter((item) => {
      let lowerCaseItem = item.name.toLowerCase()
      return lowerCaseItem.indexOf(
        term.toLowerCase()) !== -1
    })
    setFiltered(filteredList)
  }

  function toggleType(checked, pokemonType) {
    let tempType = type
    if (checked) {
      tempType.push(pokemonType)
    } else {
      tempType = tempType.filter(e => e !== pokemonType)
    }
    setType(tempType)
    setFiltered(filterList(tempType, list, 'type', weakness, 'weaknesses'))
  }

  function toggleWeakness(checked, pokemonWeakness) {
    let tempWeakness = weakness
    if (checked) {
      tempWeakness.push(pokemonWeakness)
    } else {
      tempWeakness = tempWeakness.filter(e => e !== pokemonWeakness)
    }
    setWeakness(tempWeakness)
    setFiltered(filterList(tempWeakness, list, 'weaknesses', type, 'type'))
  }

  function filterList(filters, filteredList, field, filters2, field2) {
    let tempList = filteredList
    for (let i = 0; i < filters.length; i++) {
      tempList = tempList.filter(item => item[field].includes(filters[i]))
    }
    for (let i = 0; i < filters2.length; i++) {
      tempList = tempList.filter(item => item[field2].includes(filters2[i]))
    }

    return tempList
  }

  return (
    filtered.length === [] ? null : (
      <div className='container'>
        <Container maxWidth='md' style={{ paddingTop: 25 }}>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div>
              <h2 className='section-title'>Pokemon</h2>
              <div style={{ flex: 2 }}>{filtered.map((item) => {
                return (
                  <ListItem data={item} />
                )
              })}
              </div>
            </div>
            <div style={{ flex: 1 }} />
            <div style={{ flex: 4 }}>
              <h2 className='section-title'>Search or Filter</h2>
              <h3>Search</h3>
              <div className='search-container'>
                <TextField
                  className='textfield'
                  placeholder='Enter name'
                  onChange={(e) => setSearch(e.target.value)}
                />
                <Button className='search-button' onClick={() => filterPokemon(search)}>Search</Button>
              </div>
              <h3>Filter</h3>
              <h5>Type</h5>
              {masterTypes.map((type) => {
                return (
                  <FormControlLabel control={<Checkbox value={type} onChange={(e) => toggleType(e.target.checked, type)} />} label={type} />
                )
              })}
              <h5>Weakness</h5>
              {masterTypes.map((type) => {
                return (
                  <FormControlLabel control={<Checkbox value={weakness} onChange={(e) => toggleWeakness(e.target.checked, type)} />} label={type} />
                )
              })}
            </div>
          </div>
        </Container>
      </div>
    )
  );
}

export default App;
