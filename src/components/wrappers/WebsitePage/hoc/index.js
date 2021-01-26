/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import WebsitePageWrapper from '../index';
import WebsitePageProvider from '../provider';

export default function websitePageHOC(Component, { pageWrapperProps }) {
  return (props) => (
    <>
      <WebsitePageProvider>
        <WebsitePageWrapper {...pageWrapperProps}>
          <Component {...props} />
        </WebsitePageWrapper>
      </WebsitePageProvider>
    </>
  );
}
