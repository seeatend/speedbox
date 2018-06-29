const Orders = {
  search: [
    {
      value: "orderNo",
      label: "Order Number"
    },
    {
      value: "email",
      label: "Email"
    },
    {
      value: "shipName",
      label: "Shipper Name"
    },
    {
      value: "consinee",
      label: "Consinee Name"
    },
    {
      value: "address",
      label: "Address"
    },
    {
      value: "customerRef",
      label: "Customer Reference"
    },
    {
      value: "awb",
      label: "AWB"
    },
    {
      value: "returnAwb",
      label: "Return AWB"
    },
    {
      value: "companyName",
      label: "Company Name"
    }
  ],
  status: [
    {
      value: "placed",
      label: "Placed"
    },
    {
      value: "assigned",
      label: "Assigned"
    },
    {
      value: "pickup",
      label: "Pickup"
    },
    {
      value: "in_transit",
      label: "In Transition"
    },
    {
      value: "rto",
      label: "Rto"
    },
    {
      value: "delivery_exception",
      label: "Delivery Exception"
    },
    {
      value: "cancelled",
      label: "Cancelled"
    },
    {
      value: "delivered",
      label: "Delivered"
    },
    {
      value: "ready_to_process",
      label: "Ready To Process"
    },
    {
      value: "processed",
      label: "Processed"
    },
    {
      value: "unprocessed",
      label: "Unprocessed"
    },
  ]
}

module.exports = Orders;