export function updateAPIChange(field, data, component) {
  let reqValue, resValue, summary,title;
    if(field === 'request') {
      reqValue = data;
      resValue = component.state.responseValue;
      summary = component.state.summaryInfo; 
      title=component.state.titleInfo;
    } else if(field === 'response'){
      reqValue = component.state.requestValue;
      resValue = data;
      summary = component.state.summaryInfo;
      title=component.state.titleInfo;

    } else if(field === 'title'){
      reqValue = component.state.requestValue;
      resValue = component.state.responseValue;
      summary = component.state.summaryInfo; 
      title=data.target.value;

    }
 else {
      reqValue = component.state.requestValue;
      resValue = component.state.responseValue;
      summary = data.target.value; 
      title=component.state.titleInfo; 

    }
    
    component.state.options.map(function (list, i) {
      if(list.apiType === component.state.apiStatus) {
        list.request = reqValue;
        list.response = resValue;
        list.summary = summary;
        list.title=title;
      }
    }, component)

    if(component.state.apiData[component.state.currentNodeId]) {
      component.state.apiData[component.state.currentNodeId][component.state.apiStatus] = {
        "fullPath": component.state.childUpdatedData.fullPath,
        "request": reqValue,
        "responses": resValue,
        "summary": summary,
        "title":title
      }
    } else {
      component.state.apiData[component.state.currentNodeId] = {};
      component.state.apiData[component.state.currentNodeId][component.state.apiStatus] = {
        "fullPath": component.state.childUpdatedData.fullPath,
        "request": reqValue,
        "responses": resValue,
        "summary": summary,
        "title":title
      }
    }

    component.setState({
      childData: {
        apiList : component.state.childData.apiList,
        url: component.state.childData.url
      },
      requestValue: reqValue,
      responseValue: resValue,
      summaryInfo: summary,
      titleInfo:title

    })

    let jsonStat = component.isJson(reqValue) && component.isJson(resValue);
    component.associateNode(!jsonStat)
}

export function updateCheckedStatus(val, component) {
  let validity;
    if(!val.completed) {
      component.state.options.map(function (todo, i) {
        if(todo.label === val.apiType) {
          val.completed = true;
          val.id = component.props.childInfo.pId;
        }
      }, component)
      component.state.childData.apiList.push({apiType: val.apiType, apiId: component.props.childInfo.pId})
      component.setState({
        childData: {
          apiList : component.state.childData.apiList,
          url: component.state.childData.url
        },
        checkedStatus: true
      })
      validity = false;
    } else {
      component.state.options.map(function (todo, i) {
        if(todo.label === val.apiType) {
          val.completed = false
          val.request = '';
          val.response = '';
          val.summary = '';
          val.title=''
        }
      }, component)
      component.state.childData.apiList.forEach((item, index) => {
        if (val.apiType == item.apiType) {
          component.state.childData.apiList.splice(index,1);
          return
        }
      })
      delete component.state.apiData[val.id][val.apiType];
      component.setState({
        childData: {
          apiList : component.state.childData.apiList,
          url: component.state.childData.url
        },
        requestValue: '',
        responseValue: '',
        summaryInfo: '',
        titleInfo:'',
        checkedStatus: false
      })
      validity = component.validityCheckStatus();
    }
    
    component.associateNode(!validity)
}

export function updateAPISelection(val, component, event, showAlert) {
  if(component.state.requestValue === '' || component.state.responseValue === '') {
      if(component.state.checkedStatus) {
        showAlert(component, "Please fill the associated API details")
        event.stopPropagation()
      } else{
        component.setState({
        apiStatus: val.apiType,
        paramValue: '',
        requestValue: '',
        responseValue: '',
        summaryInfo: '',
        titleInfo:''
      })
      }
    } else {
      component.setState({
        apiStatus: val.apiType,
        paramValue: '',
        requestValue: '',
        responseValue: '',
        summaryInfo: '',
        titleInfo:''
      })
    }
}