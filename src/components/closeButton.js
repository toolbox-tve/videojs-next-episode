import videojs from 'video.js';

const dom = videojs.dom || videojs;
const Component = videojs.getComponent('Component');

class CloseButton extends Component {
  constructor(player, options) {
    super(player, options);
  }

  createEl() {
    const el = dom.createEl('div', {
      className: `vjs-next-episode-close-btn`
    });

    const span = dom.createEl('span');

    span.innerHTML = 'X';
    el.appendChild(span);
    return el;
  }
}

videojs.registerComponent('NextEpisodeCloseButton', CloseButton);

export default CloseButton;