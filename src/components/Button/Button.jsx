import classes from "./Button.module.css"

function Button(props) {
    return (
        <button type={props.type} className={classes.button} onClick={props.onClick}>{props.text}</button>
    );
}

export default Button;