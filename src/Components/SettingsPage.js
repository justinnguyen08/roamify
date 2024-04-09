import React from 'react';

const SettingsPage = ({ onBackClick }) => {
  return (
    <div className="settings-page">
      <h1>Settings</h1>
      <div>
        <label htmlFor="setting1">Setting 1</label>
        <input type="checkbox" id="setting1" name="setting1" />
      </div>
      <div>
        <label htmlFor="setting2">Setting 2</label>
        <input type="checkbox" id="setting2" name="setting2" />
      </div>
      <div>
        <button onClick={onBackClick}>Back</button>
      </div>
    </div>
  );
};

export default SettingsPage;
