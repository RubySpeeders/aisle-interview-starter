import express, { Express, Request, Response } from "express";
import cors from "cors";

function isBetweenAandG(letter: string): boolean {
  const lowercaseLetter = letter.toLowerCase();
  return lowercaseLetter >= 'a' && lowercaseLetter <= 'g';
}

const startServer = async () => {
  const app: Express = express();
  app.use(express.json());
  app.use(cors());

  app.get("/", (req: Request, res: Response) => {
    res.send("Hello World!");
  });

  app.post("/letter", (req: Request, res: Response) => {
    try {
      if (isBetweenAandG(req.body.letter)) {
        res.send({message: "letter is valid!"});
      } else {
        res.send({message: "not a valid letter!"})
      }
    } catch {
      res.sendStatus(500).send()
    }
  });

  return { app };
};

const port = process.env.PORT || 3000;

startServer()
  .then(({ app }) => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Error starting server: ");
    console.error(err);
  });
