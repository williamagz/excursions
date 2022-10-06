import axios from "axios"
import querystring from "querystring"


export async function getExcursionsApi(params:object){

    const credentials = {
        method: 'POST',
        url: 'https://test.api.amadeus.com/v1/security/oauth2/token',
        data: querystring.stringify({
            grant_type:"client_credentials",
            client_id:"BdNq73PnzG9NfOOKEoTTAW3YDwN9OV9Z",
            client_secret:"ZnSiVKL0AiQXwkCW",
        })
        ,
        headers: {
                'content-type': 'application/x-www-form-urlencoded'
        } 
        }

    const token = await axios.request(credentials).then(response=>response.data).catch(err=>{
        console.log(err.response.data)
        console.log(err.response.status)
        console.log(err.response.headers)
    })

    //console.log("Access_token: ",await token.access_token )

    const searchParams: URLSearchParams= new URLSearchParams({...params});

    //console.log("Search_params: ", searchParams.toString())

    let options = {
        method: 'get',
        url: 'https://test.api.amadeus.com/v1/shopping/activities',
        params:searchParams,
        headers: {
            'Authorization': 'Bearer '+ await token.access_token
        }
        };


    const response: Promise<RequireResolve>= await axios.request(options).then(res=>res.data).catch(err=>{
        console.log(err.response.data)
        console.log(err.response.status)
        console.log(err.response.headers)
    })

    //console.log(await response)
    return await response
}

export function formatActivityDataApi (data: any) {  
    const activityData = data.data.map(function(elm: any) { 
        return ({
            name: elm.name,
            latitude: String(elm.geoCode.latitude),
            longitude: String(elm.geoCode.longitude),
            descripton: elm.shortDescription,
            stock: 0,
            minimunDuration: elm.minimumDuration,
            rating: elm.rating? elm.rating : 0,
            cost: elm.cost? elm.cost : 0.0,
            pictures: elm.pictures? 
                elm.pictures.map(function(elm: String) { 
                return (
                    {url: elm}
                )}) : "No hay Fotografias de la Acividad",
            type: 7 
        })  
    })
    console.log(activityData[0])
    return activityData
}


