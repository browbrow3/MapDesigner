// displays a drop-down with programmable title and options
import './Selector.css';

const Selector = (props) => {
    // console.log('selector props:', props);
    const handleSelect = (event) => {
        props.set(event.target.value);
    }

    return (
        <div class="selector">
            <h3 class="title">{props.title}</h3>
            <select class="dropdown" onChange={handleSelect}>
                {props.options.map(r => <option key={r} value={r} selected={props.selected === r}>{r}</option>)}
            </select>
        </div>
    );
}

export default Selector;