import videojs from 'video.js';

import './image';
import './closeButton';
import './summary';

const dom = videojs.dom || videojs;
const Component = videojs.getComponent('Component');

class Container extends Component {
  constructor(player, options) {
    super(player, options);

    this.changeSrc = options.changeSrcCallback;

    const content = options.content;
    const image = content.images && content.images.find(img => img.type === 'THUMB');
    const imgUrl = image.image || content.images.length && content.images[0].image;

    this.contentId = content.id;
    this.image = this.addChild('NextEpisodeImage', { imgUrl, parent: this });
    this.summary = this.addChild('NextEpisodeSummary', {
      title: content.title,
      episode: content.episode,
      season: content.season
    });
    this.closeButton = this.addChild('NextEpisodeCloseButton', { parent: this });

    this.open = false;
    this.closed = false;

    this.player_.on('timeupdate', this.onTimeUpdate.bind(this));
    this.player_.on('playerresize', this.onPlayerResize.bind(this));
  }

  createEl() {
    const el = dom.createEl('div', {
      className: `vjs-next-episode-container vjs-hidden`
    });

    return el;
  }

  updateEl(options) {
  }

  onTimeUpdate() {
    const timeToEnd = +(this.player_.duration() - this.player_.currentTime()).toFixed(0);

    if (!this.open && !this.closed && this.options_.secToEnd >= timeToEnd) {
      this.show();
      this.onPlayerResize();
    } else if (this.open && this.options_.secToEnd < timeToEnd) {
      this.hide();
    }

    if (timeToEnd <= 1) {
      console.log('CHANGE SRC');
      this.goToNextEpisode();
    }
  }

  show() {
    super.show();
    this.open = true;
  }

  hide() {
    super.hide();
    this.open = false;
  }

  onPlayerResize() {
    this.image.resize();
    this.summary.resize();
  }

  goToNextEpisode() {
    this.changeSrc(this.contentId);
  }
}

videojs.registerComponent('NextEpisode', Container);

export default Container;