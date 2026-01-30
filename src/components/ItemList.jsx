import ItemCard from "./ItemCard";

const ItemList = ({items, onDelete}) => {
    return (
        <div>
            {items.map((item) =>(
                <ItemCard
                    key = {item.id}
                    item = {item}
                    onDelete = {onDelete}
                />
            ))}
        </div>
    )
}

export default ItemList