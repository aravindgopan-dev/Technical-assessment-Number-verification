import React from 'react';

function Input({
    id,
    name,
    type = "text",
    placeholder,
    value,
    onChange,
    required = false,
    error = "",
    className = "",
    ...props
}) {
    const hasError = Boolean(error);

    return (
        <div>
            <input
                id={id}
                name={name}
                type={type}
                autoComplete={type === "password" ? "current-password" : type === "email" ? "email" : "off"}
                required={required}
                className={`input ${hasError ? 'border-red-500' : ''} ${className}`}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                {...props}
            />
            {hasError && (
                <p className="mt-1 text-sm text-red-400">{error}</p>
            )}
        </div>
    );
}

export default Input;
