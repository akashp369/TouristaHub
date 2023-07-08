import { Box, Button, Flex } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <Box>
      <Flex justifyContent={'space-evenly'} bg={"green.100"}> 
        <Button bg={'green.700'} color={'whiteAlpha.900'}><Link to={'/dashboard'}>DashBoard</Link></Button>
        <Button bg={'green.700'} color={'whiteAlpha.900'}><Link to={'/signup'}>Singup</Link></Button>
        <Button bg={'green.700'} color={'whiteAlpha.900'}><Link to={'/login'}>Login</Link></Button>
        {/* <Button bg={'green.700'} color={'whiteAlpha.900'}><Link to={'/login'}>Logout</Link></Button> */}
      </Flex>
    </Box>
  )
}
