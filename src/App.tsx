import React, { useCallback, useEffect, useState } from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import LineStyleIcon from '@material-ui/icons/LineStyle';
import RestorePageIcon from '@material-ui/icons/RestorePage';
import SaveIcon from '@material-ui/icons/Save';
import { prettifyData } from './prettify';
import './App.scss';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/hint/show-hint';
import 'codemirror/addon/hint/javascript-hint';
import 'codemirror/addon/hint/show-hint.css';
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/fold/foldcode';
import 'codemirror/addon/fold/foldgutter';
import 'codemirror/addon/fold/brace-fold';
import 'codemirror/addon/fold/comment-fold';
import 'codemirror/addon/fold/foldgutter.css';
import 'codemirror/addon/lint/lint.css';
import 'codemirror/addon/lint/lint';
import 'codemirror/addon/lint/javascript-lint';

const codeMirrorOptions: any = {
	mode: 'javascript',
	indentWithTabs: true,
	tabSize: 2,
	lineWrapping: true,
	smartIndent: true,
	lineNumbers: true,
	foldGutter: true,
	gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter', 'CodeMirror-lint-markers'],
	autoCloseTags: true,
	autoCloseBrackets: true,
	theme: 'material',
	keymap: 'sublime',
	lint: true,
};

const exampleData = {
	name: 'test name',
	inner: {
		value: 'test',
		num: 5,
	},
};
const copyToClipboard = (data: any, title: string = 'tdcs.data') => {
	const objIndex = data.indexOf('{');
	const str = `localStorage.setItem('${title}',${JSON.stringify(data.substring(objIndex))})`;
	navigator.clipboard
		.writeText(str)
		.then(() => {
			console.log('[INFO] Successfully copied to clipboard! ⭐');
		})
		.catch((e) => {
			console.error('[ERROR] Something has gone catastrophically wrong with this clipboard operation 😱', e);
		});
};

export const App = () => {
	const [cleanCopy, setCleanCopy] = useState<any>();
	const [editorCopy, setEditorCopy] = useState<any>();
	const [title, setTitle] = useState<any>('tdcs.data');

	useEffect(() => {
		try {
			let lsData = localStorage.getItem(title);
			let data = exampleData;
			if (lsData) {
				console.log('[INFO] Found Local Storage Data ✅');
				data = JSON.parse(lsData);
			}

			const prettified = prettifyData(JSON.stringify(data), title);
			setCleanCopy(prettified);
			setEditorCopy(prettified);
		} catch (e) {
			console.error('[ERROR] Oops something went wrong! Falling back to example data! 😱', e);
			const prettified = prettifyData(JSON.stringify(exampleData), title);
			setCleanCopy(prettified);
			setEditorCopy(prettified);
		}
	}, []);

	const saveData = useCallback(() => {
		try {
			const prettified = prettifyData(editorCopy, title);
			const objIndex = editorCopy.indexOf('{');
			localStorage.setItem(title, editorCopy.substring(objIndex));
			setCleanCopy(prettified);
			setEditorCopy(prettified);
		} catch (e) {
			console.error('[ERROR] Oops something went wrong trying to save that! 😱', e);
		}
	}, [editorCopy]);

	return (
		<div className="app">
			<CodeMirror
				className="codebox"
				value={editorCopy}
				options={codeMirrorOptions}
				onBeforeChange={(editor, data, value) => {
					setEditorCopy(value);
				}}
				onChange={() => {}}
			/>
			<BottomNavigation className="controls" showLabels>
				<BottomNavigationAction label="Save" value="Save" onClick={saveData} icon={<SaveIcon />} />
				<BottomNavigationAction label="Reset" value="Reset" onClick={() => setEditorCopy(cleanCopy)} icon={<RestorePageIcon />} />
				<BottomNavigationAction
					label="Prettify"
					value="Prettify"
					onClick={() => setEditorCopy(prettifyData(editorCopy, title))}
					icon={<LineStyleIcon />}
				/>
				<BottomNavigationAction label="Copy" value="Copy" onClick={() => copyToClipboard(editorCopy, title)} icon={<FileCopyIcon />} />
			</BottomNavigation>
		</div>
	);
};
