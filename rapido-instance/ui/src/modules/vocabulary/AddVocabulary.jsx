import React from 'react'
import Autosuggest from 'react-autosuggest';
import  Popover from 'mineral-ui/Popover'
import { browserHistory, Link } from 'react-router';
import TextInput from 'mineral-ui/TextInput';

export default class extends React.Component{
  
  constructor(props) {
    super(props);
  }

  

  /* Render method */
  render() {  
    return (
        <div className="vocabulary-panel">
        <div className="view-text vocabulary-text"><i className="fa fa-audio-description"></i>&nbsp;&nbsp;VOCABULARY&nbsp;&nbsp;
        {/*<Popover
            content="This is vocabulary tab"
            placement="right"
            isOpen></Popover> */
        }
        <i className="fa  fa-question-circle vocabulary-icon"></i>
            

       

        </div>
        <br/>
        <span className="xs-pl-10"><TextInput size="medium" placeholder="Add New" className="vocabulary-textbox" />
        <i className="fa fa-plus"></i>
        </span>
        
          </div>
    );
  }
}
