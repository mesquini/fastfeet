import React, { useState } from 'react';
import { FaEllipsisH } from 'react-icons/fa';
import { MdEdit, MdDeleteForever, MdVisibility } from 'react-icons/md';

import { Link } from 'react-router-dom';

import { Container, Badge, Options } from './stylesActions';

export default function Actions({ id }) {
  const [visible, setVisible] = useState(false);

  function handleToggleVisible() {
    setVisible(!visible);
  }

  return (
    <Container>
      <Badge onClick={handleToggleVisible}>
        <FaEllipsisH size={20} color="#7156c1" />
      </Badge>
      <Options visible={visible}>
        <Link to="">
          <MdVisibility color="#7156c1" size={16} />
          Vizualizar
        </Link>
        <Link to="">
          <MdEdit color="#0472D1" size={16} />
          Editar
        </Link>
        <Link to="">
          <MdDeleteForever color="#FF0F29" size={16} />
          Excluir
        </Link>
      </Options>
    </Container>
  );
}
