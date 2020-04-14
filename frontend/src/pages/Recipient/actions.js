import React, { useState, useEffect } from 'react';
import { MdEdit, MdDeleteForever } from 'react-icons/md';
import { FaEllipsisH } from 'react-icons/fa';
import { makeStyles } from '@material-ui/core/styles';

import { Modal, Backdrop, Fade } from '@material-ui/core';
import { Link } from 'react-router-dom';
import api from '~/services/api';

import { Badge, Options, ModalLayout } from './styles';
import { toast } from 'react-toastify';

const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

export default function Actions(props) {
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const { idRecipient, callbackParent } = props;

  useEffect(() => {
    return () => {
      setData([]);
      setVisible(false);
      setOpen(false);
    };
  }, []);

  const classes = useStyles();

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

  async function handleDelete() {
    try {
      if (data.length > 0) {
        for (let i = 0; i < data.length; i++) {
          const element = data[i];
          await api.delete(`/delivery/${element.id}`);
        }
      } else if (data.length === 0) {
        const deliveriesRecipient = await api.get(
          `/recipient-delivery/${idRecipient}`
        );

        if (deliveriesRecipient.length > 0) {
          setData(deliveriesRecipient.data);
          return;
        } else {
          await api.delete(`/recipient/${idRecipient}`);
          callbackParent(idRecipient);
          handleClose();
          toast.success('Destinatário deletado com sucesso!');
        }
      }
    } catch (error) {
      console.log(error);

      toast.error('Não foi possivel deletar, tente novamente!');
    }
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
              {data.length === 0 ? (
                <>
                  <h2 id="transition-modal-title">Deseja excluir?</h2>
                  <p id="transition-modal-description">
                    Não será possível recuperar depois de ser deletado!
                  </p>

                  <div>
                    <button type="button" onClick={handleDelete}>
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
                  {data.map(infos => (
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
                    <button type="button" onClick={handleDelete}>
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
