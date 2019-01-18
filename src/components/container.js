import videojs from "video.js";

import "./image";
import "./closeButton";
import "./summary";

const logger = videojs.log.createLogger('NextEpisode');
const dom = videojs.dom || videojs;
const Component = videojs.getComponent("Component");

class Container extends Component {
  constructor(player, options) {
    super(player, options);

    this.changeSrc = options.changeSrcCallback || null;

    const content = options.content;
    const image = content.images && content.images.find(img => img.type === "THUMB");
    const imgUrl = image.url || (content.images.length && content.images[0].url);

    this.contentId = content.id;
    this.image = this.addChild("NextEpisodeImage", { imgUrl, parent: this });
    this.summary = this.addChild("NextEpisodeSummary", {
      title: content.title,
      episode: content.episode,
      season: content.season
    });
    this.closeButton = this.addChild("NextEpisodeCloseButton", {
      parent: this
    });

    this.open = false;
    this.closed = false;

    this.player_.on("timeupdate", this.onTimeUpdate.bind(this));
    this.player_.on("playerresize", this.onPlayerResize.bind(this));
    this.player_.on("ended", this.goToNextEpisode.bind(this));
  }

  createEl() {
    const el = dom.createEl("div", {
      className: `vjs-next-episode-container vjs-hidden`
    });

    return el;
  }

  updateEl() {
    const options = this.player_.tbx.pluginConfig.nextEpisode;
    const content = options.content;
    const image =
      content.images && content.images.find(img => img.type === "THUMB");
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
      logger("CONTAINER - SHOW");
      this.show();
      this.onPlayerResize();
    } else if (this.open && this.options_.secToEnd < timeToEnd) {
      logger("CONTAINER - HIDE");
      this.hide();
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
    this.closed = true;
    this.hide();

    if (this.changeSrc) {
      this.changeSrc(this.contentId);
    } else if (this.player_.tbx) {
      const options = this.player_.tbx.pluginConfig.nextEpisode;
      const nextContent = options && options.content;

      if (!nextContent) {
        logger('No next content data found.');
      }

      return this.player_.changeSrc(nextContent.id, this.player_)
        .then(player => {
          this.updateEl();
          this.player_.one("play", (() => (this.closed = false)).bind(this));
        });
    }

    logger.error("No valid config found.");
  }
}

videojs.registerComponent("NextEpisode", Container);

export default Container;
