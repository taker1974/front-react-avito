import './style.css';

const Modal = ( { isVisible, closeModal, updatePassword }) => {

    return isVisible ? (
        <div className="wrapper">
            <div className="container-enter">
                <div className="modal__block">
                    <form className="modal__form-login" id="formLogIn" action="#">
                        <div className="modal__logo">
                            <h2>Сменить пароль</h2>
                        </div>
                        <input className="modal__input login" type="text" name="login" id="formlogin" placeholder="введите новый пароль" />
                        <input className="modal__input password" type="password" name="password" id="formpassword" placeholder="повторите пароль" />
                        <button className="modal__btn-enter" id="btnEnter" onClick={updatePassword}><span>Сменить пароль</span></button>
                        <button className="modal__btn-signup" id="btnSignUp" onClick={closeModal}><span>Отмена</span></button>
                    </form>
                </div>
            </div>
        </div>
    ) : null;
};

export default Modal;