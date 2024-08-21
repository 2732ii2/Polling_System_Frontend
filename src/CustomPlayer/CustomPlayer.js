// import React, { useEffect } from 'react';

// const SpotifyPlayer = ({ accessToken, trackUri }) => {

//   useEffect(() => {
//     const loadSpotifySDK = () => {
//       // Check if the Spotify SDK is already loaded
//       if (window.Spotify) {
//         console.log("heloo");
//         // initializePlayer();
//         return;
//       }

//       // Create and add the script to the document
//       const script = document.createElement('script');
//       script.src = 'https://sdk.scdn.co/spotify-player.js';
//       script.async = true;
//       script.onload = () => {
//         // Ensure Spotify object is available
//         if (window.Spotify) {
//           console.log("hello");
//           // initializePlayer();
//         } else {
//           console.error('Spotify SDK not loaded');
//         }
//       };
//       script.onerror = () => console.error('Failed to load Spotify SDK');
//       document.body.appendChild(script);
//     };

//     // const initializePlayer = () => {
//     //   const player = new Spotify.Player({
//     //     name: 'Web Playback SDK Quick Start Player',
//     //     getOAuthToken: cb => { cb(accessToken); },
//     //   });

//     //   // Error handling
//     //   player.addListener('initialization_error', ({ message }) => console.error('Initialization Error:', message));
//     //   player.addListener('authentication_error', ({ message }) => console.error('Authentication Error:', message));
//     //   player.addListener('account_error', ({ message }) => console.error('Account Error:', message));
//     //   player.addListener('playback_error', ({ message }) => console.error('Playback Error:', message));

//     //   // Playback status updates
//     //   player.addListener('player_state_changed', state => console.log('Player State Changed:', state));

//     //   // Ready
//     //   player.addListener('ready', ({ device_id }) => {
//     //     console.log('Ready with Device ID', device_id);

//     //     // Play a track using the Web Playback SDK
//     //     player.connect().then(success => {
//     //       if (success) {
//     //         player.play({
//     //           spotify_uri: trackUri
//     //         }).then(() => {
//     //           console.log('Playing');
//     //         }).catch(error => console.error('Play Error:', error));
//     //       }
//     //     }).catch(error => console.error('Connect Error:', error));
//     //   });

//     //   // Not Ready
//     //   player.addListener('not_ready', ({ device_id }) => {
//     //     console.log('Device ID has gone offline', device_id);
//     //   });
//     // };

//     loadSpotifySDK();
//   }, [accessToken, trackUri]);

//   return <div />;
// };

// export default SpotifyPlayer;
