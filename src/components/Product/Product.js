import React from 'react';
import Button from '../Button/Button';
import Modal from '../Modal/Modal';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toggleFavorite, toggleCart, closeModal, openModalAddCard, openModalDeleteCard} from '../../store/reducer';


const Product = (props) => {

  const { id, color, title, price, image, isOnCart, isFavourite, toggleFavorite, toggleCart, openmodal, modalid, closeModal, openModalAddCard, openModalDeleteCard } = props;

  return (
    <>
      <div className="product">
        <div className="product__photo">
          <img src={`/products/${image}`} alt="" />
          <i className={`product__favorite fas fa-star ${isFavourite ? "color--active" : ""}`} onClick={() => toggleFavorite(id)}></i>
        </div >
        <div className="product__title">
          {title}
        </div>
        <div className="product__article-color">
          <span className="product__article">Артикул: {id} </span><span className="product__color">Цвет: {color}</span>
        </div>
        <div className="product__price">
          <span className="product__price-name">Цена: </span><span className="product__price-value">{price} </span><span className="product__price-uah">₴</span>
        </div>
        <div className="product__button">
          {!isOnCart
            ? <Button text="Добавить в корзину" className="btn-card" backgroundColor="#288040" onClick={()=>openModalAddCard(id)} />
            : <Button text="Удалить из корзины" className="btn-card" backgroundColor="#d44637" onClick={()=>openModalDeleteCard(id)} />}
        </div>

        {openmodal == 'add' && modalid === id &&
          <Modal
            header="Вы хотите добавить товар в корзину?"
            text="Нажмите ОК для добавления товара в корзину или нажмите Отмена для закрытия диалогового окна"
            actions={[
              <Button key="1" backgroundColor="#B3382C" className="btn-modal" text="ОК" onClick={() => {
                toggleCart(id);
                closeModal();
              }} />,
              <Button key="2" backgroundColor="#B3382C" className="btn-modal" text="Отмена" onClick={()=> closeModal()} />
            ]}
          />
        }

        {openmodal === 'delete' && modalid === id &&
          <Modal
          header="Вы хотите удалить товар из корзины"
          text="Нажмите ОК для удаления товара из корзины или нажмите Отмена для закрытия диалогового окна"
          actions={[
            <Button key="1" backgroundColor="#B3382C" className="btn-modal" text="ОК" onClick={() => {
              toggleCart(id);
              closeModal();
            }} />,
            <Button key="2" backgroundColor="#B3382C" className="btn-modal" text="Отмена" onClick={()=> closeModal()} />
          ]}
        />
        }

      </div>
    </>
  );
}

Product.propTypes = {
  id: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
}

Product.defaultProps = {
  id: "Unknown",
  color: "Unknown",
  title: "Unknown",
  price: "0",
  image: "null.jpg"
}

const mapStateToProps = (state) => {
  return {
    prods: state.prods,
    openmodal: state.modal,
    modalid: state.modalid
  }
}

const mapDispatchToProps = (dispatch) => ({
  toggleFavorite: (id) => dispatch(toggleFavorite(id)),
  toggleCart: (id) => dispatch(toggleCart(id)),
  closeModal: () => dispatch(closeModal()),
  openModalAddCard: (id) => dispatch(openModalAddCard(id)),
  openModalDeleteCard: (id) => dispatch(openModalDeleteCard(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(Product);