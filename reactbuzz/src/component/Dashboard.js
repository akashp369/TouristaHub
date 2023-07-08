import React, { useEffect, useState } from 'react';
import { Box, Button, Flex, Image, Text, VStack } from '@chakra-ui/react';
import axios from 'axios';
import { frame } from 'framer-motion';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const[fr, setFr]=useState([])
  var token=""
  useEffect(() => {
    token=localStorage.getItem('token')
    const fetchUser = async () => {
      try {
        const response = await axios.get('http://localhost:8080/user',{
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
        console.log(response.data)
        setUser(response.data);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch user data.');
        setLoading(false);
        console.error('Fetch user error:', error);
      }
    };

    fetchUser();
    friend();
  }, []);
  const friend=()=>{
    axios.get('http://localhost:8080/user/all', {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }).then(res=>setFr(res.data))
    .catch(e=>console.log(e))
  }
  const handleAddFriend = async (friendId) => {
    console.log(friendId)
    try {
      const res=await axios.post(`http://localhost:8080/user/friend/64a932dfb84bb92b714548ba`,{body:{userID:user._id}}, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      console.log(res)
    } catch (error) {
      console.error('Add friend error:', error);
    }
  };

  


  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text color="red">{error}</Text>;
  }

  if (!user) {
    return null;
  }

  return (
    <Box maxW="md" mx="auto" mt={8} p={4}>
      <VStack spacing={4} align="stretch">
        <Flex textAlign={"center"} alignItems={"center"} justifyContent={"space-evenly"} >
      <Image
          src={"https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png"} 
          alt={`${user.firstName} ${user.lastName}`}
          // borderRadius="full"
          boxSize="150px"
          // objectFit="cover"
        />
        <Box textAlign={"center"} alignItems={"center"} >        <Text fontSize="xl" fontWeight="bold">
          {user.firstName} {user.lastName}
        </Text>
        <Text>Email: {user.email}</Text>
        <Text>Followers: {user.impressions}</Text>
        <Text>Profile View: {user.viewedProfile}</Text>
        {/* Display additional user data as needed */}
        </Box>

        </Flex>
        <Box>
        <Text fontWeight="bold">Friends:</Text>
        {fr.length === 0 ? (
          <Text>No friends.</Text>
        ) : (
          <VStack align="stretch" spacing={2}>
            {fr.map((friend) => (
              <Box key={friend._id} borderBottom="1px solid gray" py={2}>
                <Text>{friend.firstName} {friend.lastName}</Text>
                
                <Button
                  ml={"10px"}
                  size="sm"
                  colorScheme="green"
                  onClick={() => handleAddFriend(friend._id)} 
                >
                  Remove
                </Button>
              </Box>
            ))}
          </VStack>
        )}

        {/* Add Friend Button */}
        
        </Box>
   
      </VStack>
    </Box>
  );
};

export default Dashboard;
