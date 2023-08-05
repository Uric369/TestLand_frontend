// // Chakra imports
// import {Flex, Grid, Icon, Input, Table, Tbody, Text, Th, Thead, Tr, useColorModeValue, Box, Heading} from "@chakra-ui/react";
// // Custom components
// import Card from "./Card/Card.js";
// import CardBody from "./Card/CardBody.js";
// import CardHeader from "./Card/CardHeader.js";
// import ProblemTableRow from "./Tables/ProblemTableRow.js";
// import {BsArrowRight} from "react-icons/bs";
// import React from "react";
// import {NavLink} from "react-router-dom";

// const Problems = ({captions, data, keyword}) => {
//     const textColor = useColorModeValue("gray.700", "white");
//     let mainText = useColorModeValue("gray.700", "gray.200");

//     if(data && data.length != 0) {  
//     return (
//         <Card overflowX={{sm: "scroll", xl: "hidden"}}>
//             {/* <CardHeader p='6px 0px 22px 0px'>
//                 <Grid
//                     templateColumns={{md: "1fr", lg: "4fr 1fr"}}
//                     templateRows={{md: "1fr auto", lg: "1fr"}}
//                 >
//                     <Grid templateColumns='2fr 6fr 5fr' gap={6}>
//                         <Text fontSize='xl' color={textColor} fontWeight='bold'>
//                             {title}
//                         </Text>

//                         <Input
//                             fontSize="xs"
//                             py="11px"
//                             placeholder="Search"
//                             borderRadius="2xl"
//                             width="95%"
//                             // w={{sm: "200px", xl: "300px"}}
//                         />

//                         <Flex direction="row">
//                             <NavLink to="/problemBank">
//                                 <Flex direction="row">

//                                     <Text
//                                         fontSize='lg'
//                                         color={textColor}
//                                         fontWeight='bold'
//                                         cursor='pointer'
//                                         transition='all .5s ease'
//                                         my={{sm: "1.5rem", lg: "0px"}}
//                                         _hover={{me: "4px"}}>
//                                         更多题目
//                                     </Text>
//                                     <Icon
//                                         as={BsArrowRight}
//                                         w='20px'
//                                         h='20px'
//                                         fontSize='2xl'
//                                         transition='all .5s ease'
//                                         mx='.3rem'
//                                         cursor='pointer'
//                                         pt='4px'
//                                         _hover={{transform: "translateX(20%)"}}
//                                     />
//                                 </Flex>
//                             </NavLink>
//                         </Flex>
//                     </Grid>
//                 </Grid>
//             </CardHeader> */}
//             <CardBody>
//                 <Table variant='simple' color={textColor}>
//                     <Thead>
//                         <Tr my='.8rem' pl='0px' color='gray.400'>
//                             {captions.map((caption, idx) => {
//                                 return (
//                                     <Th color='gray.400' key={idx} ps={idx === 0 ? "0px" : null}>
//                                         {caption}
//                                     </Th>
//                                 );
//                             })}
//                         </Tr>
//                     </Thead>
//                     <Tbody>
//                         {
//                             data.map((row) => {
//                                 return (
//                                     <ProblemTableRow
//                                         problemId={row.problemId}
//                                         problemTitle={row.problemTitle}
//                                         tags={row.tags}
//                                         passRate={row.passRate * 100}
//                                         updateTime={row.updateTime}
//                                         level={row.difficulty}
//                                     />
//                                 );
//                             })
//                         }
                    
//                     </Tbody>
//                 </Table>
//             </CardBody>
//         </Card>
//     );
//                         }
//     else {
//         return (
//             <Box textAlign="center" py={4}>
//             <Flex align="center">
//                 <Heading as="h2" size="lg" color="gray.700" whiteSpace="nowrap">
//                 当前页已无更多题目
//                 </Heading>
//             </Flex>
//             </Box>
//         );
//     }
// };

// export default Problems;
  

import { useState, useEffect } from "react";
import {
  Flex,
  Grid,
  Icon,
  Input,
  Table,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  Box,
  Heading,
} from "@chakra-ui/react";
import Card from "./Card/Card.js";
import CardBody from "./Card/CardBody.js";
import CardHeader from "./Card/CardHeader.js";
import ProblemTableRow from "./Tables/ProblemTableRow.js";
import { BsArrowRight } from "react-icons/bs";
import React from "react";
import { NavLink } from "react-router-dom";

const Problems = ({ captions, data, keyword }) => {
  const textColor = useColorModeValue("gray.700", "white");
  let mainText = useColorModeValue("gray.700", "gray.200");

  const [highlightedKeyword, setHighlightedKeyword] = useState(keyword.toString());

  useEffect(() => {
    setHighlightedKeyword(keyword.toString());
  }, [keyword]);

  const highlightText = (text) => {
    return text.replace(new RegExp(`(${highlightedKeyword})`, "gi"), "<span style='background-color: yellow'>$1</span>");
  };

  if (data && data.length !== 0) {
    return (
      <Card overflowX={{ sm: "scroll", xl: "hidden" }}>
        <CardBody>
          <Table variant="simple" color={textColor}>
            <Thead>
              <Tr my=".8rem" pl="0px" color="gray.400">
                {captions.map((caption, idx) => {
                  return (
                    <Th color="gray.400" key={idx} ps={idx === 0 ? "0px" : null}>
                      {caption}
                    </Th>
                  );
                })}
              </Tr>
            </Thead>
            <Tbody>
              {data.map((row) => {
                return (
                  <ProblemTableRow
                    problemId={row.problemId}
                    problemTitle={<span dangerouslySetInnerHTML={{ __html: highlightText(row.problemTitle) }}></span>}
                    tags={row.tags}
                    passRate={row.passRate * 100}
                    updateTime={row.updateTime}
                    level={row.difficulty}
                  />
                );
              })}
            </Tbody>
          </Table>
        </CardBody>
      </Card>
    );
  } else {
    return (
      <Box textAlign="center" py={4}>
        <Flex align="center">
          <Heading as="h2" size="lg" color="gray.700" whiteSpace="nowrap">
            当前页已无更多题目
          </Heading>
        </Flex>
      </Box>
    );
  }
};

export default Problems;
