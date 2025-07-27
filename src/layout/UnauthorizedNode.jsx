import { useRoutes } from 'react-router-dom';

import useLogin from '../hooks/useLogin';

const UnauthorizedNode = () => {
  const unauthorizeRoutes = useLogin(false);
  return useRoutes(unauthorizeRoutes);
};

export default UnauthorizedNode;