
function setHomePage(info) {
    const element = `
		<div class="img-parallax"></div>
		<div class="parallax-shadow"></div>
		<div class="container">
			<div class="banner-text center">
				<h1>${info.name}</h1>
				<p class="flow-text">${info.address}, ${info.area.name}</p>
				<a href="${info.website}" target="_blank" rel="noopener noreferrer">
					<i class="material-icons">explore</i>
				</a>
				<a href="mailto:${info.email}">
					<i class="material-icons">email</i>
				</a>
			</div>
			<div class="club-info">
				<h1>Detail Information</h1>
				<table>
					<tbody>
						<tr>
							<td>Club Name</td>
							<td>${info.name}</td>
						</tr>
						<tr>
							<td>Address</td>
							<td>${info.address}, ${info.area.name}</td>
						</tr>
						<tr>
							<td>Venue</td>
							<td>${info.venue}</td>
						</tr>
						<tr>
							<td>Founded</td>
							<td>${info.founded}</td>
						</tr>
						<tr>
							<td>Website</td>
							<td>
								<a href="${info.website}" target="_blank" rel="noopener noreferrer">
									${info.website}
								</a>
							</td>
						</tr>
						<tr>
							<td>Phone</td>
							<td>
								<a href="tel:${info.phone}">
									${info.phone}
								</a>
							</td>
						</tr>
						<tr>
							<td>Email</td>
							<td>
								<a href="mailto:${info.email}">
									${info.email}
								</a>
							</td>
						</tr>
						<tr>
							<td>Last Updated</td>
							<td>${setDate(info.lastUpdated)}</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
    `;

	document.getElementById("homepage").innerHTML = element;
}

function setGroupSquad() {
	const allSquad = [
		{ id: "Goalkeeper", division: 'GOALKEEPER' },
		{ id: "Defender", division: 'DEFENDER' },
		{ id: "Midfielder", division: 'MIDFIELDER' },
		{ id: "Attacker", division: 'FORWARD' }
	]

	let group = `
		<h1><i class="material-icons">chevron_right</i>COACH</h1>
		<div class="row coach">
			<div class="col s6 m4 l3">
				<a href="#player?id=9344">
					<div class="card">
						<div class="info-content">
							<p class="card-title">Jürgen Klopp</p>
							<div class="card-image">
								<img src="../assets/icon/coach.png">
							</div>
						</div>
					</div>
				</a>
			</div>
		</div>
	`;

	allSquad.forEach(dt => {
		group += `
			<h1><i class="material-icons">chevron_right</i>${ dt.division }</h1>
			<div class="row group" id="${dt.id}"></div>
		`;
	})
	document.getElementById("team-squad").innerHTML = group;
}

function setSquad(val, dt) {
	return val += `
		<div class="col s6 m4 l3">
			<a href="#player?id=${dt.id}">
				<div class="card">
					<div class="info-content">
						<p class="card-title">${dt.name}</p>
						<h2>${dt.shirtNumber ? dt.shirtNumber : '' }</h2>
						<div class="card-image">
							<img src="../assets/icon/football-player.png">
						</div>
					</div>
				</div>
			</a>
		</div>
	`;
}

function setPlayerInfo(info) {
    const element = `
		<div class="col s12 m6 l5">
			${ info.id === 9344 ?
				`<img id="coach-img" src="../assets/icon/coach.png" alt="img-player">` :
				`<img src="../assets/icon/football-player.png" alt="img-player">`
			}
		</div>
		<div class="col s12 m6 l7">
			<table>
				<tbody>
					<tr>
						<td>Name</td>
						<td>${info.name}</td>
					</tr>
					<tr>
						<td>Nickname</td>
						<td>${info.firstName}</td>
					</tr>
					<tr>
						<td>Birthdate</td>
						<td>${setDate(info.dateOfBirth)}</td>
					</tr>
					<tr>
						<td>Country of Birth</td>
						<td>${info.countryOfBirth}</td>
					</tr>
					<tr>
						<td>Position</td>
						<td>${info.position ? info.position : '-'}</td>
					</tr>
					<tr>
						<td>Shirt Number</td>
						<td>${info.shirtNumber ? info.shirtNumber : '-'}</td>
					</tr>
					<tr>
						<td>Nationality</td>
						<td>${info.nationality}</td>
					</tr>
					<tr>
						<td>Last Updated</td>
						<td>${setDate(info.lastUpdated)}</td>
					</tr>
				</tbody>
			</table>
		</div>

		<div class="waves-effect waves-light btn" id="btn-player">
			Save as Your Favorite!
		</div>
	`;

	if (!info) {
		// error when get api limitation
		errApiLimit()
	} else if (!info.name) {
		// error when data resource is not found
		errDataNotFound()
	} else {
		// api successfully retrieved
		document.getElementById("player-info").innerHTML = element;
	}
}

function setAllLeagueInfo(info, fromBookmark = false) {
	let dataCompetitions = ``;
	info.forEach(league => {
		dataCompetitions += `
			<ul class="collection">
				<li class="collection-item row">
					<div class="col s3">
						<a href="#league?id=${league.id}">
							<img src="../assets/image/${league.name}.png" alt="${league.name}">
						</a>
					</div>
					<div class="col s9">
						<a href="#league?id=${league.id}">
							<span>${league.name}</span>
						</a>
					</div>
				</li>
			</ul>
		`;
	})

	if (fromBookmark) {
		document.getElementById("bookmarkLeague").innerHTML = dataCompetitions;
	} else {
		document.getElementById("competition-info").innerHTML = dataCompetitions;
	}
}

function setLeagueInfo(info) {

	// setup for indexedDB
	info.id = info.competition.id;
	info.name = info.competition.name;

	setLeagueHeaderSection(info)
	const params = {
		standings: info.standings.filter(standing => standing.type === 'TOTAL'),
		leagueType: info.standings[0].stage,
		table : ``,
		eachData: ``
	}

	params.leagueType === "REGULAR_SEASON" ? 
		setRegularSeason(params) : setTournamentLeague(params)
}

function showLoading(id) {
    const element = `<div class="preloader-wrapper big active">
        <div class="spinner-layer spinner-red-only">
            <div class="circle-clipper left">
                <div class="circle"></div>
            </div>
            <div class="gap-patch">
                <div class="circle"></div>
            </div>
            <div class="circle-clipper right">
                <div class="circle"></div>
            </div>
        </div>
    </div>`;
    
    return document.getElementById(id).innerHTML = element;
}

function errDataNotFound() {
    const element = `
    <div class="error-api container align-center">
        <h1>Sorry, data not found!</h1>
        <h2 class="red-text">Try other data resource</h2>
    </div>`;
    
    return document.getElementById('bodyContent').innerHTML = element;
}

function errApiLimit() {
    const element = `
    <div class="error-api container align-center">
        <h1>Sorry, there's an api limitation!</h1>
        <h2 class="red-text">Wait a sec and refresh this page again</h2>
    </div>`;
    
    return document.getElementById('bodyContent').innerHTML = element;
}

function errDataOffline() {
    const element = `
    <div class="error-api container align-center">
        <h1>Sorry, we don't have this data information yet!</h1>
        <h2 class="red-text">You can grab the data while online!</h2>
    </div>`;
    
    return document.getElementById('bodyContent').innerHTML = element;
}

function setDate(val) {
	let date = new Date(val);
	let options = { year: 'numeric', month: 'long', day: 'numeric' };
	return date.toLocaleDateString("en", options);
}

function getUrlParam(param, url) {
    if (!url) url = window.location.href;
    param = param.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + param + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}




function setLeagueHeaderSection(data) {
	const element = `
		<div class="card">
			<div class="card-content white-text">
				<span class="card-title">${data.competition.name}</span>
				<p>Last Updated: <span>${setDate(data.competition.lastUpdated)}</span></p>
				<div class="waves-effect waves-light btn" id="btn-league">
					Save as Your Favorite!
				</div>
			</div>
		</div>
		<div class="divider"></div>
		<h1>Standings</h1>
		<div id="league-standing"></div>
	`;
	document.getElementById("league-info").innerHTML = element;
}

function setRegularSeason(data) {
	data.table = `
		<table class="responsive-table centered">
			<thead>
				<tr>
					<th>Position</th>
					<th>Name</th>
					<th>Points</th>
					<th>Won</th>
					<th>Draw</th>
					<th>Lost</th>
				</tr>
			</thead>
			<tbody id="standingTable"></tbody>
		</table>
	`;

	data.standings.forEach(stand => data.eachData = setClubStanding(data.eachData, stand.table))
	document.getElementById("league-standing").innerHTML = data.table;
	document.getElementById("standingTable").innerHTML = data.eachData;
}

function setTournamentLeague(data) {
	/** Set Group Table */
	data.standings.forEach(stand => data.table = setGroupLeagueDivision(data.table, stand))
	document.getElementById("league-standing").innerHTML = data.table;
	
	/** Set Club Standing */
	data.standings.forEach(stand => {
		data.eachData = ``;
		stand.table.forEach(dt => {
			data.eachData += `
				<tr>
					<td>${dt.position}</td>
					<td>${dt.team.name}</td>
					<td>${dt.points}</td>
					<td>${dt.won}</td>
					<td>${dt.lost}</td>
					<td>${dt.draw}</td>
				</tr>
			`;
		})
		document.getElementById(stand.group).innerHTML = data.eachData;
	})
}

function setClubStanding(each, standings) {
	standings.forEach(data => {
		each += `
			<tr>
				<td>${data.position}</td>
				<td>${data.team.name}</td>
				<td>${data.points}</td>
				<td>${data.won}</td>
				<td>${data.lost}</td>
				<td>${data.draw}</td>
			</tr>
		`;
	})
	return each;
}

function setGroupLeagueDivision(each, data) {
	each += `
		<div class="group-standing">
			<h1>${data.group.replace('_', ' ')}</h1>
			<table class="responsive-table centered">
				<thead>
					<tr>
						<th>Position</th>
						<th>Name</th>
						<th>Points</th>
						<th>Won</th>
						<th>Draw</th>
						<th>Lost</th>
					</tr>
				</thead>
				<tbody id="${data.group}"></tbody>
			</table>
		</div>
	`;
	return each;
}