import videojs from 'video.js';

const dom = videojs.dom || videojs;
const Component = videojs.getComponent('Component');

class Summary extends Component {
  constructor(player, options) {
    super(player, options);

    this.lastWidth = 0;
    this.parent = options.parent;
    this.player_.on('timeupdate', this.onTimeUpdate.bind(this));
  }

  createEl() {
    const el = dom.createEl('div', {
      className: `vjs-next-episode-summary`
    });
    this.spanCounter = dom.createEl('span', {
      className: `vjs-next-episode-counter`
    });
    this.spanColored = dom.createEl('span');
    this.spanTitle = dom.createEl('span', {
      className: `vjs-next-episode-title`
    });

    this.spanCounter.innerHTML = this.localize('Next episode in ');
    this.spanColored.innerHTML = this.localize('{1} seconds', [this.player_.currentTime()]);
    this.spanTitle.innerHTML = this.generateTitle();

    this.spanCounter.appendChild(this.spanColored);
    el.appendChild(this.spanCounter);
    el.appendChild(this.spanTitle);

    return el;
  }

  updateEl(options) {
    this.options_ = options;

    this.spanTitle.innerHTML = this.generateTitle();
  }

  generateTitle() {
    let title, season, episode;

    if (this.options_.title) {
      title = `\"${this.options_.title}\"`;
    }

    if (this.options_.episode) {
      episode = this.localize('Episode {1}', [this.options_.episode]);
      episode += `${title ? ' ' : ''}`;
    }

    if (this.options_.season) {
      season = this.localize('Season {1}', [this.options_.season]);
      season += `${episode ? ' - ' : ''}`;
    }

    return `${season}${episode}${title}`;
  }

  onTimeUpdate() {
    const timeToEnd = +(this.player_.duration() - this.player_.currentTime()).toFixed(0);
    this.spanColored.innerHTML = this.localize('{1} seconds', [timeToEnd]);
  }

  resize() {
    console.log('TEXT RES');

    const width = this.width();

    if (this.lastWidth !== width) {
      this.lastWidth = width;
    } else {
      return;
    }

    if (width < 200) {
      this.spanCounter.style.fontSize = '10px';
      this.spanTitle.style.fontSize = '10px';
    } else if (width < 300) {
      this.spanCounter.style.fontSize = '14px';
      this.spanTitle.style.fontSize = '14px';
    } else if (width < 400) {
      this.spanCounter.style.fontSize = '16px';
      this.spanTitle.style.fontSize = '16px';
    } else {
      this.spanCounter.style.fontSize = '20px';
      this.spanTitle.style.fontSize = '20px';
    }
  }
}

videojs.registerComponent('NextEpisodeSummary', Summary);

export default Summary;