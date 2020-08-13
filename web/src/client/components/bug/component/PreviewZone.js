import React from 'react'
import styled from 'styled-components';
import { connect } from 'react-redux';
import PreviewElement from './PreviewElement'

const Stp = styled.p`
    font-size : 24px;
`;

const PreviewZone = (props)=>{
    
    const   { photos } = props

    return(
        photos.length <= 0
        ?
        <div>
            <p> Изображения отсутствуют</p>
            <Stp> {`  Спасибо за ваши отзывы!!!   `} </Stp>
        </div>
        
        :
        photos.map( (el,index)=>{return(<PreviewElement key={index} index={index} photo={el} />)})
    )
}

export default connect( (store)=>({
    photos : store.photos,
}),{
})(PreviewZone)