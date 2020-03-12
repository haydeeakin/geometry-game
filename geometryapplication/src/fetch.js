import fetch from 'node-fetch'

export async function validate(url){
    const response = await fetch(url)
    return response.text()
}