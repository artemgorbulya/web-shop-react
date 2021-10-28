import React from 'react'

const Button = (props) => {

	const { text, className, backgroundColor, onClick, closeIcon } = props;

	if (closeIcon) {
		return (<div className="close-icon" onClick={onClick}>&#10006;</div>)
	}

	return (
		<button className={className} style={{ backgroundColor: backgroundColor }} onClick={onClick} >{text}</button>
	)

}

export default Button;