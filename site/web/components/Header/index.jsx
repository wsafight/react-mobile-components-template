import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { IntlProvider, FormattedMessage } from 'react-intl';
import { Icon } from 'zarm';
import classnames from 'classnames';
import docsearch from 'docsearch.js';
import MenuComponent from '@site/web/components/Menu';
import Events from '@site/utils/events';
import Context from '@site/utils/context';
import Locales from '@site/locale';
import { version } from '@/package.json';
import 'docsearch.js/dist/cdn/docsearch.min.css';
import './style.scss';
import '@/components/style/entry';

const initDocSearch = () => {
  docsearch({
    apiKey: '44e980b50447a3a5fac9dc2a4808c439',
    indexName: 'React Vant',
    inputSelector: '.search input',
    debug: false,
  });
};

const Icons = Icon.createFromIconfont('//at.alicdn.com/t/font_1340918_lpsswvb7yv.js');

const Header = ({ children }) => {
  const searchInput = useRef();
  const location = useLocation();
  const [menu, toggleMenu] = useState(false);
  const [locale, setLocale] = useState(window.localStorage.locale || 'zhCN');
  const currentPageKey = location.pathname.split('/')[1] || '/';

  const bb = () => setLocale('zhCN');
  const keyupEvent = (event) => {
    if (event.keyCode === 83 && event.target === document.body) {
      searchInput.current.focus();
    }
  };

  const activeClassName = (keys) => {
    return classnames({
      active: keys.indexOf(currentPageKey) > -1,
    });
  };

  const NAV_ITEMS = [
    {
      key: 'components',
      link: '#/components/quick-start',
      title: <FormattedMessage id="app.home.nav.components" />,
    },
  ];

  if (document.location.host.indexOf('gitee') > -1 || locale === 'enUS') {
    NAV_ITEMS.pop();
  }

  useEffect(() => {
    Events.on(document, 'keyup', keyupEvent);
    initDocSearch();

    return () => {
      Events.off(document, 'keyup', keyupEvent);
    };
  }, []);

  const menuRender = currentPageKey !== '/' && (
    <div className="header-icon header-icon-menu">
      {currentPageKey === 'components' && (
        <>
          <Icons type="list" onClick={() => toggleMenu(!menu)} />
          <div className="header-menu">
            {/* <div className="header-menu__close"><Icon type="close" /></div> */}
            <MenuComponent />
          </div>
        </>
      )}
    </div>
  );

  return (
    <IntlProvider locale="zh-CN" messages={Locales[locale]}>
      <Context.Provider value={{ locale }}>
        <header>
          <div className="header-container">
            {menuRender}
            <div className="logo">
              <a href="#/">
                React-Vant
                <sup className="logo-version">v{version}</sup>
              </a>
            </div>
            <nav>
              <div className="search">
                <Icon type="search" />
                <FormattedMessage id="app.home.nav.search">
                  {(txt) => <input placeholder={txt} ref={searchInput} />}
                </FormattedMessage>
              </div>
              <ul>
                {NAV_ITEMS.map((item) => (
                  <li key={item.key}>
                    <a href={item.link} className={activeClassName([item.key])}>
                      {item.title}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </header>
        {children}
      </Context.Provider>
    </IntlProvider>
  );
};

export default Header;
