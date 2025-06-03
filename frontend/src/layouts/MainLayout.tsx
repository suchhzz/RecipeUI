import { ReactNode } from "react";
import { Container } from "@mui/material";

export default function MainLayout({ children }: { children: ReactNode }) {
    return (
        <>
            <Container maxWidth="lg" sx={{ mt: 9 }} >
                {children}
            </Container>
        </>
    )
}