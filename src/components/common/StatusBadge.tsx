type Props = {
  status: string
  type?: 'availability' | 'tenant' | 'maintenance' | 'payment'
}

export function StatusBadge({ status, type = 'availability' }: Props) {
  const getStatusColor = () => {
    switch (type) {
      case 'availability':
        switch (status) {
          case 'Vacant':
            return 'bg-green-100 text-green-800'
          case 'Occupied':
            return 'bg-blue-100 text-blue-800'
          case 'Temporarily Unavailable':
            return 'bg-yellow-100 text-yellow-800'
          case 'Maintenance':
            return 'bg-orange-100 text-orange-800'
          default:
            return 'bg-gray-100 text-gray-800'
        }
      case 'tenant':
        switch (status) {
          case 'Active':
            return 'bg-green-100 text-green-800'
          case 'Former':
            return 'bg-gray-100 text-gray-800'
          default:
            return 'bg-gray-100 text-gray-800'
        }
      case 'payment':
        switch (status) {
          case 'Paid':
            return 'bg-green-100 text-green-800'
          case 'Pending':
            return 'bg-yellow-100 text-yellow-800'
          case 'Partial':
            return 'bg-orange-100 text-orange-800'
          default:
            return 'bg-gray-100 text-gray-800'
        }
      case 'maintenance':
        switch (status) {
          case 'Pending':
            return 'bg-yellow-100 text-yellow-800'
          case 'In Progress':
            return 'bg-blue-100 text-blue-800'
          case 'Completed':
            return 'bg-green-100 text-green-800'
          default:
            return 'bg-gray-100 text-gray-800'
        }
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${getStatusColor()}`}>
      {status}
    </span>
  )
}