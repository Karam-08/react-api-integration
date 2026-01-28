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

            const res = await fetch("/api/items");
            if(!res.ok) throw new Error("Failed to fetch items");

            const data = await res.json();
            setItems(data);
        }catch(err){
            setError(err.message);
        }finally{
            setIsLoading(false);
        }
    }

    // POST
    const addItem = async (newItem) =>{
        const res = await fetch("/api/items", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(newItem)
        })

        const savedItem = await res.json();
        setItems((prev) => [...prev, savedItem]);
    }
    
    // DELETE
    const deleteItem = async (id) =>{
        await fetch(`/api/items/${id}`, {method: "DELETE"})
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