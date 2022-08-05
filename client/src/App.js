import { Button, Container, Stack } from '@chakra-ui/react';
import './App.css';
import Product from './components/product';
import axios from 'axios';
import { useState } from 'react';
import Banner from './components/Banner';
import AlertComponent from './components/Alert';

function App() {
  const [products, setProducts] = useState([]);

  const onShowProducts = async () => {
    const { data } = await axios.get('/api/products');
    setProducts(data);
  };
  return (
    <>
      <Banner />
      <AlertComponent />
      <Button colorScheme='teal' size='lg' m={5} onClick={onShowProducts}>
        Get Products
      </Button>
      <Container maxW='md' color='black'>
        <Stack spacing={8} direction='column'>
          {products.map((prod) => (
            <Product
              key={prod.id}
              name={prod.name}
              description={prod.description}
              price={prod.price}
            />
          ))}
        </Stack>
      </Container>
    </>
  );
}

export default App;
