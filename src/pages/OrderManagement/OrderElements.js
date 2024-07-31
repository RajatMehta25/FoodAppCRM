import styled from "styled-components/macro";

export const DashboardContainer = styled.div`
  color: #fff;
  background: ${({ lightBg }) => (lightBg ? "#f9f9f9" : "#F2F2F2")};
  margin-left: 280px;
  overflow: scroll;
  overflow-x: hidden;
  overflow-y: hidden;

  @media screen and (max-width: 780px) {
    margin-left: 0px;
  }

  @media screen and (max-width: 480px) {
    margin-left: 0px;
  }
`;

export const DashboardWrapper = styled.div`
  display: flex;
  z-index: 1;
  height: 92vh;
  width: 100%;
  margin-right: auto;
  margin-left: auto;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
`;

export const DashboardHeading = styled.div`
  // padding: 1rem 0rem;
  padding-bottom: 1rem;
  margin-top: 1rem;
  display: flex;
  /* flex-direction: column; */
  align-items: center;
  justify-content: space-between;
  width: 95%;
  margin-left: 2rem;

  @media screen and (max-width: 768px) {
    padding: 0.5rem 1.5rem;
    margin-top: 0.4rem;
  }

  @media screen and (max-width: 480px) {
    margin-top: 0.2rem;
    padding: 0.3rem 0rem;
  }

  @media screen and (max-width: 320px) {
    margin-top: 0rem;
    padding: 0rem 0rem;
  }
  @media screen and (max-width: 478px) {
    padding: 0.5rem 1rem;
  }
  @media screen and (max-width: 320px) {
    padding-right: 7px;
  }
`;

export const DashHeading = styled.div`
  font: normal normal bold 20px/30px Lato;
  letter-spacing: 0.4px;
  color: #000000;
  opacity: 1;
  font-size: 26px;
  text-align: left;

  @media screen and (max-width: 1127px) {
    font-size: 18px;
  }

  @media screen and (max-width: 836px) {
    font-size: 14px;
  }

  @media screen and (max-width: 768px) {
    font-size: 20px;
  }

  @media screen and (max-width: 580px) {
    font-size: 16px;
  }

  @media screen and (max-width: 530px) {
    font-size: 12px;
  }
  @media screen and (max-width: 480px) {
    font-size: 14px;
  }

  @media screen and (max-width: 425px) {
    font-size: 12px;
  }

  @media screen and (max-width: 375px) {
    font: normal normal bold 10px/13px Lato;
  }
  @media screen and (max-width: 303px) {
    font-size: 9px;
  }
`;

export const HeadingButton = styled.button`
  box-shadow: 0px 0px 10px #00000030;
  border-radius: 5px;
  opacity: 1;
  margin: 0.4em;
  white-space: nowrap;
  border: none;
  font-weight: ${({ dropDown }) => (dropDown ? "600" : "500")};
  padding: ${({ dropDown }) => (dropDown ? "0.7em 1.6em" : "0.9em 1.3em")};
  background: ${({ dropDown }) =>
    dropDown ? "#FFFFFF" : "transparent linear-gradient(90deg, #bb2649 0%, #c44f6a 100%) 0% 0% no-repeat padding-box"};
  color: ${({ dropDown }) => (dropDown ? "#000000" : "#FFFFFF")};
  font-size: ${({ dropDown }) => (dropDown ? "1rem" : "1rem")};
  outline: none;
  cursor: pointer;
  display: flex;
  justify-content: ${({ primary }) => (primary ? "center" : "space-between")};
  align-items: center;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  margin-bottom: 1rem;
  /* width: 100%; */

  /* &:hover {
            transition: all 0.2s ease-in-out;
            background: ${({ primary }) => (primary ? "#FF4001" : "transparent")};
            border: 1px solid ${({ primary }) => (primary ? "#FF4001" : "#FFFFFF")};
            color: ${(dark) => (dark ? "#F1F1F1" : "#F1F1F1")};
        } */

  @media screen and (max-width: 768px) {
    margin: 0.5em;
    margin-left: 0;
    padding: ${({ big }) => (big ? "0.5em 2em" : "0.9em 1.3em")};
    font-size: ${({ fontBig }) => (fontBig ? "1.2em" : "1em")};
  }

  @media screen and (max-width: 480px) {
    margin: 0.5em;
    margin-left: 0;
    padding: ${({ big }) => (big ? "0.5em 2em" : "0.9em 1.3em")};
    font-size: ${({ fontBig }) => (fontBig ? "1.2em" : "1em")};
  }

  @media screen and (max-width: 375px) {
    font-size: 10px;
  }
`;

export const SvgLogo = styled.img`
  color: #fff;
  cursor: pointer;
`;

export const BackIcon = styled.div`
  color: #000000;
  cursor: pointer;
  padding-right: 5px;
  margin-right: 10px;

  @media screen and (max-width: 480px) {
    padding-left: 1rem;
    margin-right: 5px;
  }
`;

export const MenuAndBack = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const PreperationTime = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: center;
`;
export const LabelHeading = styled.div`
  color: #000000;
  text-align: left;
  font-size: 22px;
  padding: 1rem 0rem;
`;
export const RetaurantDetailsForm = styled.div`
  padding: 2rem;
  width: 100%;

  @media screen and (max-width: 1000px) {
    padding: 0rem;
  }

  @media screen and (max-width: 480px) {
    padding: 0rem;
  }
`;
export const InputDivide = styled.div`
  display: flex;
  /* flex-direction: row; */

  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;
export const MiddleColumnProfile = styled.div`
  padding: 2rem 3rem;
  overflow: scroll;

  @media screen and (max-width: 768px) {
    width: 100%;
  }

  @media screen and (max-width: 480px) {
    padding: 2rem 1rem;
  }
`;

export const ProfileTime = styled.div`
  display: flex;
  width: 59%;
  justify-content: flex-end;
  align-items: center;
`;

export const ProfileDayTime = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const InputPic = styled.img`
  background-color: #00bfff;
  width: 28px !important;
  height: 24px !important;
  object-fit: none !important;
  margin-left: 4.2rem;
  margin-top: -2rem;
  /* border-radius: 50%; */
  /* margin-bottom: 10px; */
`;

export const HeadingBlock = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 1rem;
`;

export const HeadingProfile = styled.div`
  /* display: flex; */
  /* align-items: center; */
  /* flex-direction: column; */
  text-align: left;
  font: normal normal 600 20px/24px Lato;
  letter-spacing: 0px;
  color: #000000;
  opacity: 1;
  width: 100%;
  margin-bottom: 1rem;
`;

export const HeadingPara = styled.div`
  /* display: flex;
    align-items: center;
    flex-direction: column; */
  text-align: left;
  font: normal normal normal 17px/30px Lato;
  letter-spacing: 0px;
  color: #666666;
  opacity: 1;
`;

export const MultipleButtons = styled.div`
  padding: 0.5rem 2rem;
  padding-top: 0px;
  margin-top: 1rem;
  display: flex;
  /* flex-direction: column; */
  align-items: center;
  justify-content: space-between;
  width: 100%;

  @media screen and (max-width: 768px) {
    padding: 0.5rem 1.5rem;
    margin-top: 0.4rem;
  }

  @media screen and (max-width: 480px) {
    margin-top: 0.2rem;
    padding: 0.5rem 1rem;
  }

  @media screen and (max-width: 320px) {
    margin-top: 0rem;
    padding: 0.5rem 1rem;
  }
`;

export const TripleButton = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const MultipleButton = styled.button`
  box-shadow: 0px 0px 10px #00000030;
  border: 1px solid #d90066;
  border-radius: 2px;
  opacity: 1;
  /* margin: 0.4em; */
  white-space: nowrap;
  /* border: none; */
  font-weight: ${({ dropDown }) => (dropDown ? "600" : "500")};
  padding: ${({ dropDown }) => (dropDown ? "0.7em 1.6em" : "0.3em")};
  background: ${({ selected }) => (selected ? "#D90066" : "#FFF9FB")};
  color: ${({ selected }) => (selected ? "#FFF9FB" : "#D90066")};
  font-size: ${({ dropDown }) => (dropDown ? "1rem" : "1rem")};
  outline: none;
  cursor: pointer;
  display: flex;
  justify-content: ${({ primary }) => (primary ? "center" : "center")};
  align-items: center;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  margin-bottom: 1rem;
  width: 100%;

  /* &:hover {
            transition: all 0.2s ease-in-out;
            background: ${({ primary }) => (primary ? "#FF4001" : "transparent")};
            border: 1px solid ${({ primary }) => (primary ? "#FF4001" : "#FFFFFF")};
            color: ${(dark) => (dark ? "#F1F1F1" : "#F1F1F1")};
        } */

  @media screen and (max-width: 768px) {
    /* margin: 0.5em; */
    margin-left: 0;
    padding: ${({ big }) => (big ? "0.5em 2em" : "0.3em")};
    font-size: ${({ fontBig }) => (fontBig ? "1.2em" : "0.9em")};
  }

  @media screen and (max-width: 480px) {
    /* margin: 0.5em; */
    margin-left: 0;
    margin-bottom: 0rem;
    padding: ${({ big }) => (big ? "0.5em 2em" : "0.3em")};
    font-size: ${({ fontBig }) => (fontBig ? "1.2em" : "0.7em")};
    margin-bottom: 0.5rem;
  }
  @media screen and (max-width: 320px) {
    /* margin: 0.5em; */
    margin-left: 0;
    margin-bottom: 0rem;
    padding: ${({ big }) => (big ? "0.5em 2em" : "0.2em")};
    font-size: ${({ fontBig }) => (fontBig ? "1.2em" : "0.6em")};
    margin-bottom: 0.3rem;
  }
`;

export const VoucherHeading = styled.div`
  padding: 0.5rem 2rem;
  /* margin-top: 1rem; */
  display: flex;
  /* flex-direction: column; */
  align-items: center;
  justify-content: space-between;
  width: 100%;

  @media screen and (max-width: 768px) {
    padding: 0.5rem 1.5rem;
    /* margin-top: 0.4rem; */
  }

  @media screen and (max-width: 480px) {
    /* margin-top: 0.2rem; */
    padding: 0.3rem 0rem;
  }

  @media screen and (max-width: 320px) {
    margin-top: 0rem;
    padding: 0rem 0rem;
  }
`;

export const VoucherHeadingMain = styled.div`
  font: normal normal bold 20px/56px Lato;
  letter-spacing: 0.16px;
  color: #1a1a1a;
  opacity: 1;
  font-size: 18px;
  text-align: left;

  @media screen and (max-width: 1050px) {
    font-size: 16px;
  }
  @media screen and (max-width: 950px) {
    font-size: 14px;
  }

  @media screen and (max-width: 880px) {
    font-size: 12px;
  }

  @media screen and (max-width: 768px) {
    font-size: 11px;
  }

  @media screen and (max-width: 480px) {
    font-size: 10px;
  }
  @media screen and (max-width: 410px) {
    display: none;
  }
`;

export const FullWidthMobileInput = styled.div`
  padding: 1rem;

  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

export const MobileViewCalender = styled.div`
  display: flex;
  flex-direction: row;

  @media screen and (max-width: 480px) {
    flex-direction: column;
  }
`;

export const OfferRadioSection = styled.div`
  padding: 0.5rem 0.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  @media screen and (max-width: 768px) {
    padding: 0.5rem 0.5rem;
  }

  @media screen and (max-width: 480px) {
    /* margin-top: 0.2rem; */
    padding: 0.3rem 0rem;
  }

  @media screen and (max-width: 320px) {
    margin-top: 0rem;
    padding: 0rem 0rem;
  }
`;

export const OfferSectionLabel = styled.div`
  padding-left: 0.5rem;
  margin-right: 0.5rem;
  text-align: left;
  font: normal normal normal 14px/18px Lato;
  letter-spacing: 0px;
  color: #666666;
  opacity: 1;
  font-size: 18px;

  @media screen and (max-width: 880px) {
    font-size: 18px;
    padding: 0rem 1rem 0rem 0.5rem;
  }

  @media screen and (max-width: 768px) {
    font-size: 18px;
    padding: 0rem 1rem 0rem 0.5rem;
  }

  @media screen and (max-width: 480px) {
    padding: 0rem 0rem 0rem 1rem;
    font-size: 16px;
  }
`;

export const LoginButton = styled.button`
  box-shadow: 0px 0px 10px #00000030;
  border-radius: 10px;
  opacity: 1;
  margin: 0.4em;
  white-space: nowrap;
  padding: ${({ big }) => (big ? "0.5em 2em" : "0.3em 2em")};
  border: none;
  font-weight: 700;
  background: #eb7d35;
  color: ${({ primary }) => (primary ? "#000000" : "#FFFFFF")};
  /* border: 1px solid ${({ primary }) => (primary ? "#FFFFFF" : "#FF4001")}; */
  font-size: ${({ fontBig }) => (fontBig ? "1.2rem" : "1rem")};
  outline: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.2s ease-in-out;
  text-decoration: none;

  &:hover {
    transition: all 0.2s ease-in-out;
    background: #ff4001;
    border: 1px solid #ff4001;
    color: ${(dark) => (dark ? "#F1F1F1" : "#F1F1F1")};
  }

  @media screen and (max-width: 768px) {
    margin: 0.5em;
    margin-left: 0;
    padding: ${({ big }) => (big ? "0.5em 2em" : "1.2em 1.5em")};
    font-size: ${({ fontBig }) => (fontBig ? "1.2em" : "1rem")};
  }

  @media screen and (max-width: 480px) {
    margin: 0.5em;
    margin-left: 0;
    padding: ${({ big }) => (big ? "0.5em 2em" : "1.2em 1.5em")};
    font-size: ${({ fontBig }) => (fontBig ? "1.2em" : "1rem")};
  }
`;

export const ApproveButton = styled.div`
  background-color: green;
  color: white;
  padding: 0.5rem 0.5rem;
  border-radius: 0.4rem;
  text-align: center;
  cursor: pointer;
`;

export const PendingButton = styled.div`
  background-color: yellow;
  color: black;
  padding: 0.5rem 0.5rem;
  border-radius: 0.4rem;
  text-align: center;
  cursor: pointer;
`;

export const DisapproveButton = styled.button`
  background-color: red;
  color: white;
  padding: 0.5rem 0.5rem;
  border-radius: 0.4rem;
  text-align: center;
  cursor: pointer;
  border: solid red;
`;

export const AgentApprove = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;
`;

export const DisapproveInput = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const DisapproveCheck = styled.div`
  display: flex;
  align-items: center;
`;

export const NotificationButton = styled.button`
  box-shadow: 0px 0px 10px #00000030;
  border-radius: 10px;
  opacity: 1;
  margin: 0.4em;
  white-space: nowrap;
  border: none;
  font-weight: 700;
  background: #eb7d35;
  color: ${({ primary }) => (primary ? "#000000" : "#FFFFFF")};
  /* border: 1px solid ${({ primary }) => (primary ? "#FFFFFF" : "#FF4001")}; */
  font-size: ${({ fontBig }) => (fontBig ? "1.2rem" : "1rem")};
  outline: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.2s ease-in-out;
  text-decoration: none;

  /* &:hover {
        transition: all 0.2s ease-in-out;
        background: ${({ primary }) => (primary ? "#FF4001" : "transparent")};
        border: 1px solid ${({ primary }) => (primary ? "#FF4001" : "#FFFFFF")};
        color: ${(dark) => (dark ? "#F1F1F1" : "#F1F1F1")};
    } */

  @media screen and (max-width: 768px) {
    margin: 0.5em;
    margin-left: 0;
    padding: ${({ big }) => (big ? "0.5em 2em" : "1.2em 1.5em")};
    font-size: ${({ fontBig }) => (fontBig ? "1.2em" : "1rem")};
  }

  @media screen and (max-width: 480px) {
    margin: 0.5em;
    margin-left: 0;
    padding: ${({ big }) => (big ? "0.5em 2em" : "1.2em 1.5em")};
    font-size: ${({ fontBig }) => (fontBig ? "1.2em" : "1rem")};
  }
`;

export const PendingApprove = styled.div`
  background-color: green;
  color: white;
  padding: 0.5rem 0.6rem;
  border-radius: 0.4rem;
  text-align: center;
  cursor: pointer;
`;
export const OrderDetailsContainer = styled.div`
  display: flex;
  gap: 1em;
`;
export const OrderDetailsContainerLeft = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 1em;
  gap: 1em;
`;
export const OrderDetailsContainerRight = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1em;
  padding: 1em;
  justify-content: space-between;
`;
export const OrderDetailsContainerRight_Box = styled.div`
  padding: 1em;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  display: flex;
  flex-direction: column;
  border-radius: 0.5em;
`;
export const OrderDetailsContainerRight_Box_Heading = styled.div`
  display: flex;
  flex: 1;
  border-bottom: 1px solid lightgray;
  font-weight: bold;
  padding-bottom: 0.5rem;
  font-size: 1rem;
`;
export const OrderDetailsContainerRight_Box_Component = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  justify-content: space-between;
`;
export const OrderDetailsContainerRight_Box_Component_div1 = styled.div`
  display: flex;
  flex: 1;
  word-break: break-all;
  font-weight: bold;
`;
export const OrderDetailsContainerRight_Box_Component_div2 = styled.div`
  display: flex;
  flex: 1;
  word-break: break-all;
`;
export const OrderSummaryCustom = styled.div`
  display: flex;
  flex: 1;
  justify-content: space-between;
  align-items: flex-end;
  /* border-bottom: 1px solid lightgray; */
`;
export const OrderBanner = styled.div`
  display: flex;
  flex: 1;
  word-break: break-all;
  border-bottom: 1px solid lightgray;
  padding-bottom: 0.5rem;
`;
export const OrderBannerButton = styled.div`
  /* CSS */

  /* padding: 0.6em 2em;
  border: none;
  outline: none;
  color: ${({ textcolor }) => textcolor};
  background: ${({ bgcolor }) => bgcolor};
  cursor: pointer;
  position: relative;
  z-index: 0;
  border-radius: 10px;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;

  &:before {
    content: "";
    background: linear-gradient(45deg, #ff0000, #ff7300, #fffb00, #48ff00, #00ffd5, #002bff, #7a00ff, #ff00c8, #ff0000);
    position: absolute;
    top: -2px;
    left: -2px;
    background-size: 400%;
    z-index: -1;
    filter: blur(5px);
    -webkit-filter: blur(5px);
    width: calc(100% + 4px);
    height: calc(100% + 4px);
    animation: glowing-button-85 20s linear infinite;
    transition: opacity 0.3s ease-in-out;
    border-radius: 10px;
  }

  @keyframes glowing-button-85 {
    0% {
      background-position: 0 0;
    }
    50% {
      background-position: 400% 0;
    }
    100% {
      background-position: 0 0;
    }
  }

  &:after {
    z-index: -1;
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background: ${({ bgcolor }) => bgcolor};
    left: 0;
    top: 0;
    border-radius: 10px;
  } */

  //dededededed
  @keyframes rotate {
    100% {
      transform: rotate(1turn);
    }
  }

  position: relative;
  z-index: 0;
  width: 100%;
  text-align: center;
  /* background-color: ${({ bgcolor }) => bgcolor}; */
  /* height: 300px; */
  border-radius: 10px;
  overflow: hidden;
  padding: 1em;

  &::before {
    content: "";
    position: absolute;
    z-index: -2;
    left: -50%;
    top: -50%;
    width: 200%;
    height: 200%;
    /* background-color: ${({ bgcolor }) => bgcolor}; */
    background-repeat: no-repeat;
    background-size: 50% 50%, 50% 50%;
    background-position: 0 0, 100% 0, 100% 100%, 0 100%;
    background-image: linear-gradient(${({ bgcolor }) => bgcolor}, ${({ bgcolor }) => bgcolor});
    /* background-image: linear-gradient(#399953, #399953), linear-gradient(#fbb300, #fbb300), linear-gradient(#d53e33, #d53e33),
      linear-gradient(#377af5, #377af5); */
    animation: rotate 4s linear infinite;
  }

  &::after {
    content: "";
    position: absolute;
    z-index: -1;
    left: 6px;
    top: 6px;
    width: calc(100% - 12px);
    height: calc(100% - 12px);
    background: white;
    border-radius: 5px;
  }
`;
export const CloseContainer =styled.div`
 position: relative;
  margin: auto;
  width: 1.5em;
  height: 1.5em;
  /* margin-top: 100px; */
  cursor: pointer;
  &:hover .leftright{
  transform: rotate(-45deg);
  background-color: #F25C66;
}
&:hover .rightleft{
  transform: rotate(45deg);
  background-color: #F25C66;
}
&:hover label{
  opacity: 1;
}
`;
export const LeftRight =styled.div`
 height: 4px;
  width: 1.5em;
  position: absolute;
  margin-top: 24px;
  background-color:#F4A259;
  border-radius: 2px;
  transform: rotate(45deg);
  transition: all .3s ease-in;
  /* &:hover{ transform: rotate(-45deg);
  background-color: #F25C66;} */
`;
export const RightLeft=styled.div`
 height: 4px;
  width: 1.5em;
  position: absolute;
  margin-top: 24px;
  background-color:#F4A259;
  border-radius: 2px;
  transform: rotate(-45deg);
  transition: all .3s ease-in;
  /* &:hover{
    transform: rotate(45deg);
  background-color: #F25C66;
  } */
`;
export const CloseLabel =styled.label`
 color: black;
  font-family: Helvetica, Arial, sans-serif; 
  font-size: .6em;
  text-transform: uppercase;
  letter-spacing: 2px;
  transition: all .3s ease-in;
  opacity: 0;
  margin: 3em 0 0 5px;
  position: absolute;
`;