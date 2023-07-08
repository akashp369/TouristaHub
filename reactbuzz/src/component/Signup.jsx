import { Box, Button, FormControl, FormErrorMessage, FormLabel, Heading, Input, VStack } from '@chakra-ui/react';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { signupAction } from '../redux store/action'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Signup({handleClick}) {
    const navigate=useNavigate()
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleSubmit = (e) => {
      e.preventDefault();
      // Perform signup logic here
      axios.post("http://localhost:8080/auth/signup", {
        firstName,lastName,email,password
      }).then(res=>{
        if(res.data.u){
          navigate('/login')
        }else{
          alert('already signup')
          navigate('/login')
        }
      })
      .catch(e=>console.log(e))
      console.log('Signup submitted:', firstName, lastName, email, password);
    };
  
    return (
      <Box maxW="md" mx="auto" mt={8} p={4}>
        <Heading>Signup</Heading>
        <VStack spacing={4} align="stretch">
          <FormControl id="firstName" isRequired>
            <FormLabel>First Name</FormLabel>
            <Input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </FormControl>
  
          <FormControl id="lastName" isRequired>
            <FormLabel>Last Name</FormLabel>
            <Input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </FormControl>
  
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
  
          <Button colorScheme="blue" onClick={handleSubmit}>
            Sign Up
          </Button>
        </VStack>
      </Box>
    );
}
