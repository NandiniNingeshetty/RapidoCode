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
                <div className="col-md-8 pull-right Rectangle-8-Copy">                    
                    
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
                </div> 
                <div>
                    
                </div>               
            </div>

        );
    }
}
