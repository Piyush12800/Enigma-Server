const express = require ("express")
const app = express()
const userRoutes = require('./routes/User')
const postRoutes = require('./routes/Post')
const database = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const { cloudinaryConnect } = require("./config/cloudinary");
const fileUpload = require("express-fileupload");

// Setting up port number
const PORT = process.env.PORT || 4000;

// Loading environment variables from .env file
dotenv.config();

// Connecting to database
database.connect();
cloudinaryConnect();
 // Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
	fileUpload({
		useTempFiles: true,
		tempFileDir: "/tmp/",
	})
);
app.use(
	cors({
		origin: "*",
		credentials: true,
	})
);
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/post", postRoutes);
//Testing the server
app.get("/", (req, res) => {
	return res.json({
		success: true,
		message: "Your server is up and running ...",
	});
});

// Listening to the server
app.listen(PORT, () => {
	console.log(`App is listening at ${PORT}`);
});
