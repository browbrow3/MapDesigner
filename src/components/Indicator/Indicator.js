// display allowing indication of some state.
import './Indicator.css';

const Indicator = (props) => {
    // console.log("Indicator Props: ", props);

    const style = {backgroundColor: "grey"};

    if (props.state) {
        style.backgroundColor = "red";
    }

    return (
        <div class="indicator">
            <p>{props.title}</p>
            <div class="indicator-display" style={style}/>
        </div>
    );
}

export default Indicator;