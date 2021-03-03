import React, { useState, useContext, useRef, useEffect } from 'react';
import { Route, Switch, Redirect, useParams } from 'react-router-dom';
import classnames from 'classnames';
import Loadable from 'react-loadable';
import { FormattedMessage } from 'react-intl';
import { documents, components } from '@site/site.config';
import Context from '@site/utils/context';
import Container from '@site/web/components/Container';
import SideBar from '@site/web/components/SideBar';
import Footer from '@site/web/components/Footer';
import Markdown from '@site/web/components/Markdown';
import './style.scss';

const isComponentPage = (page) => ['introduce', 'quick-start', 'change-log'].indexOf(page) === -1;

const LoadableComponent = (component) => {
  return Loadable({
    loader: component.module,
    render: (loaded, props) => {
      return <Markdown document={loaded.default} component={component} {...props} />;
    },
    loading: () => null,
  });
};

const Simulator = () => {
  const params = useParams();
  const simulatorRef = useRef();
  const { locale } = useContext(Context);
  const [affix, setAffix] = useState(JSON.parse(window.localStorage['simulator-affix'] || false));

  const simulatorCls = classnames('simulator', {
    'simulator--affix': affix,
  });

  useEffect(() => {
    !/(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent) &&
      simulatorRef.current.contentWindow.postMessage({ locale });
  }, [locale]);

  return (
    <div className={simulatorCls}>
      <FormattedMessage id={`app.home.components.simulator.${affix ? 'unaffix' : 'affix'}`}>
        {(txt) => (
          <div
            className="simulator__control"
            onClick={() => {
              setAffix(!affix);
              window.localStorage['simulator-affix'] = !affix;
            }}
            title={txt}
          >
            icons
          </div>
        )}
      </FormattedMessage>
      <iframe
        ref={simulatorRef}
        src={`${window.location.protocol}//${window.location.host}/demo.html#/${params.component}`}
        title="simulator"
        frameBorder="0"
      />
    </div>
  );
};

const Page = () => {
  const { general, form, feedback, view, navigation, other } = components;
  const params = useParams();

  const containerCls = classnames('main-container', 'markdown', {
    'no-simulator': !isComponentPage(params.component),
  });

  return (
    <Container className="components-page">
      <main>
        <SideBar />
        {isComponentPage(params.component) && <Simulator />}
        <div className={containerCls}>
          <Switch>
            {documents.map((doc, i) => (
              <Route key={+i} path={`/components/${doc.key}`} component={LoadableComponent(doc)} />
            ))}
            {[...general, ...form, ...feedback, ...view, ...navigation, ...other].map(
              (component, i) => (
                <Route
                  key={+i}
                  path={`/components/${component.key}`}
                  component={LoadableComponent(component)}
                />
              ),
            )}
            <Redirect to="/" />
          </Switch>
        </div>
      </main>
      <Footer />
    </Container>
  );
};

export default Page;
