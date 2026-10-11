import app from "./app.js";

const server = app;


server.listen(process.env.PORT,()=>{
    console.log(`server runnig on http://localhost:${process.env.PORT}`);
})