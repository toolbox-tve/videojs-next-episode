/*! @name videojs-next-episode @version 0.0.0 @license Apache-2.0 */
'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var videojs = _interopDefault(require('video.js'));

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

var version = "0.0.0";

var dom = videojs.dom || videojs;
var ClickableComponent = videojs.getComponent('ClickableComponent');

var Image =
/*#__PURE__*/
function (_ClickableComponent) {
  _inheritsLoose(Image, _ClickableComponent);

  function Image(player, options) {
    var _this;

    _this = _ClickableComponent.call(this, player, options) || this;
    _this.parent = options.parent;
    return _this;
  }

  var _proto = Image.prototype;

  _proto.createEl = function createEl() {
    var el = dom.createEl('div', {
      className: "vjs-next-episode-image-div"
    });
    this.playIcon = dom.createEl('span', {
      className: "vjs-icon-play-circle"
    });
    this.episodeImg = dom.createEl('img', {
      src: this.options_.imgUrl,
      className: "vjs-next-episode-image"
    });
    el.appendChild(this.playIcon);
    el.appendChild(this.episodeImg);
    return el;
  };

  _proto.updateEl = function updateEl(options) {
    this.options_ = options;
    this.episodeImg.src = this.options_.imgUrl;
  };

  _proto.resize = function resize() {
    console.log('IMAGE RES');

    if (this.episodeImg.height + 2 !== this.parent.height()) {
      this.episodeImg.height = this.parent.height() - 2;
    }
  };

  _proto.handleClick = function handleClick() {
    console.log('HANDLES CLICK');
    this.parent.goToNextEpisode();
  };

  return Image;
}(ClickableComponent);

videojs.registerComponent('NextEpisodeImage', Image);

var dom$1 = videojs.dom || videojs;
var ClickableComponent$1 = videojs.getComponent('ClickableComponent');

var CloseButton =
/*#__PURE__*/
function (_ClickableComponent) {
  _inheritsLoose(CloseButton, _ClickableComponent);

  function CloseButton(player, options) {
    var _this;

    _this = _ClickableComponent.call(this, player, options) || this;
    _this.parent = options.parent;
    return _this;
  }

  var _proto = CloseButton.prototype;

  _proto.createEl = function createEl() {
    var el = dom$1.createEl('div', {
      className: "vjs-control vjs-button vjs-next-episode-close-btn"
    });
    var span = dom$1.createEl('span', {
      className: 'vjs-icon-cancel'
    });
    el.appendChild(span);
    return el;
  };

  _proto.handleClick = function handleClick(event) {
    this.parent.closed = true;
    this.parent.hide();
  };

  return CloseButton;
}(ClickableComponent$1);

videojs.registerComponent('NextEpisodeCloseButton', CloseButton);

var dom$2 = videojs.dom || videojs;
var Component = videojs.getComponent('Component');

var Summary =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(Summary, _Component);

  function Summary(player, options) {
    var _this;

    _this = _Component.call(this, player, options) || this;
    _this.lastWidth = 0;
    _this.parent = options.parent;

    _this.player_.on('timeupdate', _this.onTimeUpdate.bind(_assertThisInitialized(_assertThisInitialized(_this))));

    return _this;
  }

  var _proto = Summary.prototype;

  _proto.createEl = function createEl() {
    var el = dom$2.createEl('div', {
      className: "vjs-next-episode-summary"
    });
    this.spanCounter = dom$2.createEl('span', {
      className: "vjs-next-episode-counter"
    });
    this.spanColored = dom$2.createEl('span');
    this.spanTitle = dom$2.createEl('span', {
      className: "vjs-next-episode-title"
    });
    this.spanCounter.innerHTML = this.localize('Next episode in ');
    this.spanColored.innerHTML = this.localize('{1} seconds', [this.player_.currentTime()]);
    this.spanTitle.innerHTML = this.generateTitle();
    this.spanCounter.appendChild(this.spanColored);
    el.appendChild(this.spanCounter);
    el.appendChild(this.spanTitle);
    return el;
  };

  _proto.updateEl = function updateEl(options) {
    this.options_ = options;
    this.spanTitle.innerHTML = this.generateTitle();
  };

  _proto.generateTitle = function generateTitle() {
    var title, season, episode;

    if (this.options_.title) {
      title = "\"" + this.options_.title + "\"";
    }

    if (this.options_.episode) {
      episode = this.localize('Episode {1}', [this.options_.episode]);
      episode += "" + (title ? ' ' : '');
    }

    if (this.options_.season) {
      season = this.localize('Season {1}', [this.options_.season]);
      season += "" + (episode ? ' - ' : '');
    }

    return "" + season + episode + title;
  };

  _proto.onTimeUpdate = function onTimeUpdate() {
    var timeToEnd = +(this.player_.duration() - this.player_.currentTime()).toFixed(0);
    this.spanColored.innerHTML = this.localize('{1} seconds', [timeToEnd]);
  };

  _proto.resize = function resize() {
    console.log('TEXT RES');
    var width = this.width();

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
  };

  return Summary;
}(Component);

videojs.registerComponent('NextEpisodeSummary', Summary);

var dom$3 = videojs.dom || videojs;
var Component$1 = videojs.getComponent('Component');

var Container$1 =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(Container, _Component);

  function Container(player, options) {
    var _this;

    _this = _Component.call(this, player, options) || this;
    _this.changeSrc = options.changeSrcCallback;
    var content = options.content;
    var image = content.images && content.images.find(function (img) {
      return img.type === 'THUMB';
    });
    var imgUrl = image.image || content.images.length && content.images[0].image;
    _this.contentId = content.id;
    _this.image = _this.addChild('NextEpisodeImage', {
      imgUrl: imgUrl,
      parent: _assertThisInitialized(_assertThisInitialized(_this))
    });
    _this.summary = _this.addChild('NextEpisodeSummary', {
      title: content.title,
      episode: content.episode,
      season: content.season
    });
    _this.closeButton = _this.addChild('NextEpisodeCloseButton', {
      parent: _assertThisInitialized(_assertThisInitialized(_this))
    });
    _this.open = false;
    _this.closed = false;

    _this.player_.on('timeupdate', _this.onTimeUpdate.bind(_assertThisInitialized(_assertThisInitialized(_this))));

    _this.player_.on('playerresize', _this.onPlayerResize.bind(_assertThisInitialized(_assertThisInitialized(_this))));

    return _this;
  }

  var _proto = Container.prototype;

  _proto.createEl = function createEl() {
    var el = dom$3.createEl('div', {
      className: "vjs-next-episode-container vjs-hidden"
    });
    return el;
  };

  _proto.updateEl = function updateEl(options) {};

  _proto.onTimeUpdate = function onTimeUpdate() {
    var timeToEnd = +(this.player_.duration() - this.player_.currentTime()).toFixed(0);

    if (!this.open && !this.closed && this.options_.secToEnd >= timeToEnd) {
      this.show();
      this.onPlayerResize();
    } else if (this.open && this.options_.secToEnd < timeToEnd) {
      this.hide();
    }

    if (timeToEnd <= 1) {
      console.log('CHANGE SRC');
      this.goToNextEpisode();
    }
  };

  _proto.show = function show() {
    _Component.prototype.show.call(this);

    this.open = true;
  };

  _proto.hide = function hide() {
    _Component.prototype.hide.call(this);

    this.open = false;
  };

  _proto.onPlayerResize = function onPlayerResize() {
    this.image.resize();
    this.summary.resize();
  };

  _proto.goToNextEpisode = function goToNextEpisode() {
    this.changeSrc(this.contentId);
  };

  return Container;
}(Component$1);

videojs.registerComponent('NextEpisode', Container$1);

var audioOnly = false;
var clip = false;
var contentType = "EPISODE";
var description$1 = "Cuando el testigo en contra de Emily es asesinado,  Nick y Emily deberán probar su inocencia antes de que Tommy Gibbs y el departamento de policía la arresten.";
var duration = 2742;
var episode = 3;
var externalId = "16013397";
var flights = [
	{
		flights: [
			{
				start: "2017-11-10T08:00:00.000Z",
				end: "2020-11-03T06:00:00.000Z"
			}
		],
		network: "crackle"
	}
];
var free = false;
var genres = [
	"Crimen"
];
var hd = false;
var id$1 = "t78wbi";
var images = [
	{
		imageBin: null,
		image: "http://images-es-am.crackle.com/1/v/j0/wfryk_tne.jpg?ts=20171010213620",
		contentType: null,
		checksum: "0c5b9c0994da02a3a7415bdd60fb013fa31cb1af",
		uuid: null,
		unityImagePath: "/images/{clientId}/content/5a0583487251b34fee0b315c/0c5b9c0994da02a3a7415bdd60fb013fa31cb1af/0c5b9c0994da02a3a7415bdd60fb013fa31cb1af.png",
		type: "THUMB",
		size: {
			height: 224,
			ratio: 1.7857142857142858,
			width: 400
		}
	},
	{
		imageBin: null,
		image: "http://images-es-az.crackle.com/profiles/channels/100002174/OneSheetImage_800x1200.jpg?ts=20171027103436",
		contentType: null,
		checksum: "20d2a0c61bdabb156ebf45664f532360aeb1423b",
		uuid: null,
		unityImagePath: "/images/{clientId}/content/5a0583487251b34fee0b315c/20d2a0c61bdabb156ebf45664f532360aeb1423b/20d2a0c61bdabb156ebf45664f532360aeb1423b.png",
		type: "POSTER",
		size: {
			height: 1200,
			ratio: 0.6666666666666666,
			width: 800
		}
	}
];
var live = false;
var replay = false;
var networks = [
	{
		name: "Crackle",
		embed: true,
		network: "crackle",
		contentId: "5a058348d4d08d2917e05283"
	}
];
var participants = {
	director: [
		"Oded Ruskin"
	],
	writer: [
		"Elaina Perpelitt"
	],
	cast: [
		"Stana Katic",
		"Patrick Heusinger",
		"Cara Theobold"
	]
};
var payPerView = false;
var ratings = [
	"PG",
	"R"
];
var season = 1;
var serie = {
	_id: "5a2a5eaa7251b34fee13eb0a",
	id: "iw29eh",
	title: "Absentia",
	alternativeTitle: null
};
var title = "The Emily Show";
var entitlementTypes = [
	"deeplink",
	"media",
	"redirect"
];
var urn = "urn:tve:crackle";
var streamCastConfig = {
	device: {
		chromecast: true
	}
};
var contentExample = {
	audioOnly: audioOnly,
	clip: clip,
	contentType: contentType,
	description: description$1,
	duration: duration,
	episode: episode,
	externalId: externalId,
	flights: flights,
	free: free,
	genres: genres,
	hd: hd,
	id: id$1,
	images: images,
	live: live,
	replay: replay,
	networks: networks,
	participants: participants,
	payPerView: payPerView,
	ratings: ratings,
	season: season,
	serie: serie,
	title: title,
	entitlementTypes: entitlementTypes,
	urn: urn,
	streamCastConfig: streamCastConfig
};

var Plugin = videojs.getPlugin('plugin'); // Default options for the plugin.

var defaults = {
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

var NextEpisode =
/*#__PURE__*/
function (_Plugin) {
  _inheritsLoose(NextEpisode, _Plugin);

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
  function NextEpisode(player, options) {
    var _this;

    // the parent class will add player under this.player
    _this = _Plugin.call(this, player) || this;
    _this.options = videojs.mergeOptions(defaults, options);

    _this.player.ready(function () {
      _this.player.addClass('vjs-next-episode');
    });

    _this.container = player.addChild('NextEpisode', _this.options);
    return _this;
  }

  return NextEpisode;
}(Plugin); // Define default values for the plugin's `state` object here.


NextEpisode.defaultState = {}; // Include the version number.

NextEpisode.VERSION = version; // Register the plugin with video.js.

videojs.registerPlugin('nextEpisode', NextEpisode);

module.exports = NextEpisode;
