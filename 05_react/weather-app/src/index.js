import React from 'react';
import ReactDOM from 'react-dom/client';


class SearchBar extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      inputField: '',
    };
  }

  inputfieldChange = (event) => {
    this.setState({inputField: event.target.value});
  };

  getData = () => {
    this.props.onSearch(this.state.inputField);
  };

  render () {
    return (
    <div className='container'>
      <table className='weatherTable'>
        <tbody>
          <tr>
            <td colSpan='2'>{this.props.statusText}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr className='tfooter'>
            <td><input className='form-control' onChange={this.inputfieldChange} placeholder='Enter location'></input></td>
            <td><button className='btn btn-success' onClick={this.getData}>Get data</button></td>
          </tr>
        </tfoot>
      </table>
    </div>
    );
  }
}

class WeatherPanel extends React.Component {
  render () {
    if (!this.props.weather.name) {
      return (
        <div className='container'>
        </div>
      );
    }
    return (
      <div className='container'>
        <h2>The weather in {this.props.weather.name}</h2>
        <ul className='list-group'>
          <li className='list-group-item'><b>Temperature:</b> {(this.props.weather.main.temp - 273.15).toFixed(1)}&#8451; (feels like {(this.props.weather.main.feels_like - 273.15).toFixed(1)})</li>
          <li className='list-group-item'><b>Relative humidity:</b> {this.props.weather.main.humidity}%</li>
          <li className='list-group-item'><b>Atmospheric ressure:</b> {this.props.weather.main.pressure} hPa</li>
          <li className='list-group-item'><b>Wind speed:</b> {this.props.weather.wind.speed} m/s</li>
          <li className='list-group-item'><b>Description:</b> {this.props.weather.weather[0].description} ({this.props.weather.clouds.all}% cloud cover)</li>
        </ul>
      </div>
    );
  }
}

class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      weather: {},
      statusText: <h2>Enter your favourite place</h2>,
    };
  }

  getData = (input) => {
    const API_URL = 'https://api.openweathermap.org/data/2.5/weather';
    const API_KEY = '7a53857e9f4ab6a58c39e507db8c6491';
    
    this.setState({
      statusText: <h2>Loading ...</h2>
    });

    fetch(API_URL + '?q=' + input + '&appid=' + API_KEY)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        alert('Error: location not found!');
        this.setState({
          statusText: <h2>Enter your favourite place</h2>,
        });
        return null;
      })
      .then(data => {
        if (data !== null) {
          this.setState({
            weather: data,
            statusText: <h2>Enter your favourite place</h2>,
          });
        }
      });
  };

  render () {
    return (
      <div className='header'>
        <h1>FancyWeather&copy;</h1>
        <WeatherPanel weather={this.state.weather}/>
        <SearchBar onSearch={this.getData} statusText={this.state.statusText}/>
      </div>
    );
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
