import React, { useState } from 'react';
import { FaEllipsisH } from 'react-icons/fa';
import { MdEdit, MdDeleteForever, MdVisibility } from 'react-icons/md';

import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import { Modal, Backdrop, Fade } from '@material-ui/core';
import { Badge, Options, ModalLayout } from './styles';

const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

export default function Actions({ idDelivery, onDelete }) {
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);

  const classes = useStyles();

  function handleToggleVisible() {
    setVisible(!visible);
  }

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setVisible(!visible);
  };

  return (
    <div>
      <Badge onClick={handleToggleVisible}>
        <FaEllipsisH size={20} color="#7156c1" />
      </Badge>
      <Options visible={visible}>
        <Link to="">
          <MdVisibility color="#7156c1" size={16} />
          Vizualizar
        </Link>
        <Link to={`/delivery/${idDelivery}`}>
          <MdEdit color="#0472D1" size={16} />
          Editar
        </Link>
        <button type="button" onClick={handleOpen}>
          <MdDeleteForever color="#FF0F29" size={16} />
          Excluir
        </button>
        <Modal
          className={classes.modal}
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          backdrop={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <ModalLayout>
              <h2 id="transition-modal-title">Deseja excluir?</h2>
              <p id="transition-modal-description">
                Não será possível recuperar depois de ser deletado!
              </p>
              <div>
                <button type="button" onClick={onDelete}>
                  SIM
                </button>
                <button type="button" onClick={handleClose}>
                  CANCELAR
                </button>
              </div>
            </ModalLayout>
          </Fade>
        </Modal>
      </Options>
    </div>
  );
}
