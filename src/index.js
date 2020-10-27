import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {

    constructor(props) {
        super(props);

        // State must be initialized, only time we do direct assignment to the state
        this.state = {
            lat: null,
            errorMessage: ''
        };

        window.navigator.geolocation.getCurrentPosition(
            position => {
                // calling setState, must do the update is using setState
                console.log("Position", position.coords.latitude);
                this.setState({lat: position.coords.latitude});
            },
            err => {
                console.log("Error on calling geoLocationService", err);
                this.setState({'errorMessage': err.message});
            }
        );
    }

    // React says we have to define render method
    render() {

        if (this.state.errorMessage && !this.state.lat) {
            return <div>Error : {this.state.errorMessage} </div>
        }

        if (!this.state.errorMessage && this.state.lat) {
            return <div> Lattitude : {this.state.lat} </div>
        }

        return <div> Loading!</div>
    };

}

ReactDOM.render(<App />, document.querySelector('#root'));


/*
    Rules of state

    Only usable with Class components
    You will confuse props with state :(
    'State' is a JS object that contains data relevant to a singular component
    Updating 'state' on a component cause the component almost instantly re-render
    State must be initialized when a component is first created
    State can only be set using the function 'setState'
 */


/*
    Flow of execution of React application

    JS file loaded by browser
    Instance of App Component is created
    App Components 'constructor' function gets called, defining constructor is optional unless we have some properties to initialize with
    State object is created and assigned to 'this.state' property
    We call geolocation service
    React calls the components render method
    App returns JSX, gets the rendered page as HTML
    We get results of geoLocation!
    We update our state object with a call to 'this.setState' function
    React sees that we updated the state of a components
    React calls our 'render' method a second time
    Render method returns some(updated) JSX

 */
