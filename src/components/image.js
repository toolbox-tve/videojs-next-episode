import videojs from 'video.js';

const dom = videojs.dom || videojs;
const ClickableComponent = videojs.getComponent('ClickableComponent');

class Image extends ClickableComponent {
  constructor(player, options) {
    super(player, options);

    this.parent = options.parent;
  }

  createEl() {
    const el = dom.createEl('div', {
      className: 'vjs-next-episode-image-div'
    });

    this.playIcon = dom.createEl('span', {
      className: 'vjs-icon-play-circle'
    });

    this.episodeImg = dom.createEl('img', {
      src: this.options_.imgUrl,
      className: 'vjs-next-episode-image'
    });

    el.appendChild(this.playIcon);
    el.appendChild(this.episodeImg);

    return el;
  }

  updateEl(options) {
    this.options_ = options;

    this.episodeImg.src = this.options_.imgUrl;
  }

  resize() {
    if ((this.episodeImg.height + 2) !== this.parent.height()) {
      this.episodeImg.height = this.parent.height() - 2;
    }
  }

  handleClick() {
    this.parent.closed = true;
    this.parent.hide();
    this.parent.goToNextEpisode();
  }
}

videojs.registerComponent('NextEpisodeImage', Image);

export default Image;
