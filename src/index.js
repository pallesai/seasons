import React from 'react';
import ReactDOM from 'react-dom';
import SeasonDisplay from './SeasonDisplay'
import Spinner from "./Spinner";

class App extends React.Component {

    state = {
        lat: null,
        errorMessage: ''
    };

    componentDidMount() {
        console.log("Called componentDidMount()");

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

    renderContent() {

        if (this.state.errorMessage && !this.state.lat) {
            return <div>Error : {this.state.errorMessage} </div>
        }

        if (!this.state.errorMessage && this.state.lat) {
            return <SeasonDisplay lat={this.state.lat} />
        }

        return <Spinner message="Please accept location request" />;

    }
    // React says we must to define render method
    render() {

        return (
            <div>
                {this.renderContent()}
            </div>
        );


    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log("Called componentDidUpdate()");
    }

    componentWillUnmount() {
        console.log("Called componentDidUnMount()");
    }

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

/*
    Component Life Cycle

    constructor
    render
    (content visible on screen)
    componentDidMount -> recomended to keep data loading logic in componentDidMount
    (sit and wait for updates)
    componenetDidUpdate ->Good place to add more data loading when state/props change -> render will be called
    (sit and wait until this component is no longer shown)
    componenetWillUnMount
 */
