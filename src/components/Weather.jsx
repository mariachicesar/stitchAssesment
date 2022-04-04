import React, { Component } from 'react'
import Location from './Location'

export default class Weather extends Component {
    state = {
        weather: {},
        celsius: 0
    }
    componentDidMount = () => {
        localStorage.clear();
        
    }

    componentDidUpdate = () => {

    }

    componentWillUnmount = () => {

    }

    onHandleWeather = (weather) =>{
        console.log(weather.hourly.temperature_2m[0])
        this.setState({
            weather: weather,
            celsius: weather.hourly.temperature_2m[0]
        })
    }

    render() {

        return (
            <React.Fragment>
                <div>Weather</div>
                {this.state.celsius > 0 ? 
                <h4>{this.state.celsius} C</h4>:
                ""
                }
                <Location onHandleWeatherSuccess={this.onHandleWeather}/>
            </React.Fragment>
        )
    }
}
