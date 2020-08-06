import React from 'react';
import { connect } from "react-redux"
import { Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { changeCurrentPage , changeCurrentFilterIcon } from '../../actions';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import styled from 'styled-components';

const StyledMainGrid = styled(Grid)`
    margin : 0;
    height : 50px;
`;

const StyledGrid = styled(Grid)`
    display : flex;
    height : 50px;
    align-items: center;

`;

const PPPTypografy = styled(Typography)`
    margin : 0;
    font-size : 24px;
`;



const StyledTabOne= styled(Tab)`
    padding : 8px;
    height  : 50px;
    font-size : 15px;
    min-width : 150px;
`;

const StyledTabTwo= styled(Tab)`
    padding : 8px;
    height  : 50px;
    font-size : 15px;
    min-width : 100px;
`;
  
const StyleTabs = styled(Tabs)`
    padding : 0;
    margin : 0;
    min-width : 250px;
    & .MuiTabs-indicator {
        background-color : white;
        height : 2px;
        bottom : 5px;
    }
`; 

function SmallHeaderContent(props){
    const { currentPage , changeCurrentPage  } = props
    return(
        <StyledMainGrid container
          direction="row"
          justify="space-between"
          alignItems="center"
        >
            <StyledGrid item>
                <PPPTypografy variant='h4'> ППП </PPPTypografy>
            </StyledGrid>
            <StyledGrid item>
                <StyleTabs value={currentPage} onChange={(e,val)=>{changeCurrentPage(val)}}>
                    <StyledTabOne wrapped  label=" Статистика" value={'statistics'}/>
                    <StyledTabTwo wrapped  label=" Отчеты " value={'excel'} />
                </StyleTabs> 
            </StyledGrid>
        </StyledMainGrid>
    )    
}
export default connect((store)=>({
    currentPage : store.optional.page,
    currentFilterIcon : store.optional.filterIcon 
}),{
    changeCurrentPage,
    changeCurrentFilterIcon
})(SmallHeaderContent)