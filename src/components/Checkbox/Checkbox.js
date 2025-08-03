// tick box allowing setting of some flag in state.
import './Checkbox.css';

const Checkbox = (props) => {
    // console.log("Checkbox Props: ", props);
    
    const handleCheckboxChange = (event) => {
        props.setState(event.target.checked)
    }

    return (
        <div class="checkbox">
            <p>{props.title}</p>
            <input type="checkbox" checked={props.state} onChange={handleCheckboxChange}></input>
        </div>
    );
}

export default Checkbox;