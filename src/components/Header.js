import React from "react";
import {
    Avatar,
    Box,
    Button,
    Center,
    Flex,
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList,
    Stack,
    TabList,
    Tabs,
    Text,
    useColorMode,
    useColorModeValue,
    useDisclosure,
    useMultiStyleConfig,
    useTab
} from '@chakra-ui/react';
import {Link, NavLink, useLocation} from 'react-router-dom';
import {MoonIcon, SunIcon} from '@chakra-ui/icons';
import {DocumentIcon,} from "./Icons/Icons";

const Header = () => {
    const {colorMode, toggleColorMode} = useColorMode();
    const {isOpen, onOpen, onClose} = useDisclosure();
    const ModeColor = useColorModeValue("blue", "teal");
    let navbarIcon = useColorModeValue("gray.700", "gray.200");
    const user = JSON.parse(localStorage.getItem("user"));
    const location = useLocation();

    console.log("user");

    const handleLogout = () => {
        localStorage.removeItem("user");

        // 重定向用户到登录页面
        window.location = "/";
    }

    const CustomTab = React.forwardRef((props, ref) => {
        // 1. Reuse the `useTab` hook
        const tabProps = useTab({...props, ref});
        // const isSelected = !!tabProps['aria-selected'];
        const isSelected = location.pathname === props.to;

        // 2. Hook into the Tabs `size`, `variant`, props
        const styles = useMultiStyleConfig('Tabs', tabProps);

        return (
            <Link to={props.to} __css={styles.tab} {...tabProps}>
                {/* <Box as='span' fontSize={isSelected ?'2xl' : 'xl'} mr='2'> */}
                <Box as='span' fontSize='2xl' mr='1'>
                    {isSelected ? '😎' : '😐'}
                </Box>
                {tabProps.children}
            </Link>
        );
    });


    return (
        <>
            <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
                <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                    {/* <Box>Logo</Box> */}
                    {/* <Tabs variant='soft-rounded' colorScheme={ModeColor}>
              <TabList>
                <NavLink to="/"><Tab>主页</Tab></NavLink>
                <NavLink to="/problemBank"><Tab>题库</Tab></NavLink>
                <NavLink to="/forum"> <Tab>讨论区</Tab></NavLink>
                <NavLink to="/leaderBoard">  <Tab>排行榜</Tab></NavLink>
              </TabList>
            </Tabs> */}
                    <Tabs variant="soft-rounded" colorScheme="teal">
                        <TabList fontWeight="bold" fontSize={"xl"} spacing={20}>
                            <CustomTab to="/">主页</CustomTab>
                            <Flex w="30px"></Flex>
                            <CustomTab to="/problemBank">题库</CustomTab>
                            <Flex w="30px"></Flex>
                            <CustomTab to="/forum">讨论区</CustomTab>
                            <Flex w="30px"></Flex>
                            <CustomTab to="/leaderBoard">排行榜</CustomTab>
                        </TabList>
                    </Tabs>

                    <Flex alignItems={'center'}>
                        <Stack direction={'row'} spacing={7}>
                            <Button onClick={toggleColorMode}>
                                {colorMode === 'light' ? <MoonIcon/> : <SunIcon/>}
                            </Button>
                            {!user ? (
                                <NavLink to="/login">
                                    <Button
                                        fontSize="2xl"
                                        ms="0px"
                                        px="0px"
                                        me={{sm: "2px", md: "16px"}}
                                        color={navbarIcon}
                                        variant="transparent-with-icon"
                                        leftIcon={<DocumentIcon color={navbarIcon} w="20px" h="20px" me="0px"/>}
                                    >
                                        <Text>Sign In</Text>
                                    </Button>
                                </NavLink>
                            ) : (
                                <Menu>
                                    <MenuButton
                                        as={Button}
                                        rounded={'full'}
                                        variant={'link'}
                                        cursor={'pointer'}
                                        minW={0}>
                                        <Avatar
                                            size={'sm'}
                                            src={'https://avatars.dicebear.com/api/male/username.svg'}
                                        />
                                    </MenuButton>
                                    <MenuList alignItems={'center'}>
                                        <br/>
                                        <Center>
                                            <Avatar
                                                size={'2xl'}
                                                src={'https://avatars.dicebear.com/api/male/username.svg'}
                                            />
                                        </Center>
                                        <br/>
                                        <Center fontSize={"xl"} fontWeight={"bold"}>
                                            <p>{user.username}</p>
                                        </Center>
                                        <Center>
                                            <p>{user.email}</p>
                                        </Center>
                                        <br/>
                                        <MenuDivider/>
                                        <MenuItem>Your Servers</MenuItem>
                                        <NavLink to="/personalInfo">
                                            <MenuItem>Account Settings</MenuItem>
                                        </NavLink>
                                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                                    </MenuList>
                                </Menu>
                            )}
                        </Stack>
                    </Flex>
                </Flex>
            </Box>
        </>
    );
}

export default Header;
