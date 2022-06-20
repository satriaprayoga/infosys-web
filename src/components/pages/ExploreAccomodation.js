import React from 'react'
import Cards from '../Cards'
import Gallery from '../Gallery'

const ExploreAccomodation = () => {

    const data=[
        {
            link:'/accomCountry/Indonesia',
            src:'./images/img-1.jpg',
            text:'Indonesia'
        },
        {
            link:'/accomCountry/Singapore',
            src:'./images/img-2.jpg',
            text:'Singapore'
        },
        {
            link:'/accomCountry/Cambodia',
            src:'./images/img-3.jpg',
            text:'Cambodia'
        }

    ]

    return (
        <>
            
            <Gallery title="Check Out Accomodations accross These Countries" data={data}/>
            <Cards title="Featured Accomodations"/>
        </>
    )
}

export default ExploreAccomodation
