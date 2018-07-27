'use strict';

const ele = React.createElement;

class Timer extends React.Component {
  constructor() {
    super();
    this.state = { seconds: 0 };
  }

  tick() {
    this.setState(prevState => ({
      seconds: prevState.seconds + 1
    }));
  }

  componentDidMount() {       //executed after the 1st render
    this.interval = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {    //executed before rendering
    clearInterval(this.interval);
  }

  render() {
    return ele(
      "seconds_timer",
      null,
      "Timer: ",
      this.state.seconds
    );
  }
}
const domContainer = document.querySelector('#seconds_timer');
ReactDOM.render(ele(Timer), domContainer); //Instance of ele created and render of Timer called
                                                 //Mounting happens here
                                                 //Mounting = add nodes to DOM  
