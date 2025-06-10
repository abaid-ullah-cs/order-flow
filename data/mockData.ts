export const mockOrders = [
  {
    id: 1,
    customerName: 'Rajesh Store',
    date: '2023-06-01',
    items: 5,
    total: 1250.50,
    status: 'completed'
  },
  {
    id: 2,
    customerName: 'Sharma General Store',
    date: '2023-06-02',
    items: 3,
    total: 750.00,
    status: 'pending'
  },
  {
    id: 3,
    customerName: 'Gupta Brothers',
    date: '2023-06-02',
    items: 8,
    total: 2400.75,
    status: 'completed'
  },
  {
    id: 4,
    customerName: 'Verma Provision Store',
    date: '2023-06-03',
    items: 4,
    total: 980.25,
    status: 'pending'
  },
  {
    id: 5,
    customerName: 'Singh Electronics',
    date: '2023-06-03',
    items: 2,
    total: 5600.00,
    status: 'pending'
  }
];

export const mockLending = [
  {
    id: 1,
    customerName: 'Rahul Kumar',
    date: '2023-05-15',
    amount: 5000,
    dueDate: '2023-07-15',
    status: 'active'
  },
  {
    id: 2,
    customerName: 'Priya Sharma',
    date: '2023-04-10',
    amount: 2500,
    dueDate: '2023-06-10',
    status: 'active'
  },
  {
    id: 3,
    customerName: 'Amit Singh',
    date: '2023-03-05',
    amount: 10000,
    dueDate: '2023-05-05',
    status: 'completed'
  },
  {
    id: 4,
    customerName: 'Neha Gupta',
    date: '2023-05-20',
    amount: 3000,
    dueDate: '2023-07-20',
    status: 'active'
  }
];

export const mockMilkLending = [
  {
    id: 1,
    customerName: 'Apartment 101',
    date: '2023-06-01',
    amount: 950,
    dueDate: '2023-06-30',
    status: 'active',
    type: 'milk'
  },
  {
    id: 2,
    customerName: 'Mr. Patel',
    date: '2023-06-01',
    amount: 600,
    dueDate: '2023-06-30',
    status: 'active',
    type: 'milk'
  },
  {
    id: 3,
    customerName: 'Sharma Family',
    date: '2023-05-01',
    amount: 900,
    dueDate: '2023-05-31',
    status: 'completed',
    type: 'milk'
  },
  {
    id: 4,
    customerName: 'Dr. Mehta',
    date: '2023-06-01',
    amount: 750,
    dueDate: '2023-06-30',
    status: 'active',
    type: 'milk'
  }
];

export const mockInventory = [
  {
    id: 1,
    name: 'Rice (Basmati)',
    category: 'food',
    quantity: 50,
    minQuantity: 10,
    price: 80
  },
  {
    id: 2,
    name: 'Dal (Toor)',
    category: 'food',
    quantity: 8,
    minQuantity: 10,
    price: 120
  },
  {
    id: 3,
    name: 'Smartphone Charger',
    category: 'electronics',
    quantity: 15,
    minQuantity: 5,
    price: 250
  },
  {
    id: 4,
    name: 'Cotton T-Shirt',
    category: 'clothing',
    quantity: 4,
    minQuantity: 5,
    price: 350
  },
  {
    id: 5,
    name: 'Cooking Oil',
    category: 'food',
    quantity: 20,
    minQuantity: 8,
    price: 150
  }
];