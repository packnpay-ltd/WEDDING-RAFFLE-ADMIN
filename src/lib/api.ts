import 'server-only';
export async function api(path:string,body?:unknown,token?:string) {
 let response:Response;
 try {response=await fetch(`${process.env.API_URL||'http://127.0.0.1:3002/api/v1'}${path}`,{method:body===undefined?'GET':'POST',headers:{'Content-Type':'application/json',...(token?{Authorization:`Bearer ${token}`}:{})},...(body===undefined?{}:{body:JSON.stringify(body)}),cache:'no-store',signal:AbortSignal.timeout(20000)});}catch{throw new Error('The raffle service is unavailable. Please try again.');}
 const data=await response.json();if(!response.ok)throw new Error(Array.isArray(data.message)?data.message.join('. '):data.message||'Request failed');return data;
}
