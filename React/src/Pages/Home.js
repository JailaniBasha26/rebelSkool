import React, { Component } from 'react'
// import { Spinner } from 'react-bootstrap'
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import Chart from "react-apexcharts";
// import './ButtonDemo.css';
import axios from 'axios'
import './Home.css'

let barGraphOptions = {};
let barGraphSeries = [];
class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      organizationNo: '',
      organizationResponse: {},
      submitted: false
    }
    this.getOrganization = this.getOrganization.bind(this);
    this.organizationOnChange = this.organizationOnChange.bind(this);
    this.addOrganization = this.addOrganization.bind(this);
  }

  getOrganization() {
    const { organizationNo } = this.state
    let resultRevenue = {};
    if (organizationNo != '') {
      axios
        .get('/getOrganizationDetails/' + organizationNo)
        .then((res) => {
          if (res && res.data && res.data.length > 0) {
            console.log(res, ' -- RESPONSE')
            res.data[0].revenue = res.data[0].revenue.replace(/'/g, '"')
            resultRevenue = JSON.parse(res.data[0].revenue);
            console.log(resultRevenue, ' -- resultRevenue')
            barGraphOptions = {
              chart: {
                id: "basic-bar"
              },
              xaxis: {
                categories: Object.keys(resultRevenue)
              },
              tooltip: {
                custom: function ({ series, seriesIndex, dataPointIndex, w }) {
                  let graphHoverValue = series[seriesIndex][dataPointIndex].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                  return '<div class="arrow_box">' +
                    '<span>' + graphHoverValue + ' SEK' + '</span>' +
                    '</div>'
                }
              },
              dataLabels: {
                enabled: true,
                // textAnchor: 'start',
                style: {
                  colors: ['#fff']
                },
                formatter: function (val, opt) {
                  return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "SEK";
                },
                offsetX: 0,
                dropShadow: {
                  enabled: true
                }
              },
            }

            barGraphSeries = [
              {
                name: 'Revenue',
                data: Object.values(resultRevenue)
              }
            ]
            this.setState({
              organizationResponse: res.data[0],
              submitted: true,
            })
          }
          else {
            this.setState({
              organizationResponse: '',
              submitted: true,
            })
          }
        })
    }
    else {
      this.setState({
        organizationResponse: '',
        submitted: true,
      })
    }
  }

  addOrganization() {
    this.props.history.push('/addOrganization')
  }

  organizationOnChange(e) {
    this.setState({
      organizationNo: e.target.value
    })
  }

  render() {
    const { organizationResponse, submitted } = this.state
    console.log(organizationResponse, '>>')
    console.log('submitted: ', submitted)
    return (
      <div>
        <div className='addOrganization'>
          <Button label="Add Org" aria-label="Add Ord" onClick={() => this.addOrganization()}
            id='submit' />
        </div>
        <br />
        <div>
          
          <center>
            <h5 className='enterYourOrganizationNo'>Enter your organization number</h5>
            <InputText id="organizationNoTextBox" value={this.state.organizationNo}
              onChange={(e) => this.organizationOnChange(e)}
            />
            
            <br />
            <Button label="Submit" aria-label="Submit" onClick={() => this.getOrganization()}
              id='submit' />

          </center>
        </div>
        {
          submitted ?
            organizationResponse && organizationResponse.organizationno ?
              <div>
                <div className='organizationDetails'>
                  <Card title="Organization Number" id='organizationNo' className='organizationNo' style={{ width: '21rem', marginBottom: '5em' }}>
                    <center>
                      <p id='organizationNo' className="m-0" style={{ lineHeight: '2.5', fontSize: '17px' }}>{organizationResponse.organizationno}</p>
                    </center>
                  </Card>

                  <Card title="Organization Name" id='organizationNo' className='organizationNo' style={{ width: '21rem', marginBottom: '5em', marginLeft: '14px' }}>
                    <center>
                      <p id='organizationNo' className="m-0" style={{ lineHeight: '2.5', fontSize: '17px' }}>{organizationResponse.organizationname}</p>
                    </center>
                  </Card>

                  <Card title="CEO" id='organizationNo' className='organizationNo' style={{ width: '21rem', marginBottom: '5em', marginLeft: '14px' }}>
                    <center>
                      <p id='organizationNo' className="m-0" style={{ lineHeight: '2.5', fontSize: '17px' }}>{organizationResponse.ceo}</p>
                    </center>
                  </Card>

                  <Card title="Phone" id='organizationNo' className='organizationNo' style={{ width: '21rem', marginBottom: '5em', marginLeft: '14px' }}>
                    <center>
                      <p id='organizationNo' className="m-0" style={{ lineHeight: '2.5', fontSize: '17px' }}>{organizationResponse.phone}</p>
                    </center>
                  </Card>

                  <Card title="Address" id='organizationNo' className='organizationNo' style={{ width: '21rem', marginBottom: '5em', marginLeft: '14px' }}>
                    <center>
                      <p id='organizationNo' className="m-0" style={{ lineHeight: '1.5', fontSize: '17px' }}>{organizationResponse.address}</p>
                    </center>
                  </Card>
                </div>
                <center>
                  <label className='revenueGraphTitle'>Revenue</label>
                  <div className="app">
                    <div className="row">
                      <div className="mixed-chart">
                        <Chart
                          options={barGraphOptions}
                          series={barGraphSeries}
                          type="bar"
                          width="80%"
                          height="200%"
                        />
                      </div>
                    </div>
                  </div>
                </center>
              </div>
              :
              <div className='noDataFound'>
                <h3>No Data Found!!</h3>
              </div>
            : ''
        }
      </div>
    )
  }

}

export default Home