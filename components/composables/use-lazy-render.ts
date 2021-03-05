import { useEffect, useState } from 'react';

export function useLazyRender(show: boolean | undefined) {
  const [inited, setInited] = useState<boolean>(false);

  useEffect(() => {
    if (show) {
      setInited(show);
    }
  }, [show]);

  return (render: () => JSX.Element) => () => (inited ? render() : null);
}
