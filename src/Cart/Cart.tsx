import React from 'react';
import { useState } from 'react';
import CartItem from "../CartItem/CartItem";
import { ModalStyled, Wrapper } from "./Cart.styles";
import { CartItemType } from "../pages/e-commerce/Ecommerce";
import Button from '@material-ui/core/Button';
import Item from "../Item/Item";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';


type Props = {
cartItems: CartItemType[];
addToCart: (clickedItem: CartItemType) => void;
removeFromCart: (id: number) => void;
}

export type PedidoType = {
id: number,
mercadoria: string,
price: number,
quantidade: number,
total: number,
pagamento: string
}

const Cart: React.FC<Props> = ({cartItems, addToCart, removeFromCart}) => {
  const [open, setOpen] = useState(false);
  const [id, setId] = useState(1 as number)
  const [data, setData] = useState(({} as PedidoType));
  const [value, setValue]=useState('' as string)


  const handleOpen = () => {
  setOpen(true);
  };

  const Carrinho = () => {
  const id = 1 + Math.random().toFixed(2);
  const rightId = parseInt(id, 16);
  setId(rightId);
  const mercadorias = cartItems.map(item => item.name);
  const mercadoria = mercadorias.toString()
  const price = 0;
  const total = calculateTotal(cartItems);
  const quantidade = cartItems.map(item => item.amount);
  const quantidades = parseInt(quantidade.toString(), 16);
  const pagamento = value;

  const params = {
  id: rightId,
  mercadoria: mercadoria,
  price: price,
  quantidade: quantidades,
  total: total,
  pagamento: pagamento,
  }
  const xhr = new XMLHttpRequest();
  xhr.open("POST", 'https://data-cartshopping.herokuapp.com/carrinho', true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify(params));


  }


  const GetCarrinhoItem = async () => {
  const response = await fetch(`https://data-cartshopping.herokuapp.com/carrinho/${id}`);
  const json = await response.json();
  setData(json)
  }


  const handleChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setValue(event.target.value);
    };

    const handleClose = () => {
    setOpen(false);
    };

    const calculateTotal = (items: CartItemType[]) =>
    items.reduce((acc: number, item) => acc + item.amount * item.price, 0);

    return(
    <Wrapper>
      <h2> Carrinho de Compras </h2>
      {cartItems.length === 0 ? <p> Carrinho Vazio</p> : null}
      {cartItems.map( item => (
      <CartItem key={item.uuid} item={item} addToCart={addToCart} removeFromCart={removeFromCart} />
      ))}
      <h2> TOTAL: R$ {calculateTotal(cartItems).toFixed(2)}</h2>
      <FormControl component="fieldset">
        <FormLabel component="legend">Forma de Pagamento:</FormLabel>
        <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange} row>
          <FormControlLabel value="Cartão de Crédito" control={<Radio />} label="Cartão de Crédito" />
          <FormControlLabel value="Cartão de Débito" control={<Radio />} label="Cartão de Débito" />
          <FormControlLabel value="Boleto" control={<Radio />} label="Boleto" />
        </RadioGroup>
      </FormControl>
      <Button variant='contained' onClick={()=> Carrinho()}> Confirmar a compra </Button>
      <br />
      <br />
      <Button variant='contained' onClick={()=> { setOpen(true); GetCarrinhoItem()}}> Verificar Status do Pedido
      </Button>

      <ModalStyled open={open} onClose={handleClose}>
        <div className='modalForconfirm'>
          <h2>Pedido Efetuado com Sucesso!</h2>
          <p> Items: {data.mercadoria}</p>
          <p> Forma de Pagamento {data.mercadoria} </p>
          <h2> TOTAL: R$ {data.total}</h2>

          <Button onClick={handleClose}> Ok! </Button>

        </div>


      </ModalStyled>
    </Wrapper>
    )
    }

    export default Cart;