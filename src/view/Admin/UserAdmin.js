import AdminHeader from "../../components/AdminHeader";
import AdminUsers from "../../components/AdminUsers";
import {Flex} from "@chakra-ui/react";

const UserAdmin = () => {
    return (
        <div>
            <AdminHeader/>
            <Flex style={{marginLeft: '100px'}} direction='column' pt={{base: "100px", md: "50px"}}>
                <AdminUsers/>
            </Flex>
        </div>

    );


}
export default UserAdmin;