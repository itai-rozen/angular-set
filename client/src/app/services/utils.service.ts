import { Router } from "@angular/router"
export const isEmptyObject = (obj: {}|undefined):boolean|undefined => {
  if (obj)
    return Object.keys(obj).length === 0
  return undefined  
}

export const navigateTo = (path: string, query: string = ''): void => {
  const fullPath  = (query) ? [path, query] : [path]
  new Router().navigate(fullPath)
}