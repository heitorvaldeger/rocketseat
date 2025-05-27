import { OrderStatusType } from "@/models/order-status";

interface OrderStatusProps {
  status: OrderStatusType;
}

const orderStatusMap: Record<OrderStatusType, string> = {
  canceled: "Cancelado",
  delivered: "Entregue",
  delivering: "Em entrega",
  pending: "Pendente",
  processing: "Processando",
};

export const OrderStatus = ({ status }: OrderStatusProps) => {
  return (
    <div className="flex items-center gap-2">
      {status === "pending" && (
        <span
          className="h-2 w-2 rounded-full bg-slate-400"
          data-testid="badge"
        />
      )}

      {status === "canceled" && (
        <span
          className="h-2 w-2 rounded-full bg-rose-500"
          data-testid="badge"
        />
      )}

      {status === "delivered" && (
        <span
          className="h-2 w-2 rounded-full bg-emerald-500"
          data-testid="badge"
        />
      )}

      {["delivering", "processing"].includes(status) && (
        <span
          className="h-2 w-2 rounded-full bg-amber-500"
          data-testid="badge"
        />
      )}
      <span className="text-muted-foreground font-medium">
        {orderStatusMap[status]}
      </span>
    </div>
  );
};
