import videojs from 'video.js';

const dom = videojs.dom || videojs;
const Component = videojs.getComponent('Component');

class Summary extends Component {
  constructor(player, options) {
    super(player, options);

    this.player_.on('timeupdate', this.onTimeUpdate.bind(this));
  }

  createEl() {
    const el = dom.createEl('div', {
      className: `vjs-next-episode-summary`
    });

    this.spanCounter = dom.createEl('span', {
      className: `vjs-next-episode-counter`
    });

    this.spanCounter.innerHTML = this.localize('Next episode in '); /*'Siguiente episodio en ';*/

    this.spanColored = dom.createEl('span');

    this.spanColored.innerHTML = this.localize('{1} seconds', [this.player_.currentTime()]);
    this.spanCounter.appendChild(this.spanColored);

    this.spanTitle = dom.createEl('span', {
      className: `vjs-next-episode-title`
    });

    this.spanTitle.innerHTML = this.generateTitle();

    el.appendChild(this.spanCounter);
    el.appendChild(this.spanTitle);

    return el;
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
}

videojs.registerComponent('NextEpisodeSummary', Summary);

export default Summary;