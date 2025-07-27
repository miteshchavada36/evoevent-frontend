import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Helmet } from 'react-helmet';

export const SiteWrapper = (props) => {
  return <Page>{props.children}</Page>;
};
export const Page = (props) => {
  return <div className='page'>{props.children}</div>;
};
export const PageWrapper = ({ className = '', children }) => {
  return <div className={`page-wrapper ${className}`}>{children}</div>;
};
export const PageHeader = (props) => {
  return (
    <div className='page-header d-print-none'>
      {props.title && (
        <Helmet>
          <title>
            {props.title} | {process.env.REACT_APP_NAME}
          </title>
        </Helmet>
      )}
      <Container fluid>
        <Row className='align-items-center'>
          <Col>
            {props.subTitle && (
              <div className='page-pretitle'>{props.subTitle}</div>
            )}
            {props.title && <h2 className='page-title'>{props.title}</h2>}
          </Col>
          <Col md='auto'>{props.children}</Col>
        </Row>
      </Container>
    </div>
  );
};
export const PageBody = ({
  children,
  isDashboard = false,
  className = '',
  containerStyles = {},
}) => {
  return (
    <div className={`page-body mt-3 ${className} ${isDashboard ? 'mb-0' : ''}`}>
      {isDashboard ? (
        children
      ) : (
        <Container fluid style={containerStyles}>
          {children}
        </Container>
      )}
    </div>
  );
};
