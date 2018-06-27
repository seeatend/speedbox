const AdminOrdersTableHeader = [
  { id: 'TransactionID', numeric: false, disablePadding: false, label: 'ORDER NO' },
  { id: 'PickupAddress.Name', numeric: false, disablePadding: false, label: 'SHIPPER NAME' },
  { id: 'DeliveryAddress.Name', numeric: false, disablePadding: false, label: 'RECEIVER NAME' },
  { id: 'PickupAddress.Country', numeric: false, disablePadding: false, label: 'ORIGIN' },
  { id: 'DeliveryAddress.Country', numeric: false, disablePadding: false, label: 'DESTINATION' },
  { id: 'Weight', numeric: false, disablePadding: false, label: 'WEIGHT (Kg)' },
  { id: 'Amount', numeric: false, disablePadding: false, label: 'TOTAL AMOUNT' },
  { id: 'Status', numeric: false, disablePadding: false, label: 'STATUS' },
  { id: 'Actions', numeric: false, disablePadding: false, label: 'ACTIONS' },
];

export { AdminOrdersTableHeader }