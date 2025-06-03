import {
    Box,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    TextField,
    Button,
    Typography
} from "@mui/material";
import { useState } from "react";

const filterFields = ["Ingredient", "Category", "Area"];

interface FilterProps {
    selectedFilter: string;
    setSelectedFilter: React.Dispatch<React.SetStateAction<string>>;
    filterValue: string;
    setFilterValue: React.Dispatch<React.SetStateAction<string>>;
    getRecipeByFilter: () => void;
    resetFilters: () => void;
}

export default function FilterSidebar({
    selectedFilter,
    setSelectedFilter,
    filterValue,
    setFilterValue,
    getRecipeByFilter,
    resetFilters
}: FilterProps) {



    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                width: 'max-content',
                gap: 1,
                height: '100%',
                flexWrap: 'wrap'
            }}
        >
            <Typography
                variant="subtitle1"
                fontWeight={600}
                color="text.primary"
                sx={{ mr: 1 }}
            >
                Set filter:
            </Typography>

            <FormControl sx={{ minWidth: 160 }}>
                <InputLabel>Filter by</InputLabel>
                <Select
                    value={selectedFilter}
                    label="Filter by"
                    onChange={(e) => setSelectedFilter(e.target.value)}
                >
                    {filterFields.map((field) => (
                        <MenuItem key={field} value={field}>
                            {field}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <TextField
                label="Filter value"
                value={filterValue}
                onChange={(e) => setFilterValue(e.target.value)}
                disabled={!selectedFilter}
            />

            <Button
                variant="outlined"
                size="small"
                color="primary"
                onClick={getRecipeByFilter}
            >
                Apply
            </Button>

            <Button
                variant="outlined"
                size="small"
                color="secondary"
                onClick={resetFilters}
            >
                Reset
            </Button>
        </Box>
    );
}
