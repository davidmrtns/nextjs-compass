'use client';

import { Box, Pagination } from '@mui/material';
import { useRouter } from 'next/navigation';
import React from 'react';

const PaginationControls = ({
    total,
    page,
    pageSize,
}: {
    total: number;
    page: number;
    pageSize: number;
}) => {
    const router = useRouter();
    const totalPages = Math.ceil(total / pageSize);

    const handlePageChange = (event: React.ChangeEvent<unknown>, newPage: number) => {
        router.push(`?page=${newPage}`);
    };

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Pagination 
                count={totalPages}
                variant='outlined'
                color='primary'
                showFirstButton
                showLastButton
                page={page}
                onChange={handlePageChange}
                sx={{
                    backgroundColor: "#fafafa",
                    marginTop: 1,
                    borderRadius: 5,
                    padding: 1
                }}
            />
        </Box>
    );
};

export default PaginationControls;