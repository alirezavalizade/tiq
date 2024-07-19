import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const DB_FILE = path.join(__dirname, "db.json");

const customMiddleware = (req, res, next) => {
  req.query = Object.fromEntries(
    Object.entries(req.query).map(([key, value]) => {
      if (key === "date") {
        return ["available_dates", value];
      }
      return [key, value];
    }),
  );
  next();
};

const createRoutes = (data) => {
  Object.keys(data).forEach((key) => {
    app.get(`/${key}`, (req, res) => {
      let results = data[key];

      Object.entries(req.query).forEach(([queryKey, queryValue]) => {
        results = results.filter((item) => {
          const value = item[queryKey];
          if (typeof value === "string") {
            return value.includes(queryValue);
          } else if (Array.isArray(value)) {
            return value.includes(queryValue);
          } else if (typeof value === "number") {
            return value === Number(queryValue);
          }
          return false;
        });
      });

      res.json(results);
    });

    app.get(`/${key}/:id`, (req, res) => {
      const result = data[key].find((item) => item.id === parseInt(req.params.id));
      if (result) {
        res.json(result);
      } else {
        res.status(404).send("Not Found");
      }
    });
  });
};

fs.readFile(DB_FILE, "utf-8", (err, fileContent) => {
  if (err) {
    console.error("Error reading db.json:", err);
    process.exit(1);
  }
  const data = JSON.parse(fileContent);
  createRoutes(data);
});

app.use(customMiddleware);

export const handler = app;
