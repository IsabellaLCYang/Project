import styled from "styled-components";

export const BoxContainer = styled.div`
  width: 36vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
`;

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  box-shadow: 0px 0px 2.5px rgba(15, 15, 15, 0.19);
`;

export const SmallSpan = styled.span`
  font-size: 11px;
  color: rgba(200, 200, 200, 0.8);
  font-weight: 500;
  text-decoration: none;
`;

export const BoldSpan = styled.span`
  font-size: 11px;
  color: #23a7e8;
  font-weight: 500;
  text-decoration: none;
  margin-top: 2px;
  cursor: pointer;
`;

export const Input = styled.input`
  width: 23vw;
  height: 42px;
  outline: none;
  border: 1px solid rgba(200, 200, 200, 0.3);
  padding: 0px 10px;
  border-bottom: 1.4px solid transparent;
  transition: all 200ms ease-in-out;
  font-size: 12px;

  &::placeholder {
    color: rgba(200, 200, 200, 1);
  }

  &:not(:last-of-type) {
    border-bottom: 1.5px solid rgba(200, 200, 200, 0.4);
  }

  &:focus {
    outline: none;
    border-bottom: 2px solid rgb(241, 196, 15);
  }
`;

export const SubmitButton = styled.button`
  width: 16vw;
  padding: 12px 10vh;
  text-align: center;
  color: #fff;
  font-size: 18px;
  font-weight: 600;
  border: none;
  border-radius: 100px 100px 100px 100px;
  cursor: pointer;
  transition: all, 240ms ease-in-out;
  background: #2196f3;
  background: linear-gradient(80deg, rgba #e3f2fd 20%, rgba #1976d2 80%);
  &:hover {
    filter: brightness(1.03);
  }
`;

export const HorizontalMargin = styled.span`
  display: flex;
  width: ${({ margin }) =>
    typeof margin === "string" ? margin : `${margin}px`};
`;

export const VerticalMargin = styled.span`
  display: flex;
  height: ${({ margin }) =>
    typeof margin === "string" ? margin : `${margin}px`};
`;
export function Marginer(props) {
  const { direction } = props;

  if (direction === "horizontal") return <HorizontalMargin {...props} />;
  else {
    return <VerticalMargin {...props} />;
  }
}

export const BreakLine = styled.hr`
  border: none;
  border-top: 1px solid #333;
  color: #333;
  overflow: visible;
  text-align: center;
  height: 10px;
  &:after {
    background: #fff;
    color: rgba(150,150,150,1);
    content: "or";
    padding: 0 4px;
    position: relative;
    top: -8px;
//   }
`;
