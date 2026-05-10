
function Card(props) {
    return (
        <div>
            <h3>{props.title}</h3>
            <p>{props.description}</p>
            <button onClick={props.onDelete}>Șterge</button>
        </div>
    );
}
export default Card;