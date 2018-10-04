import videojs from 'video.js';
import './image';
import './closeButton';
import './summary';

const dom = videojs.dom || videojs;
const Component = videojs.getComponent('Component');

class Container extends Component {
  constructor(player, options) {
    super(player, options);
  }

  createEl() {
    const el = dom.createEl('div', {
      className: `vjs-next-episode-container`
    });

    return el;
  }
}

Container.prototype.options_ = {
  children: [
    'NextEpisodeImage',
    'NextEpisodeSummary',
    'NextEpisodeCloseButton'
  ]
};

videojs.registerComponent('NextEpisode', Container);

export default Container;