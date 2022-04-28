import { gql, TypedDocumentNode, useMutation } from '@apollo/client';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

interface Variables {
  code: string;
}

interface Result {
  confirmEmail: boolean;
}

const CONFIRM_EMAIL: TypedDocumentNode<Result, Variables> = gql`
  mutation ConfirmEmail($code: String!) {
    confirmEmail(code: $code)
  }
`;

const ConfirmEmail: NextPage = () => {
  const { t } = useTranslation();

  const router = useRouter();

  const [confirmEmail] = useMutation(CONFIRM_EMAIL);

  React.useEffect(() => {
    const asyncEffect = async (): Promise<void> => {
      try {
        await toast.promise(
          confirmEmail({
            variables: {
              code: String(router.query.code),
            },
          }),
          t('common:promise', { returnObjects: true }),
        );

        await router.replace('/');
      } catch {}
    };

    asyncEffect();
  }, [router.query.code, confirmEmail, router, t]);

  return null;
};

export default ConfirmEmail;
