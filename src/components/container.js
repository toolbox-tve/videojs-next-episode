import videojs from 'video.js';

import './image';
import './closeButton';
import './summary';

const dom = videojs.dom || videojs;
const Component = videojs.getComponent('Component');

class Container extends Component {
  constructor(player, options) {
    super(player, options);

    const content = options.content;
    const image = content.images && content.images.find(img => img.type === 'THUMB');
    const imgUrl = image.image || content.images.length && content.images[0].image;

    this.contentId = content.id;
    this.image = this.addChild('NextEpisodeImage', { imgUrl });
    this.summary = this.addChild('NextEpisodeSummary', {
      title: content.title,
      episode: content.episode,
      season: content.season
    });
    this.closeButton = this.addChild('NextEpisodeCloseButton', { parent: this });

    this.closed = false;

    this.player_.on('timeupdate', this.onTimeUpdate.bind(this));
  }

  createEl() {
    const el = dom.createEl('div', {
      className: `vjs-next-episode-container vjs-hidden`
    });

    return el;
  }

  onTimeUpdate() {
    const timeToEnd = +(this.player_.duration() - this.player_.currentTime()).toFixed(0);
    if (!this.closed && this.options_.secToEnd >= timeToEnd) {
      this.show();
    } else {
      this.hide();
    }

    if (!timeToEnd) {
      console.log('CHANGE SRC');
      TbxPlayer.PlayerBuilder.changeSrcByContentId(this.contentId);
    }
  }
}

videojs.registerComponent('NextEpisode', Container);

export default Container;