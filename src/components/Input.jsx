export const Input = ({
    field,
    label,
    value,
    onChangeHandler,
    type,
    showErrorMessage,
    validationMessage,
    onBlurHandler,
    textarea,
    placeholder
}) => {
    const handleValueChange = (e) => {
        onChangeHandler(e.target.value, field)
    }

    const handleInputBlur = (e) => {
        onBlurHandler(e.target.value, field)
    }

    return (
        <>
            <div className="mb-2">
                <span className="subtitle">{label}</span>
            </div>
            {
                textarea ? (
                    <textarea
                        type={type}
                        value={value}
                        rows={5}
                        style={{ maxWidth: '400px' }}
                        onChange={handleValueChange}
                        onBlur={handleInputBlur}
                    />
                ) : (
                    <input
                        type={type}
                        value={value}
                        onChange={handleValueChange}
                        onBlur={handleInputBlur}
                        className="input-container"
                        placeholder={placeholder}
                    />
                )
            }
            <span className="validation-message">
                {showErrorMessage && validationMessage}
            </span>
        </>
    )
}