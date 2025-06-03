import { Box, Typography, Chip, Stack } from "@mui/material";

interface AppliedFiltersProps {
    appliedFilterContent: string;
}

export default function AppliedFilters({ appliedFilterContent }: AppliedFiltersProps) {
    return (
        <Box
            sx={{
                borderRadius: 2,
                display: 'flex',
                alignItems: 'center',
                width: 'max-content',
                gap: 1,
                height: '100%'
            }}
        >
            <Typography
                variant="subtitle1"
                fontWeight={600}
                color="text.primary"
            >
                Applied filter:
            </Typography>

            <Chip
                label={appliedFilterContent}
                color="primary"
                variant="filled"
                sx={{ fontWeight: 500 }}
            />
        </Box>
    );
}
