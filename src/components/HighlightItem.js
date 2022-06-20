import React from 'react'
import { Link } from 'react-router-dom'


const HighlightItem = props => {
    return (
        <>
            <div className="highlight_item">
                <Link className="highlight_item_link" to={props.path}>
                    <figure className="highlight_item_pic_wrap" data-category={props.label}>
                        <img
                            className='highlight_item_img'
                            alt='Travel Image'
                            src={props.src}
                        />
                    </figure>
                    <div className='highlight_item_info'>
                        <h5 className='hightlight_item_text'>{props.text}</h5>
                    </div>
                </Link>
            </div>
        </>
    )
}


export default HighlightItem
