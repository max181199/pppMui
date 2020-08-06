import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import { Typography, Button, Hidden } from '@material-ui/core';
import { AppBar } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import { withStyles, withTheme } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Zoom from '@material-ui/core/Zoom';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { connect } from 'react-redux';
import { changeCurrentPage , changeCurrentFilterIcon } from '../actions';
import IconButton from '@material-ui/core/IconButton';
import FilterListIcon from '@material-ui/icons/FilterList';
import styled from 'styled-components';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Date from '../tmpDate/date';
import grey from '@material-ui/core/colors/grey';
import blue from '@material-ui/core/colors/blue';


const StyledToolbar = withStyles({
  regular : {
    minHeight : '50px',
    paddingRight : '0px',
    paddingTop : '0px',
    paddingBottom : '0px',
  }
})(Toolbar)

const StyleTooltip = withStyles({
  tooltip : {
      fontSize : 'calc( 10px + 0.7vw)',
  }
})(Tooltip)

const StyledDivider = withStyles({
  flexItem : {
    height: "40px",
    width: "2px",
    marginLeft:'14px',
    marginRight:'14px',
  },
  root : {
    backgroundColor : 'white',
  }
})(Divider)

const StyledTypografy = withStyles({
  subtitle2 : {
    lineHeight : 1
  }
})(Typography)

const StyledTab= withStyles({
  root: {
    padding : '8px',
    height : '50px',
    fontSize : '15px',
    minWidth : '340px'
  }
})(Tab);

const StyledTabTwo= withStyles({
  root: {
    padding : '8px',
    height : '50px',
    fontSize : '15px',
    minWidth : '100px'
  }
})(Tab);

const StyleTabs = withStyles({
    indicator: {
      backgroundColor: 'white',
      height : '2px',
      bottom : '5px'
    },
    root : {
      paddingRight : '40px',
      paddingLeft : 0
    }
})(Tabs)


const StyledButton = styled(Button)`
    background-color : #bdbdbd;
    color : white;
    height : 50px;
    border-radius : 0px;
    &:hover {
        background-color : #3776cc;
    };
`;

const Header = (props) => {
  const { currentPage , currentFilterIcon, changeCurrentPage ,changeCurrentFilterIcon } = props
  return (
    <AppBar>
      <StyledToolbar>
        <Grid container
          direction="row"
          justify="space-between"
          alignItems="center"
          spacing={10}
          style={{marigin : 0, height : '50px'}}
        >
          <Hidden smDown>
            <Grid item style={{paddingTop : "0px",paddingBottom : "0", paddingLeft : "40px"}}>
                <Box css={{ display : 'flex'}} alignItems="center" xs="false">
                  <Typography variant='h4'>
                    ППП
                  </Typography>
                  <StyledDivider orientation="vertical" flexItem />
                    <Box alignItems="center" >
                      <StyledTypografy variant='subtitle2'>
                        Примечания на 
                      </StyledTypografy >
                      <StyledTypografy   variant='subtitle2'>
                        правой панели
                      </StyledTypografy >
                    </Box>
                </Box>       
            </Grid>
          </Hidden>
          <Hidden mdUp>
            <Grid item xs={1} style={{paddingTop : "0px",paddingBottom : "0", paddingLeft : "40px"}}>
                <Box style={{ display : 'flex',width : '90px'}} alignItems="center" >
                  <Typography style={{width : '80px'}} variant='h4'>
                    ППП
                  </Typography>
                </Box>       
            </Grid>
          </Hidden>  
          <Hidden  smDown> 
            <Grid item style={{padding : "0px"}}>
              <Box css={{display:'flex'}} alignItems="center"  >
                <Hidden smDown>
                  <StyleTooltip 
                    placement="bottom" 
                    title="Скрыть фильтры"
                    enterDelay={700} 
                    enterNextDelay={700}
                    TransitionComponent={Zoom}
                    PopperProps={{
                    }}
                  > 
                    <IconButton 
                      onClick={ (e)=> {
                                currentFilterIcon === "close" 
                                  ?
                                changeCurrentFilterIcon('open') 
                                  :
                                changeCurrentFilterIcon('close')
                                }} 
                      style={{ padding : '7.5px',marginRight : '20px',}}>
                      <FilterListIcon 
                          style={{  
                                    
                                    color : "white",
                                    transform: currentFilterIcon === "close" ? "rotate(0deg)" : "rotate(180deg)", 
                                  }} 
                      >
                      </FilterListIcon>
                    </IconButton>
                  </StyleTooltip>     
                </Hidden>
                  <StyleTabs value={currentPage} onChange={(e,val)=>{changeCurrentPage(val)}} aria-label="simple tabs example">
                     <StyledTab wrapped label=" Клики и действия по ППП за период " value={'statistics'}/>
                     <StyledTabTwo  label=" Отчеты " value={'excel'} />
                  </StyleTabs>           
              </Box>
            </Grid>
          </Hidden>
          <Hidden mdUp> 
            <Grid item style={{padding: 0}}>
              <Box css={{display:'flex'}} alignItems="center"  >
                <Hidden xsDown>
                  <StyleTooltip 
                    placement="bottom" 
                    title="Скрыть фильтры"
                    enterDelay={700} 
                    enterNextDelay={700}
                    TransitionComponent={Zoom}
                    PopperProps={{
                    }}
                  >
                    <IconButton 
                        onClick={ (e)=> {
                                  currentFilterIcon === "close" 
                                    ?
                                  changeCurrentFilterIcon('open') 
                                    :
                                  changeCurrentFilterIcon('close')
                                  }} 
                        style={{ padding : '7.5px'}}>
                        <FilterListIcon style={{ color : "white",transform: currentFilterIcon === "close" ? "rotate(0deg)" : "rotate(180deg)"  }}>
                        </FilterListIcon>
                      </IconButton>
                  </StyleTooltip>   
                  </Hidden>   
                  <StyleTabs  value={currentPage} onChange={(e,val)=>{changeCurrentPage(val)}} aria-label="simple tabs example">
                     <StyledTabTwo  wrapped label="  Статистика " value={'statistics'}/>
                     <StyledTabTwo  label=" Отчеты " value={'excel'} />
                  </StyleTabs>  
              </Box>
            </Grid>
          </Hidden>
          <Hidden mdDown>
            <Grid item style={{padding: 0}}>
                <Typography style={{width : '200px', height : '50px',margin:0,marginRight:'40px',padding:0,paddingTop:'12px',fontSize : '16px'}} variant='h6'>
                    {`Обновление: ` + Date[0]['update_date']}
                </Typography>                
            </Grid>
          </Hidden>     
        </Grid>
      </StyledToolbar>
    </AppBar>
  );
};

export default connect( (store) => (
{  
  currentPage : store.optional.page,
  currentFilterIcon : store.optional.filterIcon 
}),
{
  changeCurrentPage,
  changeCurrentFilterIcon
})(Header);
