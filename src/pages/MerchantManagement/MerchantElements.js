import styled from "styled-components/macro";

export const DashWrapper = styled.div`
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

export const AgentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const AgentDetailsBox = styled.div`
  display: flex;
  flex-direction: column;
  /* align-items: flex-start;
  justify-content: flex-start; */
  width: 25%;
  border: 1px solid #818181;
  margin-right: 2rem;
  padding: 1rem;
  border-radius: 6px;
`;

export const AgentDetailsBoxTwo = styled.div`
  display: flex;
  flex-direction: column;
  width: 75%;
  border: 1px solid #818181;
  margin: 0rem 2rem;
  padding: 1.5rem 2rem;
  border-radius: 6px;
`;

export const AgentInformation = styled.div`
  margin-top: 1.2rem;
`;

export const AgentInput = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 0.4rem;
`;

export const AgentInputLabel = styled.div`
  font-weight: 600;
  font-size: 1rem;
  letter-spacing: 0px;
  opacity: 1;
  color: #f53d0e;
`;

export const AgentInputText = styled.div`
  font-weight: 500;
  font-size: 1rem;
  letter-spacing: 0px;
`;

export const ProfileImageBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ImageBox = styled.img`
  border-radius: 50%;
  width: 35%;
`;

export const AgentDataBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.5rem;
`;

export const AgentDataInput = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  margin-top: 0.8rem;
  width: 50%;
`;

export const ServiceAreaText = styled.div`
  font: normal normal bold 20px/30px Lato;
  letter-spacing: 0.4px;
  color: #000000;
  opacity: 1;
  font-size: 20px;
  margin: 1.5rem 0rem;
`;

export const ServiceTable = styled.table`
  border-collapse: collapse;
  border-spacing: 0;
  width: 100%;
  border: 1px solid grey;
  margin-bottom: 2rem;
`;

export const ServiceTableRow = styled.tr`
  border-collapse: collapse;
  border-spacing: 0;
  width: 100%;
  border: 1px solid grey;
`;

export const ServiceTableHeading = styled.th`
  text-align: left;
  font: 600 15px/20px Montserrat;
  letter-spacing: 0px;
  color: #fff;
  opacity: 1;
  padding: 1rem;
`;

export const ServiceTableRowHeader = styled.tr`
  border-collapse: collapse;
  border-spacing: 0px;
  width: 100%;
  border-right: solid 1px grey;
  border-left: solid 1px grey;
  border: 1px solid #eb7d35;
  background: #eb7d35;
`;

export const ServiceTableColumn = styled.td`
  padding: 1rem;
  text-align: left;
  font: bold 15px/20px Montserrat;
  letter-spacing: 0px;
  color: #363636;
  opacity: 1;
  border-right: solid 1px grey;
  border-left: solid 1px grey;
`;

export const ServiceTableWrapper = styled.div`
  height: auto;
  width: 100%;
  margin-top: 1rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 3rem 12rem;
  /* display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-top: 2rem; */
`;

export const TotalTableRow = styled.tr`
  border-collapse: collapse;
  border-spacing: 0;
  width: 100%;
  border: 1px solid grey;
`;

export const TotalTableColumn = styled.td`
  padding: 1rem;
  text-align: center;
  font: bold 15px/20px Montserrat;
  letter-spacing: 0px;
  color: #363636;
  opacity: 1;
`;

export const AddAmountWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin: 1rem 0rem;
`;
export const CardDescription = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  /* align-items: center; */
  /* padding-left: 2rem; */
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  // margin: 0rem 1rem;
  margin: 0rem 2rem;
  padding: 5px;
  border-radius: 5px;
`;
export const CardDescriptionData = styled.div`
  /* display: flex; */
  /* flex-direction: column; */
  /* justify-content: center; */
  /* align-items: center; */
  /* padding-left: 2rem; */
  /* box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px; */
  // margin: 0rem 1rem;
  /* margin: 0rem 2rem; */
  padding: 5px;
  /* border-radius: 5px; */
`;
export const CardImages = styled.div`
  display: flex;
  flex-direction: column;
  /* flex-wrap: wrap; */
  padding: 5px;
  /* width: 94%; */
  /* padding-left: 2rem; */
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  border-radius: 5px;
  gap: 0.5rem;
  margin: 0rem 2rem;
  // margin: 0rem 1rem;
`;
export const CardShopTimingComponent = styled.div`
  display: flex;
  flex-direction: column;
 
  gap: 0.5rem;
 
`;
export const CardShopTimingHeaders = styled.div`
  /* display: flex; */
  /* flex-direction: column; */
 font-weight: bold;
 flex:1;
  /* gap: 0.5rem; */
 
`;
export const CardShopTimingData = styled.div`
  /* display: flex; */
  /* flex-direction: column; */
 flex:1
  /* gap: 0.5rem; */
 
`;
export const CardImages_ImageDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 5px;
  /* width: 94%; */
  /* padding-left: 2rem; */
  /* box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px; */
  /* border-radius: 5px; */
  gap: 0.5rem;
  /* margin: 0rem 2rem; */
  // margin: 0rem 1rem;
`;

export const CardDivision = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: left;
margin: 0rem 2rem;
  /* width: 100%; */
  /* padding-left: 2rem; */
`;
export const InnerCardDivision = styled.div`
  width: 70%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const CardLeft = styled.div`
  width: 48%;
  display: flex;

  flex-direction: column;
  align-items: center;
  gap: 2rem;
`;
export const CardRight = styled.div`
  height: 100%;
  width: 48%;
  display: flex;

  padding: 5px;
  flex-direction: column;

  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  padding: 1rem;

  border-radius: 5px;
  gap: 0.5rem;
`;
export const CardRight_row1 = styled.div`
  display: flex;
  flex-direction: column;
`;
export const CardRight_row2 = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
export const CardRight_row2_Component = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
`;
export const CardRight_row2_Component_div1 = styled.div`
  display: flex;
  flex: 1;
  word-break: break-all;
  font-weight: bold;
`;
export const CardRight_row2_Component_div2 = styled.div`
  display: flex;
  flex: 1;
  word-break: break-all;
`;
export const Card1 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  border-radius: 5px;
  padding: 5px;
  gap: 5px;
  width: 100%;
  padding: 1rem;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
`;
export const Card1_row1 = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const CartOneImage = styled.img`
  height: 300px;
  width: 100%;
  border-radius:5px;
  object-fit: cover;
`;
export const Card1_row2 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const Card1_row3 = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
flex-wrap: wrap;
  width: 100%;
  @media screen and (max-width: 800px) {
justify-content: center;
  }
`;
export const Card1_row3_component = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

export const Card2 = styled.div`
  display: flex;
  flex-direction: column;
  // height: 300px;

  border-radius: 5px;
  padding: 5px;
  gap: 5px;
  width: 100%;
  padding: 1rem;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
`;
export const Card2_row1 = styled.div`
  display: flex;
  border-bottom: 1px solid lightgray;
  font-weight: bold;
  font-size: 1.3rem;
  padding-bottom: 0.5rem;
`;
export const Card2_row1s = styled.div`
  display: flex;
  border-bottom: 1px solid lightgray;
  font-weight: bold;
  padding-bottom: 0.5rem;
  font-size: 1.3rem;
`;
export const Card2_row2 = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
export const Card2_row2_Component = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  justify-content: space-between;
`;
export const Card2_row2_Component_div1 = styled.div`
  display: flex;
  flex: 1;
  word-break: break-all;
  font-weight: bold;
`;
export const Card2_row2_Component_div2 = styled.div`
  display: flex;
  flex: 1;
  word-break: break-all;
`;

export const ShopTitle = styled.div`
  width: 100%;
  color: #c03b5a;
  font-size: 1.6rem;
  font-weight: 600;
  margin-left: 2rem;
`;
