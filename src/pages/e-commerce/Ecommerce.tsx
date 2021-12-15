import React from 'react';
import { useState } from 'react';
import { useQuery } from 'react-query';
import  Drawer from '@material-ui/core/Drawer';
import  LinearProgress  from '@material-ui/core/LinearProgress'; 
import Grid from '@material-ui/core/Grid';
import AddShoppingCarticon from '@material-ui/icons/AddShoppingCart';
import  Badge  from '@material-ui/core/Badge';
import { StyledButton, Wrapper } from './Ecommerce.style';
import Item from '../../Item/Item';
import Cart from '../../Cart/Cart';

export type CartItemType = {
  uuid: number;
  name: string; 
  price: number; 
  categoria: string;
  imagem: string;
  tamanho: string;
  amount: number;
}

const getMercadorias = async (): Promise<CartItemType[]> => 
  await (await fetch('https://data-cartshopping.herokuapp.com/mercadorias')).json();
 

const Ecommerce = () =>  {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([] as CartItemType[]); 
  const {data, isLoading, error} = useQuery<CartItemType[]>(
    'mercadorias', getMercadorias);
    console.log(data)

    const getTotalItens = (items: CartItemType[]) => 
      items.reduce((acc: number, item) => acc + item.amount, 0);
    

    const handleAddToaCart = (clickedItem: CartItemType) => {
      setCartItems(prev => {
        const isItemInCart = prev.find(item => item.uuid === clickedItem.uuid)
        if (isItemInCart){
          return prev.map(item => 
           item.uuid === clickedItem.uuid
           ? {
             ...item, amount: item.amount + 1
           }
           : item
          );
        }
        return [...prev, {...clickedItem, amount: 1 }]
      });
    };

    const handleRemoveFromCart = (uuid: number) => {
      setCartItems(prev => 
        prev.reduce((acc, item) => {
          if (item.uuid === uuid){
            if(item.amount ===1 ) return acc;
            return [...acc, {...item, amount: item.amount -1}]
          } 
          else {
            return [...acc, item];
          }
        },  [] as CartItemType[])
       
      );
    }

    

    if(isLoading) return <LinearProgress />
    if (error) return <div> Something went wrong ... </div>
     return (
    <>
   <Wrapper>
     <Drawer anchor='right' open={cartOpen} onClose={() => setCartOpen(false)} >
      <Cart cartItems={cartItems}  
      addToCart={handleAddToaCart}
      removeFromCart={handleRemoveFromCart}/>
     </Drawer> 
     <StyledButton onClick={() => setCartOpen(true)}> 
     <Badge badgeContent={getTotalItens(cartItems)} color='error'>
       <AddShoppingCarticon /> 
     </Badge>
     </StyledButton>
     <Grid container spacing={3}>
      {data?.map(item => (
        <Grid item key={item.uuid} xs={12} sm={4}> 
        <Item item={item} handleAddToaCart={handleAddToaCart}></Item>
        </Grid> 
      ))} 
     </Grid>
     
   </Wrapper>
 </> );
}

export default Ecommerce;
