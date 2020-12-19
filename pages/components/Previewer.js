import React, { useState, useEffect, useMemo } from 'react';

import { createEditor } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';

import PropTypes from 'prop-types';
import path from 'path';

import css from '../../public/css/style.module.css';

function Previewer({ file, toggleEditMode }) {
  const [value, setValue] = useState('');

  useEffect(() => {
    (async () => {
      setValue(await file.text());
    })();
  }, [file]);

  return (
    <div className={css.preview}>
      <div className={css.title}>
        {path.basename(file.name)}
        <button className={css.saveButton} onClick={() => toggleEditMode(true)}>
          SAVE
        </button>
      </div>
      <div className={css.editButtonDiv}>
        <button className={css.editButton} onClick={() => toggleEditMode(true)}>
          EDIT
        </button>
      </div>
      <div className={css.content}>{value}</div>
    </div>
  );
}

Previewer.propTypes = {
  file: PropTypes.object
};

export default Previewer;

{
  /* <button className={css.saveButton} onClick={() => setSaveMode(true)}>
SAVE
</button>
</div>
<div className={css.editButtonDiv}>
<button className={css.editButton} onClick={() => setEditMode(true)}>
EDIT
</button> */
}
