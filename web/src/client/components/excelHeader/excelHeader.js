import React, {useEffect, useState} from 'react';
import { AppBar, Hidden } from '@material-ui/core';
import Toolbar from '@material-ui/core/Toolbar';
import styled from 'styled-components';
import ContentLG from './excelHeaderContentLG'
import ContentMD from './excelHeaderContentMD'
import ContentXS from './excelHeaderContentXS'
import ContentSM from './excelHeaderContentSM'
import { getQuery } from '../../services/query-service'

const StyledToolbar = styled(Toolbar)`
  min-height : 50px;
  padding-right : 0px;
  padding-top : 0px;
  padding-bottom : 0px;
`;

const LargeStyledToolbar = styled(Toolbar)`
  min-height : 60px;
  padding-right : 0px;
  padding-top : 0px;
  padding-bottom : 0px;
`;
const Header = () => {

  const [ date, setDate] = useState('')
  useEffect(()=>{
    getQuery( "/testDate" ).then(  
                (data)=> { if (data != 0) {setDate(data)}})
  },[])

  return (
    <AppBar>
      <Hidden only={['md','sm','xs']}>
        <LargeStyledToolbar>
          <ContentLG date={date} />
        </LargeStyledToolbar>
      </Hidden>
      <Hidden only={['lg','sm','xs']}>
        <StyledToolbar>
          <ContentMD date={date} />
        </StyledToolbar>
      </Hidden>
      <Hidden only={['lg','md','xs']}>
        <StyledToolbar>
          <ContentSM/>
        </StyledToolbar>
      </Hidden>
      <Hidden only={['lg','md','sm']}>
        <StyledToolbar>
          <ContentXS/>
        </StyledToolbar>
      </Hidden>
    </AppBar>
  );
};

export default Header;
