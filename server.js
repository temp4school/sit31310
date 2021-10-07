const express = require("express")
const bodyParser = require("body-parser")
const validator = require("validator")
const mongoose = require("mongoose")
const cors = require("cors")

mongoose.connect("mongodb://localhost:27017/formDB", {useNewUrlParser:true})

const app = express()
var id = 69

app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"))
app.use(cors())
app.use(bodyParser.json())

const formSchema = new mongoose.Schema({
  _id: Number,
  tasktype: String,
  tasktitle: String,
  taskdescr: String,
  taskdate: String,
  tasksuburb: String,
  taskbudgettype: String,
  taskbudgetamount: String
})

const Forms = new mongoose.model("Form", formSchema)

app.route('/form')
.get((req, res)=>{
  Forms.find((err, formList)=>{
    if (err) {res.send(err)}
    else {res.send(formList)}
  })
})
.post((req, res)=>{
  const forms = new Forms({
    _id: id,
    tasktype: req.body["tasktype"],
    tasktitle: req.body["title"],
    taskdescr: req.body["description"],
    taskdate: req.body["date"],
    tasksuburb: req.body["suburb"],
    taskbudgettype: req.body["budgettype"],
    taskbudgetamount: req.body["amount"]
  })
  forms.save((err)=>{
    if (err) {res.send(err)}
    else {
      id += 1;
      res.send("Successfully added form.")
    }
  })
})

app.listen(5000, (req, res)=>{
	console.log("Server is running on port 5000")
})
