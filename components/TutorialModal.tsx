import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Text,
  Box,
  Button,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import Image from "next/image";
import tutorial_Add_Element from "../public/tutorial/Add_Element_Example.png";
import tutorial_Edit_CSS from "../public/tutorial/Change_CSS_Properties_Example.png";

interface Page {
  id: number;
  title: string;
  content: JSX.Element;
}
const pages: Page[] = [
  {
    id: 0,
    title: "Welcome to sponge!",
    content: (
      <>
        <Text mb={2}>
          Sponge is a tool for creating art with CSS. You can get{" "}
          <Text as="span" color={"blue.400"} fontWeight="bold">
            started
          </Text>{" "}
          by clicking and adding an element from the toolbar located on the left
          side of your screen.
        </Text>
        <Image
          src={tutorial_Add_Element}
          width={"200px"}
          height={"160px"}
          placeholder={"blur"}
        />
      </>
    ),
  },
  {
    id: 1,
    title: "Changing CSS Properties",
    content: (
      <>
        <Text mb={2}>
          When an element is added it will be shown on your layers tab. You can
          <Text as="span" color={"blue.400"} fontWeight="bold">
            {" "}
            change{" "}
          </Text>
          its CSS properties by clicking/dragging any of the icons.
        </Text>
        <Image
          src={tutorial_Edit_CSS}
          width={"300px"}
          height={"170px"}
          placeholder={"blur"}
        />
      </>
    ),
  },
];

const TutorialModal = ({ isFirstVisit }: { isFirstVisit: boolean }) => {
  const [pageNumber, setPageNumber] = useState(0);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const mounted = useRef(false);
  if (isFirstVisit && !isOpen && !mounted.current) {
    onOpen();
    mounted.current = true;
  }
  const handleClickNext = () => {
    if (pageNumber === pages.length - 1) return;
    setPageNumber((p) => p + 1);
  };
  const handleClickPrev = () => {
    if (pageNumber === 0) return;
    setPageNumber((p) => p - 1);
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <PageContent pageNumber={pageNumber} />
        <ModalFooter justifyContent={"space-between"}>
          <Button onClick={onClose}>Skip</Button>
          <Box>
            {pageNumber !== 0 && (
              <Button mr={3} onClick={handleClickPrev}>
                Prev
              </Button>
            )}
            <Button
              colorScheme={"blue"}
              onClick={handleClickNext}
              disabled={pageNumber === pages.length - 1}
            >
              Next
            </Button>
          </Box>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
const PageContent = ({ pageNumber }: { pageNumber: number }) => {
  const page: Page = pages.filter((p) => p.id === pageNumber)[0];
  console.log(page);
  return (
    <>
      <ModalHeader>{page.title}</ModalHeader>
      <ModalCloseButton />
      <ModalBody>{page.content}</ModalBody>
    </>
  );
};
export default TutorialModal;
