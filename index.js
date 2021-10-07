import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const CreateForm =() => {
  const [showSuburb, setShowSuburb] = React.useState(false)
  const onClick = () => setShowSuburb(true)
  const onClickHide = () => setShowSuburb(false)
  const onClickSend = () => {
    const data = new FormData(document.getElementById('forms'));
    fetch('http://localhost:5000/', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        tasktype:         data.get('tasktype'),
        tasktitle:        data.get('title'),
        taskdescr:        data.get('description'),
        taskdate:         data.get('date'),
        tasksuburb:       data.get('suburb'),
        taskbudgettype:   data.get('budgettype'),
        taskbudgetamount: data.get('amount'),
      })
    })
  }
  return (
    <form id="forms" class="form-horizontal" action="/" method="post">
    <div class="form-group">
    <nav class="navbar navbar-inverse">
    <div class="container-fluid">
    <div class="navbar-header">
    <a class="navbar-brand" href="#">New Task</a>
    </div>
    </div>
    </nav>
    <label class="control-label col-md-2" for="">Select Task Type:</label>
    <div class="form-check col-md-2">
    <input class="form-check-input" type="radio" onClick={onClick} id="flexRadioDefault" name="tasktype" value="inperson"/>
    <label class="form-check-label" for="flexRadioDefault1">
    In person
    </label>
    </div>
    <div class="form-check col-md-2">
    <input class="form-check-input" type="radio" onClick={onClickHide} id="flexRadioDefault" name="tasktype" value="online"/>
    <label class="form-check-label" for="flexRadioDefault1">
    Online
    </label>
    </div>
    <div class="col-md-6"></div>
    </div>
    <nav class="navbar navbar-inverse">
    <div class="container-fluid">
    <div class="navbar-header">
    <a class="navbar-brand" href="#">Describe your task to Experts</a>
    </div>
    </div>
    </nav>
    <div class="form-group">
    <label class="control-label col-md-1" for="">Task Title</label>
    <div class="col-md-4">
    <input class="form-control" type="text" placeholder="Enter task title" name="title" required/>
    </div>
    </div>
    <div class="form-group">
    <label class="control-label col-md-1" for="">Description</label>
    <div class="col-md-4">
    <textarea class="form-control" rows="5" placeholder="Enter task description" name="description" required></textarea>
    </div>
    </div>
    <nav class="navbar navbar-inverse">
    <div class="container-fluid">
    <div class="navbar-header">
    <a class="navbar-brand" href="#">Setting up your Task</a>
    </div>
    </div>
    </nav>
    {showSuburb ? <Suburb /> : null}
    <div class="form-group">
    <label class="control-label col-md-1" for="">Date</label>
    <div class="col-md-4">
    <input class="form-control" type="text" placeholder="Enter a date" name="date" required/>
    </div>
    </div>
    <nav class="navbar navbar-inverse">
    <div class="container-fluid">
    <div class="navbar-header">
    <a class="navbar-brand" href="#">Suggest how much</a>
    </div>
    </div>
    </nav>
    <div class="form-group">
    <label class="control-label col-md-2" for="">What is your budget? (This is an estimate)</label>
    <div class="radio col-md-2">
    <label><input type="radio" name="budgettype" value="total" required/>Total</label>
    </div>
    <div class="radio col-md-2">
    <label><input type="radio" name="budgettype" value="hourly" required/>Hourly rate</label>
    </div>
    </div>
    <div class="form-group">
    <div class="col-md-4">
    <input class="form-control" type="text" name="amount" placeholder="$" required/>
    </div>
    </div>
    <div class="form-group">
    <div class="col-md-10"></div>
    <button class="btn btn-primary col-md-2" type="button" onClick={onClickSend}>Post Task</button>
    </div>
    </form>
  )
}

const Suburb = () => (
  <div class="form-group">
  <label class="control-label col-md-1" for="">Suburb</label>
  <div class="col-md-4">
  <input class="form-control" type="text" name="suburb" placeholder="Enter a suburb"/>
  </div>
  </div>
)

ReactDOM.render(
  <div class="container">
  <CreateForm />
  </div>,
  document.getElementById('root')
);
