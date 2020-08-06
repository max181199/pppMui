import React, { Component } from 'react';
import HighchartsReact from 'highcharts-react-official';
import { Highcharts, defaultOptions } from '../../services/highcharts';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

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
      <Box style={{minWidth : '1900px',minHeight:'400px',width : '98vw',height : '19%',display:'absolute'}}>
          <IconButton style={{fontSize : 'calc( 30px + 0.8vw)',zIndex : '1',marginBottom : '-60px',marginLeft : '-15px'}} onClick={this.props.onClose}>
            <CloseIcon fontSize='inherit'/>
          </IconButton>
          <HighchartsReact
            highcharts={Highcharts}
            options={this.state}
            constructorType = { 'stockChart' }
          />
      </Box>
    )
  }
}


export default Chart;
