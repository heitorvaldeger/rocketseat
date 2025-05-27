import { approveOrder } from "@/api/approve-order";
import { cancelOrder } from "@/api/cancel-order";
import { deliverOrder } from "@/api/deliver-order";
import { dispatchOrder } from "@/api/dispatch-order";
import { GetOrdersResponse } from "@/api/get-orders";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { TableCell, TableRow } from "@/components/ui/table";
import { Order } from "@/models/order";
import { OrderStatusType } from "@/models/order-status";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ArrowRight, Search, X } from "lucide-react";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";

import { OrderDetails } from "./order-details";
import { OrderStatus } from "./order-status";

export interface OrderTableRowProps {
  order: Order;
}
export const OrderTableRow = ({ order }: OrderTableRowProps) => {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const updateOrdersStatusOnCache = (
    orderId: string,
    status: OrderStatusType,
  ) => {
    const ordersListCached = queryClient.getQueriesData<GetOrdersResponse>({
      queryKey: ["orders"],
    });

    ordersListCached.forEach(([cacheKey, cacheData]) => {
      queryClient.setQueryData<GetOrdersResponse>(cacheKey, {
        ...cacheData,
        orders: cacheData.orders.map((order) => {
          if (order.orderId === orderId) {
            return {
              ...order,
              status,
            };
          }

          return order;
        }),
      });
    });
  };

  const queryClient = useQueryClient();
  const { isLoading: isCancelingOrder, mutateAsync: cancelOrderFn } =
    useMutation({
      mutationFn: cancelOrder,
      onSuccess(_, { orderId }) {
        updateOrdersStatusOnCache(orderId, "canceled");
      },
    });

  const { isLoading: isApprovingOrder, mutateAsync: approveOrderFn } =
    useMutation({
      mutationFn: approveOrder,
      onSuccess(_, { orderId }) {
        updateOrdersStatusOnCache(orderId, "processing");
      },
    });

  const { isLoading: isDeliveringOrder, mutateAsync: deliverOrderFn } =
    useMutation({
      mutationFn: deliverOrder,
      onSuccess(_, { orderId }) {
        updateOrdersStatusOnCache(orderId, "delivered");
      },
    });

  const { isLoading: isDispatchingOrder, mutateAsync: dispatchOrderFn } =
    useMutation({
      mutationFn: dispatchOrder,
      onSuccess(_, { orderId }) {
        updateOrdersStatusOnCache(orderId, "delivering");
      },
    });

  return (
    <TableRow>
      <TableCell>
        <Dialog onOpenChange={setIsDetailsOpen} open={isDetailsOpen}>
          <DialogTrigger asChild>
            <Button size="sm" variant="outline">
              <Search className="h-3 w-3" />
              <span className="sr-only">Detalhes do pedido</span>
            </Button>
          </DialogTrigger>

          <OrderDetails open={isDetailsOpen} orderId={order.orderId} />
        </Dialog>
      </TableCell>
      <TableCell className="font-mono text-xs font-medium">
        #{order.orderId}
      </TableCell>
      <TableCell className="text-muted-foreground">
        {formatDistanceToNow(order.createdAt, {
          addSuffix: true,
          locale: ptBR,
        })}
      </TableCell>
      <TableCell>
        <OrderStatus status={order.status} />
      </TableCell>
      <TableCell className="font-medium">{order.customerName}</TableCell>
      <TableCell className="font-medium">
        {(order.total / 100).toLocaleString("pt-BR", {
          currency: "BRL",
          style: "currency",
        })}
      </TableCell>
      <TableCell>
        {order.status === "pending" && (
          <Button
            disabled={isApprovingOrder}
            onClick={() => approveOrderFn({ orderId: order.orderId })}
            size="sm"
            variant="outline"
          >
            <ArrowRight className="mr-1 h-3 w-3" />
            Aprovar
          </Button>
        )}

        {order.status === "processing" && (
          <Button
            disabled={isDispatchingOrder}
            onClick={() => dispatchOrderFn({ orderId: order.orderId })}
            size="sm"
            variant="outline"
          >
            <ArrowRight className="mr-1 h-3 w-3" />
            Em entrega
          </Button>
        )}

        {order.status === "delivering" && (
          <Button
            disabled={isDeliveringOrder}
            onClick={() => deliverOrderFn({ orderId: order.orderId })}
            size="sm"
            variant="outline"
          >
            <ArrowRight className="mr-1 h-3 w-3" />
            Entregue
          </Button>
        )}
      </TableCell>
      <TableCell>
        <Button
          disabled={
            !["pending", "processing"].includes(order.status) ||
            isCancelingOrder
          }
          onClick={() => cancelOrderFn({ orderId: order.orderId })}
          size="sm"
          variant="ghost"
        >
          <X className="mr-1 h-3 w-3" />
          Cancelar
        </Button>
      </TableCell>
    </TableRow>
  );
};
