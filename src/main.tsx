import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { UserProvider } from "./contexts/UserContext.tsx";
import { ProductProvider } from "./contexts/ProductContext.tsx";
import { InventoryProvider } from "./contexts/InventoryContext.tsx";

createRoot(document.getElementById("root")!).render(
  <UserProvider>
    <ProductProvider>
      <InventoryProvider>
        <App />
      </InventoryProvider>
    </ProductProvider>
  </UserProvider>
);
