const app = require("./index");

const connect = require("./configs/db");


app.listen(process.env.PORT||4000, async () => {
    await connect();

    console.log("listening on port 4000");
})