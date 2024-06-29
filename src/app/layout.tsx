// RootLayout.tsx
import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Box } from "@chakra-ui/react";
import { ChakraProvider } from "@chakra-ui/react";

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <html>
      <body>
        <ChakraProvider>
          <Box minH="100vh" display="flex" flexDirection="column">
            <Header />
            <Box flex="1">{children}</Box>
            <Footer />?
          </Box>
        </ChakraProvider>
      </body>
    </html>
  );
};

export default RootLayout;
