import videojs from 'video.js';

const dom = videojs.dom || videojs;
const Component = videojs.getComponent('Component');

class Summary extends Component {
  constructor(player, options) {
    super(player, options);
  }

  createEl() {
    const el = dom.createEl('div', {
      className: `vjs-next-episode-summary`
    });

    const spanCounter = dom.createEl('span', {
      className: `vjs-next-episode-counter`
    });

    spanCounter.innerHTML = 'Siguiente episodio en ';

    const spanColored = dom.createEl('span');

    spanColored.innerHTML = '8 segundos';
    spanCounter.appendChild(spanColored);

    const spanTitle = dom.createEl('span', {
      className: `vjs-next-episode-title`
    });

    spanTitle.innerHTML = 'Temporada 2 - Episodio 9 \"Dos sombreros\"';

    el.appendChild(spanCounter);
    el.appendChild(spanTitle);

    return el;
  }
}

videojs.registerComponent('NextEpisodeSummary', Summary);

export default Summary;