export interface Order {
  createdAt: string;
  customerName: string;
  orderId: string;
  status: "canceled" | "delivered" | "delivering" | "pending" | "processing";
  total: number;
}
