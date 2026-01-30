const ItemCard = ({item, onDelete}) => {
    return(
        <div className="card">
            <h3>{item.title}</h3>
            <p>{item.body}</p>
            <p>User ID: {item.userId}</p>
            <button onClick={(() => onDelete(item.id))}>Delete</button>
        </div>
    )
}

export default ItemCard