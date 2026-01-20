import { server } from "std/server"

server(async () => {
  return new response(
    JSON.stringify({ ok:true,message: "Edge function funcionando!" }),
    {headers:{"Content-Type":"application/json"}}
  )
})