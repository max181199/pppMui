import React,{useState} from 'react';
import Divider from '@material-ui/core/Divider';
import { connect } from "react-redux"
import { Link } from 'react-router-dom';
import Tooltip from '@material-ui/core/Tooltip';
import { Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { changeCurrentFilterIcon } from '../../actions';
import IconButton from '@material-ui/core/IconButton';
import FilterListIcon from '@material-ui/icons/FilterList';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import styled from 'styled-components';
import Bug from '../bug/index'

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

const StyledIconButton = styled(IconButton)`
    margin : 10px;
    padding : 0;
    font-size : 28px;
`;

const StyledIcon = styled(FilterListIcon)`
    color : white;
    transform: ${props => (props.filter === "close" ? "rotate(0deg)" : "rotate(180deg)") };
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
    const {  currentFilterIcon,changeCurrentFilterIcon, date,  } = props
    const [ currentPage ,changeCurrentPage] = useState(1)
    const changeIcon = () => {
        currentFilterIcon === "close" 
        ?
        changeCurrentFilterIcon('open') 
        :
        changeCurrentFilterIcon('close')
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
                <Bug/>
                <Tooltip  
                    title={currentFilterIcon === "close" ? "Показать фильтры" : "Скрыть фильтры"}
                > 
                    <StyledIconButton 
                      onClick={ ()=> (changeIcon()) } 
                    >
                      <StyledIcon fontSize='inherit' filter={currentFilterIcon}/> 
                    </StyledIconButton>
                </Tooltip>
                <StyleTabs value={currentPage} onChange={(e,val)=>{changeCurrentPage(val)}}>
                    <StyledTabOne 
                        wrapped 
                        label="Клики и действия по ППП за период" 
                        value={1}
                    />
                    <StyledTabTwo 
                        wrapped   
                        label=" Отчеты "
                        value={2} 
                        component={Link}
                        to={`/excel`}
                    />
                </StyleTabs> 
            </StyledGrid>
            <StyledGrid>
             <TitleDateTypografy variant='h4'> {`Обновление: ` + date} </TitleDateTypografy>
            </StyledGrid>
        </StyledMainGrid>
    )    
}
export default connect((store)=>({
    currentFilterIcon : store.optional.filterIcon, 
}),{
    changeCurrentFilterIcon
})(MediumHeaderContent)