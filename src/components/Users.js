// Chakra imports
import {Flex, Grid, Icon, Input, Table, Tbody, Text, Th, Thead, Tr, useColorModeValue,} from "@chakra-ui/react";
// Custom components
import Card from "./Card/Card.js";
import CardBody from "./Card/CardBody.js";
import CardHeader from "./Card/CardHeader.js";
import {BsArrowRight} from "react-icons/bs";
import React from "react";
import UserTableRow from "./Tables/UserTableRow";

const Users = ({title, captions, data}) => {
    const textColor = useColorModeValue("gray.700", "white");
    let mainText = useColorModeValue("gray.700", "gray.200");

    return (
        <Card overflowX={{sm: "scroll", xl: "hidden"}}>
            <CardHeader p='6px 0px 22px 0px'>
                <Grid
                    templateColumns={{md: "1fr", lg: "1.8fr 1.2fr"}}
                    templateRows={{md: "1fr auto", lg: "1fr"}}
                >
                    <Grid templateColumns='repeat(3, 1fr)' gap={6}>
                        <Text fontSize='xl' color={textColor} fontWeight='bold'>
                            {title}
                        </Text>

                        <Input
                            fontSize="xs"
                            py="11px"
                            placeholder="Search"
                            borderRadius="2xl"
                            w={{sm: "200px", xl: "300px"}}
                        />
                        <Flex direction="row">
                            <Text
                                fontSize='lg'
                                color={textColor}
                                fontWeight='bold'
                                cursor='pointer'
                                transition='all .5s ease'
                                my={{sm: "1.5rem", lg: "0px"}}
                                _hover={{me: "4px"}}>
                                更多用户
                            </Text>
                            <Icon
                                as={BsArrowRight}
                                w='20px'
                                h='20px'
                                fontSize='2xl'
                                transition='all .5s ease'
                                mx='.3rem'
                                cursor='pointer'
                                pt='4px'
                                _hover={{transform: "translateX(20%)"}}
                            />
                        </Flex>
                    </Grid>
                </Grid>
            </CardHeader>
            <CardBody>
                <Table variant='simple' color={textColor}>
                    <Thead>
                        <Tr my='.8rem' pl='0px' color='gray.400'>
                            {captions.map((caption, idx) => {
                                return (
                                    <Th color='gray.400' key={idx} ps={idx === 0 ? "0px" : null}>
                                        {caption}
                                    </Th>
                                );
                            })}
                        </Tr>
                    </Thead>
                    <Tbody>
                        {data.map((row) => {
                            return (
                                <UserTableRow
                                    userId={row.userId}
                                    username={row.username}
                                    avatar={row.avatar}
                                    email={row.email}
                                    phone={row.phone}
                                    address={row.address}
                                    status={row.userStatus}
                                />
                            );
                        })}
                    </Tbody>
                </Table>
            </CardBody>
        </Card>
    );
};

export default Users;
