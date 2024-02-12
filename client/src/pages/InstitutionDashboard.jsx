import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import axios from "axios";
import { message } from "antd";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button } from "@chakra-ui/react";



const InstitutionDashboard = () => {
  const [createdTests, setCreatedTests] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submissionDetails, setSubmissionDetails] = useState([]);


  const getTests = async () => {
    try {
      const res = await axios.get("/api/v1/user/getCreatedTests", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        setCreatedTests(res.data.createdTests);
        message.success(res.data.message);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      message.error("Something went wrong");
    }
  };

    useEffect(() => {
        getTests();
    }, []);

  
    const showDetails = async (testId) => {
      try {
        const res = await axios.get(`/api/v1/test/getSubmissions/${testId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (res.data.success) {
          console.log(res.data.submissions);
          setSubmissionDetails(res.data.submissions);
          setIsModalOpen(true); // Ouvrir le modal avec les détails
        } else {
          message.error("Error in fetching submissions details");
        }
      } catch (error) {
        console.log(error);
        message.error("Something went wrong");
      }
    };
    
    

  return (
    <Layout>
      <div className="my-4 overflow-hidden rounded-lg bg-gradient-to-r from-green-200 to-white shadow">
        <div className="flex items-center justify-between px-4 sm:p-6">
          <h1 className="text-4xl font-bold">Exam Dashboard</h1>
        </div>
      </div>

      <div>
        <TableContainer>
          <Table variant="striped" colorScheme="teal">
            <TableCaption>List of exams created by you!</TableCaption>
            <Thead>
              <Tr>
                <Th>Test Name</Th>
                <Th>Date</Th>
                <Th>Time</Th>
                <Th>Students Count</Th>
                <Th>Duration</Th>
              </Tr>
            </Thead>
            <Tbody>
                {createdTests.map((test) => (
                    <Tr key={test.testId}>
                    <Td>{test.testName}</Td>
                    <Td>{test.testDate}</Td>
                    <Td>{test.startTime}</Td>
                    <Td>{test.studentsCount}</Td>
                    <Td>{test.duration} Minutes</Td>
                    <Td>
                      <button
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300"
                        onClick={() => showDetails(test.testId)}
                      >
                        Détails
                      </button>
                    </Td>
                    </Tr>
                ))}
            </Tbody>
          </Table>
        </TableContainer>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ModalOverlay />
          <ModalContent>
            <ModalHeader>Submission Details</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
  {submissionDetails.map((detail, index) => (
    <div key={index} className="mb-4">
      <p><strong>User ID:</strong> {detail.userId}</p>
      <p><strong>Score:</strong> {detail.score}</p>
      <div>
        <strong>Activities:</strong>
        <ul>
          {Object.entries(detail.activities).map(([activity, count], activityIndex) => (
            <li key={activityIndex}>{activity}: {count}</li>
          ))}
        </ul>
      </div>
    </div>
  ))}
</ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={() => setIsModalOpen(false)}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
      </Modal>
    </Layout>
  );
};

export default InstitutionDashboard;
