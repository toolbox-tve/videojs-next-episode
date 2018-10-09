import videojs from 'video.js';

const dom = videojs.dom || videojs;
const ClickableComponent = videojs.getComponent('ClickableComponent');

class CloseButton extends ClickableComponent {
  constructor(player, options) {
    super(player, options);
    this.parent = options.parent;
  }

  createEl() {
    const el = dom.createEl('div', {
      className: `vjs-control vjs-button vjs-next-episode-close-btn`
    });

    const span = dom.createEl('span');

    span.innerHTML = 'X';
    el.appendChild(span);
    return el;
  }

  handleClick(event) {
    this.parent.closed = true;
    this.parent.hide();
  }
}

videojs.registerComponent('NextEpisodeCloseButton', CloseButton);

export default CloseButton;