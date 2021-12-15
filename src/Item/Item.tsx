import  Button from "@material-ui/core/Button";
import { CartItemType } from "../pages/e-commerce/Ecommerce"; 
import { Wrapper } from "./Item.styles";

type Props = {
  item: CartItemType,
  handleAddToaCart: (clickedItem: CartItemType) => void; 
}

const Item: React.FC<Props> = ({item, handleAddToaCart}) => (
  <Wrapper> 
    <img src={item.imagem} alt={item.name}/>
    <div>
      <h3> {item.name}</h3>
      <p> {item.categoria}</p>
      <h3> R$ {item.price} </h3>
      <Button onClick={() => handleAddToaCart(item)}> Adicionar no Carrinho  </Button>
    </div>
  </Wrapper>
);

export default Item;
