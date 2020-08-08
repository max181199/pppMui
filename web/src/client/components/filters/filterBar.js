import React from 'react'
import { AppBar , Hidden} from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import styled from 'styled-components';
import FilterBarContentLG from './filterBarContentLG';
import FilterBarContentMD from './filterBarContentMD';
import FilterBarContentSM from './filterBarContentSM'


const StyledLargeAppBar = styled(AppBar)`
    border-top-radius : 0;
    margin-top : 60px;
`;

const StyledMediumAppBar = styled(AppBar)`
    border-top-radius : 0;
    margin-top : 50px;
`;

const StyledlargePapper = styled(Paper)`
    padding : 0;
    width : 100vw;
    height : 80px;
    align-self : center;
    display : flex;
    background-color : white;
    border-radius : 0;
`;


const StyledMediumPapper = styled(Paper)`
    padding : 0;
    width : 100vw;
    height : 60px;
    align-self : center;
    display : flex;
    background-color : white;
    border-radius : 0;
`;


function FilterBar(props) {
    return(
        <div>
            <Hidden only={['md','sm','xs']} >
                <StyledLargeAppBar elevation={1}>
                    <StyledlargePapper elevation={1} >
                        <FilterBarContentLG/>
                    </StyledlargePapper>
                </StyledLargeAppBar>
            </Hidden>
            <Hidden only={['lg','sm','xs']} >
            <StyledMediumAppBar elevation={1}>
                <StyledMediumPapper elevation={1} >
                    <FilterBarContentMD history={props.history}/>
                </StyledMediumPapper>
            </StyledMediumAppBar>
            </Hidden>
            <Hidden only={['lg','md','xs']} >
            <StyledMediumAppBar elevation={1}>
                <StyledMediumPapper elevation={1} >
                    <FilterBarContentSM/>
                </StyledMediumPapper>
            </StyledMediumAppBar>
            </Hidden>
        </div>
    )
}

export default FilterBar