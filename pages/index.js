import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import path from 'path';
import Previewer from './components/Previewer';

import { listFiles } from '../files';

// Used below, these need to be registered

import PlaintextEditor from './editors/editor';

import FilesTable from './components/FilesTable.js';

import css from '../public/css/style.module.css';
import { Editor, EditorState } from 'draft-js';

// Uncomment keys to register editors for media types
const REGISTERED_EDITORS = {
  'text/plain': PlaintextEditor,
  'text/markdown': PlaintextEditor,
  'text/javascript': PlaintextEditor,
  'application/json': PlaintextEditor
};

function PlaintextFilesChallenge() {
  const [files, setFiles] = useState([]);
  const [activeFile, setActiveFile] = useState(null);
  const [editMode, toggleEditMode] = useState(false);

  useEffect(() => {
    const files = listFiles();
    setFiles(files);
  }, []);

  const write = value => {
    if (!value) {
      let newFile = new File([''], 'Untitled.txt', {
        type: 'text/plain'
      });
      setFiles([...files, newFile]);
    } else {
      activeFile.text(value);
    }
    // TODO: Write the file to the `files` array
  };

  const newFile = () => {
    var newfile = new File([''], 'newFile.txt', {
      type: 'text/plain'
    });
    return newfile;
  };

  const Editor = activeFile ? REGISTERED_EDITORS[activeFile.type] : null;

  return (
    <div className={css.page}>
      <Head>
        <title>Rethink Engineering Challenge</title>
      </Head>
      <aside>
        <header>
          <div className={css.tagline}>Rethink Engineering Challenge</div>
          <h1>Fun With Plaintext</h1>
          <div className={css.description}>
            Let{"'"}s explore files in JavaScript. What could be more fun than
            rendering and editing plaintext? Not much, as it turns out.
          </div>
        </header>

        <FilesTable
          files={files}
          activeFile={activeFile}
          setActiveFile={setActiveFile}
        />
        <button className={css.createButton} onClick={() => write()}>
          CREATE A NEW FILE
        </button>

        <div style={{ flex: 1 }}></div>

        <footer>
          <div className={css.link}>
            <a href="https://v3.rethink.software/jobs">Rethink Software</a>
            &nbsp;—&nbsp;Frontend Engineering Challenge
          </div>
          <div className={css.link}>
            Questions? Feedback? Email us at jobs@rethink.software
          </div>
        </footer>
      </aside>

      <main className={css.editorWindow}>
        {activeFile && (
          <>
            {!editMode ? (
              <Previewer file={activeFile} toggleEditMode={toggleEditMode} />
            ) : (
              <Editor
                file={activeFile}
                write={write}
                toggleEditMode={toggleEditMode}
              />
            )}
          </>
        )}

        {!activeFile && (
          <div className={css.empty}>Select a file to view or edit</div>
        )}
      </main>
    </div>
  );
}

export default PlaintextFilesChallenge;
