
export default class baseAPI {
    constructor() {
        this.base_url = "https://api.football-data.org/v2/",
        this.config = {
            method: 'get',
            headers: {
                'X-Auth-Token': '4b32c1b165c54cbd968a2e485af78b0b'
            }
        }
    }

    async api(endpoint) {
        return fetch(this.base_url + endpoint, this.config)
        .then(async (res) => {
            const result = await res.json();
            return result;
        })
        .catch(() => false)
    }

    async teamInfo() {
        const info = await this.api(`teams/64`);
        return info;
    }

    async playerInfo(id) {
        const info = await this.api(`players/${id}`)
        return info
    }

    async leagueInfo(id) {
        const info = await this.api(`competitions/${id}/standings`)
        return info
    }
}