import { useMutation } from '@apollo/client';
import React from 'react';
import { UPLOAD } from '../core/api';

export const useUpload = (size: number = 10485760) => {
  const [cache, setCache] = React.useState<Record<string, string>>({});

  const [upload] = useMutation(UPLOAD);

  return React.useCallback(
    async (file: File) => {
      if (cache[file.name]) {
        return cache[file.name];
      }

      if (file.size > size) {
        throw new Error('playload_to_large');
      }

      const result = await upload({
        variables: {
          file,
        },
      });

      if (!result.data) {
        throw new Error('bad_request');
      }

      setCache((prev) => ({
        ...prev,
        [file.name]: result.data.upload,
      }));

      return result.data.upload;
    },
    [size],
  );
};
