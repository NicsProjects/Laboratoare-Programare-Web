
function Card(props) {
    return (
        <div className={`project-card ${props.done ? 'done' : 'in-progress'}`}>
            <h3>{props.title}</h3>
            <p>{props.description}</p>
            <p className="project-status">Status: {props.done ? 'Finalizat' : 'În lucru'}</p>
            <div className="project-actions">
                <button className="action-button toggle" onClick={props.onToggle}>
                    {props.done ? 'Marchează în lucru' : 'Marchează finalizat'}
                </button>
                <button className="action-button edit" onClick={props.onEdit}>Editează</button>
                <button className="action-button delete" onClick={props.onDelete}>Șterge</button>
            </div>
        </div>
    );
}
export default Card;