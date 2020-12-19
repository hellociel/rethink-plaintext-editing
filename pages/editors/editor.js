import React, { useState, useEffect, useMemo } from 'react';
import { createEditor } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import path from 'path';
import PropTypes from 'prop-types';
import css from '../../public/css/style.module.css';

function PlaintextEditor({ file, write, toggleEditMode }) {
  let createFile = function(value) {
    return [
      {
        children: [{ text: value }]
      }
    ];
  };
  const editor = useMemo(() => withReact(createEditor()), []);
  const [value, setValue] = useState(createFile(''));

  useEffect(() => {
    getText();
  }, [file]);

  async function getText() {
    setValue(createFile(await file.text()));
  }

  function saveCurrentText(value) {
    toggleEditMode(false);
    write(value);
  }

  return (
    <div className={css.preview}>
      <div className={css.title}>
        {path.basename(file.name)}
        <button
          className={css.saveButton}
          onClick={() => saveCurrentText(value)}
        >
          SAVE
        </button>
      </div>
      <div className={css.editButtonDiv}>
        <button
          className={css.editButton}
          onClick={() => {
            toggleEditMode(true);
          }}
        >
          EDIT
        </button>
      </div>
      <Slate
        editor={editor}
        value={value}
        onChange={value => {
          setValue(value);
        }}
      >
        <Editable
          onKeyDown={event => {
            console.log(event.key);
          }}
        />
      </Slate>
    </div>
  );
}

PlaintextEditor.propTypes = {
  file: PropTypes.object,
  write: PropTypes.func
};

export default PlaintextEditor;

// const PLAINTEXT = new File([`BODY TEXT`], `/${TITLE}.txt`, {
//   type: 'text/plain',
//   lastModified: new Date('2020-01-05T16:39:00')
// });
