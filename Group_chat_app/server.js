
const express=require('express');

const app=express();
const fs=require('fs');
const port=3000;
const bodyParser=require("body-parser");


app.use(bodyParser.urlencoded({extended:false}));


//log in user
app.get('/login', (req, res) => {
	res.send('<form onsubmit="localStorage.setItem(`username`, document.getElementById(`username`).value)" action="/addmsg" method="POST"><input type="text" name="username" id="username"><button type="submit">LOGIN</button></form>');
});


//send message
app.use('/addmsg',(req,res)=>{

	fs.readFile('message.txt' , (err , data)=>{
		if(err ) {
		  console.log("err")
		  data="no chat exist"
		};
	res.send(`${data}<form action="/sendmsg" method="POST" >
	<input type="hidden"  name="username" id="username" value="${req.body.username}">
	<input type="text" name="message" id="" /> <button type="submit">SEND</button> </form>`)
})
})

//save message to file
app.post("/sendmsg",(req,res)=>{
	
	//save the message in the file
	console.log(`${req.body.username}:${req.body.message}`)
	const message=`${req.body.username}:${req.body.message}` ;
	fs.writeFile("message.txt",message,(err)=>{
		if(err){

			console.log(err);
		}
		else{

			res.redirect('/addmsg');
		}
	})
	
})


app.listen(port,()=>{
	console.log(`srever is running at ${port}`);
})




