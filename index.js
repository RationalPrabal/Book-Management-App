require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;
const http = require("http");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const { authRouter } = require("./routes/auth.routes");
const { bookRouter } = require("./routes/book.routes");
const { requestLogger } = require("./middlewares/requestLogs");
const { connection } = require("./configs/Database");
const server = http.createServer(app);

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Book Management Application",
      version: "1.0.0",
    },
  },
  apis: ["./routes/*.js"],
};

const openapiSpecification = swaggerJsdoc(options);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openapiSpecification));
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

// Use the requestLogger middleware
app.use(requestLogger);
app.use("/auth", authRouter);
app.use("/book", bookRouter);

server.listen(PORT, async () => {
  try {
    await connection;
    console.log("Database connected");
  } catch (err) {
    console.log("Database connection error");
  }
  console.log(`Server is up and running at ${PORT}`);
});
