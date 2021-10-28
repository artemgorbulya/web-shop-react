import React from 'react';
import Button from '../Button/Button';
import { connect } from 'react-redux';
import {closeModal} from '../../store/reducer';

export const Modal = (props) => {

    const { header, text, actions, closeModal } = props;

    return (
        <div className="wrapper-modal">
            <div className="wrapper-modal__window">
                <div className="wrapper-modal__header">
                    <span>{header}</span>
                    <Button closeIcon={true} onClick={()=>closeModal()} />
                </div>
                <div className="wrapper-modal__content">
                    {text}
                </div>
                <div className="wrapper-modal__button">
                    {actions}
                </div>
            </div>
        </div>
    )
}

  
  const mapDispatchToProps = (dispatch) => ({
    closeModal: () => dispatch(closeModal())
  })

export default connect(null, mapDispatchToProps)(Modal);