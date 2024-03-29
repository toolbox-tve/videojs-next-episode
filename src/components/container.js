import videojs from 'video.js';

import './image';
import './closeButton';
import './summary';

const logger = videojs.log.createLogger('NextEpisode');
const dom = videojs.dom || videojs;
const Component = videojs.getComponent('Component');

class Container extends Component {
  constructor(player, options) {
    super(player, options);

    this.changeSrc = options.changeSrcCallback || null;

    const content = options.content;
    const image = content.images && content.images.find(img => img.type === 'THUMB');
    const imgUrl = image.url || (content.images.length && content.images[0].url);

    this.contentId = content.id;
    this.image = this.addChild('NextEpisodeImage', { imgUrl, parent: this });
    this.summary = this.addChild('NextEpisodeSummary', {
      title: content.title,
      episode: content.episode,
      season: content.season
    });
    this.closeButton = this.addChild('NextEpisodeCloseButton', {
      parent: this
    });

    this.open = false;
    this.closed = false;

    // Binded function so we can .off them
    this.bindedOnTimeUpdate = this.onTimeUpdate.bind(this);
    this.bindedOnPlayerResize = this.onPlayerResize.bind(this);
    this.bindedOnGoToNextEpisode = this.goToNextEpisode.bind(this);

    this.player_.on('timeupdate', this.bindedOnTimeUpdate);
    this.player_.on('playerresize', this.bindedOnPlayerResize);
    this.player_.on('ended', this.bindedOnGoToNextEpisode);
  }

  dispose() {
    if (this && this.player_) {
      this.player_.off('timeupdate', this.bindedOnTimeUpdate);
      this.player_.off('playerresize', this.bindedOnPlayerResize);
      this.player_.off('ended', this.bindedOnGoToNextEpisode);
    }

    super.dispose();
  }

  createEl() {
    const el = dom.createEl('div', {
      className: 'vjs-next-episode-container vjs-hidden'
    });

    return el;
  }

  updateEl() {
    const options = this.player_.tbx.pluginConfig.nextEpisode;
    const content = options.content;
    const image =
      content.images && content.images.find(img => img.type === 'THUMB');
    const imgUrl =
      image.url || (content.images.length && content.images[0].url);

    this.image.updateEl({ imgUrl });
    this.summary.updateEl({
      title: content.title,
      episode: content.episode,
      season: content.season
    });
  }

  onTimeUpdate() {
    const timeToEnd = +(this.player_.duration() - this.player_.currentTime()).toFixed(0);

    if (!this.open && !this.closed && this.options_.secToEnd >= timeToEnd) {
      logger('CONTAINER - SHOW');
      this.show();
      this.onPlayerResize();
    } else if (this.open && this.options_.secToEnd < timeToEnd) {
      logger('CONTAINER - HIDE');
      this.hide();
    }
  }

  show() {
    super.show();
    this.open = true;

    // When next-episode panel is shown, trigger a 'nextepisodeexitonclose'
    // To prepare any plugin related with external events to trigger
    // the corresponding event when the player instance closes

    // This status should be cancelled if 'nextepisodecontinue' or 'nextepisodeexit' is triggered
    const options = this.player_.tbx.pluginConfig.nextEpisode;
    const nextContent = options && options.content;

    this.player_.trigger('nextepisodeexitonclose', {content: nextContent});
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
    this.closed = true;
    this.hide();

    const options = this.player_.tbx.pluginConfig.nextEpisode;
    const nextContent = options && options.content;

    if (this.changeSrc) {
      this.player_.trigger('nextepisodecontinue', {content: nextContent});
      this.changeSrc(this.contentId);
    } else if (this.player_.tbx) {
      if (!nextContent) {
        logger('No next content data found.');
      } else {
        this.player_.trigger('nextepisodecontinue', {content: nextContent});
        return this.player_.changeSrc(nextContent.id, this.player_)
          .then(player => {
            this.updateEl();
            this.player_.one('play', (() => (this.closed = false)));
          });
      }
    }

    logger.error('No valid config found.');
  }
}

videojs.registerComponent('NextEpisode', Container);

export default Container;
