import express, { NextFunction, Request, Response } from "express"
import routes from "./routes"

const app = express()

app.use(express.json())

const middleware =
  ({name}:{name: string}) =>
  (req: Request, res: Response, next: NextFunction) => {
    res.locals.name = name

    next()
}

app.use(middleware({name: 'TomDoesTech'}))

routes(app)

async function throwsError() {
  throw new Error('Boom!')
}

app.get("/error", async (req, res) => {
  try {
    await throwsError()
    res.sendStatus(200)
  } catch (e) {
    res.status(400).send("Something bad happend")
  }
  await throwsError()
  res.send('ok')
})

app.listen(3000, () => {
  console.log("Application listening at http://localhost:3000")
})
