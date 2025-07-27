import { IconBell } from '@tabler/icons-react';
import moment from 'moment';
import React from 'react';
import { Popover } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import useIsMobile from '../hooks/useIsMobile';

export const NotificationPopover = ({
  setNotificationModal,
  notificationModal,
  role,
  unreadNotificationCount,
  notifications,
  markAsRead,
  getAllReceivedNotif,
}) => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  return (
    <div style={{ zIndex: isMobile ? '2' : '' }}>
      {' '}
      <div className='me-4'>
        <div className='position-relative'>
          {/* <Button
        variant='primary'
        className='rounded-circle d-flex justify-content-center align-items-center position-relative'
        style={{ padding: '0.316rem' }}
        > */}
          {role !== 'super-admin' && (
            <IconBell onClick={() => setNotificationModal(true)} />
          )}
          <div>
            {unreadNotificationCount > 0 && (
              <div
                className='position-absolute'
                style={{ bottom: '30px', right: '-5px' }}
              >
                <span className='badge rounded-5 bg-danger fs-12'>
                  {unreadNotificationCount}
                </span>
              </div>
            )}
          </div>
          {/* </Button> */}
        </div>
        {notificationModal && (
          <div
            className='position-absolute'
            style={{ right: !isMobile ? '230px' : '0px' }}
          >
            <Popover
              placement='right'
              className='mt-2'
              style={{
                '--tblr-popover-arrow-width': '0',
                '--tblr-popover-arrow-height': '0',
                minWidth: !isMobile ? '450px' : '300px',
              }}
            >
              <Popover.Header className='d-flex justify-content-between align-items-center'>
                <span className={`${!isMobile ? 'fs-2' : 'fs-3'}`}>
                  Notifications
                </span>
                <button
                  type='button'
                  className='btn-close'
                  aria-label='Close'
                  onClick={() => setNotificationModal(false)}
                />
              </Popover.Header>

              <Popover.Body className='p-0'>
                {notifications && notifications?.length > 0 ? (
                  <div>
                    <div
                      style={{
                        maxHeight: '300px',
                        overflow: 'scroll',
                      }}
                    >
                      {notifications?.length > 0 &&
                        notifications.map((noti, index) => {
                          const isLastItem = index === notifications.length - 1;
                          const avatarLetter = `${noti.sentBy.first_name} `
                            ? noti.sentBy.first_name.charAt(0).toUpperCase()
                            : '';
                          const isRead = !noti?.is_read;

                          return (
                            <div
                              key={noti.id}
                              className=''
                              style={
                                isRead
                                  ? {
                                      color: '#2F2F8F',
                                      boxShadow: '0px 0px 10px 0px #0000001A',
                                      background: '#F8F8FB',
                                      cursor: 'pointer',
                                    }
                                  : {}
                              }
                              onClick={() => {
                                if (isRead) {
                                  markAsRead(noti.id);
                                  getAllReceivedNotif();
                                }
                                setNotificationModal(false);
                                navigate('/notifications');
                              }}
                            >
                              <div
                                className='d-flex px-3'
                                style={{
                                  paddingTop: '12px',
                                  paddingBottom: '12px',
                                }}
                              >
                                <div className='d-flex align-items-start'>
                                  <span
                                    style={{
                                      width: !isMobile ? '36px' : '26px',
                                      height: !isMobile ? '36px' : '26px',
                                    }}
                                    className={`avatar rounded-circle text-uppercase text-white bg-primary me-2 fw-bold ${
                                      !isMobile ? 'fs-2' : 'fs-3'
                                    }`}
                                  >
                                    {avatarLetter}
                                  </span>
                                </div>
                                <div className='w-100'>
                                  <div
                                    className={`${
                                      !isMobile ? 'fs-3' : 'fs-4'
                                    } fw-medium`}
                                    // styles={{ marginTop: '5px' }}
                                  >
                                    {noti.title}
                                  </div>
                                  <div
                                    className={`${
                                      !isMobile ? 'fs-4' : 'fs-5'
                                    } text-muted fw-normal`}
                                    style={{ lineHeight: '18px' }}
                                  >
                                    {noti.description}
                                  </div>
                                  <div className='d-flex justify-content-between align-items-center mt-1'>
                                    <div
                                      className={`${
                                        !isMobile ? 'fs-4' : 'fs-5'
                                      }`}
                                    >
                                      Sent By:{' '}
                                      <span className='fw-medium'>
                                        {noti.sentBy.first_name}{' '}
                                        {noti.sentBy.last_name}
                                      </span>
                                    </div>
                                    <div
                                      className={`small text-muted fw-normal ${
                                        !isMobile ? 'fs-4' : 'fs-5'
                                      }`}
                                    >
                                      {moment(noti.created_at).format(
                                        'DD/MM/YYYY, HH:mm'
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Show separator only if it's NOT the last item */}
                              {!isLastItem && <div className='hr m-0'></div>}
                            </div>
                          );
                        })}
                    </div>

                    <div
                      className='bg-white m-0 p-2 position-static'
                      style={{
                        borderBottomLeftRadius: '5px',
                        borderBottomRightRadius: '5px',
                        boxShadow: '0px 0px 10px 0px #0000001A',
                        background: '#F8F8FB',
                      }}
                    >
                      <h3
                        className={`m-0 text-center ${
                          !isMobile ? 'fs-3' : 'fs-4'
                        } fw-normal`}
                        onClick={() => {
                          setNotificationModal(false);
                          navigate('/notifications');
                        }}
                      >
                        View all
                      </h3>
                    </div>
                  </div>
                ) : (
                  <div>
                    <h3 className='text-muted text-center mt-3'>
                      No notifications yet
                    </h3>
                  </div>
                )}
              </Popover.Body>
            </Popover>
          </div>
        )}
      </div>
    </div>
  );
};
