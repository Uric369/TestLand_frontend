import {Button, Flex,} from "@chakra-ui/react";
// Custom components
import React, {useState} from "react";

import ProblemList from "./ProblemList";
import ProblemAddingForm from "./Tables/ProblemAddingForm";


const AdminProblem = () => {
    const [showForm, setShowForm] = useState(false);

    const handleAddProblem = () => {
        setShowForm(true);
    };

    return (
        <Flex style={{marginLeft: '100px'}} direction='column' pt={{base: "100px", md: "50px"}}>
            <div>
                {!showForm && (
                    <div>
                        <ProblemList/>
                        <Button onClick={handleAddProblem}>新增题目</Button>
                    </div>
                )}
                {showForm && <ProblemAddingForm setShowForm={setShowForm}/>}
            </div>
        </Flex>
    );
};

export default AdminProblem;