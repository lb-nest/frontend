import { NextRouter, useRouter } from 'next/router';
import React from 'react';
import { GuardContext } from '../components/guard-context';

type GuardFn = (payload: any, router: NextRouter) => boolean;

interface GuardWrapperProps {
  children?: React.ReactNode;
}

export const useGuard = (guardFn: GuardFn) => {
  const router = useRouter();
  const guard = React.useContext(GuardContext);

  const result = React.useMemo(() => {
    return guardFn(guard.payload, router);
  }, [guardFn, guard.payload, router]);

  const GuardWrapper: React.FC<GuardWrapperProps> = ({ children }) => {
    return <>{result && children}</>;
  };

  return GuardWrapper;
};

export const userGuard: GuardFn = (payload, router) => {
  const result = Boolean(payload);
  if (!result) {
    router.replace('/signin');
  }

  return result;
};

export const projectGuard: GuardFn = (payload, router) => {
  const result = Boolean(payload?.project);
  if (!result) {
    router.replace('/projects');
  }

  return result;
};
