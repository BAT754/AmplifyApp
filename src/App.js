import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import { API } from 'aws-amplify';
import {withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'
import { listNotes } from './graphql/queries';
import { createNote as createNoteMutation, deleteNote as deleteNoteMutation } from './graphql/mutations';

const initialFormState = { name: '', description: '' }


function App() 
{
    const [notes, setNotes] = useState([]);
    const [formData, setFormData] = useState(initialFormState);
    
    useEffect(() => {
        fetchNotes();
    }, []);
    
    async function fetchNotes()
    {
        const apiData = await API.graphql({query: listNotes });
        setNotes(apiData.data.listNotes.items);        
    }
    
    async function createNote()
    {
        if (!formData.name || !formData.description) return;
        await API.graphql({ query: createNoteMutation, variables: { input: formData } });
        setNotes([ ...notes, formData ]);
        setFormData(initialFormState);
    }
    
    async function deleteNote({ id })
    {
        const newNotesArray = notes.filter(note => note.id !== id);
        setNotes(newNotesArray);
        await API.graphql({ query: deleteNoteMutation, variables: { input: {id} }});
    }
    
  return (
    <div className="App">
      <header className = "App-header">
      <h1> My Notes App </h1>
        <input
            onChange={e => setFormData({ ...formData, 'name': e.target.value})}
            placeholder = "Note name"
            value={formData.name}
        />
        <input
            onChange={e => setFormData({ ...formData, 'description': e.target.value})}
            placeholder = "Note description"
            value = {formData.description}
        />
        <button onClick={createNote}> Create Note </button>
        <div style ={{marginBottom: 30}}>
        {
            notes.map(note => (
                <div key ={note.id || note.name}>
                    <h2>{note.name}</h2>
                    <p>{note.description}</p>
                    <button onClick={() => deleteNote(note)}>Yeet that note</button>
                </div>
            ))
        }
        </div>
        

        
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Heck yeah. I did a thing.
            </p>
            <a
              className="App-link"
              href="https://s3.amazonaws.com/ocn-media/d677ba27-a53d-4a69-8cc7-e217bc93fe86.jpeg"
              target="_blank"
              rel="noopener noreferrer"
            >
              What could this be?
            </a>
        </header>
 
      <AmplifySignOut />
    </div>
  );
}

export default withAuthenticator(App);
