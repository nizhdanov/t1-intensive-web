import type { NavigateOptions } from 'react-router-dom';

import { useNavigate } from 'react-router-dom';

import { ROUTES } from '../routes';

interface useGoBackParams {
  fallbackRoute?: string;
  options?: NavigateOptions
}

export const useGoBack = (params?: useGoBackParams) => {
  const navigate = useNavigate();

  const canGoBack: boolean = window.history.state && window.history.state.idx > 0;

  const goBack = () => {
    if (canGoBack) {
      navigate(-1);
    } else {
      navigate(params?.fallbackRoute || ROUTES.HOME, params?.options);
    }
  };

  return {
    goBack,
    canGoBack
  };
};
