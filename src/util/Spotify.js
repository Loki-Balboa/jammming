let accessToken;
const clientId = '88e15208e59341738dd548e407fb8d80';
const redirectUri = 'http://localhost:3000/';

const Spotify = {
    getAccessToken: () => {
        if (accessToken) {
            return;
        }
        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

        if (accessTokenMatch && expiresInMatch) {
            accessToken = accessTokenMatch[1];
            let expiresIn = expiresInMatch[1];
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access token', null, '/');
        } else {
            const url = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
            window.location = url;
        }
    },

    search: async term => {
        Spotify.getAccessToken();
        const response = await fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
            headers: { Authorization: `Bearer ${accessToken}` }
        });

        if (response.ok) {
            const jsonResponse = await response.json();
            console.log(jsonResponse);
            const tracks = jsonResponse.tracks.items.map(track => {
                return {
                    id: track.id,
                    name: track.name,
                    album: track.album.name,
                    artist: track.artists[0].name,
                    image: track.album.images[0].url,
                    uri: track.uri
                }
            });
            return tracks;
        } else {
            console.log('Request failed!');
        }
    },

    savePlaylist: async (name, tracks) => {
        if (name && tracks) {
            const userId = await Spotify.getUserId();
            Spotify.createPlaylist(userId, name);
        }
        return;
    },

    getUserId: async () => {
        const userUrl = 'https://api.spotify.com/v1/me';
        const response = await fetch(userUrl, {
            headers: { Authorization: `Bearer ${accessToken}` }
        })
        if (response.ok) {
            const jsonResponse = await response.json();
            console.log(jsonResponse);
            return jsonResponse.id;
        } else {
            console.log('Request failed!');
        }
    },

    createPlaylist: async (userId, name) => {

    }

};

export default Spotify;