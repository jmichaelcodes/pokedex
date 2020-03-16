import React from 'react'
import { Link } from 'react-router-dom'

import './ListItem.css'

function ListItem({ data }) {
    return (
        <div>
            <div className='list-row'>
                <div className='id'>
                    <p className='detailHeader'>#{data.id}</p>
                </div>
                <div className='list-section'>
                    <p className='detailHeader'>Name:</p>
                    <Link to={`/detail/${data.num}`}>
                        <p>{data.name}</p>
                    </Link>
                </div>
                <div className='list-section'>
                    <p className='detailHeader'>Type:</p>
                    <div>{data.type.map((type) => {
                        return (
                            <p>{type}</p>
                        )
                    })}</div>
                </div>
                <div className='list-section'>
                    <p className='detailHeader'>Weakness:</p>
                    <div>{data.weaknesses.map((weakness) => {
                        return (
                            <p>{weakness}</p>
                        )
                    })}</div>
                </div>
            </div>
        </div>
    )
}
        
export default ListItem