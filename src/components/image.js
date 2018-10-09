import videojs from 'video.js';

const dom = videojs.dom || videojs;
const Component = videojs.getComponent('Component');

class Image extends Component {
  constructor(player, options) {
    super(player, options);
  }

  createEl() {
    const el = dom.createEl('img', {
      src: this.options_.imgUrl,
      className: `vjs-next-episode-image`
    });
    return el;
  }
}

videojs.registerComponent('NextEpisodeImage', Image);

export default Container;