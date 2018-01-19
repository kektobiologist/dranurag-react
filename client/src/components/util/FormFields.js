import React, { Component } from "react";

export var FormField = ({
  required,
  label,
  iconName,
  postAddonText,
  children
}) => {
  return (
    <div className="form-group">
      <div className="input-group">
        <div className="input-group-prepend">
          <span className="input-group-text">
            {iconName ? <i className={`fa ${iconName} fa-fw`} /> : ""}
          </span>
        </div>
        {children}
        {postAddonText ? (
          <div className="input-group-append">
            <span className="input-group-text">{postAddonText}</span>
          </div>
        ) : (
          ""
        )}
      </div>
      <small className="text-muted form-text">
        {label} {required ? <span className="asterisk">*</span> : ""}
      </small>
    </div>
  );
};

export var TextField = ({
  input: { value, onChange },
  placeholder,
  required,
  inputType,
  ...props
}) => (
  <FormField {...props} required={required}>
    <input
      type={inputType}
      className="form-control input-no-enter"
      required={required}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      onKeyPress={e => {
        if (e.key === "Enter") e.preventDefault();
      }}
    />
  </FormField>
);

export var SelectField = ({
  input: { value, onChange },
  options,
  ...props
}) => (
  <FormField {...props}>
    <select value={value} onChange={onChange} className="form-control">
      {options.map(({ value, text }, idx) => (
        <option key={idx} value={value}>
          {text}
        </option>
      ))}
    </select>
  </FormField>
);
