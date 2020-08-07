import React, { Component } from 'react';
import HighchartsReact from 'highcharts-react-official';
import { Highcharts, defaultOptions } from '../../services/highcharts';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import styled from 'styled-components';

const StyledBox = styled(Box)`
  min-width : 1900px;
  min-height : 400px;
  width : 98vw;
  height : 19%;
  display: absolute;

`;

const StyledIconButton = styled(IconButton)`
  font-size : calc( 30px + 0.8vw);
  z-index : 1;
  margin-bottom : -60px;
  margin-left : 0px; 
`;


class Chart extends Component {

  state = {
    ...defaultOptions
  };

  componentDidMount() {
    (this.props.compData.length == 0) ?
      this.setState({
        title: {
          text: this.props.title
        },
        series: [
          {
            name: 'Период 1',
            data: this.props.data
          }
        ]
      })
    : this.setState({
        title: {
          text: this.props.title
        },
        series: [
          {
            name: 'Период 1',
            data: this.props.data
          },
          {
            name: 'Период 2',
            data: this.props.compData
          }
        ]
      })
  }

  componentDidUpdate(prevProps) {
    if (this.props.title !== prevProps.title) {
      this.setState({
        title: {
          text: this.props.title
        }
      })
    };
    if (this.props.data !== prevProps.data) {
      this.setState({
        series: [
          {
            name: 'Период 1',
            data: this.props.data
          }
        ]
      })
    }
  }



  render() {
    return (
      <StyledBox>
          <StyledIconButton onClick={this.props.onClose}>
            <CloseIcon fontSize='inherit'/>
          </StyledIconButton>
          <HighchartsReact
            highcharts={Highcharts}
            options={this.state}
            constructorType = { 'stockChart' }
          />
      </StyledBox>
    )
  }
}


export default Chart;
