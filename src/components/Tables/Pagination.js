import React from 'react';
import {Button, HStack, Text} from '@chakra-ui/react';

const Pagination = ({currentPage, totalPages, onPageChange}) => {
    const isFirstPage = currentPage === 1;
    const isLastPage = currentPage === totalPages;

    const handlePreviousPage = () => {
        if (!isFirstPage) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (!isLastPage) {
            onPageChange(currentPage + 1);
        }
    };

    return (
        <HStack mt="10px" spacing={4} justifyContent="center" alignItems="center">
            <Button
                onClick={handlePreviousPage}
                isDisabled={isFirstPage}
            >
                上一页
            </Button>
            <Text>
                {currentPage} / {totalPages}
            </Text>
            <Button
                onClick={handleNextPage}
                isDisabled={isLastPage}
            >
                下一页
            </Button>
        </HStack>
    );
};

export default Pagination;
