function getBookHandler(req: Request, res: Response, next: NextFunction) {
  console.log(req.name)
  // @ts-ignore
  res.send(req.name)
}
