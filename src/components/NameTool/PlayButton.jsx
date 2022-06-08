import React from "react";

function PlayButton({url, name}){
    return (
        <div className={name ? name : ""}>
            <audio src={url} controls />
            {name  && (<div className="mic-icon-info"> Click the play button to listen to the recorded audio</div>)}
        </div>
    )
}

export default PlayButton;