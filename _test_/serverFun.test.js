import  { getApiData } from '../src/server/serverFun/serverFun'

describe("Testing express route", () => {
     
    test("Testing espress route", async () => {
      
      
       await expect(getApiData).toBeDefined()
    })
});