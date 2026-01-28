const getQuote = async () =>{
    try{
        const res = await fetch("https://api.kanye.rest/")
        
        if(!res.ok) throw new Error('Network response was not ok:' + res.statusText) // Error message if res isn't good.

        const data = await res.json()
        const quote = data.quote // This makes it so that it gets the quote itself and not the JSON itself
        console.log(quote)

    }catch(err){
        console.error("Looks like there was a problem.", err) // General error message.
    }
}

getQuote();