
import React from "react";

import ReactMde from "react-mde";
import ReactMarkdown from "react-markdown";




function Editor(props) {
   const [selectedTab, setSelectedTab] = React.useState<"write" | "preview">("write");


   return (
      <div className="container">
         <ReactMde
            value={props.value.content}
            onChange={props.updateCurrentNoteContent}
            selectedTab={selectedTab}
            onTabChange={setSelectedTab}
            generateMarkdownPreview={(markdown) =>
               Promise.resolve(<ReactMarkdown children={markdown} /> )
             }
         />
      </div>
   );
}

export default Editor;