import { ColorRing } from 'react-loader-spinner';
import React from 'react';
import styled from 'styled-components';

const Spinner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Loader = () => {
  return (
    <Spinner>
      <ColorRing
        visible={true}
        height="32"
        width="32"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
        colors={['#3498db', '#e74c3c', '#2ecc71', '#f39c12', '#9b59b6']}
      />
    </Spinner>
  );
};

export default Loader;
