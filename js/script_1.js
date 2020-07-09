import { home, playerInfo, allSquadInfo, leagueInfo, allLeagueInfo, getBookmark } from './script_2.js';

document.addEventListener('DOMContentLoaded', function() {

	// Detect Hash URL Change
	window.onhashchange = () => getPage();

	// Running when page load
	getPage()

	// SIDEBAR NAVIGATION
	const elems = document.querySelectorAll('.sidenav');
	M.Sidenav.init(elems, { edge: 'right' });
	loadNav();

	function loadNav()
	{
		const xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4){
				if(this.status != 200) return;

				// Muat daftar tautan menu
				document.querySelectorAll(".sidenav, .topnav")
				.forEach(function(elm){
					elm.innerHTML = xhttp.responseText;
				});

				// Daftarkan event listener untuk setiap tautan menu
				document.querySelectorAll('.sidenav a, .topnav a, .brand-logo')
				.forEach(function(elm) {
					elm.addEventListener('click', function(event) {
						// Tutup sidenav
						const sidenav = document.querySelector('.sidenav');
						M.Sidenav.getInstance(sidenav).close();
					});
				});
			}
		};
		xhttp.open("GET", 'navbar.html', true);
		xhttp.send();
	}

	function loadPage(page)
	{
		const xhttp = new XMLHttpRequest();
		xhttp.open("GET", `pages/${page}.html`, true);
		xhttp.send();
		xhttp.onreadystatechange = function() {
			if (this.readyState === 4){
				const content = document.querySelector(".body-content");
				if(this.status === 200) {
					content.innerHTML = xhttp.responseText;
					setPage();
					showTopButton();
				} else if(this.status === 404) {
					content.innerHTML = `
						<div class="container center not-found">
							<img width="256" src="assets/image/404.png" />
							<h1>Page Not Found!</h1>
						</div>
					`;
				} else {
					content.innerHTML = "<p>Ups.. halaman tidak dapat diakses.</p>";
				}
			}
		};
	}

	// function callback based on URL Path
	function setPage() {
		let page = window.location.hash;
		let result =  page.indexOf("?") > -1 ? 
						page.substring(1, page.indexOf('?')) :
						window.location.hash.substr(1)
		
		switch (result) {
			case '':
				home();
				break;
			case 'team':
				allSquadInfo();
				break;
			case 'competition':
				allLeagueInfo();
				break;
			case 'player':
				playerInfo();
				break;
			case 'league':
				leagueInfo();
				break;
			case 'bookmark':
				getBookmark();
				break;
			default:
				break;
		}
		
	}

	// redirect to certain page based on URL Change
	function getPage() {
		let page = window.location.hash;
		let result =  page.indexOf("?") > -1 ? 
				page.substring(1, page.indexOf('?')) :
				window.location.hash.substr(1)
				
		if(result === '') result = 'home';
		loadPage(result);
	}

	// Show Up Button when Page Scroll Down
	function showTopButton() {
		const scrollTopButton = document.querySelector(".scrollTop");
		window.addEventListener("scroll", () => {
			if (window.pageYOffset > 200) {
				scrollTopButton.classList.add("active")
			} else {
				scrollTopButton.classList.remove("active")
			}
		})
		scrollTopButton.addEventListener("click", function () {
			window.scroll({
				top: 0, 
				left: 0, 
				behavior: 'smooth'
			});
		});
	}
});