// Shared storage for orders
// NOTE: In a serverless environment (like Netlify), each API route invocation
// is separate, so in-memory storage won't persist between requests.
// For production, replace this with a database (Supabase, PostgreSQL, etc.)

let orders: any[] = [];

export function getOrders() {
  return orders;
}

export function addOrder(order: any) {
  orders.push(order);
  return order;
}

export function updateOrderStatus(orderId: string, status: string) {
  const order = orders.find((o) => o.id === orderId);
  if (order) {
    order.status = status;
    return order;
  }
  return null;
}

export function getOrderById(orderId: string) {
  return orders.find((o) => o.id === orderId);
}

// For development/testing: clear all orders
export function clearOrders() {
  orders = [];
}

