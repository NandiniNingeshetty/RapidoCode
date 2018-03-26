import React from 'react'
import { browserHistory } from 'react-router'
import RootDetails from './RootDetailsComponent'
import ChildDetails from './ChildDetailsComponent';
import Button from 'mineral-ui/Button';
import TextInput from 'mineral-ui/TextInput';
import {showDetails, addNode, deleteNode, updateTreeData, updateProjectHeaders, addEmptySketch, loadProjectDetails, createSketch, updateSketch, updatePath, exportDesign, importDesign} from '../utils/TreeActions';
import ProjectService from './ProjectServices'

export default class extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      
    };
  }

  /* Method to Update Root data */
  updateRootData(rootData) {
    if(rootData.rootPath && rootData.name) {
      updateTreeData({
        rootNodeData: rootData
      },false,this.props.component)
    } else {
      updateTreeData({
        rootNodeData: rootData
      },true,this.props.component)
    }
  }

  /* Method to Update Child data */
  updateChildData(childData, jsonStatus) {
    if(childData.url && childData.apiList.length>0 && !jsonStatus) {
      this.props.updatedData({
        childNodeData: childData
      },false)
    } else {
      this.props.updatedData({
        childNodeData: childData
      },true)
    }
    
  }
 /* Method to Update Sketch Details */
 updateSketchDetails() {
  this.props.component.setActiveStatus(this.props.component.state.treedata);
  let savedVocabulary;
  let userDetails = JSON.parse(sessionStorage.getItem('userInfo'));
  let VocabularyStored = sessionStorage.getItem('vocabularyInfo')
  if(VocabularyStored) {
    savedVocabulary = JSON.parse(VocabularyStored);
  } else {
    savedVocabulary = []
  }

  updateSketch(this.props.component, savedVocabulary, ProjectService, browserHistory)
}

  /* Render Method */
  render() {
    var list;
    if (this.props.nodeData) {
      if(this.props.nodeData.rootNodeData && this.props.nodeData.rootNodeData.active) {
        list = <RootDetails rootInfo={this.props.nodeData.rootNodeData} setEditDetails={(val)=>this.updateRootData(val)}/>
      } else if (this.props.nodeData.childNodeData && this.props.nodeData.childNodeData.name){
        list = <ChildDetails apiData={this.props.nodeData.apiExportData} childInfo={this.props.nodeData.childNodeData} setChildEditDetails={(val,status)=>this.updateChildData(val,status)}/>
      }
    }else{
        list = <RootDetails />
    } 
    return(
      
      <div className="col-md-8 pull-right Rectangle-8-Copy"> 
      <div className="form-group">
                        <label className="Node-Properties">Node Properties</label>
                    </div> 
        {list}
        <Button className="UPDATE pull-right"  variant="regular" primary onClick={this.updateSketchDetails.bind(this)}>UPDATE</Button>
                    <Button className="Cancel pull-right">Cancel</Button>
      </div>
      
    )
  }
}
