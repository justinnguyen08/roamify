import React from 'react';
import Popup from 'reactjs-popup';
import './Popup.css';
function Popup_Content() {
    return (
        <Popup trigger={<button className="button"> Open Popup </button>} modal>
            {close => (
                <div className="modal">
                    <button className="close" onClick={close}>
                        &times;
                    </button>
                    <div className="Popup">
                    <h1 className="popup_header">Historical</h1>
                    <div className="popup_border">
                        <h2>Potential Locations:</h2>
                        <ol>
                            <li>Rome, Italy</li>
                            <li>Athens, Greece</li>
                            <li>Cairo, Egypt</li>
                        </ol>
                    </div>
                    <div className="popup_border">
                        <h2>Images:</h2>
                        <img src="logo512.png" />
                        <img src="logo512.png" />
                    </div>
                    <div className="popup_border last_element_temp">
                        <h2>Description:</h2>
                        <p class="popup_description_text">From the cradle of civilization to the streets of silicon valley. Learn about the people and locations that drove humanity forward. </p>
                    </div>
                </div>
                </div>
            )}
        </Popup>
    );
}

export default Popup_Content;