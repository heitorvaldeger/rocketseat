import { MapPin, CurrencyDollar, CreditCard, Bank, Money } from "@phosphor-icons/react";
import {
  CompleteOrderSectionAddressContainer,
  CompleteOrderSectionAddressFieldsContainer,
  CompleteOrderSectionAddressHeaderContainer,
  CompleteOrderSectionContainer,
  CompleteOrderSectionPaymentContainer,
  CompleteOrderSectionPaymentHeaderContainer,
  CompleteOrderSectionPaymentList,
  SectionTitle,
} from "./styles";
import { useFormContext } from "react-hook-form";
import { cepMask } from "@/utils/cep-mask";
import { Radio } from "@/components/Radio";

export const CompleteOrderSection = () => {
  const { register, watch } = useFormContext();

  const {onChange, ...zipCodeRegister} = register("zipCode")

  const selectedPaymentMethod = watch("paymentMethod");

  return (
    <CompleteOrderSectionContainer>
      <SectionTitle>Complete seu pedido</SectionTitle>

      <CompleteOrderSectionAddressContainer>
        <CompleteOrderSectionAddressHeaderContainer>
          <MapPin size={22} />
          <div>
            <p>Endereço de Entrega</p>
            <p>Informe o endereço onde deseja receber seu pedido</p>
          </div>
        </CompleteOrderSectionAddressHeaderContainer>

        <CompleteOrderSectionAddressFieldsContainer>
          <input
            id="cep"
            type="text"
            placeholder="CEP"
            onChange={(e) => {
              if (e.target.value.length < 10) {
                e.target.value = cepMask(e.target.value);
                onChange(e)
              }
            }}
            maxLength={9}
            {...zipCodeRegister}
          />

          <input type="text" placeholder="Rua" {...register("street")} />
          <div>
            <input id="number" type="number" placeholder="Número" {...register('number')} />
            <input id="complement" type="text" placeholder="Complemento" {...register('complement')} />
          </div>
          <div>
            <input id="district" type="text" placeholder="Bairro" {...register('district')} />
            <input id="city" type="text" placeholder="Cidade" {...register('city')} />
            <input id="state" type="text" placeholder="UF" {...register('state')} />
          </div>
        </CompleteOrderSectionAddressFieldsContainer>
      </CompleteOrderSectionAddressContainer>

      <CompleteOrderSectionPaymentContainer>
        <CompleteOrderSectionPaymentHeaderContainer>
          <CurrencyDollar size={22} />
          <div>
            <p>Pagamento</p>
            <p>O pagamento é feito na entrega. Escolha a forma que seja pagar</p>
          </div>
        </CompleteOrderSectionPaymentHeaderContainer>

        <CompleteOrderSectionPaymentList>
          <Radio isSelected={selectedPaymentMethod === "credit"} {...register("paymentMethod")} value="credit">
            <CreditCard size={16} />
            <span>Cartão de crédito</span>
          </Radio>
          <Radio isSelected={selectedPaymentMethod === "debit"} {...register("paymentMethod")} value="debit">
            <Bank size={16} />
            <span>Cartão de débito</span>
          </Radio>
          <Radio isSelected={selectedPaymentMethod === "cash"} {...register("paymentMethod")} value="cash">
            <Money size={16} />
            <span>Dinheiro</span>
          </Radio>
        </CompleteOrderSectionPaymentList>
      </CompleteOrderSectionPaymentContainer>
    </CompleteOrderSectionContainer>
  );
};
