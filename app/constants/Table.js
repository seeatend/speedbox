const AdminOrdersTableHeader = [
  { id: 'TransactionID', numeric: false, disablePadding: true, label: 'Order Number' },
  { id: 'PickupAddress.Country', numeric: false, disablePadding: false, label: 'Pickup Address' },
  { id: 'PickupAddress.Name', numeric: false, disablePadding: false, label: 'Shipper Name (From Name)' },
  { id: 'Weight', numeric: true, disablePadding: false, label: 'Weight (Kg)' },
  { id: 'DeliveryAddress.Country', numeric: false, disablePadding: false, label: 'Delivery Address' },
];

export { AdminOrdersTableHeader }