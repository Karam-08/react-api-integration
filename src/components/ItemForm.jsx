import {useState} from 'react'

const ItemForm = ({onAdd}) => {
    const [title, setTitle] = useState("")
    const [status, setStatus] = useState("pending")
    const [isSaving, setIsSaving] = useState(false)

    const submit = async (e) =>{
        e.preventDefault()
        setIsSaving(true)

        await onAdd({title, status, createdAt: new Date().toISOString()})

        setTitle("")
        setStatus("pending")
        setIsSaving(false)
    }

    return (
        <form onSubmit={submit}>
            <h2>Add Task</h2>

            <input id="taskTitle" value={title} onChange = {(e) => setTitle(e.target.value)} placeholder="Task title" required/>

            <button disabled={isSaving}>
                {isSaving ? "Saving..." : "Add Task"}
            </button>
        </form>
    )
}

export default ItemForm