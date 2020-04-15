import React, { useState, useEffect } from 'react';
import { MdEdit, MdDeleteForever } from 'react-icons/md';
import { FaEllipsisH } from 'react-icons/fa';
import { makeStyles } from '@material-ui/core/styles';

import { Modal, Backdrop, Fade } from '@material-ui/core';
import { Link } from 'react-router-dom';

import { Badge, Options, ModalLayout } from './styles';

const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

export default function Actions({
  idRecipient,
  data,
  onDelete,
  onDeleteConfirm,
}) {
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [recipientDeliveries, setRecipientDeliveries] = useState([]);

  const classes = useStyles();

  useEffect(() => {
    if (data) {
      setRecipientDeliveries(data);
    }
  }, [data]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setVisible(!visible);
  };

  function handleToggleVisible() {
    setVisible(!visible);
  }

  return (
    <div>
      <Badge onClick={handleToggleVisible}>
        <FaEllipsisH size={24} />
      </Badge>
      <Options visible={visible}>
        <Link to={`/recipient/${idRecipient}`}>
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
              {recipientDeliveries.length === 0 ? (
                <>
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
                </>
              ) : (
                <>
                  <h2 id="transition-modal-title">Deseja excluir mesmo?</h2>
                  <strong>
                    Será deletado todo os produtos relacionados a esse
                    destinatário
                  </strong>
                  {recipientDeliveries.map(infos => (
                    <div
                      key={infos.id}
                      style={{
                        display: 'flex',
                        marginTop: 15,
                        justifyContent: 'space-around',
                      }}
                    >
                      <ul>
                        <li>
                          ID: {infos.id} - Produto: {infos.product}
                        </li>
                      </ul>
                    </div>
                  ))}
                  <div>
                    <button type="button" onClick={onDeleteConfirm}>
                      OK, ESTOU CIENTE
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
