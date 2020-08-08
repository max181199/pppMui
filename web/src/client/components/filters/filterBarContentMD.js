import React,  { useState , useEffect } from 'react'
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Typography , Button} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import { connect } from 'react-redux';
import {filtersChangedSearch, filtersChangedFilterBar, clickCancel} from '../../actions'
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import styled from 'styled-components';
import PeriodicTmp from '../../tmpDate/periodic';
import Popover from '@material-ui/core/Popover';
import red from '@material-ui/core/colors/red';
import blue from '@material-ui/core/colors/blue';
import green from '@material-ui/core/colors/green';
import BackspaceIcon from '@material-ui/icons/Backspace';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import {useLocation} from "react-router-dom";


const StyledTextField = styled(TextField)`
    width : 20vw;
    & .MuiInputLabel-root{
        font-size : 18px;
    }
    & .MuiInputBase-root{
        margin-top : 16px;
        font-size : 18px;
    }
`;

const StyledAccordionSummery = styled(AccordionSummary)`
    & .MuiAccordionSummary-expandIcon {
        transform : rotate(0deg);
        & > span{
            & > svg{
                font-size : 30px;
            }
        }
    }
    & .MuiAccordionSummary-expandIcon.Mui-expanded {
        & > span{
            & > svg{
                font-size : 30px;
            }
        }
    }
    height : 35px;
    align-items : center;
    
`;

const StyledButtonOne = styled(Button)`
    background-color : ${blue[800]};
    margin-left : 5px;
    margin-right : 5px;
    padding-top : 8px;
    padding-bottom: 8px;
    color : white;
    padding : 0;
    width : 130px;
    height : 40px;
    font-size : 16px;
    align-self : center;
    &:hover {
        background-color: ${green[600]}
    };
`;

const StyledButtonTwo = styled(Button)`
    background-color : ${blue[800]};
    margin-left : 5px;
    margin-right : 10px;
    padding-top : 8px;
    padding-bottom: 8px;
    color : white;
    padding : 0;
    width : 100px;
    height : 40px;
    font-size : 16px;
    align-self : center;
    &:hover {
        background-color: ${red[600]};
    },
`;

const AccordionSummaryTypografy = styled(Typography)`
    align-self : center;
    font-size : 22px;
`;

const StyledAccordion = styled(Accordion)`
    border : 1px solid lightgrey;
`;

const StyledGrid = styled(Grid)`
    align-self : center;
`;

const FlexBox = styled(Box)`
    display : flex;
    align-items: center;
    height: 60px;
`;

const FlexBox2 = styled(Box)`
    display : flex;
    align-items: center;
    height: 60px;
`;


const StyledPercentTextField = styled(TextField)`
    width : 10vw;
    & .MuiInputLabel-root{
        font-size : 16px;
    }
    & .MuiInputBase-root{
        margin-top : 14px;
        font-size : 16px;
        &  .MuiInputAdornment-root{
            & > p{
                font-size : 16px;
            }
        }
    }
    margin-right : 15px;
`;

const StyledPercentTextField2 = styled(TextField)`
    width : 10vw;
    & .MuiInputLabel-root{
        font-size : 16px;
    }
    & .MuiInputBase-root{
        margin-top : 14px;
        font-size : 16px;
        &  .MuiInputAdornment-root{
            & > p{
                font-size : 16px;
            }
        }
    }
    margin-left : 15px;
`;

const StyledFormControl = styled(FormControl)`
    & .MuiInputLabel-root{
        font-size : 16px;
    }
    & .MuiInputBase-root{
        margin-top : 14px;
        font-size : 16px;
    }
    width : 15vw;
`;

const StyledFormControlPop = styled(FormControl)`
    & .MuiInputLabel-root{
        font-size : 16px;
    }
    & .MuiInputBase-root{
        margin-top : 14px;
        font-size : 16px;
    }
    width : 15vw;
    margin : 15px;
`;

const StyledMenuItem = styled(MenuItem)`
    font-size : 16px;
`;

const StyledIconButton = styled(IconButton)`
    font-size : 20px;
`;




function filterBarContentLG(props) {

    const { filters , filtersChangedSearch , filtersChangedFilterBar , clickCancel } = props
    const [ periods , setPeriods] = useState([]);
    const [ isAccordionOpen , setIsAccordionOpen ] = useState(false)
    const [ localFilters , setLocalFilters ] = useState({
        period : '',
        profile : 'Все профили',
        to : '',
        from : '',
        compProfile : 'Не выбрано',
        compPeriod : 'Не выбрано',
        status : 'default'
    })
    const [ searchFilters, setSearchFilters ] = useState({ 
        base : '',
        note : '',
        nameArt : ''
    })
    const [ status, setStatus ] = useState({
        filters : 'default',
        search : 'default'
    })

    const updateLocalFilters = (obj) =>{
        setLocalFilters({...localFilters , ...obj})
    }

    const updateSearchFilters = (obj)=>{
        setSearchFilters({...searchFilters , ...obj})
    }

    const updateStatus = (obj)=>{
        setStatus({...status,...obj})
    }

    const toURL = (params)=>{
        let paramsForQuery = '';
        for (let prop in params) {
          paramsForQuery += `_${prop}=${params[prop]}&`
        }
        if (paramsForQuery.length > 0) {
          paramsForQuery = `?${paramsForQuery.slice(0, -1)}`;
        }
        return paramsForQuery
    }

    const toFilters = (obj)=>{
        return( {...filters , ...obj })
    }

    

    useEffect( ()=>{
        if(status.filters !== 'initialize' && status.filters  !== 'default' ){
            console.log('Kill me')
            filtersChangedFilterBar({
                from : localFilters.from,
                to : localFilters.to,
                period : localFilters.period,
                profile : localFilters.profile,
                compPeriod : localFilters.compPeriod,
                compProfile : localFilters.compProfile,
            })
            props.history.replace(toURL(toFilters(localFilters)))
        }
        if(status.filters === 'initialize'){
            updateStatus({filters : 'none'})
        }
    },[localFilters])


    const url = new URLSearchParams(props.history.location.search);

    useEffect(()=>{
        if ( props.history.location.search === ''){
            console.log('once again')
            updateLocalFilters({
                from : filters.from === '0' ? '' : filters.from,
                to : filters.to === '100' ? '' : filters.to,
                period : filters.period,
                profile : filters.profile,
                compPeriod : filters.compPeriod,
                compProfile : filters.compProfile,
            })
            updateSearchFilters({
                base : filters.base,
                nameArt : filters.nameArt,
                note : filters.note,
            })
        }
        else {
            console.log(props.history)
            updateLocalFilters({
                from : url.get('_from') === '0' ? '' : url.get('_from'),
                to :  url.get('_to') === '100' ? '' : url.get('_to'),
                period : url.get('_period'),
                profile : url.get('_profile'),
                compPeriod : url.get('_compPeriod'),
                compProfile : url.get('_compProfile'),
            })
            updateSearchFilters({
                base : url.get('_base'),
                nameArt : url.get('_nameArt'),
                note : url.get('_note'),
            })
        }
        updateStatus({
            filters : 'initialize',
            search : 'initialize'
        })
        setPeriods(PeriodicTmp)
    },[])

    useEffect( ()=>{
        if(status.search !== 'initialize' && status.search  !== 'default' ){
            console.log('Here is Jony')
            if (!isAccordionOpen){
                filtersChangedSearch({
                    base : searchFilters.base,
                    nameArt : searchFilters.nameArt,
                    note : searchFilters.note
                })
                props.history.replace(toURL(toFilters(searchFilters)))
            }
        }
        if(status.search === 'initialize'){
        updateStatus( {search : 'none'})
        }    
    },[isAccordionOpen])



    function getSelectElement( el , num ) {
        return(
            <StyledMenuItem key={`${num}`} value={ `${el}` }>{el}</StyledMenuItem>
        )
    }

    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
      };
      const handleClose = () => {
        setAnchorEl(null);
      };
    const open = Boolean(anchorEl);
    const id = open ? 'popover' : undefined;  
   

    return(
        <Grid
            container
            direction="row"
            justify="space-around"
            alignItems="flex-start"
        >
            <StyledGrid item lg={3}>
                <ClickAwayListener onClickAway={(e)=>{setIsAccordionOpen(false)}} >
                    <StyledAccordion elevation={0} expanded={isAccordionOpen} square onChange={(e)=>{setIsAccordionOpen(!isAccordionOpen)}}  >
                        <StyledAccordionSummery
                                expandIcon={isAccordionOpen ? <SearchIcon/> : <ExpandMoreIcon/>}
                        >
                            <AccordionSummaryTypografy variant='h6'>Поиск по источнику</AccordionSummaryTypografy>
                        </StyledAccordionSummery>
                        <AccordionDetails>
                            <StyledTextField id="FirstSearchField" label="База_Номер_Метка" value={searchFilters.base} onChange={(e)=>{updateSearchFilters({base : e.target.value})}} />
                        </AccordionDetails>
                        <AccordionDetails>
                            <StyledTextField id="SecondSearchField" label="Название статьи/документа" value={searchFilters.nameArt} onChange={(e)=>{updateSearchFilters({nameArt : e.target.value})}}  />
                        </AccordionDetails>
                        <AccordionDetails>
                            <StyledTextField id="ThirdSearchField" label="Текст примечания"  value={searchFilters.note} onChange={(e)=>{updateSearchFilters({note : e.target.value})}}/>
                        </AccordionDetails>
                    </StyledAccordion>
                </ClickAwayListener>  
            </StyledGrid>
                
            <Grid item>
                <FlexBox>
                    <StyledPercentTextField
                        label="Отказ от"
                        type="number"
                        placeholder="0,00"
                        InputProps={{
                            endAdornment: <InputAdornment position="end">%</InputAdornment>,
                        }}
                        inputProps={{
                            min : '0',
                            max : '100',
                            step : '1',
                        }}
                        value={localFilters.from}
                        onChange={(e)=>{updateLocalFilters({from : e.target.value})}}
                    />
                    <StyledPercentTextField2
                        label="Отказ до"
                        type="number"
                        placeholder="100,00"
                        InputProps={{
                            endAdornment: <InputAdornment position="end">%</InputAdornment>,
                        }}
                        inputProps={{
                            min : '0',
                            max : '100',
                            step : '1',
                        }}
                        value={localFilters.to}
                        onChange={(e)=>{updateLocalFilters({to : e.target.value})}}
                    />    
                </FlexBox> 
            </Grid>   
            <Grid item >
                <FlexBox>
                    <StyledFormControl>
                        <InputLabel>Период</InputLabel>
                        <Select
                            value={localFilters.period}
                            onChange={(e)=>{updateLocalFilters({period : e.target.value})}}
                        >
                            {periods.map( (item,num) => getSelectElement(item,num))}
                        </Select>
                    </StyledFormControl>
                </FlexBox>
            </Grid>   
            <Grid item >
                <FlexBox>
                    <StyledFormControl>
                        <InputLabel>Профили</InputLabel>
                        <Select
                                value={localFilters.profile}
                                onChange={(e)=>{updateLocalFilters({profile : e.target.value})}}
                        >
                            <StyledMenuItem value={'Все профили'}>Все профили</StyledMenuItem>
                            <StyledMenuItem value={'Бухгалтерия и кадры бюджетной организации'}>Бухгалтерия и кадры бюджетной организации</StyledMenuItem>
                            <StyledMenuItem value={'Бухгалтерия и кадры'}>Бухгалтерия и кадры</StyledMenuItem>
                            <StyledMenuItem value={'Кадры'}>Кадры</StyledMenuItem>
                            <StyledMenuItem value={'Юристы'}>Юристы</StyledMenuItem>
                            <StyledMenuItem value={'Универсальный'}>Универсальный</StyledMenuItem>
                            <StyledMenuItem value={'Универсальный для бюджетной организации'}>Универсальный для бюджетной организации</StyledMenuItem>
                            <StyledMenuItem value={'Специалист по закупкам'}>Специалист по закупкам</StyledMenuItem>
                        </Select>
                    </StyledFormControl>
                </FlexBox>
            </Grid>   
            <Grid item >
                    <FlexBox >
                        <StyledButtonOne 
                            onClick={ handleClick } 
                        >
                            Сравнить
                        </StyledButtonOne>
                        <Popover
                            id={id}
                            open={open}
                            anchorEl={anchorEl}
                            onClose={handleClose}
                            anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                            }}
                            transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                            }}
                        >
                            <FlexBox2>
                                <StyledFormControlPop>
                                    <InputLabel>Сравн. период</InputLabel>
                                    <Select
                                        value={localFilters.compPeriod}
                                        onChange={(e)=>{            
                                            if( localFilters.compProfile === 'Не выбрано'){ updateLocalFilters({compProfile : localFilters.profile,compPeriod : e.target.value})} 
                                            else { updateLocalFilters({compPeriod : e.target.value}) }
                                        }}
                                >
                                    <StyledMenuItem key={'${num}?m123'} value={ `Не выбрано` }>{`Не выбрано`}</StyledMenuItem>
                                    {periods.map( (item,num) => getSelectElement(item,num))}
                                </Select>
                                </StyledFormControlPop>
                                <StyledFormControlPop>
                                    <InputLabel>Сравн. профили</InputLabel>
                                        <Select
                                            value={localFilters.compProfile}
                                            onChange={(e)=>{
                                                if ( localFilters.compPeriod === 'Не выбрано') {updateLocalFilters({compPeriod : localFilters.period,compProfile : e.target.value})}
                                                else { updateLocalFilters({compProfile : e.target.value}) }
                                            }}
                                        >
                                            <StyledMenuItem value={ `Не выбрано` }>{`Не выбрано`}</StyledMenuItem>
                                            <StyledMenuItem value={'Все профили'}>Все профили</StyledMenuItem>
                                            <StyledMenuItem value={'Бухгалтерия и кадры бюджетной организации'}>Бухгалтерия и кадры бюджетной организации</StyledMenuItem>
                                            <StyledMenuItem value={'Бухгалтерия и кадры'}>Бухгалтерия и кадры</StyledMenuItem>
                                            <StyledMenuItem value={'Кадры'}>Кадры</StyledMenuItem>
                                            <StyledMenuItem value={'Юристы'}>Юристы</StyledMenuItem>
                                            <StyledMenuItem value={'Универсальный'}>Универсальный</StyledMenuItem>
                                            <StyledMenuItem value={'Универсальный для бюджетной организации'}>Универсальный для бюджетной организации</StyledMenuItem>
                                            <StyledMenuItem value={'Специалист по закупкам'}>Специалист по закупкам</StyledMenuItem>
                                        </Select>
                                    </StyledFormControlPop>
                                    <Tooltip 
                                        title="Оменить сравнение"
                                    >   
                                        <StyledIconButton
                                            onClick={(e)=>{
                                                updateLocalFilters({
                                                    compPeriod : 'Не выбрано',
                                                    compProfile : 'Не выбрано'
                                                })
                                            }}
                                        >
                                            <BackspaceIcon fontSize='inherit' />
                                        </StyledIconButton>
                                </Tooltip>
                            </FlexBox2>   
                        </Popover>
                        <StyledButtonTwo
                            onClick={ ()=>{
                                updateLocalFilters({
                                    base : '',
                                    nameArt : '',
                                    note : '',
                                    from : '',
                                    to : '',
                                    compPeriod : 'Не выбрано',
                                    compProfile : 'Не выбрано',
                                    profile : 'Все профили',
                                    period : 'Текущий'
                                })
                                clickCancel()
                            }}
                        >
                            Отменить
                        </StyledButtonTwo>
                    </FlexBox>        
            </Grid>            
        </Grid>    
    )
}

export default connect( (store)=>({
    filters : store.filters
}), {
    filtersChangedSearch,
    filtersChangedFilterBar,
    clickCancel
})(filterBarContentLG)