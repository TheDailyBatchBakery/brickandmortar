interface OrderStatusBadgeProps {
  status: 'New' | 'Preparing' | 'Ready';
}

export default function OrderStatusBadge({ status }: OrderStatusBadgeProps) {
  const statusColors = {
    New: 'bg-blue-100 text-blue-800',
    Preparing: 'bg-yellow-100 text-yellow-800',
    Ready: 'bg-green-100 text-green-800',
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[status]}`}
    >
      {status}
    </span>
  );
}

