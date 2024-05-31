export const ToggleButton = (props) => {
    const {
        className,
        toggleFunction,
        label,
        check
    } = props
    return(
        <button
            className={`toggleButton ${check ? 'active' : ''}`}
            onClick={toggleFunction}
        >
        {label}
        </button>
    )
}