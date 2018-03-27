import React from 'react';
import * as Table from 'reactabular-table';
import * as search from 'searchtabular';
import * as resolve from 'table-resolver';
import { browserHistory, Link } from 'react-router'
import { cloneDeep, findIndex, orderBy } from 'lodash';
import ProjectDetails from '../d3/ProjectDetailsComponent'
import ProjectService from '../d3/ProjectServices'
import { loadProjectDetails } from '../utils/TreeActions';
import Button from 'mineral-ui/Button';
import TextInput from 'mineral-ui/TextInput';
import TextArea from 'mineral-ui/TextArea';
import  Popover from 'mineral-ui/Popover'


export default class extends React.Component {

    constructor(props) {
        super(props);
    }
    componentDidMount(){
        console.log(this.props.nodeData)
    }
   

    render() {
        return (
            <div>
                {/* <div className="col-md-8 pull-right Rectangle-8-Copy">                    
                    <div className="form-group">
                        <label className="Node-Properties">Node Properties</label>
                    </div>
                    <div className="form-group">
                        <label className="ROOT-NAME">ROOT NAME</label>
                        <TextInput className="Rectangle-5-copy-4"
                            defaultValue="ROOT"

                            required 
                        />
                    </div>
                    <div className="form-group">
                        <label className="ROOT-PATH">ROOT PATH</label>
                        <TextInput className="Rectangle-5-copy-4"
                            defaultValue="/ROOT"

                            required 
                        />
                    </div>
                    <Button className="UPDATE pull-right"  variant="regular" primary>UPDATE</Button>
                    <Button className="Cancel pull-right">Cancel</Button>
                </div>                 */}
                <div className="col-md-8 pull-right Rectangle-8-Copy-screen-2">                    
                    <div className="form-group">
                        <label className="Node-Properties">Node Properties</label>
                    </div>
                    <div className="Rectangle-5-Copy-10">
                    </div>
                    <div className="form-group">
                        <label className="Request-Type">Request Type</label>
                        <select className="form-control Rectangle-5-Copy-8">
                            <option>GET</option>
                        </select>                        
                    </div>
                    <div className="form-group">
                        <label className="url">URL</label>
                        <Popover
                            content="Enter URL"
                            placement="right">
                            <i className="fa fa-question-circle vocabulary-icon"></i>
                        </Popover>
                        <div className="url-text-wrapper">
                            <div className="url-text"><TextInput size="small" className="url-text"
                                defaultValue="/"

                                required
                            /></div>
                            <div className="bitmap-img"><img src="/ui/src/images/bitmap.png" /> </div>
                        </div>                 
                    </div>
                    <div className="form-group">
                        <label className="summary">Summary</label>
                        <TextArea
                            size="small"
                            className="Rectangle-5-Copy-7" 
                        />                       
                    </div>
                    <div className="form-group">
                        <label className="Request-Params">Request Params</label>
                        <TextArea
                            className="Rectangle-5-Copy-9" 
                        />                       
                    </div>
                    <div className="form-group">
                        <label className="Response-Applicati">Response: Application/JSON</label>
                        <TextArea
                            className="Rectangle-5-Copy-9" 
                        />                       
                    </div>
                </div>               
            </div>

        );
    }
}
