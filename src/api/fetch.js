
export const getData = async () => {
    try{
        // Simulate network delay and randomness (1 to 3 seconds)
        const delay = Math.floor(Math.random() * 2000) + 1000
        await new Promise((resolve) => setTimeout(resolve, delay))
        
        const response = await fetch('/data.json')
        if(!response.ok){
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        const jsonData = await response.json()
        return jsonData
    }catch(err){
        console.error('Error fetching data:', err)
        throw err
    }
}
    