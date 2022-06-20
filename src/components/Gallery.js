import React from 'react'
import { Link } from 'react-router-dom';
import GalleryItem from './GalleryItem';
import './Gallery.css';
import ReactSearchAutocomplete from 'react-search-autocomplete/dist/components/ReactSearchAutocomplete';

const Gallery = props => {
 const {data}=props;
  return (
    <div className='gallery-container'>
      {props.searchbar && <div className='gallery-search-box'>
        <ReactSearchAutocomplete
          items={props.items}
          onSearch={props.handleOnSearch}
          onSelect={props.handleOnSelect}
          onFocus={props.handleOnFocus}
          placeholder={props.placeholder}
          autoFocus
          styling={
            {
              height: "50px",
              borderRadius: "15px",
            }
          }
        />
      </div>}
      <h1>{props.title}</h1>
      
      <div className='gallery-grid'>
        {data.map((item, index) => 
          <div className="gallery-item" key={index}>
            <Link to={item.link}>
              <img src={item.src} />
              <div className="bottom-left"><p>{item.text}</p></div>
            </Link>
          </div>
        )}
        

      </div>
    </div>
  )
}

export default Gallery
