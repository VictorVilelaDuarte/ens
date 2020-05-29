import React from 'react';

import { Button } from './styles';

function AddButton({ children, ...rest }) {
  return <Button>{children}</Button>;
}

export default AddButton;
