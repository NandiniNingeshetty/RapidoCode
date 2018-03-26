import React from 'react'
import * as Table from 'reactabular-table';
import * as search from 'searchtabular';
import * as resolve from 'table-resolver';
import { browserHistory, Link } from 'react-router'
import { cloneDeep, findIndex, orderBy } from 'lodash';
import ProjectDetails from '../d3/ProjectDetailsComponent'
import ProjectService from '../d3/ProjectServices'
import { loadProjectDetails } from '../utils/TreeActions';
import Button from 'mineral-ui/Button';
import {showAlert, AlertOptions} from '../utils/AlertActions'
import AlertContainer from 'react-alert'
import { ThemeProvider } from 'mineral-ui/themes';
import Dropdown from 'mineral-ui/Dropdown';
import  Popover from 'mineral-ui/Popover';
import  AddVocabulary from './AddVocabulary';
import NodeProperties from '../d3/NodeDetailsComponent';
import CRUDSketch from '../CRUDSketch';
var thisComponent;
export default class extends React.Component{
  
  constructor(props) {
    super(props);
    thisComponent = this;
    this.state = {
      searchColumn: 'all',
      selectedSketch: {},
      query: {},
      columns: [
        {
          property: 'name',
          header: {
            label: 'Vocabulary List'
          }
        },
        {
          props: {
            style: {
              width: 50
            }
          },
          cell: {
            formatters: [
              (value, { rowData }) => (
                <span
                  className="remove fa fa-times"
                  style={{ cursor: 'pointer' }}
                >
                  
                </span>
              )
            ]
          },
          visible: true
        }
      ],
      vocabularyData: [],
      currentTreeDetails:{},
      treedata:{},
      crudComponent:{}
    };

  }

  /* Component Initialisation */
  componentWillMount() {
    this.setState({
        selectedSketch: JSON.parse(sessionStorage.getItem('selectedSketch'))
    });
  }
  getNodeDetails(component){
    thisComponent.setState({
      currentTreeDetails:component.state.treeEditDetails,
      treedata:component.state.treedata,
      crudComponent:component,
    })
    }
 
 
  /* Render method */
  render() {
    let addOption, loadedComponent;

    const data = [
      {
        items: [
          {
            text: 'Swagger 2.0',
          },
          
          {
            text: 'Swagger 3.0',
          },
          {
            text: 'Postman',
          }
        ]
      }
    ]
   console.log(this.state.selectedSketch)
    if(this.state && this.state.selectedSketch) {

      const { searchColumn, columns, vocabularyData, query } = this.state;
      const resolvedColumns = resolve.columnChildren({ columns });

      /* Project Details Section */
     /* var projectHeader = (this.state.selectedSketch) ? <div>
        <h2>{this.state.selectedSketch["name"]}</h2>
        <h3>{this.state.selectedSketch["description"]}</h3>
        </div> : null;*/
        var sketchName = "";
        var sketchDesc = "";
        if(this.state.selectedSketch){
          sketchName = this.state.selectedSketch["name"];
          sketchDesc = this.state.selectedSketch["description"];
        }      
      const resolvedRows = resolve.resolve({
        columns: resolvedColumns,
        method: resolve.nested
      })(vocabularyData);
      const searchedRows = 
        search.multipleColumns({
          columns: resolvedColumns,
          query
        })(resolvedRows);
      
      var vocabTable,tableList;
      if(searchedRows.length>0) {
        tableList = <Table.Body
          ref={body => {
            this.bodyRef = body && body.getRef();
          }}
          rows={searchedRows}
          rowKey="name"
          onRow={this.onRow}
        />
      } else{
        tableList = <tbody><tr><td>No Results Found</td><td></td></tr></tbody>
      }
      vocabTable =  
        <div>
          <div className="project-list-wrapper">
            <div className="col-md-12 col-sm-12">
              <Table.Provider columns={resolvedColumns} className="col-md-12 col-sm-12">
                <Table.Header
                  headerRows={resolve.headerRows({ columns })} >
                </Table.Header>
                {tableList}
              </Table.Provider>
            </div>  
          </div>
        </div>

      if(query.all) {
        addOption = <input className="btn btn-default" value="Add" type="submit"/>
      } else {
        addOption = <input className="btn btn-default disabled" value="Add" type="button" />
      }

      loadedComponent = <div className="vocabulary-wrapper">
        <form className="col-md-12" noValidate>
          <div className="col-md-10 col-md-offset-1 col-sm-10 col-sm-offset-1">
            <div className="col-md-10 col-sm-10">
              <search.Field
                className="search-sketch"
                column={searchColumn}
                placeholder="vocabulary"
                query={query}
                columns={resolvedColumns}
                rows={resolvedRows}
                components={{
                  props: {
                    filter: {
                      placeholder: 'Add/Search Vocabularies'
                    }
                  }
                }}
                onColumnChange={searchColumn => this.setState({ searchColumn })}
                onChange={query => this.setState({ query })} />
            </div>
            <div className="col-md-2 col-sm-2">
              {addOption}
            </div>
          </div>
          <div className="col-md-10 col-md-offset-1 col-sm-10 col-sm-offset-1 vocabulary-list">
            {vocabTable}
          </div>
        </form>
      </div>
    } else {
      loadedComponent =  <div className="text-center loading-project-details">Loading...</div>
    }
     
    return (
      <div className="vocabulary-main-content">
           <AlertContainer ref={a => this.msg = a} {...this.alertOptions} />
           <div className="vocabulary-header">
      <div className="row">
      <div className="col-md-12">
  
        <div className=" col-md-6 pull-left ">
        <span className="vocabulary-header-title">{sketchName}</span>
        <span className="vocabulary-header-shared xs-pl-15">Shared with</span>
         <span className="xs-pl-10"><span className="green-status">Apps Team</span>
         &nbsp;&nbsp;<span className="red-status">Dev Team</span>
         </span>
        </div>
        <div className="col-md-offset-3 pull-right xs-pr-15">
        <Button className="vocabulary-button-version"  variant="regular" primary>Versions</Button>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <ThemeProvider theme={{ direction: 'rtl' }}>
         <Dropdown data={data}   placement="bottom-start">
      <Button className="vocabulary-button-preview"  variant="regular" primary>Preview</Button>
    </Dropdown>
    </ThemeProvider>  
        </div>
        </div>
        </div>
   
      <div className="row">
      <div className="col-md-12">
     <div className="col-md-6 pull-left view-text">
      {sketchDesc}
     </div>
     </div>
      </div>
      </div>
<div className="row white-bg">
<div className="">

<div className="col-md-2">
<AddVocabulary selectedSketch={this.state.selectedSketch} />
</div>

<div className="col-md-6">
<CRUDSketch getNodeDetails={this.getNodeDetails} />
</div>

<div className="col-md-4">
<NodeProperties nodeData={this.state.currentTreeDetails} treedata={this.state.treedata} component={this.state.crudComponent}/>
</div>
</div>
</div>


      
      </div>
    );
  }
}
