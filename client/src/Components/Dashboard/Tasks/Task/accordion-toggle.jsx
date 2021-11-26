import { useAccordionButton } from "react-bootstrap";
const CustomToggle = ({ children, eventKey }) => {
  const decoratedOnClick = useAccordionButton(eventKey, () =>
    console.log("totally custom!")
  );

  return <span onClick={decoratedOnClick}>{children}</span>;
};

export default CustomToggle;
