import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { Search, X } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { useSearchParams } from "react-router";
import { z } from "zod";

const orderFiltersSchema = z.object({
  customerName: z.string().optional(),
  orderId: z.string().optional(),
  status: z.string().optional(),
});

type OrderFiltersSchema = z.infer<typeof orderFiltersSchema>;

export const OrderTableFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const orderId = searchParams.get("orderId") ?? "";
  const customerName = searchParams.get("customerName") ?? "";
  const status = searchParams.get("status") ?? "all";

  const { control, handleSubmit, register, reset } =
    useForm<OrderFiltersSchema>({
      defaultValues: {
        customerName,
        orderId,
        status,
      },
      resolver: zodResolver(orderFiltersSchema),
    });

  const handleFilter = ({
    customerName,
    orderId,
    status,
  }: OrderFiltersSchema) => {
    setSearchParams((state) => {
      if (orderId) {
        state.set("orderId", orderId);
      } else {
        state.delete("orderId");
      }

      if (customerName) {
        state.set("customerName", customerName);
      } else {
        state.delete("customerName");
      }

      if (status) {
        state.set("status", status);
      } else {
        state.delete("status");
      }

      state.set("page", "1");
      return state;
    });
  };

  const handleClearFilters = () => {
    setSearchParams((state) => {
      state.delete("orderId");
      state.delete("customerName");
      state.delete("status");
      state.set("page", "1");

      return state;
    });

    reset({
      customerName: "",
      orderId: "",
      status: "",
    });
  };

  return (
    <form
      className="flex items-center gap-2"
      onSubmit={handleSubmit(handleFilter)}
    >
      <span className="text-sm font-semibold">Filtros</span>

      <Input
        className="h-8 w-auto"
        placeholder="ID do pedido"
        {...register("orderId")}
      />
      <Input
        className="h-8 w-[320px]"
        placeholder="Nome do cliente"
        {...register("customerName")}
      />
      <Controller
        control={control}
        name="status"
        render={({ field: { disabled, name, onChange, value } }) => (
          <Select
            defaultValue="all"
            disabled={disabled}
            name={name}
            onValueChange={onChange}
            value={value}
          >
            <SelectTrigger className="h-8 w-[180px]">
              <SelectValue data-testid="status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="pending">Pendente</SelectItem>
              <SelectItem value="canceled">Cancelado</SelectItem>
              <SelectItem value="processing">Em preparo</SelectItem>
              <SelectItem value="delivering">Em entrega</SelectItem>
              <SelectItem value="delivered">Entregue</SelectItem>
            </SelectContent>
          </Select>
        )}
      />

      <Button size="sm" type="submit" variant="secondary">
        <Search className="mr-2 h-4 w-4" />
        Filtrar resultados
      </Button>

      <Button
        onClick={() => {
          handleClearFilters();
        }}
        size="sm"
        type="button"
        variant="outline"
      >
        <X className="mr-2 h-4 w-4" />
        Remover filtros
      </Button>
    </form>
  );
};
