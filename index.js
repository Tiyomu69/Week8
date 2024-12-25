mongoose = require('mongoose');
//app = express();
const MONGO_URI = 'mongodb://localhost:27017/Week8';
mongoose.connect(MONGO_URI, { useUnifiedTopology: true, useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', function(err) {
    console.log("Error occured during connection" + err)
});
db.once('connected', function() {
    console.log(`Connected to ${MONGO_URI}`);
});
// creating the scheme
const PersonScheme = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: Number,
    Gender: String,
    Salary: Number
});
// creating model named as modelname with collection named as personCollection
const person_doc = mongoose.model('modelname', PersonScheme, 'personCollection');
//finding all the document in the collection
person_doc.find({ Gender: "Female", age: { $gte: 25 } })
    .sort({ Salary: 1 })
    .select('name Salary age')
    .limit(10)
    .exec()
    .then(docs => {
        console.log("Showing multiple document")
        docs.forEach(function(Doc) {
            console.log(Doc.age, Doc.name);
        })
    })
    .catch(err => {
        console.error(err)
    }) // counting all the documents
person_doc.countDocuments().exec()
    .then(count => {
        console.log("Total documents Count :", count)
    }).catch(err => {
        console.error(err)
    })