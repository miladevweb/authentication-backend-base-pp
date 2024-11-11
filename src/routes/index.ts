import { Router } from 'express'
import { readdirSync } from 'node:fs'

const router = Router()
const PATH_ROUTER = process.cwd() + '/src/routes'

const cleanFileName = (fileName: string) => {
  const fn = fileName.split('.')[0]
  return fn
}

const loadRoutes = async () => {
  const files = readdirSync(PATH_ROUTER)
  for (const file of files) {
    const name = cleanFileName(file)
    if (name !== 'index') {
      // We import the router of each route
      const dynamicImport = await import('./' + name)
      router.use('/api/v1/' + name, dynamicImport.router)
    }
  }
}
loadRoutes()

export { router }
