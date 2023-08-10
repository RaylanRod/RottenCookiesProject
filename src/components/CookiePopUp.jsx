import React, { useRef, useState } from 'react';
import { Button, Modal, Alert } from 'react-bootstrap';

function CookiePopUp() {
  const alertPlaceholder = useRef(null);
  const [showModal, setShowModal] = useState(true);
  const [showAlert, setShowAlert] = useState(false);

  const handleAcceptCookies = () => {
    setShowModal(false);
  };

  const handleDenyCookies = () => {
    setShowAlert(true);
  };

  const handleAlertClose = () => {
    setShowAlert(false);
  };

  const appendAlert = (message, type) => {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = `
      <div class="alert alert-${type} alert-dismissible" role="alert">
        <div>${message}</div>
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
    `;

    alertPlaceholder.current.appendChild(wrapper);
  };

  const handleAlertClick = () => {
    appendAlert('Please let us collect cookies', 'light');
  };

  return (
    <Modal show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Cookie Permissions</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Our page is set to automatically accept cookies from your browser unless otherwise specified. This pop up is a courtesy to ensure you are aware.
        </p>
        <hr />
        <p>
          We here at Rotten Cookies want to create the best experience for our users. In order to continually improve our program, we ask that you accept cookies.
        </p>
        <div id="liveAlertPlaceholder" ref={alertPlaceholder}></div>
      </Modal.Body>
      <Modal.Footer>
        {showAlert && (
          <Alert variant="light" onClose={handleAlertClose} dismissible>
            Please let us collect cookies
          </Alert>
        )}
        <Button variant="secondary" onClick={handleDenyCookies}>
          Deny cookies
        </Button>
        <Button variant="primary" onClick={handleAcceptCookies}>
          Accept cookies
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CookiePopUp;
