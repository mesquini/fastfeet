import React, { useState, useEffect } from 'react';
import { FaEllipsisH } from 'react-icons/fa';
import { MdEdit, MdDeleteForever, MdVisibility } from 'react-icons/md';
import { toast } from 'react-toastify';

import { Link } from 'react-router-dom';
import api from '~/services/api';

import { makeStyles } from '@material-ui/core/styles';
import { Modal, Backdrop, Fade } from '@material-ui/core';
import { Badge, Options, ModalLayout, Infos, Delete } from './styles';
import { format, parseISO } from 'date-fns';

const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

export default function Actions({ idDelivery, idDeliveryman, onDelete }) {
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [infos, setInfos] = useState('');

  const classes = useStyles();

  useEffect(() => {
    setInfos('');
  }, [open]);

  function handleToggleVisible() {
    setVisible(!visible);
  }

  const handleOpen = () => {
    setOpen(true);
  };

  const handleInfos = async () => {
    handleOpen();
    try {
      const { data } = await api.get(
        `/deliveryman/${idDeliveryman}/delivery/${idDelivery}`
      );

      setInfos(data);
    } catch (error) {
      toast.error('Erro ao carregas as informações!');
    }
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
        <button type="button" onClick={handleInfos}>
          <MdVisibility color="#7156c1" size={16} />
          Vizualizar
        </button>
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
              {infos !== '' ? (
                <Infos>
                  <div className="adress">
                    <h5>Informações da encomenda</h5>
                    <p>
                      {infos.recipient.street}, {infos.recipient.number}
                    </p>
                    <p>
                      {infos.recipient.city} - {infos.recipient.state}
                    </p>
                    <p>{infos.recipient.cep}</p>
                  </div>
                  <div className="date">
                    <h5>Datas</h5>
                    {infos.canceled_at ? (
                      <strong style={{ color: 'red', fontSize: 14 }}>
                        Encomenda cancelada!
                      </strong>
                    ) : (
                      <>
                        <p>
                          <strong>Retirada: </strong>
                          {infos.start_date
                            ? format(
                                parseISO(infos.start_date),
                                'MM/dd/yyyy HH:mm'
                              )
                            : 'Não foi retirado!'}
                        </p>
                        <p>
                          <strong>Entrega: </strong>
                          {infos.end_date
                            ? format(
                                parseISO(infos.end_date),
                                'MM/dd/yyyy HH:mm'
                              )
                            : 'Não foi entregada ainda!'}
                        </p>
                      </>
                    )}
                  </div>
                  <div className="signature">
                    <h5>Assinatura do destinatário</h5>
                    {infos.signature_id ? (
                      <img src={infos.signature_id.url} alt="assinatura" />
                    ) : (
                      <p> Não possuí assinatura, ainda!</p>
                    )}
                  </div>
                </Infos>
              ) : (
                <Delete>
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
                </Delete>
              )}
            </ModalLayout>
          </Fade>
        </Modal>
      </Options>
    </div>
  );
}
