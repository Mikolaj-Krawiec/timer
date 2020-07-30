import React from 'react';
import { render } from 'react-dom';

class App extends React.Component {
  state = {
    status: 'off',
    time: 0,
    timer: null,
  }

  playBell = () => {
    const bell = new Audio('./sounds/bell.wav');
    bell.play();
  };

  formatTime = (time) => {
    let mm = Math.floor(time/60);
    let ss = Math.floor(time%60);
    if(mm < 10) {
      mm = '0' + mm;
    }
    if(ss < 10) {
      ss = '0' + ss;
    }
    return `${mm}:${ss}`;
  }

  step = () => {
    const prevTime = this.state.time;
    this.setState({
      time: prevTime - 1,
    })
    if(this.state.time <= 0 && this.state.status === 'work') {
      this.setState({
        status: 'rest',
        time: 20,
      })
      this.playBell();
    }
    if(this.state.time <= 0 && this.state.status === 'rest') {
      this.setState({
        status: 'work',
        time: 1200,
      })
      this.playBell();
    }
  };

  startTimer = () => {

    this.setState({
      status: 'work',
      time: 1200,
      timer: setInterval(this.step, 1000),
    });

  };

  stopTimer = () => {
    clearInterval(this.state.timer)
    this.setState({
      status: 'off',
      time: 0,
      timer: null,
    })
  }

  colseApp = () => {
    window.close()
  }

  render() {
    const { status, time } = this.state;

    const description = (
      <React.Fragment>
        <p>According to optometrists in order to save your eyes, you should follow the 20/20/20. It means you should to rest your eyes every 20 minutes for 20 seconds by looking more than 20 feet away.</p>
        <p>This app will help you track your time and inform you when it's time to rest.</p>
      </React.Fragment>
    );

    return (
      <div>
        <h1>Protect your eyes</h1>
        {(status === 'off') && description}
        {(status === 'work') && <img src="./images/work.png" />}
        {(status === 'rest') && <img src="./images/rest.png" />}
        {(status !== 'off') && <div className="timer">{this.formatTime(time)}</div>}
        {(status === 'off') && <button className="btn" onClick={this.startTimer}>Start</button>}
        {(status !== 'off') && <button className="btn" onClick={this.stopTimer}>Stop</button>}
        <button className="btn btn-close" on onClick={this.colseApp}>X</button>
      </div>
    )
  }
};

render(<App />, document.querySelector('#app'));
