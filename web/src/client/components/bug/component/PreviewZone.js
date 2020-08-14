import React from 'react'
import styled from 'styled-components';
import { connect } from 'react-redux';
import PreviewElement from './PreviewElement'
import Grid from '@material-ui/core/Grid';

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
        <div>
            <Grid
                container
                direction="row"
                justify="flex-start"
                alignItems="flex-start"
                spacing={5}
            >
                {   
                    photos.map( (el,index)=>{
                        return(
                            <Grid key={index} item>
                                <PreviewElement  index={index} photo={el} />
                            </Grid>
                        )
                    })
                }
             </Grid>
        </div>
    )
}

export default connect( (store)=>({
    photos : store.photos,
}),{
})(PreviewZone)