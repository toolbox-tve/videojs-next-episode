import videojs from 'video.js';
import {version as VERSION} from '../package.json';
import contentExample from './contentExample.json';
import './components/container';

const Plugin = videojs.getPlugin('plugin');

// Default options for the plugin.
const defaults = {
  title: '',
  secToEnd: 15,
  posterImage: '',
  url: '',
  content: contentExample
};

/**
 * An advanced Video.js plugin. For more information on the API
 *
 * See: https://blog.videojs.com/feature-spotlight-advanced-plugins/
 */
class NextEpisode extends Plugin {

  /**
   * Create a NextEpisode plugin instance.
   *
   * @param  {Player} player
   *         A Video.js Player instance.
   *
   * @param  {Object} [options]
   *         An optional options object.
   *
   *         While not a core part of the Video.js plugin architecture, a
   *         second argument of options is a convenient way to accept inputs
   *         from your plugin's caller.
   */
  constructor(player, options) {
    // the parent class will add player under this.player
    super(player);

    this.options = videojs.mergeOptions(defaults, options);

    this.player.ready(() => {
      this.player.addClass('vjs-next-episode');
    });

    this.container = player.addChild('NextEpisode', this.options);
  }

  dispose() {
    this.player.removeChild('NextEpisode');
    super.dispose();
  }
}

// Define default values for the plugin's `state` object here.
NextEpisode.defaultState = {};

// Include the version number.
NextEpisode.VERSION = VERSION;

// Register the plugin with video.js.
videojs.registerPlugin('nextEpisode', NextEpisode);

export default NextEpisode;
