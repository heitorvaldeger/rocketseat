import * as zod from 'zod'
import {
  FormContainer,
} from "./styles";
import { CompleteOrderSection } from "./components/CompleteOrderSection";
import { CoffeeSelectedSection } from "./components/CoffeeSelectedSection";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from 'react-toastify';
import { useCartContext } from '@/contexts/CartContext';
import { useNavigate } from 'react-router-dom';

const cartFormValidationSchema = zod.object({
  zipCode: zod.string().trim().length(9).regex(new RegExp(/(\d{0,5})-(\d{0,3})/), 'Invalid zipcode').min(1, 'Required'),
  street: zod.string().trim().min(1, 'Required'),
  number: zod.string().trim().regex(new RegExp(/^\d+$/), 'Invalid number').min(1, 'Required'),
  complement: zod.string().trim().optional(),
  district: zod.string().trim().min(1, 'Required'),
  city: zod.string().trim().min(1, 'Required'),
  state: zod.string().trim().min(1, 'Required'),
  paymentMethod: zod.enum(['credit', 'debit', 'cash'], {
    invalid_type_error: 'Informe um método de pagamento',
  }),
})

type CartFormData = zod.infer<typeof cartFormValidationSchema>
export const CartView = () => {
  const cartForm = useForm({
    resolver: zodResolver<CartFormData>(cartFormValidationSchema),
  })

  const { addNewOrderToCart } = useCartContext()

  const { handleSubmit } = cartForm

  const handleCreateCart = ({ paymentMethod, ...address }: CartFormData) => {
    addNewOrderToCart({...address}, paymentMethod)
  }

  const handleErrorsCart = () => {
    toast.error(`There're fields invalid in the form`)
  }

  return (
    <FormContainer onSubmit={handleSubmit(handleCreateCart, handleErrorsCart)}>
      <FormProvider {...cartForm}>
        <CompleteOrderSection />
        <CoffeeSelectedSection />
      </FormProvider>
    </FormContainer>
  );
};
