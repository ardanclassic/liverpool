import baseAPI from './api.js';
import { bookmarkPlayer, getAllBookmarkPlayer, getBookmarkPlayerById, deleteBookmarkPlayer, 
		 bookmarkLeague, getAllBookmarkLeague, getBookmarkLeagueById, deleteBookmarkLeague } from './db.js';
import { setHomePage, setGroupSquad, setSquad, setPlayerInfo, setLeagueInfo,
		 setAllLeagueInfo, getUrlParam, showLoading, errApiLimit } from './helper.js';

export function home() {
	showLoading('homepage');
	const base = new baseAPI();
	base.teamInfo()
	.then(info => setHomePage(info))
	.catch(() => errApiLimit())
}

export function allSquadInfo() {
	showLoading('team-squad');
	const base = new baseAPI();
	base.teamInfo()
	.then(info => {
		setGroupSquad();
		const arrTeam = document.querySelectorAll("#team-squad .group");
		arrTeam.forEach(mem => {
			let team = "";
			const spec = info.squad.filter(dt => dt.position === mem.id);
			spec.forEach(dt => team = setSquad(team, dt))
			mem.innerHTML = team;
		});
	})
	.catch(() => errApiLimit())
}

export function allLeagueInfo() {
	showLoading('competition-info');
	const base = new baseAPI();
	base.teamInfo()
	.then(info => setAllLeagueInfo(info.activeCompetitions))
	.catch(() => errApiLimit())
}

export async function playerInfo() {
	showLoading('player-info');
	const playerID = getUrlParam('id');
	const isPlayerAvailableOnDB = await getBookmarkPlayerById(parseInt(playerID));
	if (isPlayerAvailableOnDB) {
		// get data from indexedDB
		setPlayerInfo(isPlayerAvailableOnDB);
		const btnConfirm = document.getElementById("btn-player");
		btnConfirm.style.backgroundColor = "#B71C1C";
		btnConfirm.innerText = "Delete from Favorite List?";
		btnConfirm.onclick = () => deleteBookmarkPlayer(isPlayerAvailableOnDB);
	} else {
		// get data from server
		const base = new baseAPI();
		base.playerInfo(playerID)
		.then(info => {
			setPlayerInfo(info);
			const btnConfirm = document.getElementById("btn-player");
			btnConfirm.onclick = () => bookmarkPlayer(info)
		})
		.catch(() => errApiLimit())
	}
}

export async function leagueInfo() {
	showLoading('league-info');
	const leagueID = getUrlParam('id');
	const isLeagueAvailableOnDB = await getBookmarkLeagueById(parseInt(leagueID));
	if (isLeagueAvailableOnDB) {
		// get data from indexedDB
		setLeagueInfo(isLeagueAvailableOnDB);
		const btnConfirm = document.getElementById("btn-league");
		btnConfirm.style.backgroundColor = "#B71C1C";
		btnConfirm.innerText = "Delete from Favorite List?";
		btnConfirm.onclick = () => deleteBookmarkLeague(isLeagueAvailableOnDB);
	} else {
		// get data from server
		const base = new baseAPI();
		base.leagueInfo(leagueID)
		.then(info => {
			setLeagueInfo(info);
			const btnConfirm = document.getElementById("btn-league");
			btnConfirm.onclick = () => bookmarkLeague(info)
		})
		.catch(() => errApiLimit())
	}
}

export function getBookmark() {
	getAllBookmarkPlayer().then((players) => {
		let rowHTML = `<div class="row" id="bookmark-player"></div>`;
		let playersHTML = "";
		if (players.length > 0) {
			players.forEach((player) => playersHTML = setSquad(playersHTML, player));
		} else {
			playersHTML = "<h3>Still Empty?</h3>";
		}
		
		document.getElementById("bookmarkSquad").innerHTML = rowHTML;
		document.getElementById("bookmark-player").innerHTML = playersHTML;
	});

	getAllBookmarkLeague().then((leagues) => {
		let leagueHTML = "";
		if (leagues.length > 0) {
			leagueHTML = setAllLeagueInfo(leagues, true);
		} else {
			leagueHTML = "<h3>Still Empty?</h3>";
			document.getElementById("bookmarkLeague").innerHTML = leagueHTML;
		}
	});
}