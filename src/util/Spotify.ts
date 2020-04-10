let accessToken: string;
const clientId = '88e15208e59341738dd548e407fb8d80';
const redirectUri = 'http://localhost:3000/';

interface ITrackResponse {
    id: string;
    name: string;
    album: {
        name: string,
        images: [{ url: string }]
    };
    uri: string;
    artists: [{ name: string }];
}

const Spotify = {
    getAccessToken: () => {
        if (accessToken) {
            return;
        }
        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

        if (accessTokenMatch && expiresInMatch) {
            accessToken = accessTokenMatch[1];
            let expiresIn = +expiresInMatch[1];
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access token', '', '/');
        } else {
            const url = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
            window.location.href = url;
        }
    },

    search: async (term: string) => {
        Spotify.getAccessToken();
        const response = await fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
            headers: { Authorization: `Bearer ${accessToken}` }
        });

        if (response.ok) {
            const jsonResponse = await response.json();
            console.log(jsonResponse);
            const tracks = jsonResponse.tracks.items.map((track: ITrackResponse) => {
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

    savePlaylist: async (name: string, tracks: ITrackResponse[]) => {
        if (name && tracks) {
            const userId = await Spotify.getUserId();
            const playlistId = await Spotify.createPlaylist(userId, name);
            const success = await Spotify.addTracks(playlistId, tracks);
            if (success) {
                return true;
            }
        }
        return false;
    },

    getUserId: async () => {
        const url = 'https://api.spotify.com/v1/me';
        const response = await fetch(url, {
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

    createPlaylist: async (userId: string, name: string) => {
        const url = `https://api.spotify.com/v1/users/${userId}/playlists`;
        const data = { name: name };
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            const jsonResponse = await response.json();
            return jsonResponse.id;
        }
    },

    addTracks: async (playlistId: string, tracks: ITrackResponse[]) => {
        const url = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;
        const data = { uris: tracks.map(track => track.uri) };
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })

        if (response.ok) {
            return true;
        } else {
            return false;
        }
    }

};

export default Spotify;