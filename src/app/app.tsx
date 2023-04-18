// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.scss';
import Split from 'react-split';
import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid'
import Sidebar from 'src/sidebar/sidebar';
import Editor from 'src/editor/editor';

interface Note {
   id: string;
   title: string;
   content: string;
 }

export function App() {
   const [notes, setNotesArray] = useState<Note[]>(
      () => {
         const localStorageNotes = localStorage.getItem('notes');
         return localStorageNotes ? JSON.parse(localStorageNotes) : [];
       }
   );
      const [currentNoteId, setCurrentNoteId] = useState<string>((notes[0] && notes[0].id) || "");

   useEffect(()=>{
      localStorage.setItem('notes',JSON.stringify(notes));
   },[notes])

   function createNote() {
      const newNote:Note = {
         id: nanoid(),
         title:'',
         content: "# Put your notes here"
      }
      setNotesArray(prev=> [...prev,newNote]);
      setCurrentNoteId(newNote.id);
   }

   function updateCurrentNote(ids:string):void{
      setCurrentNoteId(ids);
   }


   function updateCurrentNoteContent(text:string){
      setNotesArray(oldNotes => {
         const currentModified = oldNotes.find(elem => elem.id === currentNoteId);
         return currentModified
           ? [{ ...currentModified, content: text }, ...oldNotes.filter(elem => elem !== currentModified)]
           : oldNotes;
       })
   }

   function removeNote(ids:string):void{
      setNotesArray(prev=>{
         console.log(prev.filter(elem=>elem.id!=ids));
         return prev.filter(elem=>elem.id!=ids);
      });
   }

   function changeNoteTitle(text:string,ids:string):void{
      setNotesArray(prev=>prev.map(elem=>{
            return elem.id===ids?
            {...elem,title:text}
            : elem
         }
      ));
      setNotesArray(oldNotes => {
         const currentModified = oldNotes.find(elem => elem.id === currentNoteId);
         return currentModified
           ? [{ ...currentModified}, ...oldNotes.filter(elem => elem !== currentModified)]
           : oldNotes;
       })
   }



   return (
      <main>
         {
            notes.length > 0 ?
               <Split
                  minSize={200}
                  cursor="col-resize"
                  sizes={[25, 80]}
                  direction="horizontal"
                  className="split"
               >
                  <Sidebar notes={notes} createNote={createNote} removeNote={removeNote} updateCurrentNote={updateCurrentNote} currentNoteId={currentNoteId} changeNoteTitle={changeNoteTitle} />
                  {
                     currentNoteId &&
                     notes.length>0 &&
                     <Editor  value={ notes.find(note => {
                        return note.id === currentNoteId
                    }) || notes[0] }
                        updateCurrentNoteContent={updateCurrentNoteContent}
                     />
                  }

               </Split>
               :
               <div className='start'>
                  <p className='start__title' >You haven't any notes yet</p>
                  <button onClick={createNote} >Create One</button>
               </div>
         }
      </main>
   );
}

export default App;
