import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { IconChevronLeft, IconPlus } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

const PageHeaderActions = ({
  title = false,
  actionText = false,
  actionText2 = false,
  onClick = () => {},
  onClick2 = () => {},
  showTag = false,
  countObj = false,
  backButton = false,
  rrb,
  backButtonLink,
  // isDashboard = false,
  // to = "",
  children,
}) => {
  const navigate = useNavigate();

  return (
    <Card.Header>
      {backButton && (
        <IconChevronLeft
          className='me-2'
          onClick={() => navigate(`${backButtonLink}`)}
          style={{ cursor: 'pointer' }}
        />
      )}
      {title && !countObj && (
        <Card.Title as='div' bsPrefix='card-title fw-bold'>
          {title}
        </Card.Title>
      )}
      {actionText && (
        <div className='card-actions'>
          <Button variant='primary' onClick={onClick}>
            <IconPlus className='icon' /> {actionText}
          </Button>
          {actionText2 && onClick2 && (
            <Button variant='primary' onClick={onClick2}>
              <IconPlus className='icon me-1' /> {actionText2}
            </Button>
          )}
        </div>
      )}
      {showTag && (
        <div className='card-actions d-flex'>
          <span className='h2 mx-2 my-0'>
            {rrb && `${rrb.name} (${rrb.city})`}
          </span>
          <span className='bg-light-rrb border rounded px-2 py-1 me-2 d-inline-block fw-medium'>
            {showTag}
          </span>
        </div>
      )}
      {countObj && (
        <Card.Title
          as='div'
          bsPrefix='card-title fw-bold'
          className='d-flex align-items-center'
        >
          <span className='me-1'>{title}</span>
          {countObj.show && (
            <span
              className='circle rounded-circle bg-primary text-white text-center '
              style={{ height: '22px', width: '22px', fontSize: '10px' }}
            >
              {countObj.count}
            </span>
          )}
          {/* {title} */}
        </Card.Title>
      )}
      {/* {isDashboard && (
        <div className="card-actions pe-2">
          <Link to={to} className="fw-semibold">
            View All <IconChevronRight className="icon" />
          </Link>
        </div>
      )} */}
      {children}
    </Card.Header>
  );
};
export default PageHeaderActions;
