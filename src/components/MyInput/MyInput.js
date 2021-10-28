import React from 'react';

function MyInput(props) {
  const { field, form, label, ...rest } = props;
  const { name } = field;

  return (
    <>
      <div className="form-item">
        <label>{label}   
            <input className="input-name" {...field} {...rest} />
        </label>
      </div>
      {
        form.touched[name] && form.errors[name] &&
        <div className='error'>{form.errors[name]}</div>
      }
    </>
  )
}

export default MyInput;
