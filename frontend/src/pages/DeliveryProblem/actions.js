import React, { useState } from 'react';
import { FaEllipsisH } from 'react-icons/fa';
import { MdDeleteForever, MdVisibility } from 'react-icons/md';

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

export default function Actions({ description, onCancel }) {
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [problem, setProblem] = useState('');

  const classes = useStyles();

  function handleToggleVisible() {
    setVisible(!visible);
  }

  const handleOpen = () => {
    setOpen(true);
  };

  const handleOpenDetails = () => {
    if (description) setProblem(description);
    handleOpen();
  };

  const handleOpenCancel = () => {
    if (description) setProblem('');
    handleOpen();
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
        <button type="button" onClick={handleOpenDetails}>
          <MdVisibility color="#7156c1" size={16} />
          Vizualizar
        </button>
        <button type="button" onClick={handleOpenCancel}>
          <MdDeleteForever color="#FF0F29" size={16} />
          Cancelar encomenda
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
              {problem.length > 0 ? (
                <>
                  <h2 id="transition-modal-title">VIZUALIZAR PROBLEMA</h2>
                  <p id="transition-modal-description">{problem}</p>
                </>
              ) : (
                <>
                  <h2 id="transition-modal-title">
                    Deseja cancelar a encomenda?
                  </h2>
                  <p id="transition-modal-description">
                    Não será possível alterar depois!
                  </p>
                  <div>
                    <button type="button" onClick={onCancel}>
                      SIM
                    </button>
                    <button type="button" onClick={handleClose}>
                      CANCELAR
                    </button>
                  </div>
                </>
              )}
            </ModalLayout>
          </Fade>
        </Modal>
      </Options>
    </div>
  );
}
