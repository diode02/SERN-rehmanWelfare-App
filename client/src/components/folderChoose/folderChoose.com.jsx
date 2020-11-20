import { Button } from "primereact/button";
import React, { useRef } from "react";
import { generateBackup } from "../../utils/user.utils";

export default function ImportForm(props) {
  const folderInput = useRef(null);
  console.log(folderInput);

  return (
    <>
      <div className="form-group row">
        <div className="col-lg-6">
          <label>Select Folder</label>
        </div>
        <div className="col-lg-6">
          <input
            type="file"
            directory=""
            webkitdirectory=""
            className="form-control"
            ref={folderInput}
          />
        </div>
      </div>
      <Button
        label="Gen"
        onClick={() => {
          generateBackup();
        }}
      />
    </>
  );
}

// declare module 'react' {
//   interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
//     // extends React's HTMLAttributes
//     directory?: string;        // remember to make these attributes optional....
//     webkitdirectory?: string;
//   }
// }
