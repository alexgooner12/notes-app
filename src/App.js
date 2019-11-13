import React, { useState } from 'react';
import initialState from './notes.json';
import Modal from './components/modal';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
	const [notes, setNotes] = useState(initialState);
	const [query, setQuery] = useState('');
	const [drafts, setDrafts] = useState('');
	const [showDrafts, setShowDrafts] = useState(false);

	const addNote = newNote => {
		const noteExists = notes.find(note => note.title === newNote.title && note.author === newNote.author);
		if (!noteExists) {
			const newNotes = [...notes, newNote];
			setNotes(newNotes);
		} else {
			alert(`Note under ${newNote.title} by ${newNote.author} already exists`);
		}
	}

	const deleteNote = i => {
		const newNotes = notes.filter((note, index) => index !== i);
		setNotes(newNotes);
	}

	const displayAllNotes = () => {
		return notes.map((note, i) => {
			return <tr key={i}>
				<th scope="row">{i + 1}</th>
				<td>{note.author}</td>
				<td>{note.title}</td>
				<td>{note.body}</td>
				<td>{note.date}</td>
				<td>{note.status}</td>
				<td>
					<button
						onClick={() => deleteNote(i)}
						className="btn btn-danger">Delete
					</button>
				</td>
			</tr>
		})
	}

	const sortNotesByDate = () => {
		const sortedNotes = Array.from(notes).sort((a, b) => {
			return new Date(b.date) - new Date(a.date);
		});
		setNotes(sortedNotes);
	}

	const handleQuery = query => {
		setQuery(query);
	}

	const filterNotes = () => {
		if (query) {
			return notes
				.filter(note => note.title.toUpperCase().startsWith(query.toUpperCase()))
				.map((filteredNote, i) => {
					return <tr key={i}>
						<th scope="row">{i + 1}</th>
						<td>{filteredNote.author}</td>
						<td>{filteredNote.title}</td>
						<td>{filteredNote.body}</td>
						<td>{filteredNote.date}</td>
						<td>{filteredNote.status}</td>
						<td>
							<button
								onClick={() => deleteNote(i)}
								className="btn btn-danger">Delete
							</button>
						</td>
					</tr>
				});
		}
	}

	const addDraft = newDraft => {
		console.log(newDraft);
		const draftExists = drafts.length ? drafts.find(draft => draft.title === newDraft.title && draft.author === newDraft.author) : null;
		if (!draftExists) {
			const newDrafts = [...drafts, newDraft];
			setDrafts(newDrafts);
		} else {
			alert(`Draft under ${newDraft.title} by ${newDraft.author} already exists. You may publish that one`);
		}
	}

	const deleteDraft = i => {
		const newDrafts = drafts.filter((draft, index) => index !== i);
		setDrafts(newDrafts);
	}

	const publishDraft = i => {
		let draftForPublishing = drafts.find((draft, index) => index === i);
		draftForPublishing = Object.assign({}, { ...draftForPublishing, date: new Date().toLocaleDateString() });
		deleteDraft(i);
		addNote(draftForPublishing);
	}

	const displayDrafts = () => {
		return <table className="table">
			<thead>
				<tr>
					<th scope="col">#</th>
					<th scope="col">Author</th>
					<th scope="col">Title</th>
					<th scope="col">Body</th>
					<th scope="col">Date</th>
					<th scope="col">Status</th>
					<th scope="col">Action</th>
				</tr>
			</thead>
			<tbody>
				{drafts.map((draft, i) => {
					return <tr key={i}>
						<th scope="row">{i + 1}</th>
						<td>{draft.author}</td>
						<td>{draft.title}</td>
						<td>{draft.body}</td>
						<td>{draft.date}</td>
						<td>{draft.status}</td>
						<td>
							<button className="btn btn-danger" onClick={() => deleteDraft(i)}>Delete</button>
							<button className="btn btn-success" onClick={() => publishDraft(i)}>Publish</button>
						</td>
					</tr>
				})
				}
			</tbody>
		</table>
	}

	return (
		<div className="App">
			<header>
				<div className="jumbotron">
					<h1 className="display-4 mb-4">Welcome to your Notes app</h1>
					<p className="lead">Small, convenient app which helps you stay organized and productive.</p>
					<p className="lead">Create notes, delete on finishing, save to drafts and publish later.</p>
				</div>
			</header>
			<div className="container">
				<div className="form-group form-inline justify-content-center mb-3">
					<label>Filter out notes by title</label>
					<input
						type="text"
						value={query}
						onChange={e => handleQuery(e.target.value)}
						className="form-control"
					/>
				</div>

				<div className="text-right">
					<button onClick={sortNotesByDate} className="btn btn-secondary">Sort by date</button>
				</div>

				<table className="table">
					<thead>
						<tr>
							<th scope="col">#</th>
							<th scope="col">Author</th>
							<th scope="col">Title</th>
							<th scope="col">Body</th>
							<th scope="col">Date</th>
							<th scope="col">Status</th>
							<th scope="col">Action</th>
						</tr>
					</thead>
					<tbody>
						{query ? filterNotes() : displayAllNotes()}
					</tbody>
				</table>

				<Modal addNote={addNote} addDraft={addDraft} />
				<div className="mb-5 text-right">
					{drafts.length ? <div>
						<button onClick={() => setShowDrafts(!showDrafts)} className="btn btn-primary">
							You have <span className="badge badge-light">{drafts.length}</span>
							{drafts.length === 1 ? `draft` : `drafts`}
						</button>
					</div>
						: null}
				</div>
				<div className="mb-5">
					{showDrafts && drafts.length ? displayDrafts() : null}
				</div>
			</div>
		</div>
	)
}

export default App;
