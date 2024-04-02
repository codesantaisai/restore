import axios,{AxiosError, AxiosResponse} from "axios";
import { toast } from "react-toastify";

const sleep = ()=> new Promise(resolve=>setTimeout(resolve,500))
axios.defaults.baseURL = "https://localhost:7257/api/";

const responseBody = (response:AxiosResponse)=>response.data;

axios.interceptors.response.use(async response=>{
    await sleep();
    return response;
   
}),(error:AxiosError)=>{
    const {data,status}  = error.response as AxiosResponse;
    console.log("ssdsf",status);
    
    switch(status){
        case 400:
        case 401:
        case 404:
        case 500:
            console.log('Displaying toast notification:', data.title);
            toast.error(data.title);
            break;
        default:
            break;
    }
    return Promise.reject(error.response)
}

const requests = {
    get:(url:string)=>axios.get(url).then(responseBody),
    post:(url:string,body:{})=>axios.post(url,body).then(responseBody),
    put:(url:string,body:{})=>axios.put(url,body).then(responseBody),
    delete:(url:string)=>axios.delete(url).then(responseBody)
}

const Catalog = {
    list:()=>requests.get('product'),
    details:(id:number)=> requests.get(`product/${id}`)
  
}

const TestErrors = {
    get400Error:()=>requests.get('buggy/bad-request'),
    get401Error:()=>requests.get('buggy/unauthorized'),
    get404Error:()=>requests.get('buggy/not-found'),
    get500Error:()=>requests.get('buggy/server-error'),
    getValidationError:()=>requests.get('buggy/validation-error')
}

const agent={
    Catalog,
    TestErrors
}

export default agent;