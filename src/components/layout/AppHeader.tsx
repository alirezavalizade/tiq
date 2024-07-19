import { Box, Heading } from "@/components/ui";

export default function AppHeader() {
  return (
    <Box
      as="header"
      className="flex items-center justify-center px-4 py-6 min-h-20 md:min-h-32 bg-purple-900 text-white"
      aria-label="Header"
    >
      <Heading className="text-xl md:text-2xl lg:text-3xl tracking-widest ">Plan Your Trip</Heading>
    </Box>
  );
}
