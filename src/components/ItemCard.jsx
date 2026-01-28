const ItemCard = ({item, onDelete}) => {
    return(
        <div className="card">
            <h3>{item.title}</h3>
            <p>Status: {item.status}</p>
            <p>Date: {new Date(item.createdAt).toLocaleDateString()}</p>
            <button onClick={(() => onDelete(item.id))}></button>
        </div>
    )
}

export default ItemCard