import { Flex, Text, Button } from "@chakra-ui/react";

import app from "../firebase/credentials";
import { FcGoogle } from "react-icons/fc";
import { getAuth, GoogleAuthProvider, signInWithRedirect } from "firebase/auth";
const auth = getAuth(app);
const gProvider = new GoogleAuthProvider();

const Login = () => {
  const handleLogin = () => {
    signInWithRedirect(auth, gProvider);
  };
  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      height="100vh"
      w="100%"
      direction="column"
      bg="#1A202C"
    >
      <Text mb={5} className="login-title" color="#dedede">
        Bienvenidx a FakeCord,
        <span className="login-text">
          inicia sesión o registrate para comenzar
        </span>
      </Text>
      <FcGoogle className="google-icon" />
      <Button
        w="80"
        mt={7}
        bg="blue.600"
        color="#dedede"
        onClick={handleLogin}
        _hover={{ bg: "#1A202C" }}
      >
        Acceder con Google
      </Button>
      <Text fontSize={12} mt={21} color="#dedede">
        No tenemos acceso a ningún tipo de información sensible del usuario. 🔒
      </Text>
    </Flex>
  );
};

export default Login;
