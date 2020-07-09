let CACHE_NAME = 'liverpool';
let urlsToCache = [
	'/',
	'/manifest.json',
	'/index.html',
	'/navbar.html',
	'/pages/404.html',
	'/pages/home.html',
	'/pages/competition.html',
	'/pages/player.html',
	'/pages/league.html',
	'/pages/team.html',
	'/pages/bookmark.html',
	'/css/materialize.min.css',
	'/css/style.css',

	/** js file */
	'/sw.js',
	'/js/materialize.min.js',
	'/js/sw-auth.js',
	'/js/idb.js',
	'/js/db.js',
	'/js/api.js',
	'/js/helper.js',
	'/js/script_1.js',
	'/js/script_2.js',

	/** image assets */
	'assets/icon/coach.png',
	'assets/icon/football-player.png',
	'assets/icon/launch-96.png',
	'assets/icon/launch-128.png',
	'assets/icon/launch-144.png',
	'assets/icon/launch-192.png',
	'assets/icon/logo-144.png',
	'assets/icon/logo-512.png',
	'assets/icon/up.png',
	'assets/image/404.png',
	'assets/image/hero.jpg',
	'assets/image/lfc.jpg',
	'assets/image/Premier League.png',
	'assets/image/UEFA Champions League.png',
];

self.addEventListener('install', function (event) {
	event.waitUntil(
		caches.open(CACHE_NAME)
		.then(function (cache) {
			return cache.addAll(urlsToCache);
		})
	);
})

self.addEventListener('fetch', function (event) {
	const base_url = "https://api.football-data.org/v2/";
	if (event.request.url.indexOf(base_url) > -1) {
		event.respondWith(
			caches.open(CACHE_NAME).then(function (cache) {
				return fetch(event.request).then(function (response) {
					cache.put(event.request.url, response.clone());
					return response;
				})
			})
		);
	} else {
		event.respondWith(
			caches.match(event.request, {
				ignoreSearch: true
			}).then(function (response) {
				return response || fetch(event.request);
			})
		)
	}
});

self.addEventListener('activate', function (event) {
	event.waitUntil(
		caches.keys()
		.then(function (cacheNames) {
			return Promise.all(
				cacheNames.map(function (cacheName) {
					if (cacheName != CACHE_NAME) {
						console.log("ServiceWorker: cache " + cacheName + " dihapus");
						return caches.delete(cacheName);
					}
				})
			);
		})
	);
})

self.addEventListener('push', function (event) {
	let body;
	if (event.data) {
		body = event.data.text();
	} else {
		body = 'Push message no payload';
	}
    const title = 'Liverpool Info';
	let options = {
		body: body,
        icon: 'assets/icon/launch-192.png',
        badge: 'assets/icon/launch-32.png',
        image: 'assets/image/hero.jpg',
		vibrate: [100, 50, 100],
		data: {
			dateOfArrival: Date.now(),
			primaryKey: 1
		}
	};
	event.waitUntil(
		self.registration.showNotification(title, options)
	);
});