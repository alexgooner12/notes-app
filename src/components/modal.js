import React, { useState, useEffect } from 'react';

const Modal = ({ addNote, addDraft }) => {
    const [isShown, setIsShown] = useState(false);

    const [state, setState] = useState({ 
        title: '',
        body: '',
        author: '',
        status: 'uncompleted',
        date: new Date().toLocaleDateString()
    });

    const showModal = () => {
        setIsShown(true);
    };

    const closeModal = () => {
        setIsShown(false);
    };

    const handleAddNote = e => {
        e.preventDefault();
        const note = Object.assign({}, { ...state });
        addNote(note);
        closeModal();
        resetValues();
    };

    const resetValues = () => {
        setState({ 
            ...state, 
            title: '',
            body: '',
            author: ''
        });
    };

    const handleAddDraft = e => {
        const note = Object.assign({}, { ...state });
        if (note.author && note.body && note.title) {
            addDraft(note);
            closeModal();
            resetValues();
        } else {
            alert('Please fill in all the required fields')
        }
    }

    const dynammicModalClass = () => (isShown ? { display: 'block' } : '');

    useEffect(() => {
        if (!sessionStorage.popupModal) {
            const timer = setTimeout(() => {
                setIsShown(true);
                sessionStorage.popupModal = 1;
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, []);

    return isShown ? (
        <div className="modal" style={dynammicModalClass()} id="channelModal">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <button
                            onClick={closeModal}
                            style={{ color: '#fff' }}
                            type="button"
                            className="close"
                            data-dismiss="modal"
                            aria-label="Close"
                        >
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleAddNote}>
                            <div className="form-group">
                                <label 
                                    htmlFor="exampleInputTitle">Title
                                </label>
                                <input 
                                    type="text"
                                    required
                                    value={state.title} 
                                    onChange={e => setState({ ...state, title: e.target.value })} 
                                    className="form-control" 
                                    id="exampleInputTitle" 
                                />
                            </div>
                            <div className="form-group">
                                <label 
                                    htmlFor="exampleInputBody">
                                    Body
                                </label>
                                <input 
                                    type="text" 
                                    required
                                    value={state.body} 
                                    onChange={e => setState({ ...state, body: e.target.value })} 
                                    className="form-control" id="exampleInputBody" 
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputAuthor">Author</label>
                                <input 
                                    type="text" 
                                    required
                                    value={state.author} 
                                    onChange={e => setState({ ...state, author: e.target.value })} 
                                    className="form-control" 
                                    id="exampleInputAuthor" 
                                />
                            </div>
                            <button 
                                type="submit" 
                                className="btn btn-primary">
                                Submit
                            </button>
                        </form>

                    </div>
                    <div className="modal-footer justify-content-between">
                        <button 
                            onClick={closeModal} 
                            type="button" 
                            className="btn btn-lg">
                            Go back
                        </button>
                        <button 
                            onClick={handleAddDraft} 
                            type="button" 
                            className="btn btn-lg">
                            Save to Drafts
                        </button>
                    </div>
                </div>
            </div>
        </div>
    ) : <button onClick={showModal} className="btn btn-success">New Note</button>;
};

export default Modal;