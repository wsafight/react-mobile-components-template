import React, { useEffect, useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import Container from '@site/web/components/Container';
import Meta from '@site/web/components/Meta';
import './style.scss';

const Page = () => {
  const [mounted, setMounted] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (mounted) return;
    setMounted(true);
  }, [mounted]);

  return (
    <Container className="index-page">
      <FormattedMessage id="app.title">
        {(txt) => <Meta title={`Zarm Design - ${txt}`} />}
      </FormattedMessage>
      <main>
        <div className="introduce">
          <div className="title">
            <span>React-Vant</span>
          </div>
          <div className="description">
            <FormattedMessage id="app.home.index.introduce" />
          </div>
          <div className="navigation">
            <button type="button" onClick={() => history.push('/components/quick-start')}>
              <FormattedMessage id="app.home.index.getting-started" />
            </button>
          </div>
        </div>
      </main>
    </Container>
  );
};

export default Page;
