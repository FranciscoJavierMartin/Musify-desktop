import React from 'react';
import { Modal, Icon } from 'semantic-ui-react';

import './BasicModal.scss';

interface IBasicModalProps {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
}

const BasicModal: React.FC<IBasicModalProps> = ({
  show,
  setShow,
  title,
  children,
}) => {
  const onClose = (): void => {
    setShow(false);
  };
  return (
    <Modal open={show} onClose={onClose} className='basic-modal' size='tiny'>
      <Modal.Header>
        <h3>{title}</h3>
        <Icon name='close' onClick={onClose} />
      </Modal.Header>
      <Modal.Content>{children}</Modal.Content>
    </Modal>
  );
};

export default BasicModal;
