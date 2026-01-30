import {useState} from 'react'

const ItemForm = ({onAdd}) => {
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("") // Form inputs

    const [isSaving, setIsSaving] = useState(false) // Button effect when saving form inputs

    const submit = async (e) =>{
        e.preventDefault()
        setIsSaving(true)

        const randomUserId = Math.floor(Math.random() * 10) + 1; // random number out of 10

        await onAdd({title, body, userId: randomUserId}) // Adds the title, body, and random ID number

        setTitle("")
        setIsSaving(false)
    }

    return (
        <form onSubmit={submit}>
            <h2>Add Task</h2>

            {/* Form inputs */}
            <input id="taskTitle" value={title} onChange = {(e) => setTitle(e.target.value)} placeholder="Task title" required/>
            <input id="taskBody" value={body} onChange = {(e) => setBody(e.target.value)} placeholder="Task body" required/>

            <button disabled={isSaving}>
                {isSaving ? "Saving..." : "Add Task"} 
                {/* Ternary for button effect */}
            </button>
        </form>
    )
}

export default ItemForm