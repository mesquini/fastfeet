import React, { useEffect, useState } from 'react';

import { Container } from './styles';

export default function Avatar({ deliveryman }) {
  const [url, setURL] = useState('');
  const [letters, setLetters] = useState('');

  useEffect(() => {
    if (deliveryman.avatar) {
      setURL(deliveryman.avatar.url);
    } else {
      const name = deliveryman.name.split(' ');

      if (name.length === 2) {
        const letter = name[0].charAt(0) + name[1].charAt(0);
        setLetters(letter.toUpperCase());
      } else if (name.length === 1) {
        const letter = name[0].charAt(0);
        setLetters(letter.toUpperCase());
      }
    }
  }, [deliveryman.avatar, deliveryman.name]);

  function avatarDelivery() {
    if (!!url) {
      return <img src={url} alt={deliveryman.name} />;
    } else if (!!letters) {
      return (
        <div>
          <p>{letters}</p>
        </div>
      );
    }
  }

  return <Container>{avatarDelivery()}</Container>;
}
