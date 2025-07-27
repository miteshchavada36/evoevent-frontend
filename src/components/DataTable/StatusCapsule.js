import Badge from 'react-bootstrap/Badge';

const StatusCapsual = ({ status, className }) => {
  const statusColors = {
    inactive: 'danger',
    active: 'success',
    completed: 'success',
    'in progress': 'warning',
    upcoming: 'upcoming',
  };

  const badgeColor = statusColors[status?.toLowerCase()] || 'secondary';

  return (
    <Badge bg={badgeColor} className={`status-badge ${className}`}>
      {status}
    </Badge>
  );
};

export default StatusCapsual;
