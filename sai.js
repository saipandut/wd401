const express = require('express');
const admin = require('firebase-admin');

const app = express();
const port = process.env.PORT || 3000; // Use process.env.PORT if available, or default to port 3000

app.use(express.static("views"));


// Firebase configuration
const serviceAccount = require("./Key.json");
app.set('view engine', 'ejs'); // Set EJS as the view engine


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});


const db = admin.firestore();

app.get("/signup",function(req,res){
    res.sendFile(__dirname+"/views/"+"signup.html");
});


app.get("/signupSubmit",function(req,res){
    console.log(req.query.name);
   
    db.collection("EntriesList").add({
        name:req.query.name,
        email:req.query.email,
        password:req.query.password,
        mobileNo:req.query.mobileNo,
       dob:req.query.dob,
    }).then(()=>{
        res.redirect(`/dashboard?user=${req.query.name}`);
    });
});


app.get("/signinSubmit",function(req,res){
    
   
    db.collection("EntriesList")
    .where("email", "==", req.query.email)
    .where("password", "==", req.query.password)
    .where("dob", "==", req.query.dob)
    .get()
    .then((docs)=>{
        if(docs.size>0){
            res.redirect(`/dashboard?user=${req.query.name}`);
        }
        else{
            res.send("FAILED TO SIGIN PLEASE TRY AGAIN")
        }
    })
    .catch(error => {
        console.error("Error querying Firestore:", error);
        res.send("An error occurred. Please try again.");
    });
});



app.get("/login",function(req,res){
    res.sendFile(__dirname+"/views/"+"login.html");
});



app.get("/dashboard",function(req,res){
    res.sendFile(__dirname+"/views/"+"dashboard.html");

});
 // Render the dashboard.ejs view});
// Add a route to handle logout
app.get("/logout",function(req,res){
    res.sendFile(__dirname+"/views/"+"logout.html");

}); 
app.get("/home",function(req,res){
    res.sendFile(__dirname+"/views/"+"home.html");

}); 
app.get("/about",function(req,res){
    res.sendFile(__dirname+"/views/"+"about.html");

}); 
// ... (your existing imports and code) ...


app.get("/back", function(req, res) {
    res.redirect("/dashboard"); // Redirect to the dashboard route
});
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}/login`);
});
