import React,  { useState , useEffect} from 'react'
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Typography , Button, Hidden} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { AppBar } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import Zoom from '@material-ui/core/Zoom';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import { connect } from 'react-redux';
import {filtersChangedSearch , filtersChanged,filtersChangedFilterBar, clickCancel} from '../actions'
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import styled from 'styled-components';
import PeriodicTmp from '../tmpDate/periodic';
import Popover from '@material-ui/core/Popover';
import red from '@material-ui/core/colors/red';
import blue from '@material-ui/core/colors/blue';
import green from '@material-ui/core/colors/green';
import BackspaceIcon from '@material-ui/icons/Backspace';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

const StyleTooltip = withStyles({
    tooltip : {
        fontSize : 'calc( 10px + 0.7vw)',
    }
  })(Tooltip)

const StyledPaper = withStyles({
    root:{
        paddingLeft : "0px",
        paddingRight : "0px",
        paddingTop : '0px',
        paddingBottom : '0px',
        width : '100vw',
        height : '80px',
        alignSelf : 'center',
        display : 'flex',
        backgroundColor : 'white',
        borderRadius : 0,
    }
})(Paper)

const MarginPaper = withStyles({
    root : {
        marginTop : '10px'
    }
})(Paper)


const StyledTextField = withStyles({
    root:{
        width : '30vw'
    }
})(TextField)

const StyledAccordionSummery = withStyles({
    expandIcon : {
        transform : 'rotate(0deg)',
        "&.Mui-expanded" : {
            transform : 'rotate(0deg)'
        }
    }
})(AccordionSummary)


const StyledButtonOne = withStyles({
    root : {
        backgroundColor : blue[800],
        marginLeft : '5px',
        marginRight : '5px',
        paddingTop : '8px',
        paddingBottom: '8px',
        color : 'white',
        padding : 0,
        width : '120px',
        alignSelf : 'center',
        '&:hover': {
            backgroundColor: green[600],
        },
    }
})(Button)

const StyledButtonTwo = withStyles({
    root : {
        backgroundColor : blue[800],
        marginLeft : '5px',
        marginRight : '10px',
        paddingTop : '8px',
        paddingBottom: '8px',
        color : 'white',
        padding : 0,
        width : '100px',
        alignSelf : 'center',
        '&:hover': {
            backgroundColor: red[600],
        },
    }
})(Button)

const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: 'calc( max( 36px , 1.7vw ) * 8  + 20px)',
      },
    },
  };



function FilterBar(props) {
const { filters , filtersChangedSearch, filtersChanged , filtersChangedFilterBar , clickCancel } = props
const [ periods , setPeriods] = useState([]); 

const [ SearchFieldOne , setSearchFieldOne] = useState(filters.base);
const [ SearchFieldTwo , setSearchFieldTwo] = useState(filters.nameArt);
const [ SearchFieldThree , setSearchFieldThree] = useState(filters.note);
let perFrom = filters.from === '0' ? '' : filters.from;
const [ PercentFieldOne , setPercentFieldOne ] = useState(perFrom);
let perTo = filters.to === '100' ? '' : filters.to;
const [ PercentFieldTwo , setPercentFieldTwo ] = useState(perTo);
const [ PeriodicField , setPeriodicField] = useState(filters.period);
const [ ProfileField , setProfileField] = useState(filters.profile);
const [ ComparePeriod , setComparePeriod ] = useState(filters.compPeriod);
const [ CompareProfile, setCompareProfile] = useState(filters.compProfile)

const [ isAccordionOpen , setIsAccordionOpen ] = useState(false)

useEffect( ()=>{
    let tmp = {
        base : SearchFieldOne,
        nameArt : SearchFieldTwo,
        note : SearchFieldThree,
        from : PercentFieldOne,
        to :  PercentFieldTwo,
        period : PeriodicField,
        profile : ProfileField,
        compPeriod : ComparePeriod,
        compProfile: CompareProfile,
    };
    filtersChangedFilterBar(tmp);},
    [PercentFieldOne,PercentFieldTwo,PeriodicField,ProfileField,ComparePeriod,CompareProfile]
)

    useEffect( ()=>{
        if (!isAccordionOpen){
            let tmp = {
                base: SearchFieldOne,
                nameArt: SearchFieldTwo,
                note: SearchFieldThree,
            }
            filtersChangedSearch(tmp)
        }
    },[isAccordionOpen])

    // useEffect(() => {
    //     (async () => {
    //     setPeriods(await getQuery(`/getPeriods`));
    //     })()
    // },[])

    /// То, что выше не работает исправить при возможности
    /// Ниже заплатка реализующая то что выше

    useEffect( () => {setPeriods(PeriodicTmp)}, [])

    function getSelectElement( el , num ) {
        return(
            <MenuItem key={`${num}`} value={ `${el}` }>{el}</MenuItem>
        )
    }

    /**
     * Popover
     */
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
      };
      const handleClose = () => {
        setAnchorEl(null);
      };
    const open = Boolean(anchorEl);
    const id = open ? 'popover' : undefined;  
    /**
     * Popover
     */  




    return(
        <AppBar elevation={1} style={{marginTop : '100px', borderTopRadius : 0}}>

           {/* Large And Extram Large */}

            <Hidden  only={['md','sm','xs']}>
            <StyledPaper elevation={0}>
                <Grid
                    container
                    direction="row"
                    justify="space-around"
                    alignItems="flex-start"
                >
                   <Grid item lg={3}>
                        <MarginPaper>
                            <ClickAwayListener onClickAway={(e)=>{setIsAccordionOpen(false)}} >
                                <Accordion elevation={2} expanded={isAccordionOpen} square onChange={(e)=>{setIsAccordionOpen(!isAccordionOpen)}}  >
                                    <StyledAccordionSummery
                                            expandIcon={isAccordionOpen ? <SearchIcon/> : <ExpandMoreIcon/>}
                                            aria-controls="panel1a-content"
                                            id="panel1a-header"
                                            style={{height : '53px', alignItems : 'center'}}
                                    >
                                        <Typography variant='h6'>Поиск по источнику</Typography>
                                    </StyledAccordionSummery>
                                    <AccordionDetails>
                                        <StyledTextField id="FirstSearchField" label="База_Номер_Метка" value={SearchFieldOne} onChange={(e)=>{setSearchFieldOne(e.target.value)}} />
                                    </AccordionDetails>
                                    <AccordionDetails>
                                        <StyledTextField id="SecondSearchField" label="Название статьи/документа" value={SearchFieldTwo} onChange={(e)=>{setSearchFieldTwo(e.target.value)}}  />
                                    </AccordionDetails>
                                    <AccordionDetails>
                                        <StyledTextField id="ThirdSearchField" label="Текст примечания"  value={SearchFieldThree} onChange={(e)=>{setSearchFieldThree(e.target.value)}}/>
                                    </AccordionDetails>
                                </Accordion>
                            </ClickAwayListener>
                        </MarginPaper>    
                   </Grid>
                     
                   <Grid item lg={2}>
                        <MarginPaper elevation={0}>
                            <Box style={{display : 'flex', lineHeight : '1'}} mt={2}>
                                <TextField
                                    id="standard-number"
                                    label="Отказ от"
                                    type="number"
                                    placeholder="0,00"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    InputProps={{
                                        endAdornment: <InputAdornment position="end">%</InputAdornment>,
                                    }}
                                    inputProps={{
                                        min : '0',
                                        max : '100',
                                        step : '1',
                                    }}
                                    style={{marginRight : '5px', marginLeft : '5px', width : '105px'}}
                                    value={PercentFieldOne}
                                    onChange={(e)=>{setPercentFieldOne(e.target.value)}}
                                />
                                <TextField
                                    id="standard-number"
                                    label="Отказ до"
                                    type="number"
                                    placeholder="100,00"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    InputProps={{
                                        endAdornment: <InputAdornment position="end">%</InputAdornment>,
                                    }}
                                    inputProps={{
                                        min : '0',
                                        max : '100',
                                        step : '1',
                                    }}
                                    style={{marginLeft : '5px', width : '105px'}}
                                    value={PercentFieldTwo}
                                    onChange={(e)=>{setPercentFieldTwo(e.target.value)}}
                                />    
                            </Box>
                        </MarginPaper>    
                   </Grid>   
                   <Grid item >
                        <Box style={{display : 'flex', lineHeight : '1',marginRight:'5px',marginLeft:'5px'}} mt={2}>
                            <FormControl>
                                <InputLabel id="demo-simple-select-label">Период</InputLabel>
                                <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={PeriodicField}
                                        onChange={(e)=>{setPeriodicField(e.target.value)}}
                                        style={{ width : '18vw'}}
                                        MenuProps={MenuProps}
                                >
                                    {periods.map( (item,num) => getSelectElement(item,num))}
                                </Select>
                            </FormControl>
                        </Box>
                   </Grid>   
                   <Grid item >
                        <Box style={{display : 'flex', lineHeight : '1',marginRight:'5px',marginLeft:'5px'}} mt={2}>
                            <FormControl>
                                <InputLabel id="demo-simple-select-label">Профили</InputLabel>
                                <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={ProfileField}
                                        onChange={(e)=>{setProfileField(e.target.value)}}
                                        style={{ width : '18vw'}}
                                        MenuProps={MenuProps}
                                >
                                    <MenuItem value={'Все профили'}>Все профили</MenuItem>
                                    <MenuItem value={'Бухгалтерия и кадры бюджетной организации'}>Бухгалтерия и кадры бюджетной организации</MenuItem>
                                    <MenuItem value={'Бухгалтерия и кадры'}>Бухгалтерия и кадры</MenuItem>
                                    <MenuItem value={'Кадры'}>Кадры</MenuItem>
                                    <MenuItem value={'Юристы'}>Юристы</MenuItem>
                                    <MenuItem value={'Универсальный'}>Универсальный</MenuItem>
                                    <MenuItem value={'Универсальный для бюджетной организации'}>Универсальный для бюджетной организации</MenuItem>
                                    <MenuItem value={'Специалист по закупкам'}>Специалист по закупкам</MenuItem>
                                    
                                </Select>
                            </FormControl>
                        </Box>
                   </Grid>   
                   <Grid item >
                        <Box mt={'20px'}  style={{display : 'flex', lineHeight : '1'}} >
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
                                <Box style={{display : 'flex', lineHeight : '1',marginRight:'10px',marginLeft:'10px',paddingTop:'5px',paddingBottom:'5px'}}>
                                    <FormControl>
                                        <InputLabel>Сравн. период</InputLabel>
                                        <Select
                                                value={ComparePeriod}
                                                onChange={(e)=>{
                                                    setComparePeriod(e.target.value)
                                                    if( CompareProfile === 'Не выбрано'){ setCompareProfile(ProfileField)} 
                                                }}
                                                style={{ width : '15vw'}}
                                                MenuProps={MenuProps}
                                        >
                                            <MenuItem key={'${num}?m123'} value={ `Не выбрано` }>{`Не выбрано`}</MenuItem>
                                            {periods.map( (item,num) => getSelectElement(item,num))}
                                        </Select>
                                    </FormControl>
                                    <FormControl style={{marginLeft : '20px'}}>
                                        <InputLabel>Сравн. профили</InputLabel>
                                            <Select
                                                value={CompareProfile}
                                                onChange={(e)=>{
                                                    setCompareProfile(e.target.value)
                                                    if ( ComparePeriod === 'Не выбрано') {setComparePeriod(PeriodicField)}
                                                }}
                                                style={{ width : '15vw'}}
                                                MenuProps={MenuProps}
                                            >
                                                <MenuItem value={ `Не выбрано` }>{`Не выбрано`}</MenuItem>
                                                <MenuItem value={'Все профили'}>Все профили</MenuItem>
                                                <MenuItem value={'Бухгалтерия и кадры бюджетной организации'}>Бухгалтерия и кадры бюджетной организации</MenuItem>
                                                <MenuItem value={'Бухгалтерия и кадры'}>Бухгалтерия и кадры</MenuItem>
                                                <MenuItem value={'Кадры'}>Кадры</MenuItem>
                                                <MenuItem value={'Юристы'}>Юристы</MenuItem>
                                                <MenuItem value={'Универсальный'}>Универсальный</MenuItem>
                                                <MenuItem value={'Универсальный для бюджетной организации'}>Универсальный для бюджетной организации</MenuItem>
                                                <MenuItem value={'Специалист по закупкам'}>Специалист по закупкам</MenuItem>
                                            </Select>
                                        </FormControl>
                                        <StyleTooltip 
                                            placement="bottom" 
                                            title="Оменить сравнение"
                                            enterDelay={700} 
                                            enterNextDelay={700}
                                            TransitionComponent={Zoom}
                                            PopperProps={{
                        
                                            }}
                                        >   
                                            <IconButton
                                                onClick={(e)=>{
                                                    setComparePeriod('Не выбрано')
                                                    setCompareProfile('Не выбрано')
                                                }}
                                            >
                                                <BackspaceIcon fontSize='inherit' />
                                            </IconButton>
                                        </StyleTooltip>
                                    </Box>
                            </Popover>
                            <StyledButtonTwo
                                onClick={ (e)=>{
                                    setSearchFieldOne('')
                                    setSearchFieldTwo('')
                                    setSearchFieldThree('')
                                    setPercentFieldOne('')
                                    setPercentFieldTwo('')
                                    setCompareProfile('Не выбрано')
                                    setProfileField('Все профили')
                                    setPeriodicField('Текущий')
                                    setComparePeriod('Не выбрано')
                                    clickCancel()
                                }}
                                
                            >
                                Отменить
                            </StyledButtonTwo>
                        </Box>        
                   </Grid>            
                </Grid>    
            </StyledPaper>
            </Hidden>






            {/* Medium  */}

            <Hidden only={['lg','sm','xs','xl']}>
            <StyledPaper elevation={4}>
                <Grid
                    container
                    direction="row"
                    justify="space-between"
                    alignItems="center"
                >   
                   <Grid item >
                        <Box style={{display : 'flex', lineHeight : '1',marginLeft:'25px',marginRight:'5px'}} mt={1}>
                            <TextField
                                id="standard-number"
                                label="Отказ от"
                                type="number"
                                placeholder="0,00"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">%</InputAdornment>,
                                }}
                                inputProps={{
                                    min : '0',
                                    max : '100',
                                    step : '1',
                                }}
                                style={{marginRight : '5px', width : '100px'}}
                                value={PercentFieldOne}
                                onChange={(e)=>{setPercentFieldOne(e.target.value)}}
                            />
                            <TextField
                                id="standard-number"
                                label="Отказ до"
                                type="number"
                                placeholder="100,00"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">%</InputAdornment>,
                                }}
                                inputProps={{
                                    min : '0',
                                    max : '100',
                                    step : '1',
                                }}
                                style={{marginLeft : '5px', width : '100px'}}
                                value={PercentFieldTwo}
                                onChange={(e)=>{setPercentFieldTwo(e.target.value)}}
                            />    
                        </Box>
                   </Grid>   
                   <Grid item >
                        <Box style={{display : 'flex', lineHeight : '1',marginRight:'5px',marginLeft:'5px'}} mt={1}>
                            <FormControl>
                                <InputLabel id="demo-simple-select-label">Период</InputLabel>
                                <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={PeriodicField}
                                        onChange={(e)=>{setPeriodicField(e.target.value)}}
                                        style={{ width : '23.5vw'}}
                                        MenuProps={MenuProps}
                                >
                                    {periods.map( (item,num) => getSelectElement(item,num))}
                                </Select>
                            </FormControl>
                        </Box>
                   </Grid>   
                   <Grid item >
                   <Box style={{display : 'flex', lineHeight : '1',marginRight:'5px',marginLeft:'5px'}} mt={1}>
                            <FormControl>
                                <InputLabel id="demo-simple-select-label">Профили</InputLabel>
                                <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={ProfileField}
                                        onChange={(e)=>{setProfileField(e.target.value)}}
                                        style={{ width : '23.5vw'}}
                                        MenuProps={MenuProps}
                                >
                                    <MenuItem value={'Все профили'}>Все профили</MenuItem>
                                    <MenuItem value={'Бухгалтерия и кадры бюджетной организации'}>Бухгалтерия и кадры бюджетной организации</MenuItem>
                                    <MenuItem value={'Бухгалтерия и кадры'}>Бухгалтерия и кадры</MenuItem>
                                    <MenuItem value={'Кадры'}>Кадры</MenuItem>
                                    <MenuItem value={'Юристы'}>Юристы</MenuItem>
                                    <MenuItem value={'Универсальный'}>Универсальный</MenuItem>
                                    <MenuItem value={'Универсальный для бюджетной организации'}>Универсальный для бюджетной организации</MenuItem>
                                    <MenuItem value={'Специалист по закупкам'}>Специалист по закупкам</MenuItem>
                                    
                                </Select>
                            </FormControl>
                        </Box>
                   </Grid>   
                   <Grid item >
                   <Box style={{display : 'flex', lineHeight : '1'}} >
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
                                <Box style={{display : 'flex', lineHeight : '1',marginRight:'10px',marginLeft:'10px',paddingTop:'5px',paddingBottom:'5px'}}>
                                    <FormControl>
                                        <InputLabel>Сравн. период</InputLabel>
                                        <Select
                                                value={ComparePeriod}
                                                onChange={(e)=>{
                                                    setComparePeriod(e.target.value)
                                                    if( CompareProfile === 'Не выбрано'){ setCompareProfile(ProfileField)} 
                                                }}
                                                style={{ width : '24vw'}}
                                                MenuProps={MenuProps}
                                        >
                                            <MenuItem key={'${num}?m123'} value={ `Не выбрано` }>{`Не выбрано`}</MenuItem>
                                            {periods.map( (item,num) => getSelectElement(item,num))}
                                        </Select>
                                    </FormControl>
                                    <FormControl style={{marginLeft : '20px'}}>
                                        <InputLabel>Сравн. профили</InputLabel>
                                            <Select
                                                value={CompareProfile}
                                                onChange={(e)=>{
                                                    setCompareProfile(e.target.value)
                                                    if ( ComparePeriod === 'Не выбрано') {setComparePeriod(PeriodicField)}
                                                }}
                                                style={{ width : '24vw'}}
                                                MenuProps={MenuProps}
                                            >
                                                <MenuItem value={ `Не выбрано` }>{`Не выбрано`}</MenuItem>
                                                <MenuItem value={'Все профили'}>Все профили</MenuItem>
                                                <MenuItem value={'Бухгалтерия и кадры бюджетной организации'}>Бухгалтерия и кадры бюджетной организации</MenuItem>
                                                <MenuItem value={'Бухгалтерия и кадры'}>Бухгалтерия и кадры</MenuItem>
                                                <MenuItem value={'Кадры'}>Кадры</MenuItem>
                                                <MenuItem value={'Юристы'}>Юристы</MenuItem>
                                                <MenuItem value={'Универсальный'}>Универсальный</MenuItem>
                                                <MenuItem value={'Универсальный для бюджетной организации'}>Универсальный для бюджетной организации</MenuItem>
                                                <MenuItem value={'Специалист по закупкам'}>Специалист по закупкам</MenuItem>
                                            </Select>
                                        </FormControl>
                                        <StyleTooltip 
                                            placement="bottom" 
                                            title="Оменить сравнение"
                                            enterDelay={700} 
                                            enterNextDelay={700}
                                            TransitionComponent={Zoom}
                                            PopperProps={{
                        
                                            }}
                                        >   
                                            <IconButton
                                                onClick={(e)=>{
                                                    setComparePeriod('Не выбрано')
                                                    setCompareProfile('Не выбрано')
                                                }}
                                            >
                                                <BackspaceIcon fontSize='inherit' />
                                            </IconButton>
                                        </StyleTooltip>
                                    </Box>
                            </Popover>
                            <StyledButtonTwo
                               onClick={ (e)=>{
                                    setSearchFieldOne('')
                                    setSearchFieldTwo('')
                                    setSearchFieldThree('')
                                    setPercentFieldOne('')
                                    setPercentFieldTwo('')
                                    setCompareProfile('Не выбрано')
                                    setProfileField('Все профили')
                                    setPeriodicField('Текущий')
                                    setComparePeriod('Не выбрано')
                                    clickCancel()
                                }}
                                    
                                
                            >
                                Отменить
                            </StyledButtonTwo>
                        </Box>        
                   </Grid>            
                </Grid>    
            </StyledPaper>
            <StyledPaper elevation={4}>
                <Grid
                    container
                    direction="row"
                    justify="space-between"
                    alignItems="center"
                >
                    <Grid item md={2}>
                        <StyledTextField id="FirstSearchField" label="База_Номер_Метка" value={SearchFieldOne} onChange={(e)=>{setSearchFieldOne(e.target.value)}} style={{width : '29vw',marginLeft : '25px'}} />                   
                    </Grid>
                    <Grid item md={2}>
                        <StyledTextField id="SecondSearchField" label="Название статьи/документа" value={SearchFieldTwo} onChange={(e)=>{setSearchFieldTwo(e.target.value)}} style={{width : '29vw',marginLeft : '25px'}} />
                    </Grid>
                    <Grid item md={2}>
                        <StyledTextField id="ThirdSearchField" label="Текст примечания"  value={SearchFieldThree} onChange={(e)=>{setSearchFieldThree(e.target.value)}} style={{width : '29vw',marginLeft : '25px',marginRight : '25px'}}/>
                    </Grid>
                    <Grid item md={1}>
                        <IconButton style={{padding : '4px', marginLeft : '25px', marginTop : '20px'}}
                                onClick={ (e) => {
                                    let tmp = {
                                        base: SearchFieldOne,
                                        nameArt: SearchFieldTwo,
                                        note: SearchFieldThree,
                                    }
                                    filtersChangedSearch(tmp)
                                }}
                        >
                            <SearchIcon fontSize='large'>
                            </SearchIcon>
                        </IconButton>
                    </Grid>
                </Grid>    
            </StyledPaper>          
            </Hidden>                   









            {/* Small  */}

            <Hidden only={['lg','md','xs','xl']}>
            <StyledPaper elevation={4}>
                <Grid
                    container
                    direction="row"
                    justify="space-between"
                    alignItems="center"
                >    
                   <Grid item >
                        <Box style={{display : 'flex', lineHeight : '1',marginLeft:'2vw'}} mt={1}>
                            <FormControl>
                                <InputLabel id="demo-simple-select-label">Период</InputLabel>
                                <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={PeriodicField}
                                        onChange={(e)=>{setPeriodicField(e.target.value)}}
                                        style={{ width : '26vw'}}
                                        MenuProps={MenuProps}
                                >
                                    {periods.map( (item,num) => getSelectElement(item,num))}
                                </Select>
                            </FormControl>
                        </Box>
                   </Grid>
                      
                   <Grid item >
                   <Box style={{display : 'flex', lineHeight : '1',marginRight:'0px',marginLeft:'10px'}} mt={1}>
                            <FormControl>
                                <InputLabel id="demo-simple-select-label">Профили</InputLabel>
                                <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={ProfileField}
                                        onChange={(e)=>{setProfileField(e.target.value)}}
                                        style={{ width : '26vw'}}
                                        MenuProps={MenuProps}
                                >
                                    <MenuItem value={'Все профили'}>Все профили</MenuItem>
                                    <MenuItem value={'Бухгалтерия и кадры бюджетной организации'}>Бухгалтерия и кадры бюджетной организации</MenuItem>
                                    <MenuItem value={'Бухгалтерия и кадры'}>Бухгалтерия и кадры</MenuItem>
                                    <MenuItem value={'Кадры'}>Кадры</MenuItem>
                                    <MenuItem value={'Юристы'}>Юристы</MenuItem>
                                    <MenuItem value={'Универсальный'}>Универсальный</MenuItem>
                                    <MenuItem value={'Универсальный для бюджетной организации'}>Универсальный для бюджетной организации</MenuItem>
                                    <MenuItem value={'Специалист по закупкам'}>Специалист по закупкам</MenuItem>
                                    
                                </Select>
                            </FormControl>
                        </Box>
                   </Grid>   
                   <Grid item >
                   <Box style={{display : 'flex', lineHeight : '1'}} >
                            <StyledButtonOne 
                                onClick={ handleClick} 
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
                                <Box style={{display : 'flex', lineHeight : '1',marginRight:'10px',marginLeft:'10px',paddingTop:'5px',paddingBottom:'5px'}}>
                                    <FormControl>
                                        <InputLabel>Сравн. период</InputLabel>
                                        <Select
                                                value={ComparePeriod}
                                                onChange={(e)=>{
                                                    setComparePeriod(e.target.value)
                                                    if( CompareProfile === 'Не выбрано'){ setCompareProfile(ProfileField)} 
                                                }}
                                                style={{ width : '26vw'}}
                                                MenuProps={MenuProps}
                                                
                                        >
                                            <MenuItem key={'${num}?m123'} value={ `Не выбрано` }>{`Не выбрано`}</MenuItem>
                                            {periods.map( (item,num) => getSelectElement(item,num))}
                                        </Select>
                                    </FormControl>
                                    <FormControl style={{marginLeft : '20px'}}>
                                        <InputLabel>Сравн. профили</InputLabel>
                                            <Select
                                                value={CompareProfile}
                                                onChange={(e)=>{
                                                    setCompareProfile(e.target.value)
                                                    if ( ComparePeriod === 'Не выбрано') {setComparePeriod(PeriodicField)}
                                                }}
                                                style={{ width : '26vw'}}
                                                MenuProps={MenuProps}
                                            >
                                                <MenuItem value={ `Не выбрано` }>{`Не выбрано`}</MenuItem>
                                                <MenuItem value={'Все профили'}>Все профили</MenuItem>
                                                <MenuItem value={'Бухгалтерия и кадры бюджетной организации'}>Бухгалтерия и кадры бюджетной организации</MenuItem>
                                                <MenuItem value={'Бухгалтерия и кадры'}>Бухгалтерия и кадры</MenuItem>
                                                <MenuItem value={'Кадры'}>Кадры</MenuItem>
                                                <MenuItem value={'Юристы'}>Юристы</MenuItem>
                                                <MenuItem value={'Универсальный'}>Универсальный</MenuItem>
                                                <MenuItem value={'Универсальный для бюджетной организации'}>Универсальный для бюджетной организации</MenuItem>
                                                <MenuItem value={'Специалист по закупкам'}>Специалист по закупкам</MenuItem>
                                            </Select>
                                        </FormControl>
                                        <StyleTooltip 
                                            placement="bottom" 
                                            title="Оменить сравнение"
                                            enterDelay={700} 
                                            enterNextDelay={700}
                                            TransitionComponent={Zoom}
                                            PopperProps={{
                        
                                            }}
                                        >   
                                            <IconButton
                                                onClick={(e)=>{
                                                    setComparePeriod('Не выбрано')
                                                    setCompareProfile('Не выбрано')
                                                }}
                                            >
                                                <BackspaceIcon fontSize='inherit' />
                                            </IconButton>
                                        </StyleTooltip>
                                    </Box>
                            </Popover>
                            <StyledButtonTwo
                                onClick={ (e)=>{
                                    setSearchFieldOne('')
                                    setSearchFieldTwo('')
                                    setSearchFieldThree('')
                                    setPercentFieldOne('')
                                    setPercentFieldTwo('')
                                    setCompareProfile('Не выбрано')
                                    setProfileField('Все профили')
                                    setPeriodicField('Текущий')
                                    setComparePeriod('Не выбрано')
                                    clickCancel()
                                }}
                                    
                            >
                                Отменить
                            </StyledButtonTwo>
                        </Box>    
                   </Grid>
                               
                </Grid>    
            </StyledPaper>
            <StyledPaper elevation={4}>
                <Grid
                    container
                    direction="row"
                    justify="space-between"
                    alignItems="flex-start"
                >
                    <Grid item >
                        <Box style={{display : 'flex', lineHeight : '1',marginLeft:'3vw',marginRight:'3vw'}} mt={2}>
                            <TextField
                                id="standard-number"
                                label="Отказ от"
                                type="number"
                                placeholder="0,00"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">%</InputAdornment>,
                                }}
                                inputProps={{
                                    min : '0',
                                    max : '100',
                                    step : '1',
                                }}
                                style={{marginRight : '2vw', width : '105px'}}
                                value={PercentFieldOne}
                                onChange={(e)=>{setPercentFieldOne(e.target.value)}}
                            />
                            <TextField
                                id="standard-number"
                                label="Отказ до"
                                type="number"
                                placeholder="100,00"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">%</InputAdornment>,
                                }}
                                inputProps={{
                                    min : '0',
                                    max : '100',
                                    step : '1',
                                }}
                                style={{marginLeft : '2vw', width : '105px'}}
                                value={PercentFieldTwo}
                                onChange={(e)=>{setPercentFieldTwo(e.target.value)}}
                            />    
                        </Box>
                   </Grid>  
                   <Grid item style={{width : '54vw'}} >
                       <Box mt={'10px'} mr={'5px'}>
                            <ClickAwayListener onClickAway={ (e)=>{setIsAccordionOpen(false)}} >
                                <Accordion expanded={isAccordionOpen} square onChange={(e)=>{setIsAccordionOpen(!isAccordionOpen)}}> 
                                    <StyledAccordionSummery
                                            expandIcon={isAccordionOpen ? <SearchIcon/> : <ExpandMoreIcon/>}
                                            aria-controls="panel1a-content"
                                            id="panel1a-header"
                                            style={{height : '53px', alignItems : 'center'}}
                                    >
                                        <Typography variant='h6'>Поиск по источнику</Typography>
                                    </StyledAccordionSummery>
                                    <AccordionDetails>
                                        <StyledTextField id="FirstSearchField" label="База_Номер_Метка" value={SearchFieldOne} onChange={(e)=>{setSearchFieldOne(e.target.value)}} style={{width : '50vw'}} />
                                    </AccordionDetails>
                                    <AccordionDetails>
                                        <StyledTextField id="SecondSearchField" label="Название статьи/документа" value={SearchFieldTwo} onChange={(e)=>{setSearchFieldTwo(e.target.value)}} style={{width : '50vw'}}  />
                                    </AccordionDetails>
                                    <AccordionDetails>
                                        <StyledTextField id="ThirdSearchField" label="Текст примечания"  value={SearchFieldThree} onChange={(e)=>{setSearchFieldThree(e.target.value)}} style={{width : '50vw'}}/>
                                    </AccordionDetails>
                                </Accordion>
                            </ClickAwayListener>
                        </Box>        
                   </Grid>
                </Grid>    
            </StyledPaper>          
            </Hidden>  

            
        </AppBar>
    )
}

export default connect( (store)=>({filters : store.filters}), {filtersChangedSearch,filtersChanged,filtersChangedFilterBar,clickCancel})(FilterBar)