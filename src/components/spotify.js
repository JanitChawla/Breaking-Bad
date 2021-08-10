import React from "react";

const Spotify = () => {
    return (
        <div style={{ margin: "30px" , alignItems:'center' , justifyContent: 'center' , display: 'flex'}}>
            <iframe
                title="Spotify"
                src="https://open.spotify.com/embed/track/2hsLpiKNkWpd4e9QuVdhar"
                width="300"
                height="100"
                frameborder="0"
                allowtransparency="true"
                allow="encrypted-media"
            ></iframe>
        </div>
    );
};

export default Spotify;
