import React from 'react';
import './Popup.css';
function Popup_Content() {
    return (
        <div>
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                More Information
            </button>
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">Historical</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div className="popup_border">
                                <h3>Potential Locations:</h3>
                                <ol>
                                    <li>Rome, Italy</li>
                                    <li>Athens, Greece</li>
                                    <li>Cairo, Egypt</li>
                                </ol>
                            </div>
                            <div className="popup_border">
                                <h3>Images:</h3>
                                <img src="logo512.png" />
                                <img src="logo512.png" />
                            </div>
                            <div className="popup_border last_element_temp">
                                <h3>Description:</h3>
                                <p class="popup_description_text">From the cradle of civilization to the streets of silicon valley. Learn about the people and locations that drove humanity forward. </p>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default Popup_Content;