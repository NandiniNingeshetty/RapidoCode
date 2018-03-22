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
        <div className="view-text vocabulary-text"><img src="/ui/src/images/bitmap.png" />&nbsp;&nbsp;VOCABULARY&nbsp;&nbsp;
        {/*<Popover
            content="This is vocabulary tab"
            placement="right"
            isOpen></Popover> */
        }
        <i className="fa  fa-question-circle vocabulary-icon"></i>
            

       

        </div>
        
        <div className="xs-pt-10">
        <div className="col-md-10"><TextInput size="medium" placeholder="Add New" className="vocabulary-textbox" /></div>
        <i className="fa fa-plus vocabulary-plus-icon"></i>
        </div>
        
          </div>
    );
  }
}
