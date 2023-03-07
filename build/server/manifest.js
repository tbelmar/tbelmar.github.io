const manifest = {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["animations/background/background1.png","animations/background/background10.png","animations/background/background11.png","animations/background/background12.png","animations/background/background13.png","animations/background/background14.png","animations/background/background15.png","animations/background/background16.png","animations/background/background17.png","animations/background/background18.png","animations/background/background19.png","animations/background/background2.png","animations/background/background20.png","animations/background/background21.png","animations/background/background22.png","animations/background/background23.png","animations/background/background24.png","animations/background/background25.png","animations/background/background26.png","animations/background/background27.png","animations/background/background28.png","animations/background/background29.png","animations/background/background3.png","animations/background/background30.png","animations/background/background31.png","animations/background/background32.png","animations/background/background33.png","animations/background/background34.png","animations/background/background35.png","animations/background/background36.png","animations/background/background37.png","animations/background/background38.png","animations/background/background39.png","animations/background/background4.png","animations/background/background40.png","animations/background/background41.png","animations/background/background42.png","animations/background/background43.png","animations/background/background44.png","animations/background/background45.png","animations/background/background46.png","animations/background/background47.png","animations/background/background48.png","animations/background/background49.png","animations/background/background5.png","animations/background/background50.png","animations/background/background51.png","animations/background/background52.png","animations/background/background53.png","animations/background/background54.png","animations/background/background55.png","animations/background/background56.png","animations/background/background57.png","animations/background/background58.png","animations/background/background59.png","animations/background/background6.png","animations/background/background60.png","animations/background/background61.png","animations/background/background62.png","animations/background/background63.png","animations/background/background64.png","animations/background/background7.png","animations/background/background8.png","animations/background/background9.png","animations/background-no-belmar/background-no-belmar1.png","animations/background-no-belmar/background-no-belmar10.png","animations/background-no-belmar/background-no-belmar11.png","animations/background-no-belmar/background-no-belmar12.png","animations/background-no-belmar/background-no-belmar13.png","animations/background-no-belmar/background-no-belmar14.png","animations/background-no-belmar/background-no-belmar15.png","animations/background-no-belmar/background-no-belmar16.png","animations/background-no-belmar/background-no-belmar17.png","animations/background-no-belmar/background-no-belmar18.png","animations/background-no-belmar/background-no-belmar19.png","animations/background-no-belmar/background-no-belmar2.png","animations/background-no-belmar/background-no-belmar20.png","animations/background-no-belmar/background-no-belmar21.png","animations/background-no-belmar/background-no-belmar22.png","animations/background-no-belmar/background-no-belmar23.png","animations/background-no-belmar/background-no-belmar24.png","animations/background-no-belmar/background-no-belmar25.png","animations/background-no-belmar/background-no-belmar26.png","animations/background-no-belmar/background-no-belmar27.png","animations/background-no-belmar/background-no-belmar28.png","animations/background-no-belmar/background-no-belmar29.png","animations/background-no-belmar/background-no-belmar3.png","animations/background-no-belmar/background-no-belmar30.png","animations/background-no-belmar/background-no-belmar31.png","animations/background-no-belmar/background-no-belmar32.png","animations/background-no-belmar/background-no-belmar33.png","animations/background-no-belmar/background-no-belmar34.png","animations/background-no-belmar/background-no-belmar35.png","animations/background-no-belmar/background-no-belmar36.png","animations/background-no-belmar/background-no-belmar37.png","animations/background-no-belmar/background-no-belmar38.png","animations/background-no-belmar/background-no-belmar39.png","animations/background-no-belmar/background-no-belmar4.png","animations/background-no-belmar/background-no-belmar40.png","animations/background-no-belmar/background-no-belmar41.png","animations/background-no-belmar/background-no-belmar42.png","animations/background-no-belmar/background-no-belmar43.png","animations/background-no-belmar/background-no-belmar44.png","animations/background-no-belmar/background-no-belmar45.png","animations/background-no-belmar/background-no-belmar46.png","animations/background-no-belmar/background-no-belmar47.png","animations/background-no-belmar/background-no-belmar48.png","animations/background-no-belmar/background-no-belmar49.png","animations/background-no-belmar/background-no-belmar5.png","animations/background-no-belmar/background-no-belmar50.png","animations/background-no-belmar/background-no-belmar51.png","animations/background-no-belmar/background-no-belmar52.png","animations/background-no-belmar/background-no-belmar53.png","animations/background-no-belmar/background-no-belmar54.png","animations/background-no-belmar/background-no-belmar55.png","animations/background-no-belmar/background-no-belmar56.png","animations/background-no-belmar/background-no-belmar57.png","animations/background-no-belmar/background-no-belmar58.png","animations/background-no-belmar/background-no-belmar59.png","animations/background-no-belmar/background-no-belmar6.png","animations/background-no-belmar/background-no-belmar60.png","animations/background-no-belmar/background-no-belmar61.png","animations/background-no-belmar/background-no-belmar62.png","animations/background-no-belmar/background-no-belmar63.png","animations/background-no-belmar/background-no-belmar64.png","animations/background-no-belmar/background-no-belmar7.png","animations/background-no-belmar/background-no-belmar8.png","animations/background-no-belmar/background-no-belmar9.png","animations/bigbelmar-default/bigbelmar-default1.png","animations/bigbelmar-default/bigbelmar-default10.png","animations/bigbelmar-default/bigbelmar-default11.png","animations/bigbelmar-default/bigbelmar-default12.png","animations/bigbelmar-default/bigbelmar-default13.png","animations/bigbelmar-default/bigbelmar-default14.png","animations/bigbelmar-default/bigbelmar-default15.png","animations/bigbelmar-default/bigbelmar-default16.png","animations/bigbelmar-default/bigbelmar-default17.png","animations/bigbelmar-default/bigbelmar-default18.png","animations/bigbelmar-default/bigbelmar-default19.png","animations/bigbelmar-default/bigbelmar-default2.png","animations/bigbelmar-default/bigbelmar-default20.png","animations/bigbelmar-default/bigbelmar-default21.png","animations/bigbelmar-default/bigbelmar-default22.png","animations/bigbelmar-default/bigbelmar-default23.png","animations/bigbelmar-default/bigbelmar-default24.png","animations/bigbelmar-default/bigbelmar-default25.png","animations/bigbelmar-default/bigbelmar-default26.png","animations/bigbelmar-default/bigbelmar-default27.png","animations/bigbelmar-default/bigbelmar-default28.png","animations/bigbelmar-default/bigbelmar-default29.png","animations/bigbelmar-default/bigbelmar-default3.png","animations/bigbelmar-default/bigbelmar-default30.png","animations/bigbelmar-default/bigbelmar-default31.png","animations/bigbelmar-default/bigbelmar-default32.png","animations/bigbelmar-default/bigbelmar-default33.png","animations/bigbelmar-default/bigbelmar-default34.png","animations/bigbelmar-default/bigbelmar-default35.png","animations/bigbelmar-default/bigbelmar-default36.png","animations/bigbelmar-default/bigbelmar-default37.png","animations/bigbelmar-default/bigbelmar-default38.png","animations/bigbelmar-default/bigbelmar-default39.png","animations/bigbelmar-default/bigbelmar-default4.png","animations/bigbelmar-default/bigbelmar-default40.png","animations/bigbelmar-default/bigbelmar-default41.png","animations/bigbelmar-default/bigbelmar-default42.png","animations/bigbelmar-default/bigbelmar-default43.png","animations/bigbelmar-default/bigbelmar-default44.png","animations/bigbelmar-default/bigbelmar-default45.png","animations/bigbelmar-default/bigbelmar-default46.png","animations/bigbelmar-default/bigbelmar-default47.png","animations/bigbelmar-default/bigbelmar-default48.png","animations/bigbelmar-default/bigbelmar-default49.png","animations/bigbelmar-default/bigbelmar-default5.png","animations/bigbelmar-default/bigbelmar-default50.png","animations/bigbelmar-default/bigbelmar-default51.png","animations/bigbelmar-default/bigbelmar-default52.png","animations/bigbelmar-default/bigbelmar-default53.png","animations/bigbelmar-default/bigbelmar-default54.png","animations/bigbelmar-default/bigbelmar-default55.png","animations/bigbelmar-default/bigbelmar-default56.png","animations/bigbelmar-default/bigbelmar-default57.png","animations/bigbelmar-default/bigbelmar-default58.png","animations/bigbelmar-default/bigbelmar-default59.png","animations/bigbelmar-default/bigbelmar-default6.png","animations/bigbelmar-default/bigbelmar-default60.png","animations/bigbelmar-default/bigbelmar-default61.png","animations/bigbelmar-default/bigbelmar-default62.png","animations/bigbelmar-default/bigbelmar-default63.png","animations/bigbelmar-default/bigbelmar-default64.png","animations/bigbelmar-default/bigbelmar-default7.png","animations/bigbelmar-default/bigbelmar-default8.png","animations/bigbelmar-default/bigbelmar-default9.png","animations/bigbelmar-idle-long/bigbelmar-idle-long1.png","animations/bigbelmar-idle-long/bigbelmar-idle-long10.png","animations/bigbelmar-idle-long/bigbelmar-idle-long11.png","animations/bigbelmar-idle-long/bigbelmar-idle-long12.png","animations/bigbelmar-idle-long/bigbelmar-idle-long13.png","animations/bigbelmar-idle-long/bigbelmar-idle-long14.png","animations/bigbelmar-idle-long/bigbelmar-idle-long15.png","animations/bigbelmar-idle-long/bigbelmar-idle-long16.png","animations/bigbelmar-idle-long/bigbelmar-idle-long17.png","animations/bigbelmar-idle-long/bigbelmar-idle-long18.png","animations/bigbelmar-idle-long/bigbelmar-idle-long19.png","animations/bigbelmar-idle-long/bigbelmar-idle-long2.png","animations/bigbelmar-idle-long/bigbelmar-idle-long20.png","animations/bigbelmar-idle-long/bigbelmar-idle-long21.png","animations/bigbelmar-idle-long/bigbelmar-idle-long22.png","animations/bigbelmar-idle-long/bigbelmar-idle-long23.png","animations/bigbelmar-idle-long/bigbelmar-idle-long24.png","animations/bigbelmar-idle-long/bigbelmar-idle-long25.png","animations/bigbelmar-idle-long/bigbelmar-idle-long26.png","animations/bigbelmar-idle-long/bigbelmar-idle-long27.png","animations/bigbelmar-idle-long/bigbelmar-idle-long28.png","animations/bigbelmar-idle-long/bigbelmar-idle-long29.png","animations/bigbelmar-idle-long/bigbelmar-idle-long3.png","animations/bigbelmar-idle-long/bigbelmar-idle-long30.png","animations/bigbelmar-idle-long/bigbelmar-idle-long4.png","animations/bigbelmar-idle-long/bigbelmar-idle-long5.png","animations/bigbelmar-idle-long/bigbelmar-idle-long6.png","animations/bigbelmar-idle-long/bigbelmar-idle-long7.png","animations/bigbelmar-idle-long/bigbelmar-idle-long8.png","animations/bigbelmar-idle-long/bigbelmar-idle-long9.png","animations/bigbelmar-idle-short/bigbelmar-idle-short1.png","animations/bigbelmar-idle-short/bigbelmar-idle-short2.png","animations/bigbelmar-idle-short/bigbelmar-idle-short3.png","animations/bigbelmar-idle-short/bigbelmar-idle-short4.png","animations/bigbelmar-idle-short/bigbelmar-idle-short5.png","animations/bigbelmar-idle-short/bigbelmar-idle-short6.png","animations/bigbelmar-look/bigbelmar-look1.png","animations/bigbelmar-look/bigbelmar-look10.png","animations/bigbelmar-look/bigbelmar-look11.png","animations/bigbelmar-look/bigbelmar-look12.png","animations/bigbelmar-look/bigbelmar-look13.png","animations/bigbelmar-look/bigbelmar-look14.png","animations/bigbelmar-look/bigbelmar-look15.png","animations/bigbelmar-look/bigbelmar-look16.png","animations/bigbelmar-look/bigbelmar-look17.png","animations/bigbelmar-look/bigbelmar-look18.png","animations/bigbelmar-look/bigbelmar-look19.png","animations/bigbelmar-look/bigbelmar-look2.png","animations/bigbelmar-look/bigbelmar-look20.png","animations/bigbelmar-look/bigbelmar-look21.png","animations/bigbelmar-look/bigbelmar-look22.png","animations/bigbelmar-look/bigbelmar-look23.png","animations/bigbelmar-look/bigbelmar-look24.png","animations/bigbelmar-look/bigbelmar-look25.png","animations/bigbelmar-look/bigbelmar-look26.png","animations/bigbelmar-look/bigbelmar-look27.png","animations/bigbelmar-look/bigbelmar-look28.png","animations/bigbelmar-look/bigbelmar-look29.png","animations/bigbelmar-look/bigbelmar-look3.png","animations/bigbelmar-look/bigbelmar-look30.png","animations/bigbelmar-look/bigbelmar-look31.png","animations/bigbelmar-look/bigbelmar-look32.png","animations/bigbelmar-look/bigbelmar-look33.png","animations/bigbelmar-look/bigbelmar-look34.png","animations/bigbelmar-look/bigbelmar-look4.png","animations/bigbelmar-look/bigbelmar-look5.png","animations/bigbelmar-look/bigbelmar-look6.png","animations/bigbelmar-look/bigbelmar-look7.png","animations/bigbelmar-look/bigbelmar-look8.png","animations/bigbelmar-look/bigbelmar-look9.png","animations/bigbelmar-transition-in/bigbelmar-transition-in1.png","animations/bigbelmar-transition-in/bigbelmar-transition-in2.png","animations/bigbelmar-transition-in/bigbelmar-transition-in3.png","animations/bigbelmar-transition-in/bigbelmar-transition-in4.png","animations/bigbelmar-transition-out/bigbelmar-transition-out1.png","animations/bigbelmar-transition-out/bigbelmar-transition-out2.png","animations/bigbelmar-transition-out/bigbelmar-transition-out3.png","animations/bigbelmar-transition-out/bigbelmar-transition-out4.png","animations/bigbelmar-wave/bigbelmar-wave1.png","animations/bigbelmar-wave/bigbelmar-wave10.png","animations/bigbelmar-wave/bigbelmar-wave11.png","animations/bigbelmar-wave/bigbelmar-wave12.png","animations/bigbelmar-wave/bigbelmar-wave13.png","animations/bigbelmar-wave/bigbelmar-wave2.png","animations/bigbelmar-wave/bigbelmar-wave3.png","animations/bigbelmar-wave/bigbelmar-wave4.png","animations/bigbelmar-wave/bigbelmar-wave5.png","animations/bigbelmar-wave/bigbelmar-wave6.png","animations/bigbelmar-wave/bigbelmar-wave7.png","animations/bigbelmar-wave/bigbelmar-wave8.png","animations/bigbelmar-wave/bigbelmar-wave9.png","audio/ambience-music-0.mp3","audio/ambience-music-1.mp3","audio/ambience-music-2.mp3","audio/ambience-music-3.mp3","audio/light-rain.mp3","favicon.png","fonts/edunline.ttf","fonts/o4b.ttf","images/background-empty-room.gif","images/background.gif","images/mute_icon.png","images/mute_icon_white.png","images/rand.gif","images/sound_icon.png","images/sound_icon_white.png"]),
	mimeTypes: {".png":"image/png",".mp3":"audio/mpeg",".ttf":"font/ttf",".gif":"image/gif"},
	_: {
		client: {"start":{"file":"_app/immutable/entry/start.8f88b31d.js","imports":["_app/immutable/entry/start.8f88b31d.js","_app/immutable/chunks/index.f98f3a93.js","_app/immutable/chunks/singletons.8144378c.js"],"stylesheets":[],"fonts":[]},"app":{"file":"_app/immutable/entry/app.474fb57a.js","imports":["_app/immutable/entry/app.474fb57a.js","_app/immutable/chunks/index.f98f3a93.js"],"stylesheets":[],"fonts":[]}},
		nodes: [
			() => import('./chunks/0-32c4376b.js'),
			() => import('./chunks/1-52257d82.js'),
			() => import('./chunks/2-cc293286.js')
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 2 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
};

export { manifest };
//# sourceMappingURL=manifest.js.map
