import {MouseEvent} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan,faFileSignature} from '@fortawesome/free-solid-svg-icons'
interface Note{
   id: string;
   title: string;
   content: string;
}

function Sidebar(
   props:{
      notes: Note[];
      currentNoteId: string;
      updateCurrentNote: (id: string) => void;
      changeNoteTitle: (title: string, id: string) => void;
      removeNote: (id: string) => void;
      createNote: () => void;
   }){
      function focusOnInput(prop:HTMLElement):void{
         let itemNote:HTMLElement|null=prop.closest('.note');
         if(!itemNote)return;
         let input:HTMLElement|null=itemNote.querySelector('.note__title');
         console.log(input);
         if(!input)return;
         input.focus();
      }
      function showIcons(datakey:HTMLElement) {
         let itemNote:HTMLElement|null=datakey.closest('.note');
         if(!itemNote)return;
         let icons=itemNote.querySelectorAll('.note__delete');
         for (const icon of icons) {
            icon.classList.toggle('visible');
         }
       }

       let renderArray = props.notes.map((element: Note, index: number) => {
         return (
           <div
             key={element.id}
             data-key={element.id}
             className={element.id === props.currentNoteId ? 'note active' : 'note'}
             onClick={(e) => props.updateCurrentNote(element.id)}
             onMouseEnter={(e) => showIcons(e.currentTarget)}
             onMouseLeave={(e) => showIcons(e.currentTarget)}
           >
             <input
               className={element.id === props.currentNoteId ? 'note__title active' : 'note__title'}
               value={element.title === '' ? element.content.split('\n')[0] : element.title}
               onChange={(e) => props.changeNoteTitle(e.target.value, element.id)}
             />
             <div className='note__icons'>
               <FontAwesomeIcon
                  icon={faFileSignature}
                  className='note__delete'
                  onClick={(e) =>focusOnInput(e.target)}
               ></FontAwesomeIcon>
               <FontAwesomeIcon
                  icon={faTrashCan}
                  onClick={(e) => props.removeNote(element.id)}
                  className='note__delete'
               ></FontAwesomeIcon>
             </div>

           </div>
         );
       });



   return (
      <div className='sidebar'>
         <div className='sidebar__header'>
            <p className='sidebar__title'>Notes</p>
            <button className='sidebar__create-new-button' onClick={props.createNote} >+</button>
         </div>
         <div className='sidebar__notes-list'>
            {renderArray}
         </div>
      </div>
   );

}
export default Sidebar;