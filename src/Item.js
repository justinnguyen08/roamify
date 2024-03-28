// import React from 'react';

// export default function Item({ item }) {
//   return (
//     <div>
//       {item.name}
//     </div>
//   );
// }

import React from 'react';

function Item({ item, onClick }) {
  return (
    <li className="mb-3 d-flex align-items-center justify-content-between border p-3">
      <div> {item.name} </div>
      <button className="button" onClick={onClick}>
        Open Popup
      </button>
    </li>
  );
}

export default Item;
