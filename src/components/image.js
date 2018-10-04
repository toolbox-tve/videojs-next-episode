import videojs from 'video.js';

const dom = videojs.dom || videojs;
const Component = videojs.getComponent('Component');

class Image extends Component {
  constructor(player, options) {
    super(player, options);
  }

  createEl() {
    const el = dom.createEl('img', {
      src: 'https://unity-img.tbxapis.com/v0/images/8f6edc9cb0d38faeaf343b50ae0dc7f4/content/5b8a62638d9f4c702bfed1ed/bed418bcc64492516b25fa459910eb8532039d81/bed418bcc64492516b25fa459910eb8532039d81.png',
      className: `vjs-next-episode-image`
    });
    return el;
  }
}

videojs.registerComponent('NextEpisodeImage', Image);

export default Container;