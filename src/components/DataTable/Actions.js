import { IconPencil, IconTrash } from '@tabler/icons-react';
import React from 'react';
import { Link } from 'react-router-dom';
import { RIconDeleteFill, RIconEditFill, RIconPC } from '../Icons';
import { IconEye } from '@tabler/icons-react';

const Actions = ({
  row,
  onEdit = false,
  onDelete = false,
  onDashboard = false,
  onPreview = false,
}) => {
  return (
    <div className='text-nowrap'>
      {onPreview && (
        <Link
          to={''}
          title='Preview'
          onClick={(e) => {
            e.preventDefault();
            onPreview(row);
          }}
          className='action-link p-1 me-1 '
        >
          <IconEye />
        </Link>
      )}
      {onEdit && (
        <Link
          to={''}
          title='Edit'
          onClick={(e) => {
            e.preventDefault();
            onEdit(row);
          }}
          className='action-link p-2 me-1'
        >
          <RIconEditFill />
        </Link>
      )}
      {onDelete && (
        <Link
          to={''}
          title='Delete'
          onClick={() => {
            onDelete(row);
          }}
          className='action-link danger p-1 me-1 '
        >
          <RIconDeleteFill />
        </Link>
      )}
      {onDashboard && (
        <Link
          to={`/recruitment_boards/dashboard/${row.original.id}?name=${row.original.name}&&man=1`}
          title='Dashboard'
          onClick={() => {
            onDashboard(row);
          }}
          className='action-link danger p-1 me-1 '
        >
          <RIconPC height='18px' width='18px' />
        </Link>
      )}
    </div>
  );
};

export default Actions;
