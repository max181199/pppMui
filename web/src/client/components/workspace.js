import React from 'react';
import Paper from '@material-ui/core/Paper';
import styled from 'styled-components';
import {Hidden} from '@material-ui/core';
import { connect } from 'react-redux';


const StyledPaperOneString = styled(Paper)`
    margin-top : 130px;
    width : 100vw;
    height : calc(100vh - 130px);
    display : flex;
`;

const StyledPaperTwoString = styled(Paper)`
    margin-top : 210px;
    width : 100vw;
    height : calc(100vh - 210px);
    display : flex;
`;

const StyledPaperZeroString = styled(Paper)`
    margin-top : 50px;
    width : 100vw;
    height : calc(100vh - 50px );
    display : flex;
`;

const StyledPaperNullString = styled(Paper)`
    margin-top : 0px;
    width : 100vw;
    height : 100vh ;
    display : flex;
`;


function WorkSpace(props){
    const { currentFilterIcon } = props
    return(
        <div>
            <Hidden only={['xl','md','sm','xs']}>
                {
                    currentFilterIcon === 'open' 
                     ?
                    <StyledPaperOneString elevation={0}>
                        {props.children}
                    </StyledPaperOneString>
                     :
                    <StyledPaperZeroString elevation={0}>
                        {props.children}
                    </StyledPaperZeroString> 
                }
            </Hidden>
            <Hidden only={['xl','lg','xs']}>
            {
                    currentFilterIcon === 'open' 
                     ?
                    <StyledPaperTwoString elevation={0}>
                        {props.children}
                    </StyledPaperTwoString>
                     :
                    <StyledPaperZeroString elevation={0}>
                        {props.children}
                    </StyledPaperZeroString> 
                }
            </Hidden>
            <Hidden only={['xl','lg','md','sm']}>
                <StyledPaperZeroString elevation={0}>
                    {props.children}
                </StyledPaperZeroString>
            </Hidden>
            <Hidden only={['lg','md','sm','xs']}>
                <StyledPaperNullString elevation={0}>
                    {props.children}
                </StyledPaperNullString>
            </Hidden>
        </div>   
    )
}

export default connect( (store)=>({
    currentFilterIcon : store.optional.filterIcon
    }))(WorkSpace)