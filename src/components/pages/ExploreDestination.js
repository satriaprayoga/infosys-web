import React from 'react'
import Cards from '../Cards'
import Gallery from '../Gallery'

const ExploreDestination = () => {

    const data=[
        {
            link:'/destinationCountry/Indonesia',
            src:'/images/img-1.jpg',
            text:'Indonesia'
        },
        {
            link:'/destinationCountry/Singapore',
            src:'/images/img-2.jpg',
            text:'Singapore'
        },
        {
            link:'/destinationCountry/Cambodia',
            src:'/images/img-3.jpg',
            text:'Cambodia'
        }

    ]
    return (
        <>
        <Gallery title="Check Out Destinations accross These Countries" data={data}/>
        <Cards title="Featured Destinations"/>
    </>
    )
}

export default ExploreDestination
