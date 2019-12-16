import React from 'react';
import videojs from 'video.js'

import './App.css';

class App extends React.Component {
  state = {
    streamUrl: 'https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8',
  }

  componentDidMount() {
    const videoJsOptions = {
      autoplay: true,
      controls: true,
      sources: [{
        src: this.state.streamUrl,
        type: 'video/mp4'
      }],
    };

    // instantiate Video.js
    this.player = videojs(this.videoNode, videoJsOptions, function onPlayerReady() {
      console.log('onPlayerReady', this)
    });

    this.player.on('error', (event) => {
      console.log('error', event);
    });
  }

  // destroy player on unmount
  componentWillUnmount() {
    if (this.player) {
      this.player.dispose()
    }
  }

  handleStreamUrlChange = (e) => {
    const streamUrl = e.target.value;
    this.setState({ streamUrl });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    this.player.src(this.state.streamUrl);
  }

  render() {
    return (
      <div className="App">
        <div data-vjs-player>
          <video
            ref={ node => this.videoNode = node }
            className="video-js"
            width="640"
            height="400"
          ></video>
        </div>

        <form onSubmit={this.handleSubmit}>
          <input
            className="App__input"
            type="text"
            value={this.state.streamUrl}
            onChange={this.handleStreamUrlChange}
            placeholder="Адрес стрима"
          />

          <button type="submit">
            Запустить
          </button>
        </form>
      </div>
    );
  }
}

export default App;
