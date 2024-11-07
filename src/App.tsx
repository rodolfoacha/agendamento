import * as React from 'react';
import AppRoutes from './routes/routes';
import { Box, ChakraProvider } from '@chakra-ui/react';
import { AuthProvider } from './context/AuthContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import customTheme from './components/toastColor'; // Ensure the path is correct

const queryClient = new QueryClient();

export const App: React.FC = () => (
  <ChakraProvider theme={customTheme}>
    <Box>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <AppRoutes />
        </QueryClientProvider>
      </AuthProvider>
    </Box>
  </ChakraProvider>
);

export default App;
