import React, {useState} from 'react';
import Divider from '@material-ui/core/Divider';
import { connect } from "react-redux"
import { Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StyledMainGrid = styled(Grid)`
    margin : 0;
    height : 50px;
`;

const StyledGrid = styled(Grid)`
    display : flex;
    height : 50px;
    align-items: center;

`;

const StyledDivider = styled(Divider)`
    background-color : white;
    margin : 10px;
    width : 2px;
    height : 30px;
`;

const PPPTypografy = styled(Typography)`
    margin : 0;
    font-size : 34px;
`;

const TitleTypografy = styled(Typography)`
    margin : 0;
    font-size : 15px;
    line-height : 1;
    text-align : center;
`;

const TitleDateTypografy = styled(Typography)`
    margin-right : 20px;
    font-size : 18px;
    line-height : 1;
    text-align : center;
`;

const StyledTabOne= styled(Tab)`
    padding : 8px;
    height  : 50px;
    font-size : 15px;
    min-width : 350px;
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
    min-width : 450px;
    & .MuiTabs-indicator {
        background-color : white;
        height : 2px;
        bottom : 5px;
    }
`; 

function MediumHeaderContent(props){
    const { filters, date } = props
    const [ currentPage ,changeCurrentPage] = useState(2)
    const toURL = (params) =>{
        let paramsForQuery =''
        for (let prop in params){
            paramsForQuery += `${prop}=${params[prop]}&`
        }
        if (paramsForQuery.length > 0) {
            paramsForQuery = `?${paramsForQuery.slice(0, -1)}`;
        }
        return paramsForQuery;
    }
    return(
        <StyledMainGrid container
          direction="row"
          justify="space-between"
          alignItems="center"
        >
            <StyledGrid item>
                <PPPTypografy variant='h4'> ППП </PPPTypografy>
                <StyledDivider orientation="vertical" flexItem />
                <TitleTypografy variant='h4' > Примечания на  <br/> правой панели </TitleTypografy>
            </StyledGrid>
            <StyledGrid item>
                <StyleTabs value={currentPage} onChange={(e,val)=>{changeCurrentPage(val)}}>
                    <StyledTabOne wrapped  
                        label=" Клики и действия по ППП за период " 
                        value={1}
                        component={Link}
                        to={`/${toURL(filters)}`}
                    />
                    <StyledTabTwo wrapped  label=" Отчеты " value={2} />
                </StyleTabs> 
            </StyledGrid>
            <StyledGrid>
             <TitleDateTypografy variant='h4'> {`Обновление: ` + date} </TitleDateTypografy>
            </StyledGrid>
        </StyledMainGrid>
    )    
}
export default connect((store)=>({
    filters : store.filters,
}),null)(MediumHeaderContent)