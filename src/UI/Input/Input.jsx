function Input({ config: propsConfig = {}, register, name, defaultValue, error, onFieldChange }) {
    const defaultConfig = {
        type: 'text',
        placeholder: ''
    };
    const config = {
        ...defaultConfig,
        ...propsConfig
    };
    
    return (
        <div className="field">
            <input
                className="w-full border-solid border border-field-border rounded p-2 placeholder-placeholder"
                type={config.type}
                defaultValue={defaultValue}
                placeholder={config.placeholder}
                onInput={(e) => onFieldChange(e.target.value, name)}
                {...register(name)}
            />
            {
                error && (
                    <p className="text-danger text-xs mt-1">
                        { error.message || 'Error' }
                    </p>
                )
            }
        </div>
    )
}

export default Input;
