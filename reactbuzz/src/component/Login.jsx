import React, { useState } from 'react';
import { Box, Button, FormControl, FormErrorMessage, FormLabel, Input, VStack } from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate=useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    axios.post('http://localhost:8080/auth/login', {
      email,password
    }).then(res=>{
      if(res.data.token){
        localStorage.setItem("token", res.data.token)
        navigate('/dashboard')
      }else{
        alert('please enter correct creadential')
      }
    })
    .catch(e=>console.log(e))
    
  };

  return (
    <Box maxW="md" mx="auto" mt={8} p={4}>
      <VStack spacing={4} align="stretch">
        <FormControl id="email" isRequired>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>

        <FormControl id="password" isRequired>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>

        {error && (
          <Box color="red" fontSize="sm">
            {error}
          </Box>
        )}

        <Button colorScheme="blue" onClick={handleSubmit}>
          Log In
        </Button>
      </VStack>
    </Box>
  );
};

export default LoginPage;
