import {useEffect, useState} from 'react';
import ItemList from './components/ItemList';
import ItemForm from './components/ItemForm';

const App = () => {
    const [items, setItems] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    // GET request on page load
    useEffect(() =>{
        fetchItems();
    }, [])

    const fetchItems = async () =>{
        try{
            setIsLoading(true);
            setError(null);

            const res = await fetch("https://jsonplaceholder.typicode.com/posts");
            if(!res.ok) throw new Error(`Server Error: ${res.status}`);

            const data = await res.json();

            const shuffled = [...data].sort(() => Math.random() - 0.5); // Shuffles people
            setItems(shuffled.slice(0, 10)); // Takes 10 shuffled people to display
        }catch(err){
            setError(err.message);
        }finally{
            setIsLoading(false);
        }
    }

    // POST
    const addItem = async (newItem) =>{
        const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(newItem)
        })

        const savedItem = await res.json();
        setItems((prev) => [savedItem, ...prev]); // New task is seen first
    }
    
    // DELETE
    const deleteItem = async (id) =>{
        await fetch(`"https://jsonplaceholder.typicode.com/posts"${id}`, {method: "DELETE"})
        setItems((prev) => prev.filter(item => item.id !== id));
    }

    return(
        <div className="app">
            <h1>Task Tracker Dashboard</h1>
            <ItemForm onAdd={addItem} />

            {isLoading && <p>Loading tasks...</p>}

            {error && (
                <div>
                    <p>Error: {error}</p>
                    <button onClick={fetchItems}>Retry</button>
                </div>
            )}
            {!isLoading && !error &&(
                <ItemList items={items} onDelete={deleteItem} />
            )}
        </div>
    )
}

export default App