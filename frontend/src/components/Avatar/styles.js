import styled from 'styled-components';

function gera_cor() {
  var hexadecimais = '0123456789ABCDEF';
  var cor = '#';

  // Pega um número aleatório no array acima
  for (var i = 0; i < 6; i++) {
    //E concatena à variável cor
    cor += hexadecimais[Math.floor(Math.random() * 16)];
  }
  return cor;
}

export const Container = styled.div`
  img {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    margin-right: 5px;
  }

  div {
    background: ${gera_cor};
    border-radius: 50%;
    height: 35px;
    width: 35px;
    margin-right: 5px;

    p {
      padding-top: 8px;
      text-align: center;
      color: #fff;
    }
  }
`;
