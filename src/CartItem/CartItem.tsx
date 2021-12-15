import Button from '@material-ui/core/Button'
import { CartItemType } from "../pages/e-commerce/Ecommerce"; 
import { Wrapper } from './CartItem.style';

type Props = {
  item: CartItemType,
  addToCart: (clickedItem: CartItemType) => void;
  removeFromCart: (uuid: number) => void; 
}

const CartItem: React.FC<Props> = ({item, addToCart, removeFromCart}) => 
<Wrapper>
<div> 
 <h3> {item.name}</h3>
 <div className='information'> </div>
 <p> Valor R$ {item.price} </p>
 <p>TOTAL: R${(item.amount * item.price).toFixed(2)} </p>
<div className='buttonsforcar'>
  <Button
  size='small'
  disableElevation
  variant="contained"
  onClick= {() => removeFromCart(item.uuid)}
  >
    -
  </Button>
  <p> {item.amount}</p>
  <Button
  size='small'
  disableElevation
  variant="contained"
  onClick= {() => addToCart(item)}
  >
   +
  </Button>
</div>
</div>
<img src={item.imagem} alt={item.name} /> 
</Wrapper>

export default CartItem; 