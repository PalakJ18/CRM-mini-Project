const express = require("express");
const app = express();
const fileUpload = require("express-fileupload");
const adminRoutes = require("./routes/AdminRoutes");
const employeeRoutes = require("./routes/EmployeeRoutes");
const leadsRoutes = require("./routes/LeadRoutes");
const database = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
const PORT = process.env.PORT || 4000;

//database connect
database.connect();
//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
	cors({
		// origin:"http://localhost:3000",   //deployment will not work
		origin:"*",
		credentials: true 
	})
);

app.use(
	fileUpload({
		useTempFiles:true,
		tempFileDir:"/tmp",
	})
)

//routes
app.use("/api/admin", adminRoutes);
app.use("/api/employee", employeeRoutes);
app.use("/api/leads", leadsRoutes);

//def route

app.get("/", (req, res) => {
	return res.json({
		success:true,
		message:'Your server is up and running....'
	});
});

app.listen(PORT, () => {
	console.log(`App is running at ${PORT}`)
})

