
function Card(props) {
    return (
        <div>
            <h3>{props.title}</h3>
            <p>{props.description}</p>
            <p>Status: {props.done ? 'Finalizat' : 'In lucru'}</p>
            <button onClick={props.onToggle}>
                {props.done ? 'Marchează în lucru' : 'Marchează finalizat'}
            </button>
          {/*Buton de edit pe card: onClick*/}
            <button onClick={props.onEdit}>Editează</button>
            <button onClick={props.onDelete}>Șterge</button>
        </div>
    );
}
export default Card;