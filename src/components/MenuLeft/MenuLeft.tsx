import React, { useEffect, useState } from 'react';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import { Menu, Icon, MenuItemProps } from 'semantic-ui-react';
import BasicModal from '../Modal/BasicModal/BasicModal';
import { getIsUserAdmin } from '../../utils/api';
import { ARTIST_ROUTE, HOME_ROUTE } from '../../constants/routes';

import './MenuLeft.scss';
import { modalType } from '../../constants/enums';

interface IMenuLeftProps extends RouteComponentProps {
  user: firebase.User;
}

const MenuLeft: React.FC<IMenuLeftProps> = ({ user, location }) => {
  const [activeMenu, setactiveMenu] = useState<string>(location.pathname);
  const [isUserAdmin, setIsUserAdmin] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalTitle, setModalTitle] = useState<string>('');
  const [modalContent, setModalContent] = useState<React.ReactNode>(null);

  const handlerMenu = (_: any, menu: MenuItemProps) => {
    setactiveMenu(menu.to);
  };

  const handlerModal = (type: modalType) => {
    switch (type) {
      case modalType.NEW_ARTIST:
        setModalTitle('New artist');
        setModalContent(<h2>New artist</h2>);
        setShowModal(true);
        break;
      case modalType.NEW_SONG:
        setModalTitle('New song');
        setModalContent(<h2>New song</h2>);
        setShowModal(true);
        break;
      default:
        setModalTitle('');
        setModalContent(null);
        setShowModal(false);
        break;
    }
  };

  useEffect(() => {
    setactiveMenu(location.pathname);
  }, [location]);

  useEffect(() => {
    getIsUserAdmin(user.uid).then((response) => {
      setIsUserAdmin(response);
    });
  }, [user]);

  return (
    <>
      <Menu className='menu-left' vertical>
        <div className='top'>
          <Menu.Item
            as={Link}
            to={HOME_ROUTE}
            active={activeMenu === HOME_ROUTE}
            onClick={handlerMenu}
          >
            <Icon name='home' /> Home
          </Menu.Item>
          <Menu.Item
            as={Link}
            to={ARTIST_ROUTE}
            active={activeMenu === ARTIST_ROUTE}
            onClick={handlerMenu}
          >
            <Icon name='music' /> Artists
          </Menu.Item>
        </div>
        {isUserAdmin && (
          <div className='footer'>
            <Menu.Item onClick={() => handlerModal(modalType.NEW_ARTIST)}>
              <Icon name='plus square outline' /> New artist
            </Menu.Item>
            <Menu.Item onClick={() => handlerModal(modalType.NEW_SONG)}>
              <Icon name='plus square outline' /> New song
            </Menu.Item>
          </div>
        )}
      </Menu>
      <BasicModal show={showModal} setShow={setShowModal} title={modalTitle}>
        {modalContent}
      </BasicModal>
    </>
  );
};

export default withRouter(MenuLeft);
