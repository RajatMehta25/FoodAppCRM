import styled from 'styled-components/macro'


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
`

export const AgentWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`


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
`


export const AgentDetailsBoxTwo = styled.div`
    display: flex;
  flex-direction: column;
  width: 75%;
  border: 1px solid #818181;
  margin: 0rem 2rem;
  padding: 1.5rem 2rem;
  border-radius: 6px;
`


export const AgentInformation = styled.div`
 margin-top: 1.2rem;
`

export const AgentInput = styled.div`
display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 0.4rem;
`

export const AgentInputLabel = styled.div`
   font-weight: 600;
   font-size: 1rem;
   letter-spacing: 0px;
    opacity: 1;
    color: #f53d0e;
`

export const AgentInputText = styled.div`
   font-weight: 500;
   font-size: 1rem;
   letter-spacing: 0px;
`

export const ProfileImageBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

export const ImageBox = styled.img`
border-radius: 50%;
width: 35%;
`


export const AgentDataBox = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
margin-top: 0.5rem;

`

export const AgentDataInput = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    margin-top: 0.8rem;
    width: 50%;
`

export const ServiceAreaText = styled.div`
    font: normal normal bold 20px/30px Lato;
    letter-spacing: 0.4px;
    color: #000000;
    opacity: 1;
    font-size: 20px;
    margin: 1.5rem 0rem;
`

export const ServiceTable = styled.table`
    border-collapse: collapse;
    border-spacing: 0;
    width: 100%;
    border: 1px solid grey;
    margin-bottom: 2rem;
`


export const ServiceTableRow = styled.tr`
    border-collapse: collapse;
    border-spacing: 0;
    width: 100%;
    border: 1px solid grey;
`


export const ServiceTableHeading = styled.th`
   text-align: left;
  font: 600 15px/20px Montserrat;
  letter-spacing: 0px;
  color: #fff;
  opacity: 1;
  padding: 1rem;
`



export const ServiceTableRowHeader = styled.tr`
      border-collapse: collapse;
      border-spacing: 0px;
      width: 100%;
      border-right: solid 1px grey; 
      border-left: solid 1px grey;
      border: 1px solid #eb7d35;
      background:  #eb7d35
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
`

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

`


export const TotalTableRow = styled.tr`
    border-collapse: collapse;
    border-spacing: 0;
    width: 100%;
    border: 1px solid grey;
`


export const TotalTableColumn = styled.td`
      padding: 1rem;
      text-align: center;
      font: bold 15px/20px Montserrat;
      letter-spacing: 0px;
      color: #363636;
      opacity: 1;
`


export const AddAmountWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`






