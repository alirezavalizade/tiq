import { Box } from "@/components/ui";
import { AppHeader } from "@/components/layout";
import { Products } from "@/components/products";

export default function App() {
  return (
    <Box className="flex-1 flex flex-col">
      <AppHeader />
      <Box as="main" className="flex flex-col flex-1" aria-label="Main">
        <Products />
      </Box>
    </Box>
  );
}
