import styled from "styled-components";
let SharedButton = styled.button`
  border-radius: 15px;
  background: rgba(232, 232, 232, 0.1);
  color: #e8e8e8;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(2.5px);
  text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
  font-family: Poppins;
  font-size: 20px;
  font-weight: 600;
  padding: 5px 30px;
`;

let GradientButton = styled(SharedButton)`
  background: rgb(255, 255, 255);
  color: #000;
  border: 1px solid black;
  &:hover {
    color: #fff;
  }
`;
let SharedText = styled.h2`
  color: #e8e8e8;

  font-family: Poppins;
  font-size: 25px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;
let Shared_P = styled.p`
  color: #666;
  font-family: Poppins;
  font-size: 15px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  transition: all 0.3s ease-in-out;
  &:hover {
    color: #fff;
  }
`;
export { SharedButton, GradientButton, SharedText, Shared_P }; // ✅ named exports
