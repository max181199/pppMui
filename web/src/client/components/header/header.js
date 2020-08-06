import React from 'react';
import { AppBar, Hidden } from '@material-ui/core';
import Toolbar from '@material-ui/core/Toolbar';
import styled from 'styled-components';
import ContentLG from './headerContentLG'
import ContentMD from './headerContentMD'
import ContentXS from './headerContentXS'
import Date from '../../tmpDate/date';

const StyledToolbar = styled(Toolbar)`
  min-height : 50px;
  padding-right : 0px;
  padding-top : 0px;
  padding-bottom : 0px;
`;

const LargeStyledToolbar = styled(Toolbar)`
  min-height : 70px;
  padding-right : 0px;
  padding-top : 0px;
  padding-bottom : 0px;
`;
const Header = () => {
  return (
    <AppBar>
      <Hidden only={['md','sm','xs']}>
        <LargeStyledToolbar>
          <ContentLG date={Date[0]['update_date']} />
        </LargeStyledToolbar>
      </Hidden>
      <Hidden only={['lg','xs']}>
        <StyledToolbar>
          <ContentMD date={Date[0]['update_date']} />
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
